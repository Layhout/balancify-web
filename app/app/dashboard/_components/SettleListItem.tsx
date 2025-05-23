import { Expense } from '@/services/expense.model'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { ExpanseAvatar } from '@/components/ExpanseAvatar'

export function SettleListItem({ id, name, icon, iconBgColor, totalCost, createdByYou, createdBy }: Expense) {
  return (
    <li className="rounded-md ring-8 ring-transparent hover:bg-accent hover:text-accent-foreground hover:ring-accent">
      <Link href={`${ROUTES.APP.EXPENSES}/${id}`} className="flex w-full items-center gap-4">
        <ExpanseAvatar iconBgColor={iconBgColor} icon={icon} />
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
