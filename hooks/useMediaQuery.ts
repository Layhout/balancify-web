import { isDesktopAtom } from '@/repositories/layout'
import { useSetAtom } from 'jotai'
import { useLayoutEffect } from 'react'

export const useMediaQuery = () => {
  const setIsDesktopAtom = useSetAtom(isDesktopAtom)

  useLayoutEffect(() => {
    const controller = new AbortController()

    const desktopMedia = window.matchMedia('(min-width: 768px)')

    function handleChange() {
      setIsDesktopAtom(desktopMedia.matches)
    }

    handleChange()

    desktopMedia.addEventListener('change', handleChange, { signal: controller.signal })
    return () => controller.abort()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
