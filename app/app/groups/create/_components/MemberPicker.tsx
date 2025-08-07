import { Button } from '@/components/ui/button'
import { Form, FormField, FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMemberPicker } from '../_hooks/useMemberPicker'
import { MemberFormType } from '../_hooks/useCreate'

export function MemberPicker({ onChange }: { onChange?: (member: MemberFormType[]) => void }) {
  const { findMemberForm, onSubmitFindMemberForm } = useMemberPicker(onChange)

  return (
    <Form {...findMemberForm}>
      <form onSubmit={findMemberForm.handleSubmit(onSubmitFindMemberForm)} className="flex gap-4">
        <FormField
          control={findMemberForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-[0.8] space-y-0">
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex-[0.2]">
          Search
        </Button>
      </form>
    </Form>
  )
}
