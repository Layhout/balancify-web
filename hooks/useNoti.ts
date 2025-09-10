'use client'

import { firebaseMessagingUrl } from '@/lib/firebase'
import { getMessaging, getToken } from 'firebase/messaging'
import { useEffect } from 'react'

export function useNoti() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('navigator' in window)) return

    const initNoti = async () => {
      try {
        const permission = await Notification.requestPermission()

        if (permission !== 'granted') {
          return
        }

        const registration = await navigator.serviceWorker.register(firebaseMessagingUrl())

        if (!registration) {
          return
        }

        const messaging = getMessaging()

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        })

        if (!token) {
          return
        }

        console.log(token)
      } catch (error) {
        console.error('Error Requesting Notification Permission:', error)
        return
      }
    }

    initNoti()
  }, [])
}
