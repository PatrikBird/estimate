import { acceptHMRUpdate, defineStore } from 'pinia'
import type { DocumentData } from 'firebase/firestore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '~/firebase/config'
import type { User } from '~/types'
import { mapDocumentToUser, mapDocumentToVoteState } from '~/types'
import { router } from '~/router'

export const useMainStore = defineStore('main', () => {
  /**
   * Current local user
   */
  const user: User = reactive({
    id: useLocalStorage('id', ''),
    username: useLocalStorage('username', ''),
    vote: useLocalStorage('vote', null),
    isObserver: useLocalStorage('isObserver', Boolean),
  })

  console.log('greetings from the store!')
  console.log(`current user has the id in localStore: ${user.id}`)

  const route = useRoute()
  const collectionId = ref(route.params.collectionId as string)

  const userDocRef = ref()
  const voteDocRef = ref()

  const isUserDa = computed(async () => {
    const docSnap = await getDoc(doc(db, collectionId.value, user.id))
    return docSnap.exists()
  })

  const collectionRef = ref()
  const userId = toRef(user, 'id')
  if (collectionId.value) {
    console.log(`collectionId is set: ${collectionId.value}`)
    watch(
      collectionId,
      async (newCollectionId) => {
        if (newCollectionId) {
          console.log(`collectionId changed: ${newCollectionId}`)
          collectionRef.value = collection(db, newCollectionId)
        }
      },
      { immediate: true },
    )
    watch(
      userId,
      async (newUserId) => {
        console.log(`user.id changed: ${newUserId}`)
        if (newUserId) {
          userDocRef.value = doc(db, collectionId.value, newUserId)
          voteDocRef.value = doc(db, collectionId.value, 'voteState')
        }
      },
      { immediate: true },
    )
  }

  /**
   * Creates a new session
   *
   */
  async function createNewSession() {
    collectionId.value = Date.now().toString()
    collectionRef.value = collection(db, collectionId.value)

    await setDoc(doc(db, collectionId.value, 'voteState'), {
      isRevealed: false,
    })
    voteDocRef.value = doc(db, collectionId.value, 'voteState')

    await addUserToDb()
    userDocRef.value = doc(db, collectionId.value, user.id)
  }

  /**
   * Adds the user to the collection
   *
   */
  async function addUserToDb() {
    console.log('addUserToDb')
    const userRef = await addDoc(collectionRef.value, {
      username: user.username,
      vote: null,
      isObserver: user.isObserver,
    })
    user.id = userRef.id
  }

  /**
   * Updates the vote to the database document
   *
   */
  function updateVote() {
    updateDoc(userDocRef.value, {
      vote: user.vote,
    })
  }

  /**
   * Toggle user to observer/voter
   *
   */
  function toggleObserver() {
    user.isObserver = !user.isObserver
    updateDoc(userDocRef.value, {
      isObserver: user.isObserver,
      vote: null,
    })
  }

  /**
   * Reveals the votes of all voters
   *
   */
  function revealVotes() {
    updateDoc(voteDocRef.value, {
      isRevealed: true,
      lastVoteRevealedOn: serverTimestamp(),
    })
  }

  /**
   * Resets the votes of all voters
   * TODO: reset visuals if function was executed!
   */
  async function resetVotes() {
    updateDoc(voteDocRef.value, {
      isRevealed: false,
      lastVoteResetOn: serverTimestamp(),
    })

    const querySnapshot = await getDocs(collection(db, collectionId.value))
    querySnapshot.forEach((userDoc) => {
      if (userDoc.id === 'voteState')
        return

      const docRef = doc(db, collectionId.value, userDoc.id)
      updateDoc(docRef, { vote: null })
    })
  }

  /**
   * Deletes all users from the session
   */
  async function deleteAllUsersFromSession() {
    updateDoc(voteDocRef.value, {
      isRevealed: false,
    })

    const querySnapshot = await getDocs(collection(db, collectionId.value))
    querySnapshot.forEach((userDoc) => {
      if (userDoc.id === 'voteState')
        return

      const docRef = doc(db, collectionId.value, userDoc.id)
      deleteDoc(docRef)
    })
  }

  /**
   * Get vote state from collection
   * Returns true if votes have been revealed
   */
  function getVoteState(): Ref<boolean> {
    const isVoteRevealed = ref(false)

    const docRef = doc(db, collectionId.value, 'voteState')
    const unsub = onSnapshot(docRef, (snapshot) => {
      const result: DocumentData | undefined = snapshot.data()
      if (result === undefined) {
        // TODO: forward to home and show error
        console.error('Session not found! Wrong link?')
        router.push('/')
        return
      }
      // update value
      isVoteRevealed.value = mapDocumentToVoteState(result).isRevealed
    })

    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub())
    })

    return isVoteRevealed
  }

  /**
   * Deletes the user from the database
   *
   */
  function deleteUserFromDb() {
    const docRef = doc(db, collectionId.value, user.id)
    deleteDoc(docRef)
  }

  /**
   * Gets all users from the database collection
   *
   */
  function getAllUsers() {
    const documents: Ref<User[]> = ref([])

    const unsub = onSnapshot(
      collection(db, route.params.collectionId as string),
      (snapshot: { docs: any[] }) => {
        const results: DocumentData[] = []

        snapshot.docs.forEach((doc) => {
          if (doc.id !== 'voteState')
            results.push({ ...doc.data(), id: doc.id })
        })

        // update values
        documents.value = mapDocumentToUser(results)
        user.id = documents.value.find(doc => doc.username === user.username)?.id || ''
      },
    )

    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub())
    })

    watch(documents, () => {}, { deep: true })
    return documents
  }

  return {
    isUserDa,
    collectionId,
    collectionRef,
    user,
    addUserToDb,
    updateVote,
    deleteUserFromDb,
    getAllUsers,
    toggleObserver,
    revealVotes,
    resetVotes,
    getVoteState,
    createNewSession,
    deleteAllUsersFromSession,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
