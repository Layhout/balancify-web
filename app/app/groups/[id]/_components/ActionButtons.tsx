import { Button } from '@/components/ui/button'
import { HiOutlineUserPlus } from 'react-icons/hi2'
import { LuPlus } from 'react-icons/lu'
import { HiOutlineLogout } from 'react-icons/hi'

export default function ActionButtons() {
  return (
    <div className="mt-6 flex gap-2 md:gap-4">
      <Button className="flex-1 gap-2 md:flex-none">
        <LuPlus className="h-4 w-4" />
        Add Expense
      </Button>
      <Button variant="outline" className="h-9 w-9 gap-2 p-0 md:w-auto md:px-4 md:py-2">
        <HiOutlineUserPlus className="h-4 w-4" />
        <span className="hidden md:inline">Add Member</span>
      </Button>
      <Button variant="destructive" className="h-9 w-9 gap-2 p-0 md:w-auto md:px-4 md:py-2">
        <HiOutlineLogout className="h-4 w-4" />
        <span className="hidden md:inline">Leave</span>
      </Button>
    </div>
  )
}
