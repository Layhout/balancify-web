import { TooltipX } from '@/components/TooltipX'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserAvatar } from '@/components/UserAvatar'
import { format2DigitDecimal } from '@/lib/utils'
import { isDesktopAtom } from '@/repositories/layout'
import { userAtom } from '@/repositories/user'
import { User } from '@/types/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsCurrencyDollar } from 'react-icons/bs'
import { LuInfo, LuLoaderCircle, LuMoveRight } from 'react-icons/lu'
import z from 'zod'

type SettleDialogProps = {
  payer?: User
  amount: number
  disabled: boolean
  loading: boolean
  onSettleExpense: (amount: number) => void
}

const settlementFormScheme = z.object({
  amount: z.coerce.number(),
})

type SettlementFormScheme = z.infer<typeof settlementFormScheme>

export function SettleDialog({ payer, amount, disabled, loading, onSettleExpense }: SettleDialogProps) {
  const localUser = useAtomValue(userAtom)
  const isDesktop = useAtomValue(isDesktopAtom)

  const [open, setOpen] = useState(false)

  const settlementForm = useForm<SettlementFormScheme>({
    resolver: zodResolver(settlementFormScheme),
    defaultValues: {
      amount,
    },
  })

  const onSubmit = (value: SettlementFormScheme) => {
    setOpen(false)
    onSettleExpense(value.amount)
  }

  useEffect(() => {
    settlementForm.setValue('amount', amount)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  const triggerBtn = (
    <Button className="flex-1 md:flex-none" disabled={disabled}>
      {loading && <LuLoaderCircle className="animate-spin" />}
      Settle up
    </Button>
  )
  const dialogTitle = (
    <div className="flex items-center gap-2">
      <p>Record Settlement</p>
      <TooltipX
        trigger={
          <div>
            <LuInfo />
          </div>
        }
        content={<span>Use negative amount to settle overpaid.</span>}
        side="top"
      />
    </div>
  )
  const submitBtn = (
    <Button type="submit" form="settlementForm" className="gap-2" disabled={disabled}>
      {loading && <LuLoaderCircle className="animate-spin" />}
      Submit
    </Button>
  )
  const content = (
    <div>
      <div className="mb-6 flex items-center justify-center gap-6">
        <UserAvatar
          fallbackText={(localUser?.name[0] || '') + (localUser?.name[1] || '')}
          imageUrl={localUser?.imageUrl || ''}
          profileBgColor={localUser?.profileBgColor}
          className="size-20"
        />
        <LuMoveRight className="size-10" />
        <UserAvatar
          fallbackText={(payer?.name[0] || '') + (payer?.name[1] || '')}
          imageUrl={payer?.imageUrl || ''}
          profileBgColor={payer?.profileBgColor}
          className="size-20"
        />
      </div>
      <Form {...settlementForm}>
        <form onSubmit={settlementForm.handleSubmit(onSubmit)} id="settlementForm">
          <FormField
            control={settlementForm.control}
            name="amount"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    startIcon={BsCurrencyDollar}
                    placeholder="Enter expense amount"
                    type="number"
                    onFocus={(e) => !fieldState.isTouched && e.target.select()}
                    {...field}
                    onChange={(e) => {
                      field.onChange(format2DigitDecimal(e) ?? field.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          {content}
          {submitBtn}
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerBtn}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <div className="p-4">{content}</div>
        <DrawerFooter>{submitBtn}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

/**
 * 
                 
 */
