import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMainStore = defineStore('main', () => {
  /**
   * Current name of the user.
   */
  const userName = useStorage('username', 'noName')
  /**
   * Changes the current name of the user
   *
   * @param name - new name to set
   */
  function setUserName(name: string) {
    userName.value = name
  }
  return { setUserName, userName }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
