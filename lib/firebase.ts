import { initializeApp, FirebaseOptions, getApps, getApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
}

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const rdb = getDatabase(app)
export const fdb = getFirestore(app)
export const auth = getAuth(app)

async function getMessagingApp(): Promise<ReturnType<typeof getMessaging> | null> {
  const supported = await isSupported()

  return supported ? getMessaging(app) : null
}

function firebaseMessagingUrl() {
  let url = '/firebase-messaging-sw.js' // or any other file name you want

  // Append the params
  Object.entries(firebaseConfig).forEach(([key, value], index) => {
    url += `${index === 0 ? '?' : '&'}${key}=${value}`
  })
  return url
}

export async function getFcmToken(): Promise<string | null> {
  try {
    const messagingApp = await getMessagingApp()

    if (!messagingApp) return null

    const registration = await navigator.serviceWorker.register(firebaseMessagingUrl())

    if (!registration) {
      return null
    }

    const token = await getToken(messagingApp, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    })

    return token
  } catch (e) {
    console.error(e)
    return null
  }
}
