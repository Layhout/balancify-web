import { NextResponse } from 'next/server'
import admin from 'firebase-admin'
import { MulticastMessage } from 'firebase-admin/messaging'

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL

  if (!projectId || !privateKey || !clientEmail) {
    throw new Error('Missing Firebase Admin credentials')
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      privateKey,
      clientEmail,
    }),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body) throw new Error('Request body is required')

    const payload: MulticastMessage = {
      notification: {
        title: body.notiTitle,
        body: body.notiBody,
      },
      data: body.notiUrl ? { url: body.notiUrl } : undefined,
      tokens: body.notiTokens,
    }

    await admin.messaging().sendEachForMulticast(payload)
    return NextResponse.json({ message: 'Notification sent successfully.' })
  } catch (error: any) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: error.message, details: error }, // Log full error details
      { status: 500 },
    )
  }
}
