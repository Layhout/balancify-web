import { Button } from '@/components/ui/button'
import { MemberListDrawer } from './MemberListDrawer'
import { ConfirmationDialog } from '@/components/ConfirmationDialog'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { LuTrash2 } from 'react-icons/lu'
import { Expense } from '@/types/common'

interface ActionButtonsProps {
  loading: boolean
  details: Expense | null
  isOwner: boolean
  onDelete: () => void
}

export function ActionButtons({ loading, details, isOwner, onDelete }: ActionButtonsProps) {
  return (
    <div className="mt-6 flex items-center gap-2 md:gap-4">
      <Button className="flex-1 md:flex-none">Settle up</Button>
      <MemberListDrawer loading={loading} members={Object.values(details?.member || {}) || []} />
      {isOwner && (
        <>
          <Button variant="outline" className="h-9 w-9 gap-2 p-0 md:w-auto md:px-4 md:py-2">
            <HiOutlineCog6Tooth />
            <span className="hidden md:inline">Edit</span>
          </Button>
          <ConfirmationDialog
            title="Are you sure you want to delete this expense?"
            description="This action cannot be undone."
            confirmText="Delete"
            triggerBtn={
              <Button variant="destructive" className="h-9 w-9 gap-2 p-0 md:w-auto md:px-4 md:py-2">
                <LuTrash2 />
                <span className="hidden md:inline">Delete</span>
              </Button>
            }
            onConfirm={onDelete}
          />
        </>
      )}
    </div>
  )
}
