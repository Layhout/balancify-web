import {
  AddPrefixToKeys,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  setDoc,
  updateDoc,
  WithFieldValue,
} from 'firebase/firestore'
import { fdb } from './firebase'
import { IS_DEV_ENV } from './constants'

const buildCollectionPath = (collectionName: string) => `${IS_DEV_ENV ? 'test/dev/' : ''}${collectionName}`

const setData = async (collectionName: string, id: string, data: WithFieldValue<DocumentData>): Promise<void> => {
  try {
    const docRef = doc(fdb, buildCollectionPath(collectionName), id)
    await setDoc(docRef, data, { merge: true })
  } catch (error) {
    console.error(error)
  }
}

const updateData = async (
  collectionName: string,
  id: string,
  data: { [x: string]: any } & AddPrefixToKeys<string, any>,
): Promise<void> => {
  try {
    const docRef = doc(fdb, buildCollectionPath(collectionName), id)
    await updateDoc(docRef, data)
  } catch (error) {
    console.error(error)
  }
}

const getData = async <T>(collectionName: string, id: string): Promise<T | null> => {
  try {
    const docRef = doc(fdb, buildCollectionPath(collectionName), id)
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

const getQueryData = async <T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
): Promise<(T & { id: string })[]> => {
  try {
    const colRef = collection(fdb, buildCollectionPath(collectionName))
    const q = query(colRef, ...constraints)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}

const firestore = {
  setData,
  getData,
  getQueryData,
  updateData,
}

export { firestore }
