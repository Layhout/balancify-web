import { isDesktopAtom } from '@/repositories/layout'
import { useAtomValue } from 'jotai'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'
import { usePWA } from '@/hooks/usePWA'
import { Button } from './ui/button'
import { isDarkModeAtom } from '@/repositories/layout'
import { cn } from '@/lib/utils'

export function PWAInstallPrompt({ triggerBtn }: { triggerBtn?: JSX.Element }) {
  const isDesktop = useAtomValue(isDesktopAtom)
  const isDarkMode = useAtomValue(isDarkModeAtom)

  const { openInstallPrompt, handleOpenChange, isMobileBrowser, isIOS, handleInstall, isInstalled } = usePWA()

  const dialogTitle = 'Use Balancify as an app'
  const content = (
    <div className="flex flex-col items-center">
      <img
        src={`/assets/svgs/install-${isMobileBrowser ? 'mobile' : 'desktop'}.svg`}
        className="h-24 w-24"
        alt="App Install"
      />
      <p className="mb-6 mt-2 text-center">Skip the browser – open instantly from your home screen.</p>
      {isIOS && (
        <ol className="flex w-full flex-col gap-4">
          <li className="flex items-center gap-4">
            <img src="/assets/svgs/ios-share.svg" alt="Share" />
            <span>1. Tap the share button</span>
          </li>
          <li className="flex items-center gap-4">
            <img src="/assets/svgs/ios-add.svg" alt="Add" className={cn({ invert: isDarkMode })} />
            <span>2. Scroll down and tap &quot;Add to Home Screen&quot;</span>
          </li>
        </ol>
      )}
    </div>
  )
  const installBtn = isIOS ? null : <Button onClick={handleInstall}>Install</Button>

  if (isDesktop)
    return (
      <Dialog open={openInstallPrompt} onOpenChange={handleOpenChange}>
        {triggerBtn && !isInstalled && <DialogTrigger asChild>{triggerBtn}</DialogTrigger>}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          {content}
          {installBtn}
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={openInstallPrompt} onOpenChange={handleOpenChange}>
      {triggerBtn && !isInstalled && <DrawerTrigger asChild>{triggerBtn}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <div className="p-4">{content}</div>
        <DrawerFooter>{installBtn}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
