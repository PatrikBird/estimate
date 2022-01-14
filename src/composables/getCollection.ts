import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import type { DocumentData } from 'firebase/firestore'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '~/firebase/config'
import type { User } from '~/types/User'

const getCollection = (c: string) => {
  const documents: Ref<User[]> = ref([])

  // collection reference
  const colRef = collection(db, c)

  const unsub = onSnapshot(colRef, snapshot => {
    const results: DocumentData[] = []
    snapshot.docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })

    const users: User[] = results.map(doc => {
      return {
        id: doc.id,
        username: doc.username,
        hasVoted: doc.hasVoted,
        isObserver: doc.isObserver,
      }
    })

    // update values
    documents.value = users
  })

  watchEffect(onInvalidate => {
    onInvalidate(() => unsub())
  })

  return { documents }
}

export default getCollection
