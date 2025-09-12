import { useEffect, useRef } from 'react'
import { isShownPWAAtom } from '@/repositories/layout'
import { useAtom } from 'jotai'
import { isInstalledPWA, isIOS, isMobileBrowser } from '@/lib/utils'
import { useState } from 'react'

export function usePWA() {
  const [isShownPWA, setIsShownPWA] = useAtom(isShownPWAAtom)

  const [openInstallPrompt, setOpenInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [pwaEvent, setPwaEvent] = useState<any>(null)

  const isIOSRef = useRef<boolean>(false)
  const isMobileBrowserRef = useRef<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()

    window.addEventListener(
      'beforeinstallprompt',
      (e) => {
        e.preventDefault()
        setPwaEvent(e)

        if (isShownPWA) return

        setOpenInstallPrompt(true)
      },
      { signal: controller.signal },
    )

    isIOSRef.current = isIOS()
    isMobileBrowserRef.current = isMobileBrowser()

    setIsInstalled(isInstalledPWA())

    if (isIOSRef.current && !isShownPWA) {
      setOpenInstallPrompt(true)
    }

    return () => controller.abort()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShownPWA])

  const handleOpenChange = (open?: boolean) => {
    if (!isShownPWA) setIsShownPWA(true)
    setOpenInstallPrompt(open ?? false)
  }

  const handleInstall = () => {
    if (!pwaEvent) return
    pwaEvent.prompt()
    pwaEvent.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        handleOpenChange()
      }
    })
  }

  return {
    openInstallPrompt,
    handleOpenChange,
    isIOS: isIOSRef.current,
    isMobileBrowser: isMobileBrowserRef.current,
    handleInstall,
    canInstall: !isInstalled || !pwaEvent,
  }
}
