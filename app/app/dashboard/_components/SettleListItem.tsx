import { Expense } from '@/services/expense.model'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'

export default function SettleListItem({ id, name, icon, iconBgColor, totalCost, createdByYou, createdBy }: Expense) {
  return (
    <li className="rounded-md ring-8 ring-transparent hover:bg-accent hover:text-accent-foreground hover:ring-accent">
      <Link href={`${ROUTES.APP.EXPENSES}/${id}`} className="flex w-full items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: iconBgColor }}>
          <img src={`/assets/svgs/icon-${icon}.svg`} className="h-5 w-5" alt="icon" />
        </div>
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
