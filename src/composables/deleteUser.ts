import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '~/firebase/config'

export function handleDelete(id: string) {
  const docRef = doc(db, 'users', id)
  deleteDoc(docRef)
}
