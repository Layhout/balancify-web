import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useClientAuth } from '@/hooks/useClientAuth'
import { isDesktopAtom } from '@/repositories/layout'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { LuCheck, LuCopy } from 'react-icons/lu'

type InviteFriendDialogProps = {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void
}

export function InviteFriendDialog({ open, setOpen }: InviteFriendDialogProps) {
  const isDesktop = useAtomValue(isDesktopAtom)
  const { localUser } = useClientAuth()

  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/invite/${localUser?.referalCode}`)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  if (typeof window === 'undefined') return null

  const content = (
    <div className="relative flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex justify-center">
        <img src="/assets/svgs/add-person.svg" className="h-24 w-24" alt="Add person" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Share this link to invite your friend to join Balancify.</p>
        <Tooltip open={copied}>
          <TooltipTrigger asChild>
            <div className="mt-4 flex flex-1 items-center justify-between gap-2 rounded-lg bg-muted-foreground/20 p-2">
              <p className="text-xs">
                {window.location.origin}/invite/{localUser?.referalCode}
              </p>
              <div>{copied ? <LuCheck /> : <LuCopy className="cursor-pointer" onClick={handleCopyLink} />}</div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copied!</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Button className="md:hidden" onClick={handleCopyLink}>
        Copy Link
      </Button>
    </div>
  )

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Invite Friends</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Invite Friends</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <div className="p-4">{content}</div>
      </DrawerContent>
    </Drawer>
  )
}
