import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import type { DocumentData } from 'firebase/firestore'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '~/firebase/config'
import type { User } from '~/types/User'

function mapArray(arr: DocumentData[]): User[] {
  return arr.map(doc => {
    return {
      id: doc.id,
      username: doc.username,
      hasVoted: doc.hasVoted,
      isObserver: doc.isObserver,
    }
  })
}

const getCollection = (c: string) => {
  const document: Ref<User[]> = ref([])

  // collection reference
  const colRef = collection(db, c)

  const unsub = onSnapshot(colRef, snapshot => {
    const results: DocumentData[] = []

    snapshot.docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })

    // update values
    document.value = mapArray(results)
  })

  watchEffect(onInvalidate => {
    onInvalidate(() => unsub())
  })

  return { document }
}

export default getCollection
