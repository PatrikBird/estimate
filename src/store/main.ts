import { acceptHMRUpdate, defineStore } from 'pinia'
import { addDoc, collection , deleteDoc, doc } from 'firebase/firestore'
import { useStorage } from '@vueuse/core'
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
   * Adds the user to the database
   *
   * @param username - name of the user
   * @param isObserver - determines if user can vote or not
   */
  async function addUserToDb(username: string, isObserver: boolean) {
    const colRef = collection(db, 'users')
    await addDoc(colRef, {
      username,
      isObserver,
      hasVoted: false,
    })
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
  return { setUserName, userName, addUserToDb, deleteUserFromDb }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
