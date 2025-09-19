import { Input } from '@/components/ui/input'
import { BsCurrencyDollar } from 'react-icons/bs'
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { ExpenseFormType } from '../hooks/useExpenseForm'
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { MemberPicker } from './MemberPicker'
import { Card, CardContent } from '@/components/ui/card'
import { UserAvatar } from '@/components/UserAvatar'
import { Button } from '@/components/ui/button'
import { LuEllipsisVertical, LuLoaderCircle, LuPointer, LuX } from 'react-icons/lu'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { memberOptions, splitOptions } from '@/lib/constants'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MemberOption, SplitOption } from '@/types/common'
import { format2DigitDecimal } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

type InfoFormProps = {
  form: UseFormReturn<ExpenseFormType>
  memberForm: UseFieldArrayReturn<ExpenseFormType, 'members', 'fieldId'>
  isSubmitting: boolean
  isEdit: boolean
}

export function InfoForm({ form, memberForm, isSubmitting, isEdit }: InfoFormProps) {
  const localUser = useAtomValue(userAtom)

  const [memberOption, selectedGroup, paidBy] = form.watch(['memberOption', 'selectedGroup', 'paidBy'])

  return (
    <div className="flex flex-[0.7] flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter expense name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
      </div>
      <div className="flex items-center gap-4">
        <FormField
          control={form.control}
          name="memberOption"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value}
                onValueChange={(v) => {
                  if (!v) return
                  form.setValue('selectedGroup', undefined)
                  form.setValue(
                    'members',
                    v === MemberOption.Friend && localUser ? [{ ...localUser, amount: 0, settledAmount: 0 }] : [],
                  )
                  field.onChange(v)
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {memberOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="splitOption"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value}
                onValueChange={(v) => {
                  if (!v) return
                  field.onChange(v)
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {splitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {((memberOption === MemberOption.Group && !selectedGroup?.id) ||
          (memberOption === MemberOption.Friend && memberForm.fields.length < 10)) && (
          <MemberPicker
            mode={memberOption}
            selectedIds={
              memberOption === MemberOption.Group
                ? [selectedGroup?.id || '']
                : memberForm.fields.map((field) => field.id)
            }
            onAddMember={(v) => {
              if (memberOption === MemberOption.Group) {
                memberForm.append([
                  { ...localUser!, amount: 0, settledAmount: 0 },
                  ...v
                    .filter((member) => member.id !== localUser?.id)
                    .map((member) => ({ ...member, amount: 0, settledAmount: 0 })),
                ])
              } else {
                memberForm.append({ ...v[0], amount: 0, settledAmount: 0 })
              }
            }}
            onSelectGroup={(group) => form.setValue('selectedGroup', group)}
          />
        )}
        {selectedGroup && (
          <Card className="overflow-hidden">
            <CardContent className="flex h-full items-center justify-between gap-4 p-4">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{selectedGroup.name}</p>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  form.setValue('selectedGroup', undefined)
                  memberForm.remove()
                }}
              >
                <LuX />
              </Button>
            </CardContent>
          </Card>
        )}
        {memberForm.fields.map((field, i) => (
          <Card key={field.fieldId}>
            <CardContent className="flex items-center gap-2 overflow-hidden p-4">
              <UserAvatar
                imageUrl={field.imageUrl || ''}
                fallbackText={field.name}
                profileBgColor={field.profileBgColor || ''}
              />
              <div className="flex-1 overflow-hidden">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                  {localUser?.id === field.id ? 'You' : field.name}
                </p>
                {paidBy?.id === field.id && <p className="text-xs text-primary">pays for this expense</p>}
              </div>
              <FormField
                control={form.control}
                name={`members.${i}.amount`}
                render={({ field }) => (
                  <FormItem className="w-[100px]">
                    <FormControl>
                      <Input
                        startIcon={BsCurrencyDollar}
                        type="number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(format2DigitDecimal(e) ?? field.value)
                          form.setValue('splitOption', SplitOption.Custom)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <LuEllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => form.setValue('paidBy', field)} disabled={paidBy?.id === field.id}>
                    <LuPointer />
                    Assign payer
                  </DropdownMenuItem>
                  {memberOption === 'friend' && (
                    <DropdownMenuItem onSelect={() => memberForm.remove(i)} disabled={localUser?.id === field.id}>
                      <LuX />
                      Remove
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
      </div>
      {form.formState.errors.members?.root?.message && (
        <p className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.members?.root?.message}</p>
      )}
      <div className="hidden md:flex md:justify-end">
        <Button type="submit" disabled={isSubmitting || !form.formState.isDirty} className="gap-2">
          {isSubmitting && <LuLoaderCircle className="animate-spin" />}
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </div>
    </div>
  )
}
