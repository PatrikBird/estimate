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
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '~/firebase/config'
import type { User } from '~/types'
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

  const route = useRoute()

  const collectionId = ref(route.params.collectionId as string)

  const userRef = ref()

  const userDocRef = ref()
  const voteDocRef = ref()

  // function retrieveUser() {
  //   if (!user.id) {
  //     console.log('no user in local store!')
  //     console.log('show overlay to addUserToDb()')
  //   } else {
  //     console.log('user in local store found, but is it also in db?')
  //     console.log('check isUserInDB() - true: update local store; false: addUserToDb()')
  //   }
  // }

  async function isUserInDB() {
    // console.log(collectionId.value)
    // console.log(user.id) // is empty on new browser session

    const docSnap = await getDoc(doc(db, collectionId.value, user.id))
    if (docSnap.exists()) {
      // console.log('user exists')
      userDocRef.value = doc(db, collectionId.value, user.id)
      voteDocRef.value = doc(db, collectionId.value, 'voteState') // TODO: dirty test
      return true
    } else {
      // console.log('user does not exist')
      return false
    }
  }

  const collectionRef = ref()
  if (collectionId.value) {
    collectionRef.value = collection(db, collectionId.value)
    // retrieveUser()
    isUserInDB()
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

    createWatcher()
  }

  function createWatcher() {
    watch(
      collectionId,
      async newCollectionId => {
        // console.log('watcher runs')
        collectionRef.value = collection(db, newCollectionId)
      },
      { immediate: true }
    )
  }
  /**
   * Adds the user to the collection
   *
   */
  async function addUserToDb() {
    userRef.value = await addDoc(collectionRef.value, {
      username: user.username,
      vote: null,
      isObserver: user.isObserver,
    })
    user.id = userRef.value.id
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
    })
  }
  /**
   * Resets the votes of all voters
   *
   */
  async function resetVotes() {
    updateDoc(voteDocRef.value, {
      isRevealed: false,
    })

    const querySnapshot = await getDocs(collection(db, collectionId.value))
    querySnapshot.forEach(userDoc => {
      if (userDoc.id === 'voteState') return
      const docRef = doc(db, collectionId.value, userDoc.id)
      updateDoc(docRef, { vote: null })
    })
  }

  /**
   * Get vote state from collection
   * Returns true if votes have been revealed
   */
  function getVoteState(): Ref<boolean> {
    const isVoteRevealed = ref(false)

    const docRef = doc(db, collectionId.value, 'voteState')
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

        snapshot.docs.forEach(doc => {
          if (doc.id !== 'voteState') {
            results.push({ ...doc.data(), id: doc.id })
          }
        })

        // update values
        documents.value = mapDocumentToUser(results)
        user.id = documents.value.find(doc => doc.username === user.username)?.id || ''
      }
    )

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
    isUserInDB,
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
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
