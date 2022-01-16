import { acceptHMRUpdate, defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useStorage } from '@vueuse/core'
import { db } from '~/firebase/config'

export const useMainStore = defineStore('main', () => {
  /**
   * Current name of the user
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
   * @param username - name of the user to be added
   * @param isObserver - determines if user can vote or not
   */
  async function addUserToDb(username: string, isObserver: boolean) {
    const colRef = collection(db, 'users')
    await addDoc(colRef, {
      username,
      vote: null,
      isObserver,
    })
  }
  /**
   * Updates the vote to the database document
   *
   * @param id - identifier of user to be updated
   * @param vote - entered vote by user
   */
  function updateVote(id: string, vote: number) {
    const docRef = doc(db, 'users', id)
    updateDoc(docRef, {
      vote,
    })
  }
  /**
   * Deletes the user from the database
   *
   * @param id - identifier of user to be deleted
   */
  function deleteUserFromDb(id: string) {
    const docRef = doc(db, 'users', id)
    deleteDoc(docRef)
  }
  return { setUserName, userName, addUserToDb, updateVote, deleteUserFromDb }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
