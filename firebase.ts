import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxWfRazXw2N7fmlpqXR--0AlofjXR0Anc",
  authDomain: "chatgpt-messenger-kld.firebaseapp.com",
  projectId: "chatgpt-messenger-kld",
  storageBucket: "chatgpt-messenger-kld.appspot.com",
  messagingSenderId: "678121017562",
  appId: "1:678121017562:web:c75e08ce0abbe18ddbd5e3",
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
