import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()

export { db }
