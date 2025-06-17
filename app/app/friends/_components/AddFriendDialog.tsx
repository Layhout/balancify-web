import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { isDesktopAtom } from '@/repositories/layout'
import { useAtomValue } from 'jotai'
import { UseFormReturn } from 'react-hook-form'
import { LuLoaderCircle } from 'react-icons/lu'
import { AddFriendFromType } from '../_hooks/useFriend'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

type AddFriendDialogProps = {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void
  form: UseFormReturn<AddFriendFromType>
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: AddFriendFromType) => void
  isAddingFriend: boolean
}

export function AddFriendDialog({ open, setOpen, form, onSubmit, isAddingFriend }: AddFriendDialogProps) {
  const isDesktop = useAtomValue(isDesktopAtom)

  const dialogTitle = 'Add a Friend'
  const dialogDescription = 'Enter your friend’s email to add them.'
  const dialogBtn = 'Add'
  const inputPlaceholder = 'Enter an email address'

  const formComponent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="add-friend-form">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={inputPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )

  const submitBottomComponent = (
    <Button type="submit" form="add-friend-form" className="gap-2" disabled={isAddingFriend}>
      {isAddingFriend && <LuLoaderCircle className="animate-spin" />}
      {dialogBtn}
    </Button>
  )

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div>{formComponent}</div>
          <DialogFooter>{submitBottomComponent}</DialogFooter>
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription>{dialogDescription}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{formComponent}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>{submitBottomComponent}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
