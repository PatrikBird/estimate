import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CollectionReference, DocumentData } from 'firebase/firestore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

import type { Ref } from 'vue'
// import { useRoute } from 'vue-router'
import { db } from '~/firebase/config'
import type { Session, User } from '~/types'
import { mapDocumentToUser, mapDocumentToVoteState } from '~/types'

export const useMainStore = defineStore('main', () => {
  /**
   * Current local user
   * TODO: keep local state in sync with firebase
   */
  const user: User = reactive({
    id: useSessionStorage('id', ''),
    username: useSessionStorage('username', ''),
    vote: null,
    isObserver: false,
  })

  /**
   * Stores the current session
   * TODO: keep in sync with route
   */
  // const route = useRoute()
  const session: Session = reactive({
    collectionId: '',
    collRef: <CollectionReference<DocumentData>>{},
    docRef: <DocumentData>{}, // TODO: use me
    userRef: <DocumentData>{}, // TODO: use me
    // isRevealed: false,
  })

  /**
   * Creates a new session and updates the local state
   *
   * @param username - name of the user to be added
   * @param isObserver - determines if user can vote or not
   */
  async function createNewSession(username: string, isObserver: boolean) {
    session.collectionId = Date.now().toString() // TODO: refactor simpleID
    session.collRef = collection(db, session.collectionId)

    await addUserToDb(username, isObserver)
    await setDoc(doc(db, session.collectionId, 'voteState'), {
      isRevealed: false,
    })
  }

  /**
   * Adds the user to the collection and updates the local state
   *
   * @param username - name of the user to be added
   * @param isObserver - determines if user can vote or not
   */
  async function addUserToDb(username: string, isObserver: boolean) {
    const userRef = await addDoc(session.collRef, {
      // TODO: add userRef to session?
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
    const docRef = doc(db, session.collectionId, id) // TODO: add docRef to session
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
    const docRef = doc(db, session.collectionId, user.id) // TODO: add docRef to session
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
    const docRef = doc(db, session.collectionId, 'voteState') // TODO: add docRef to session
    updateDoc(docRef, {
      isRevealed: true,
    })
  }
  /**
   * Resets the votes of all voters
   *
   */
  async function resetVotes() {
    const docRef = doc(db, session.collectionId, 'voteState') // TODO: add docRef to session
    updateDoc(docRef, {
      isRevealed: false,
    })

    const querySnapshot = await getDocs(collection(db, session.collectionId))
    querySnapshot.forEach(userDoc => {
      if (userDoc.id === 'voteState') return
      const docRef = doc(db, session.collectionId, userDoc.id)
      updateDoc(docRef, { vote: null })
    })
  }

  /**
   * Get vote state from collection
   * Returns true if votes have been revealed
   */
  function getVoteState(): Ref<boolean> {
    const isVoteRevealed = ref(false)

    const docRef = doc(db, session.collectionId, 'voteState')
    const unsub = onSnapshot(docRef, snapshot => {
      const result: DocumentData | undefined = snapshot.data()
      if (result === undefined) {
        console.error('data() is undefined - Could not fetch voteState')
        return
      }
      // update value
      isVoteRevealed.value = mapDocumentToVoteState(result).isRevealed
      // isVoteRevealed.value = mapDocumentToVoteState(result)
    })

    watchEffect(onInvalidate => {
      onInvalidate(() => unsub())
    })

    return isVoteRevealed
  }
  /**
   * Deletes the user from the database
   *
   * @param id - identifier of user to be deleted
   */
  function deleteUserFromDb(id: string) {
    const docRef = doc(db, session.collectionId, id)
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

    const unsub = onSnapshot(session.collRef, snapshot => {
      const results: DocumentData[] = []

      snapshot.docs.forEach(doc => {
        if (doc.id !== 'voteState') {
          results.push({ ...doc.data(), id: doc.id })
        }
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
    session,
    addUserToDb,
    updateVote,
    deleteUserFromDb,
    getAllUsers,
    toggleObserver,
    revealVotes,
    resetVotes,
    getVoteState,
    createNewSession,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
