import { doc, DocumentData, getDoc, setDoc, WithFieldValue } from 'firebase/firestore'
import { fdb } from './firebase'
import { IS_DEV_ENV } from './constants'

const buildCollectionPath = (collection: string) => `${IS_DEV_ENV ? 'test/dev/' : ''}${collection}`

const setData = async (collection: string, id: string, data: WithFieldValue<DocumentData>): Promise<void> => {
  try {
    const docRef = doc(fdb, buildCollectionPath(collection), id)
    await setDoc(docRef, data, { merge: true })
  } catch (error) {
    console.error(error)
  }
}

const getData = async <T>(collection: string, id: string): Promise<T | null> => {
  try {
    const docRef = doc(fdb, buildCollectionPath(collection), id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as T
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

const firestore = {
  setData,
  getData,
}

export { firestore }
