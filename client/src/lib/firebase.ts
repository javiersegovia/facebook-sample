import firebase from 'firebase/app'
import 'firebase/auth'

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
}

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(config)
  } catch (err) {
    console.error('Firebase initialization error', err.stack)
  }
}

export { firebase }
