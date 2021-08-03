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