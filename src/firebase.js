import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const {
  VUE_APP_FIREBASE_API_KEY,
  VUE_APP_FIREBASE_AUTH_DOMAIN,
  VUE_APP_FIREBASE_DATABASE_URL,
  VUE_APP_FIREBASE_STORAGE_BUCKET,
} = process.env

// firebase init
const firebaseConfig = {
  apiKey: VUE_APP_FIREBASE_API_KEY,
  authDomain: VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: VUE_APP_FIREBASE_DATABASE_URL,
  storageBucket: VUE_APP_FIREBASE_STORAGE_BUCKET,
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.database()
const auth = firebase.auth()

// collection references

export {
  db,
  auth,
}