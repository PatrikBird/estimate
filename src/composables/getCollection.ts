import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import type { DocumentData } from 'firebase/firestore'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '~/firebase/config'

const getCollection = (c: string) => {
  const documents: Ref<DocumentData[]> = ref([])

  // collection reference
  const colRef = collection(db, c)

  const unsub = onSnapshot(colRef, snapshot => {
    const results: DocumentData[] = []
    snapshot.docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })

    // update values
    documents.value = results
  })

  watchEffect(onInvalidate => {
    onInvalidate(() => unsub())
  })

  return { documents }
}

export default getCollection
