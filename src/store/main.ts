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
import { useRoute } from 'vue-router'
import { db } from '~/firebase/config'
import type { Session, User } from '~/types'
import { mapDocumentToUser, mapDocumentToVoteState } from '~/types'

export const useMainStore = defineStore('main', () => {
  /**
   * Current local user
   * TODO: keep local state in sync with firebase
   */
  const user: User = reactive({
    id: useLocalStorage('id', ''),
    username: useLocalStorage('username', ''),
    vote: null,
    isObserver: false,
  })

  /**
   * Stores the current session
   * TODO: keep in sync with route
   */
  const route = ref(useRoute())

  const session: Session = reactive({
    collectionId: route.value.path.substring(1) || '',
    collRef: <CollectionReference<DocumentData>>{}, // FIXME: point always to collection(db, session.collectionId)
    // docRef: <DocumentData>{},
    userRef: <DocumentData>{}, // FIXME: same here, see addUserToDb()
  })

  // watch(
  //   session,
  //   val => {
  //     console.log(val)
  //   },
  //   { deep: true }
  // )

  // console.log(session.collectionId)

  /**
   * Creates a new session
   *
   */
  async function createNewSession() {
    session.collectionId = Date.now().toString()
    session.collRef = collection(db, session.collectionId)

    await addUserToDb()
    await setDoc(doc(db, session.collectionId, 'voteState'), {
      isRevealed: false,
    })
  }

  /**
   * Adds the user to the collection
   *
   */
  async function addUserToDb() {
    session.userRef = await addDoc(session.collRef, {
      username: user.username,
      vote: null,
      isObserver: user.isObserver,
    })
  }

  /**
   * Updates the vote to the database document
   *
   */
  function updateVote() {
    const docRef = doc(db, session.collectionId, user.id) // TODO: add docRef to session
    updateDoc(docRef, {
      vote: user.vote,
    })
  }
  /**
   * Toggle user to observer/voter
   *
   */
  function toggleObserver() {
    const docRef = doc(db, session.collectionId, user.id) // TODO: add docRef to session
    user.isObserver = !user.isObserver
    updateDoc(docRef, {
      isObserver: user.isObserver,
      vote: null,
    })
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
   */
  function deleteUserFromDb() {
    const docRef = doc(db, session.collectionId, user.id)
    deleteDoc(docRef)
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
      user.id = documents.value.find(doc => doc.username === user.username)?.id || ''
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
