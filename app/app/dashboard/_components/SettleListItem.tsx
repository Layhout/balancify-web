import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { ExpenseAvatar } from '@/components/ExpenseAvatar'

export function SettleListItem({
  id,
  name,
  icon,
  iconBgColor,
  totalCost,
  createdByYou,
  createdBy,
}: {
  id: string
  name: string
  icon: string
  iconBgColor: string
  totalCost: number
  createdByYou: boolean
  createdBy: string
}) {
  return (
    <li className="rounded-md ring-8 ring-transparent hover:bg-accent hover:text-accent-foreground hover:ring-accent">
      <Link href={`${ROUTES.APP.EXPENSES}/${id}`} className="flex w-full items-center gap-4">
        <ExpenseAvatar iconBgColor={iconBgColor} icon={icon} />
        <div className="flex-1 overflow-hidden">
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{name}</h1>
          <p className="overflow-hidden text-ellipsis  whitespace-nowrap text-sm">
            ${totalCost} • by {createdByYou ? 'You' : createdBy}
          </p>
        </div>
      </Link>
    </li>
  )
}
