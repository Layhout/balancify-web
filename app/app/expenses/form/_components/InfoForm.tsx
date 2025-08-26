import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { BsCurrencyDollar } from 'react-icons/bs'
import { UseFormReturn } from 'react-hook-form'
import { ExpenseFormType } from '../hooks/useExpenseForm'
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { MemberPicker } from './MemberPicker'
import { Card, CardContent } from '@/components/ui/card'
import { UserAvatar } from '@/components/UserAvatar'
import { Button } from '@/components/ui/button'
import { LuX } from 'react-icons/lu'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { Badge } from '@/components/ui/badge'

type InfoFormProps = {
  form: UseFormReturn<ExpenseFormType>
}

export function InfoForm({ form }: InfoFormProps) {
  const localUser = useAtomValue(userAtom)

  const [memberOption, selectedGroup] = form.watch(['memberOption', 'selectedGroup'])

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
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input startIcon={BsCurrencyDollar} placeholder="Enter expense amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center justify-between">
        <FormField
          control={form.control}
          name="memberOption"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup type="single" className="justify-start" value={field.value} onValueChange={field.onChange}>
                  <ToggleGroupItem value="group">Group</ToggleGroupItem>
                  <ToggleGroupItem value="friend">Friend</ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="splitOption"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup type="single" className="justify-start" value={field.value} onValueChange={field.onChange}>
                  <ToggleGroupItem value="paid_equally">Paid equally</ToggleGroupItem>
                  <ToggleGroupItem value="paid_by_you">Paid by you</ToggleGroupItem>
                  <ToggleGroupItem value="paid_by_them">Paid by them</ToggleGroupItem>
                  <ToggleGroupItem value="custom">Custom</ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="members"
        render={({ field }) => (
          <FormItem className="grid grid-cols-1 gap-4 space-y-0">
            {((memberOption === 'group' && !selectedGroup?.id) ||
              (memberOption === 'friend' && field.value.length < 10)) && (
              <MemberPicker
                mode={memberOption}
                selectedIds={
                  memberOption === 'group' ? [selectedGroup?.id || ''] : field.value.map((member) => member.id)
                }
                onAddMember={(v) => {
                  if (memberOption === 'group') {
                    field.onChange(v)
                  } else {
                    field.onChange([...field.value, v[0]])
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
                      field.onChange([])
                    }}
                  >
                    <LuX />
                  </Button>
                </CardContent>
              </Card>
            )}
            {field.value.map((member) => (
              <Card className="overflow-hidden" key={member.id}>
                <CardContent className="flex h-full items-center gap-4 p-4">
                  <UserAvatar
                    imageUrl={member.imageUrl || ''}
                    fallbackText={member.name}
                    profileBgColor={member.profileBgColor || ''}
                  />
                  <div className="flex flex-1 items-center gap-4">
                    <div className="overflow-hidden">
                      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{member.name}</p>
                    </div>
                    {localUser?.id === member.id && <Badge>You</Badge>}
                  </div>
                  <FormField
                    control={form.control}
                    name={`memberExpenseAmount.${member.id}`}
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <Input startIcon={BsCurrencyDollar} placeholder="Enter expense amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {memberOption === 'friend' && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => field.onChange(field.value.filter((m) => m.id !== member.id))}
                      disabled={localUser?.id === member.id}
                    >
                      <LuX />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </FormItem>
        )}
      />
    </div>
  )
}
