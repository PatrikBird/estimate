import type { DocumentData } from 'firebase/firestore'

interface User {
  id: string
  username: string
  vote: number | null
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

interface VoteState {
  revealed: boolean
}

function mapDocumentToVoteState(obj: DocumentData): VoteState {
  return { revealed: obj.revealed as boolean }
}

export { User, mapDocumentToUser, mapDocumentToVoteState, VoteState }
