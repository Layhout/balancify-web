'use client'

import { PageHeader } from '@/components/PageHeader'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCreate } from './_hooks/useCreate'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MemberPicker } from './_components/MemberPicker'
import { Card, CardContent } from '@/components/ui/card'
import { UserAvatar } from '@/components/UserAvatar'
import { LuLoaderCircle, LuX } from 'react-icons/lu'

export default function CreateGroup() {
  const { createGroupForm, onSubmitCreateGroupForm, isSubmitting } = useCreate()

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
                <FormItem className="flex flex-col space-y-0 md:flex-row">
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
                <FormItem className="flex flex-col space-y-0 md:flex-row">
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
                <FormItem className="flex flex-col space-y-0 md:flex-row">
                  <div className="flex-[0.2]">
                    <FormLabel>Members</FormLabel>
                  </div>
                  <div className="grid flex-[0.8] grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    <MemberPicker
                      selectedMembers={field.value.map((member) => member.userId)}
                      onAddMember={(v) => field.onChange([...field.value, v])}
                    />
                    {field.value.map((member) => (
                      <Card className="overflow-hidden" key={member.userId}>
                        <CardContent className="flex items-center gap-4 p-4">
                          <UserAvatar
                            imageUrl={member.imageUrl || ''}
                            fallbackText={member.name}
                            profileBgColor={member.profileBgColor || ''}
                          />
                          <div className="flex-1 overflow-hidden">
                            <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{member.name}</p>
                            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{member.email}</p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => field.onChange(field.value.filter((m) => m.userId !== member.userId))}
                          >
                            <LuX />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting && <LuLoaderCircle className="animate-spin" />}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
