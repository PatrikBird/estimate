import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  /**
   * Current name of the user.
   */
  const savedName = ref('')

  return {
    savedName,
  }
})
