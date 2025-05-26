import { FirebaseWhereFilterOp } from '@/lib/constants'
import { fdb } from '@/lib/firebase'
import { collection, getDocs, limit, onSnapshot, query, QuerySnapshot, where } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

type useFirestoreProps = {
  collectionName: string
  readOnce?: boolean
  wheres?: { fieldPath: string; op: FirebaseWhereFilterOp; value: unknown }[]
  limitDoc?: number
}

const useFirestore = <T>({
  collectionName,
  readOnce = false,
  wheres = [],
  limitDoc = 1,
}: useFirestoreProps): T[] | null => {
  const [data, setData] = useState<T[] | null>(null)

  const handleSnapshot = useCallback((qSnap: QuerySnapshot) => {
    if (qSnap.empty) {
      setData(null)
      return
    }

    setData(qSnap.docs.map((doc) => doc.data() as T))
  }, [])

  useEffect(() => {
    let unSubscribe: (() => void) | undefined

    const q = query(
      collection(fdb, collectionName),
      ...wheres.map(({ fieldPath, op, value }) => where(fieldPath, op, value)),
      limit(limitDoc),
    )

    if (readOnce) {
      getDocs(q).then(handleSnapshot).catch(console.error)
    } else {
      unSubscribe = onSnapshot(q, handleSnapshot, console.error)
    }

    return () => unSubscribe?.()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, limitDoc, readOnce, JSON.stringify(wheres)])

  return data
}

export default useFirestore
