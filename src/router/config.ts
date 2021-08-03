import { RouteConfig } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import { assignRoutes } from './utils'

const mainRoute: Array<RouteConfig> = assignRoutes([
  {
    path: '/u',
    component: BasicLayout,
    children: [
      { path: 'home', component: Home, meta: { title: 'Home' } },
      { path: 'about', component: About, meta: { title: 'About' } },
    ]
  }
])

const routes: Array<RouteConfig> = [
  ...mainRoute,
  { path: '', redirect: '/u/home' }
]

console.log(mainRoute)

export { routes }