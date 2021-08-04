/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RouteConfig } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'
import BlankLayout from '../layouts/BlankLayout.vue'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import { assignRoutes, flattenRoutesAndConnectToTab } from './utils'

const mainRoute: RouteConfig = {
  path: '/',
  component: BasicLayout,
  children: [
    {
      path: 'example',
      component: BlankLayout,
      children: [
        { path: 'home', component: Home, meta: { title: 'Home' } },
        { path: 'about', component: About, meta: { title: 'About' } },
      ]
    },
    { path: '', redirect: '/example/home' }
  ]
}

/**
 * 1. Setup: assign all routes
 *
 * 2. Flatten nesting routes, and wrap component with TabConnector
 *
 * Output:
 * ```
 * {
 *   path: '/',
 *   component: BasicLayout,
 *   children: [
 *     { path: '/example/home', name: 'ExampleHome', component: TabConnector(Home), meta },
 *     { path: '/example/about', name: 'ExampleAbout', component: TabConnector(About), meta },
 *   ]
 * }
 * ```
 */
const routes: Array<RouteConfig> = assignRoutes([
  mainRoute
])

mainRoute.children = flattenRoutesAndConnectToTab(mainRoute.children!)

console.log(routes)

export { routes }