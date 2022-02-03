import { acceptHMRUpdate, defineStore } from 'pinia'
import { CollectionReference, DocumentData, setDoc } from 'firebase/firestore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'

import type { Ref } from 'vue'
import { db } from '~/firebase/config'
import type { User, VoteState } from '~/types'
import { mapDocumentToUser, mapDocumentToVoteState } from '~/types'

export const useMainStore = defineStore('main', () => {
  /**
   * Current local user TODO: keep local state in sync with firebase
   */
  const user: User = reactive({
    id: useSessionStorage('id', ''),
    username: useSessionStorage('username', ''),
    vote: null,
    isObserver: false,
  })
  /**
   * test
   */
  const collectionId: Ref<string> = ref('')

  /**
   * Creates a new session and updates the local state
   *
   * @param username - name of the user to be added
   * @param isObserver - determines if user can vote or not
   */
  async function createNewSession(username: string, isObserver: boolean) {
    const simpleID = Date.now().toString() // FIXME: error prone approach, used for simplicity
    const colRef = collection(db, simpleID)

    const userRef = await addDoc(colRef, {
      username,
      vote: null,
      isObserver,
    })

    await setDoc(doc(db, colRef.id, 'voteState'), {
      isRevealed: false,
    })

    collectionId.value = colRef.id
    // update local user state
    user.id = userRef.id
    user.username = username
    user.isObserver = isObserver
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
  function updateVote(id: string, vote: string) {
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
   * Reveals the votes of all voters
   *
   */
  function revealVotes() {
    const docRef = doc(db, 'state', 'voting')
    updateDoc(docRef, {
      revealed: true,
    })
  }
  /**
   * Resets the votes of all voters
   *
   */
  async function resetVotes() {
    const docRef = doc(db, 'state', 'voting')
    updateDoc(docRef, {
      revealed: false,
    })

    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach(userDoc => {
      const docRef = doc(db, 'users', userDoc.id)
      updateDoc(docRef, { vote: null })
    })
  }
  /**
   * Get voting state from database
   *
   */
  function getVoteState(): Ref<boolean> {
    const voteState: VoteState = reactive({ isRevealed: false })

    const docRef = doc(db, 'state', 'voteState')
    const unsub = onSnapshot(docRef, snapshot => {
      const result: DocumentData | undefined = snapshot.data()
      if (result === undefined) {
        console.error('data() is undefined!')
        return
      }
      // update value
      voteState.isRevealed = mapDocumentToVoteState(result).isRevealed
    })

    watchEffect(onInvalidate => {
      onInvalidate(() => unsub())
    })

    return toRef(voteState, 'isRevealed')
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
   */
  function getAllUsers() {
    const documents: Ref<User[]> = ref([])

    // collection reference
    const colRef = collection(db, 'users')

    const unsub = onSnapshot(colRef, snapshot => {
      const results: DocumentData[] = []

      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })

      // update values
      documents.value = mapDocumentToUser(results)
    })

    watchEffect(onInvalidate => {
      onInvalidate(() => unsub())
    })

    watch(
      documents,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      val => {},
      { deep: true }
    )
    return documents
  }
  return {
    user,
    createNewSession,
    addUserToDb,
    updateVote,
    deleteUserFromDb,
    getAllUsers,
    toggleObserver,
    revealVotes,
    resetVotes,
    getVoteState,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
