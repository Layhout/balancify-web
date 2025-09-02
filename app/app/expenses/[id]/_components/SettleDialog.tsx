import { Dialog } from '@/components/ui/dialog'
import { Drawer } from '@/components/ui/drawer'
import { isDesktopAtom } from '@/repositories/layout'
import { useAtomValue } from 'jotai'

export function SettleDialog() {
  const isDesktop = useAtomValue(isDesktopAtom)

  if (isDesktop) return <Dialog></Dialog>

  return <Drawer></Drawer>
}
