import { Button } from '@/components/ui/button'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { LuPlus } from 'react-icons/lu'
import { MemberListDrawer } from './MemberListDrawer'
import { User } from '@/types/common'
import { LeaveGroupAlertDialog } from './LeaveGroupAlertDialog'

type ActionButtonsProps = {
  loading: boolean
  members: User[]
  onEditGroup: () => void
  onLeaveGroup: () => void
}

export function ActionButtons({ loading, members, onEditGroup, onLeaveGroup }: ActionButtonsProps) {
  return (
    <div className="mt-6 flex gap-2 md:gap-4">
      <Button className="flex-1 gap-2 md:flex-none">
        <LuPlus className="h-4 w-4" />
        Add Expense
      </Button>
      <MemberListDrawer loading={loading} members={members} />
      <Button variant="outline" className="h-9 w-9 gap-2 p-0 md:w-auto md:px-4 md:py-2" onClick={onEditGroup}>
        <HiOutlineCog6Tooth className="h-4 w-4" />
        <span className="hidden md:inline">Edit</span>
      </Button>
      <LeaveGroupAlertDialog onLeaveGroup={onLeaveGroup} />
    </div>
  )
}
