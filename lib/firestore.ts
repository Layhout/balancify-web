import {
  AddPrefixToKeys,
  collection,
  doc,
  DocumentData,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  setDoc,
  updateDoc,
  WithFieldValue,
  writeBatch,
} from 'firebase/firestore'
import { fdb } from './firebase'
import { IS_DEV_ENV } from './constants'

const buildCollectionPath = (collectionName: string) => `${IS_DEV_ENV ? 'test/dev/' : ''}${collectionName}`

const setData = async (collectionName: string, id: string, data: WithFieldValue<DocumentData>): Promise<void> => {
  try {
    const docRef = doc(fdb, buildCollectionPath(collectionName), id)
    await setDoc(docRef, data, { merge: true })
  } catch (error) {
    console.error('firestore: setData', error)
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
    console.error('firestore: updateData', error)
  }
}

const getData = async <T>(collectionName: string, id: string): Promise<T | null> => {
  try {
    const docRef = doc(fdb, buildCollectionPath(collectionName), id)
    const docSnap = await getDoc(docRef)

    return docSnap.data() as T
  } catch (error) {
    console.error('firestore: getData', error)
    return null
  }
}

const getQueryData = async <T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> => {
  try {
    const colRef = collection(fdb, buildCollectionPath(collectionName))
    const q = query(colRef, ...constraints)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => doc.data() as T)
  } catch (error) {
    console.error('firestore: getQueryData', error)
    return []
  }
}

const getTotalCount = async (collectionName: string, constraints: QueryConstraint[] = []): Promise<number> => {
  try {
    const colRef = collection(fdb, buildCollectionPath(collectionName))
    const q = query(colRef, ...constraints)
    const countSnapshot = await getCountFromServer(q)

    return countSnapshot.data().count
  } catch (error) {
    console.error('firestore: getTotalCount', error)
    return 0
  }
}

const updateMultipleData = async (
  datas: { collectionName: string; id: string; data: { [x: string]: any } & AddPrefixToKeys<string, any> }[],
) => {
  if (!datas.length) return

  try {
    const batch = writeBatch(fdb)

    datas.forEach(({ collectionName, id, data }) => {
      const docRef = doc(fdb, buildCollectionPath(collectionName), id)
      batch.update(docRef, data)
    })

    await batch.commit()
  } catch (error) {
    console.error('firestore: updateMultipleData', error)
    return
  }
}

const setMultipleData = async (datas: { collectionName: string; id: string; data: WithFieldValue<DocumentData> }[]) => {
  if (!datas.length) return

  try {
    const batch = writeBatch(fdb)

    datas.forEach(({ collectionName, id, data }) => {
      const docRef = doc(fdb, buildCollectionPath(collectionName), id)
      batch.set(docRef, data, { merge: true })
    })

    await batch.commit()
  } catch (error) {
    console.error('firestore: updateMultipleData', error)
    return
  }
}

const firestore = {
  setData,
  getData,
  getQueryData,
  updateData,
  getTotalCount,
  updateMultipleData,
  setMultipleData,
}

export { firestore }
