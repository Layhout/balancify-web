import { Button } from '@/components/ui/button'
import { MemberListDrawer } from './MemberListDrawer'
import { ConfirmationDialog } from '@/components/ConfirmationDialog'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { LuTrash2 } from 'react-icons/lu'
import { Expense } from '@/types/common'
import { SettleDialog } from './SettleDialog'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'

interface ActionButtonsProps {
  loading: boolean
  details: Expense | null
  isOwner: boolean
  onDelete: () => void
  hasSettled: boolean
}

export function ActionButtons({ loading, details, isOwner, onDelete, hasSettled }: ActionButtonsProps) {
  const localUser = useAtomValue(userAtom)

  return (
    <div className="mt-6 flex items-center gap-2 md:gap-4">
      {!hasSettled && (
        <SettleDialog payer={details?.paidBy} amount={details?.member[localUser?.id || ''].amount || 0} />
      )}
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
