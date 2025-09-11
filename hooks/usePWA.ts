import { useEffect, useRef } from 'react'
import { isShownPWAAtom } from '@/repositories/layout'
import { useAtom } from 'jotai'
import { isInstalledPWA, isIOS, isMobileBrowser } from '@/lib/utils'
import { useState } from 'react'

export function usePWA() {
  const [isShownPWA, setIsShownPWA] = useAtom(isShownPWAAtom)

  const [openInstallPrompt, setOpenInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  const pwaPromptRef = useRef<any>(null)
  const isIOSRef = useRef<boolean>(false)
  const isMobileBrowserRef = useRef<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()

    window.addEventListener(
      'beforeinstallprompt',
      (e) => {
        e.preventDefault()
        pwaPromptRef.current = e
        console.log('beforeinstallprompt')

        if (isShownPWA) return

        isIOSRef.current = isIOS()
        isMobileBrowserRef.current = isMobileBrowser()
        setOpenInstallPrompt(true)
      },
      { signal: controller.signal },
    )

    setIsInstalled(isInstalledPWA())

    return () => controller.abort()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenChange = (open?: boolean) => {
    if (!isShownPWA) setIsShownPWA(true)
    setOpenInstallPrompt(open ?? false)
  }

  const handleInstall = () => {
    if (!pwaPromptRef.current) return
    pwaPromptRef.current.prompt()
    pwaPromptRef.current.userChoice.then((choiceResult: { outcome: string }) => {
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
    isInstalled,
  }
}
