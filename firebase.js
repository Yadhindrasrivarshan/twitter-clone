import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCmf-UM1XsdUha2Pd6462uSyB3n8xFJjbc',
  authDomain: 'twitter-clone-9fd67.firebaseapp.com',
  projectId: 'twitter-clone-9fd67',
  storageBucket: 'twitter-clone-9fd67.appspot.com',
  messagingSenderId: '154561066329',
  appId: '1:154561066329:web:85d5ee30772ca201798848',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export default app
export { db, storage }
