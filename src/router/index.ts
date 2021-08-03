import Vue from 'vue'
import VueRouter from 'vue-router'
import { tabService } from '../services/TabService'
import { routes } from './config'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.afterEach((to) => {
  tabService.onRouterChange(to)
})

export default router
