import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '~/firebase/config'

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
  /**
   * Deletes the user from the database
   *
   * @param id - users' identifier to be deleted
   */
  function deleteUserFromDb(id: string) {
    const docRef = doc(db, 'users', id)
    deleteDoc(docRef)
  }
  return { setUserName, userName, deleteUserFromDb }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
