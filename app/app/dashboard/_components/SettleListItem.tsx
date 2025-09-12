import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { ExpenseAvatar } from '@/components/ExpenseAvatar'
import { Expense } from '@/types/common'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'

export function SettleListItem({ id, name, icon, iconBgColor, amount, paidBy }: Expense) {
  const localUser = useAtomValue(userAtom)

  return (
    <li className="rounded-md ring-8 ring-transparent hover:bg-accent hover:text-accent-foreground hover:ring-accent">
      <Link href={`${ROUTES.APP.EXPENSES}/${id}`} className="flex w-full items-center gap-4">
        <ExpenseAvatar iconBgColor={iconBgColor} icon={icon} />
        <div className="flex-1 overflow-hidden">
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{name}</h1>
          <p className="overflow-hidden text-ellipsis  whitespace-nowrap text-sm">
            ${amount} • by {paidBy.id === localUser?.id ? 'You' : paidBy.name}
          </p>
        </div>
      </Link>
    </li>
  )
}
