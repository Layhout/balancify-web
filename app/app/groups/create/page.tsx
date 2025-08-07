'use client'

import { PageHeader } from '@/components/PageHeader'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCreate } from './_hooks/useCreate'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MemberPicker } from './_components/MemberPicker'

export default function CreateGroup() {
  const { createGroupForm, onSubmitCreateGroupForm } = useCreate()

  return (
    <div className="container pb-4">
      <PageHeader title="Create Group" hasBackBtn />
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <Form {...createGroupForm}>
          <form onSubmit={createGroupForm.handleSubmit(onSubmitCreateGroupForm)} className="flex w-full flex-col gap-4">
            <FormField
              control={createGroupForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <div className="flex-[0.2]">
                    <FormLabel>Name</FormLabel>
                  </div>
                  <div className="flex-[0.8]">
                    <FormControl>
                      <Input placeholder="Enter group name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={createGroupForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <div className="flex-[0.2]">
                    <FormLabel>Description</FormLabel>
                  </div>
                  <div className="flex-[0.8]">
                    <FormControl>
                      <Textarea placeholder="Enter group description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={createGroupForm.control}
              name="members"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <div className="flex-[0.2]">
                    <FormLabel>Members</FormLabel>
                  </div>
                  <div className="flex-[0.8]">
                    <MemberPicker onChange={field.onChange} />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
