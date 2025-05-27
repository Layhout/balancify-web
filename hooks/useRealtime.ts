import { rdb } from '@/lib/firebase'
import { child, DataSnapshot, get, onValue, ref } from 'firebase/database'
import { useCallback, useEffect, useState } from 'react'

type UseRealtimeProps = {
  path: string
  readOnce?: boolean
}

const useRealtime = <T>({ path, readOnce = false }: UseRealtimeProps): T | null => {
  const [data, setData] = useState<T | null>(null)

  const handleSnapshot = useCallback((snapshot: DataSnapshot) => {
    if (snapshot.exists()) {
      setData(snapshot.val())
    }
  }, [])

  useEffect(() => {
    let unSubscribe: (() => void) | undefined

    const dbRef = child(ref(rdb), path)

    if (readOnce) {
      get(dbRef).then(handleSnapshot).catch(console.error)
    } else {
      unSubscribe = onValue(dbRef, handleSnapshot, console.error)
    }

    return () => unSubscribe?.()
  }, [handleSnapshot, path, readOnce])

  return data
}

export default useRealtime
