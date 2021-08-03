import { pascalCase } from 'change-case'
import { RouteConfig } from 'vue-router'

export function assignRoutes(routes: RouteConfig[]): RouteConfig[] {

  function dfs(routes: RouteConfig[], parent?: RouteConfig) {
    routes.forEach(route => {
      // Named route auto
      const name = pathToName(route.path)
      route.name = parent ? `${parent.name}${name}` : name

      if (route.children?.length) {
        dfs(route.children, route)
      }
    })
  }

  dfs(routes)

  return routes
}

function pathToName(path: string) {
  return pascalCase(path.replace(/\//g, ''))
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