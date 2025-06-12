/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { isDesktopAtom } from '@/repositories/layout'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { LuPlus } from 'react-icons/lu'

export function InviteFriendDialog() {
  const isDesktop = useAtomValue(isDesktopAtom)
  const [open, setOpen] = useState(false)

  const dialogTitle = 'Add a Friend'
  const dialogDescription = 'Enter your friend’s email to add them.'
  const dialogBtn = 'Send Invite'
  const inputPlaceholder = 'Enter an email address'

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <LuPlus className="h-4 w-4" /> {dialogTitle}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div>
            <Input placeholder={inputPlaceholder} />
          </div>
          <DialogFooter>
            <Button>{dialogBtn}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="gap-2">
          <LuPlus className="h-4 w-4" /> {dialogTitle}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription>{dialogDescription}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <Input placeholder={inputPlaceholder} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button>{dialogBtn}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
