import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY! as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN! as string,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABSE_URL! as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID! as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET! as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID! as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID! as string,
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()

export { db }
