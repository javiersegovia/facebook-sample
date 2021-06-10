import firebase from 'firebase/app'
import 'firebase/auth'

/** TODO: Replace this data with ENV */

export const config = {
  apiKey: 'AIzaSyDnd643NKHqaLu_XgsQU4qwmzmAbdOr1UE',
  authDomain: 'facebook-sample-ts.firebaseapp.com',
  projectId: 'facebook-sample-ts',
  storageBucket: 'facebook-sample-ts.appspot.com',
  messagingSenderId: '725650121650',
  appId: '1:725650121650:web:c1e668554cad21c5123aab',
}

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(config)
  } catch (err) {
    console.error('Firebase initialization error', err.stack)
  }
}

export { firebase }
