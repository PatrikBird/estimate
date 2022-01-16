import { acceptHMRUpdate, defineStore } from 'pinia'
import type { DocumentData } from 'firebase/firestore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import type { Ref } from 'vue'
import { db } from '~/firebase/config'
import type { User } from '~/types/User'
import { mapDocumentToUser } from '~/types/User'

export const useMainStore = defineStore('main', () => {
  /**
   * Current local user
   */
  const user: User = reactive({
    id: useLocalStorage('id', ''), // TODO: maybe use sessionStorage instead?
    username: '',
    vote: null,
    isObserver: false,
  })
  /**
   * Changes the current name of the user
   *
   * @param name - new name to set
   */
  function setUserName(name: string) {
    user.username = name
  }
  /**
   * Adds the user to the database and updates the local state
   *
   * @param username - name of the user to be added
   * @param isObserver - determines if user can vote or not
   */
  async function addUserToDb(username: string, isObserver: boolean) {
    const colRef = collection(db, 'users')
    const userRef = await addDoc(colRef, {
      username,
      vote: null,
      isObserver,
    })

    // update local user state
    user.id = userRef.id
    user.username = username
    user.isObserver = isObserver
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

    // update local state
    user.vote = vote
  }
  /**
   * Deletes the user from the database
   *
   * @param id - identifier of user to be deleted
   */
  function deleteUserFromDb(id: string) {
    const docRef = doc(db, 'users', id)
    deleteDoc(docRef)

    // clean up local state/storage
    if (id === user.id) {
      user.id = ''
    }
  }
  /**
   * Gets all users from the database collection
   *
   * @param collect - identifier of collection to be returned
   */
  function getAllUsers(collect: string) {
    const document: Ref<User[]> = ref([])

    // collection reference
    const colRef = collection(db, collect)

    const unsub = onSnapshot(colRef, snapshot => {
      const results: DocumentData[] = []

      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })

      // update values
      document.value = mapDocumentToUser(results)
    })

    watchEffect(onInvalidate => {
      onInvalidate(() => unsub())
    })

    return document
  }
  return {
    user,
    setUserName,
    addUserToDb,
    updateVote,
    deleteUserFromDb,
    getAllUsers,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
