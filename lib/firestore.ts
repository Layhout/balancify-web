import {
  AddPrefixToKeys,
  collection,
  deleteDoc,
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
// import { IS_DEV_ENV } from './constants'

const buildCollectionPath = (collectionName: string) =>
  collectionName /* `${IS_DEV_ENV ? 'test/dev/' : ''}${collectionName}` */

export const setData = async (
  collectionName: string,
  id: string,
  data: WithFieldValue<DocumentData>,
): Promise<void> => {
  const docRef = doc(fdb, buildCollectionPath(collectionName), id)
  await setDoc(docRef, data, { merge: true })
}

export const deleteData = async (collectionName: string, id: string): Promise<void> => {
  const docRef = doc(fdb, buildCollectionPath(collectionName), id)
  await deleteDoc(docRef)
}

export const updateData = async (
  collectionName: string,
  id: string,
  data: { [x: string]: any } & AddPrefixToKeys<string, any>,
): Promise<void> => {
  const docRef = doc(fdb, buildCollectionPath(collectionName), id)
  await updateDoc(docRef, data)
}

export const getData = async <T>(collectionName: string, id: string): Promise<T | null> => {
  const docRef = doc(fdb, buildCollectionPath(collectionName), id)
  const docSnap = await getDoc(docRef)

  return (docSnap.data() as T) || null
}

export const getQueryData = async <T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> => {
  const colRef = collection(fdb, buildCollectionPath(collectionName))
  const q = query(colRef, ...constraints)
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => doc.data() as T) || []
}

export const getTotalCount = async (collectionName: string, constraints: QueryConstraint[] = []): Promise<number> => {
  const colRef = collection(fdb, buildCollectionPath(collectionName))
  const q = query(colRef, ...constraints)
  const countSnapshot = await getCountFromServer(q)

  return countSnapshot.data().count || 0
}

export const updateMultipleData = async (
  datas: { collectionName: string; id: string; data: { [x: string]: any } & AddPrefixToKeys<string, any> }[],
) => {
  if (!datas.length) return

  const batch = writeBatch(fdb)

  datas.forEach(({ collectionName, id, data }) => {
    const docRef = doc(fdb, buildCollectionPath(collectionName), id)
    batch.update(docRef, data)
  })

  await batch.commit()
}

export const setMultipleData = async (
  datas: { collectionName: string; id: string; data: WithFieldValue<DocumentData> }[],
) => {
  if (!datas.length) return

  const batch = writeBatch(fdb)

  datas.forEach(({ collectionName, id, data }) => {
    const docRef = doc(fdb, buildCollectionPath(collectionName), id)
    batch.set(docRef, data, { merge: true })
  })

  await batch.commit()
}
