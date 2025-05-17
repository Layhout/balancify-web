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

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <LuPlus className="h-4 w-4" /> Add Friend
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite a Friend</DialogTitle>
            <DialogDescription>Send an invitation to your friend via email.</DialogDescription>
          </DialogHeader>
          <div>
            <Input placeholder="Enter an email address" />
          </div>
          <DialogFooter>
            <Button>Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="gap-2">
          <LuPlus className="h-4 w-4" /> Add Friend
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Invite a Friend</DrawerTitle>
          <DrawerDescription>Send an invitation to your friend via email.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <Input placeholder="Enter an email address" />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button>Send Invite</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
