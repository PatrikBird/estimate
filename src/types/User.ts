import type { DocumentData } from "firebase/firestore"

interface User {
  id: string
  username: string
  vote: number
  isObserver: boolean
}

function mapDocumentToUser(arr: DocumentData[]): User[] {
  return arr.map(doc => {
    return {
      id: doc.id,
      username: doc.username,
      vote: doc.vote,
      isObserver: doc.isObserver,
    }
  })
}

export { User, mapDocumentToUser }
