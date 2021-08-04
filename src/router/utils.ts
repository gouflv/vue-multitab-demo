import { pascalCase } from 'change-case'
import _ from 'lodash'
import { join } from 'path'
import Vue from 'vue'
import { RouteConfig } from 'vue-router'
import { Component, RouteConfigSingleView } from 'vue-router/types/router'
import { tabService } from '../services/TabService'

function pathToName(path: string) {
  return pascalCase(path.replace(/\//g, ''))
}

/**
 * Compute some values and assign to the route config
 */
export function assignRoutes(routes: RouteConfig[]): RouteConfig[] {

  function dfs(routes: RouteConfig[], parent?: RouteConfig) {
    routes.forEach(route => {
      // Generate name
      const name = pathToName(route.path)
      route.name = parent ? `${parent.name}${name}` : name

      // Generate fullPath
      route.meta ??= {}
      route.meta.fullPath = parent?.meta ? join(parent.meta.fullPath, route.path) : route.path

      if (route.children?.length) {
        dfs(route.children, route)
      }
    })
  }

  dfs(routes)
  return routes
}

export const findRoute = (
  routes: RouteConfig[],
  predicate: (route: RouteConfig) => boolean
): RouteConfig | null => {
  let result: RouteConfig | null = null

  function dfs(routes: RouteConfig[]) {
    routes.forEach(route => {
      if (predicate(route)) {
        result = route
      } else if (route.children) {
        dfs(route.children)
      }
    })
  }

  dfs(routes)
  return result
}

export function flattenRoutesAndConnectToTab(routes: RouteConfig[]): RouteConfig[] {
  return _.reduce<RouteConfig, RouteConfig[]>(routes, (acc, route) => {
    const { children } = route

    if (!children?.length) {
      acc.push(route)
      return acc
    }

    children.forEach(child => {
      const component = (child as RouteConfigSingleView).component
      const meta = (child as RouteConfigSingleView).meta

      if (!child.name || !component || !meta) {
        throw new Error(`check route config ${child.path}`)
      }

      const connected = createTabConnector(child.name, component)

      acc.push({
        ...child,
        path: meta.fullPath,
        component: connected
      })
    })

    return acc
  }, [])
}

function createTabConnector (name: string, component: Component) {
  return Vue.extend({
    name,
    render: h => {
      const tab = tabService.find(name)

      if (!tab) return h('div')

      return h(component, { key: tab.timestamp })
    }
  })
}