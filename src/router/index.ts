import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import { assignRoutes } from './utils'

Vue.use(VueRouter)

const mainRoute: Array<RouteConfig> = assignRoutes([
  {
    path: '/u',
    component: BasicLayout,
    children: [
      { path: 'home', component: Home },
      { path: 'about', component: About },
    ]
  }
])

const routes: Array<RouteConfig> = [
  ...mainRoute,
  { path: '', redirect: '/u/home' }
]

console.log(mainRoute)

const router = new VueRouter({
  routes
})

export default router
