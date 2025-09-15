import { Button } from '@/components/ui/button'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { LuPlus } from 'react-icons/lu'
import { MemberListDrawer } from './MemberListDrawer'
import { User } from '@/types/common'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { ConfirmationDialog } from '@/components/ConfirmationDialog'
import { HiOutlineLogout } from 'react-icons/hi'

type ActionButtonsProps = {
  loading: boolean
  members: User[]
  id: string
  onLeaveGroup: () => void
}

export function ActionButtons({ loading, members, id, onLeaveGroup }: ActionButtonsProps) {
  return (
    <div className="mt-6 flex gap-2 md:gap-4">
      <Button className="flex-1 gap-2 md:flex-none" asChild>
        <Link href={`${ROUTES.APP.EXPENSES_FORM}?group=${id}`}>
          <LuPlus className="h-4 w-4" />
          Add Expense
        </Link>
      </Button>
      <MemberListDrawer loading={loading} members={members} />
      <Button variant="outline" className="h-9 w-9 gap-2 p-0 md:w-auto md:px-4 md:py-2" asChild>
        <Link href={`${ROUTES.APP.GROUPS_FORM}?edit=${id}`}>
          <HiOutlineCog6Tooth className="h-4 w-4" />
          <span className="hidden md:inline">Edit</span>
        </Link>
      </Button>
      <ConfirmationDialog
        title="Are you sure you want to leave this group?"
        description="This action cannot be undone."
        confirmText="Leave"
        triggerBtn={
          <Button variant="destructive" className="h-9 w-9 gap-2 p-0 md:w-auto md:px-4 md:py-2">
            <HiOutlineLogout className="h-4 w-4" />
            <span className="hidden md:inline">Leave</span>
          </Button>
        }
        onConfirm={onLeaveGroup}
      />
    </div>
  )
}
