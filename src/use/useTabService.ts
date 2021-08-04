import { tabService } from '../services/TabService'

export const useTabService = () => {

  function reload(name: string) {
    tabService.reload(name)
  }

  return {
    reload
  }
}