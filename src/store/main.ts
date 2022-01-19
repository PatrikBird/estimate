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
    id: useSessionStorage('id', ''),
    username: useSessionStorage('username', ''),
    vote: null,
    isObserver: false,
  })
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
   * Toggle user to observer/voter
   *
   * @param id - identifier of user to be updated
   */
  function toggleObserver() {
    const docRef = doc(db, 'users', user.id)
    const isObserver = !user.isObserver
    updateDoc(docRef, {
      isObserver,
      vote: null,
    })

    // update local state
    user.isObserver = isObserver
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
   * Gets all obervers from the database collection
   *
   */
  function getAllObervers() {
    const document: Ref<User[]> = ref([])

    // collection reference
    const colRef = collection(db, 'users')

    const unsub = onSnapshot(colRef, snapshot => {
      let results: DocumentData[] = []

      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
        results = results.filter(u => u.isObserver === true)
      })

      // update values
      document.value = mapDocumentToUser(results)
    })

    watchEffect(onInvalidate => {
      onInvalidate(() => unsub())
    })

    return document
  }
  /**
   * Gets all voters from the database collection
   *
   */
  function getAllVoters() {
    const document: Ref<User[]> = ref([])

    // collection reference
    const colRef = collection(db, 'users')

    const unsub = onSnapshot(colRef, snapshot => {
      let results: DocumentData[] = []

      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
        results = results.filter(u => u.isObserver === false)
      })

      // update values
      document.value = mapDocumentToUser(results)
    })

    watchEffect(onInvalidate => {
      onInvalidate(() => unsub())
    })

    return document
  }
  /**
   * Gets all users from the database collection
   *
   * TODO: find out why I can't access the return parameters value of the function.
   *  this issue causes code duplication in the store: getAllObervers, getAllUsers.
   */
  function getAllUsers() {
    const document: Ref<User[]> = ref([])

    // collection reference
    const colRef = collection(db, 'users')

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
    addUserToDb,
    updateVote,
    deleteUserFromDb,
    getAllUsers,
    getAllObervers,
    getAllVoters,
    toggleObserver,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
