import Vue from 'vue'
import { Route, RouteConfig } from 'vue-router'
import router from '../router'
import { routes } from '../router/config'
import { findRoute } from '../router/utils'

type TabItem = {
  name: string
  title: string
  timestamp: number
}

export class TabService {

  tabs: TabItem[] = []

  active: TabItem | null = null

  constructor (private routes: RouteConfig[]) {}

  /**
   * Vue router guard
   */
  onRouterChange(route: Route): void {
    if (!route.name) {
      throw new Error('route name is required')
    }

    if (!this.has(route.name)) {
      this.active = this.add(route.name)
      return
    }

    this.active = this.find(route.name)
  }

  /**
   * Set active tab and navigate to page
   */
  setActive(name: string): void {
    const found = this.find(name)

    if (found === this.active) {
      return
    }

    router.push({ name })
  }

  /**
   * Route components will re-render by tracking timestamp
   */
  reload(name: string): void {
    const tab = this.find(name)
    tab.timestamp = Date.now()
  }

  /**
   * Close tab and active the prev one
   */
  close(name: string): void {
    const remove = this.find(name)
    const index = this.tabs.indexOf(remove)
    this.tabs.splice(index, 1)

    const next = Math.max(index - 1, 0)

    if (this.tabs[next]) {
      this.setActive(this.tabs[next].name)
    }
  }


  private add(name: string): TabItem {
    const tab = {
      name,
      title: this.findRouteConfig(name).meta?.title,
      timestamp: Date.now()
    }
    this.tabs.push(tab)
    return tab
  }


  private find(name: string): TabItem {
    const found =  this.tabs.find(tab => tab.name === name)
    if (!found) {
      throw new Error(`tab ${name} on found`)
    }
    return found
  }

  private has(name: string): boolean {
    return !!this.tabs.find(tab => tab.name === name)
  }

  private findRouteConfig(name: string): RouteConfig {
    const found = findRoute(this.routes, route => route.name === name)
    if (!found) {
      throw new Error(`route config ${name} on found`)
    }
    return found
  }
}

export const tabService = Vue.observable(new TabService(routes))
