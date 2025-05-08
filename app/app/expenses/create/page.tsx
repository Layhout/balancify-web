'use client'

import { ExpanseAvatar } from '@/components/ExpanseAvatar'
import { PageHeader } from '@/components/PageHeader'
import { Label } from '@/components/ui/label'
import { BG_COLORS, EXPENSE_ICONS } from '@/lib/constants'

export default function CreateExpenses() {
  return (
    <div className="container pb-4">
      <PageHeader title="Create Expense" hasBackBtn />
      <div className="mt-6 flex gap-6">
        <div className="flex flex-[0.3] flex-col gap-6">
          <ExpanseAvatar
            icon={Object.values(EXPENSE_ICONS)[Math.floor(Math.random() * (Object.values(EXPENSE_ICONS).length - 1))]}
            iconBgColor={BG_COLORS[Math.floor(Math.random() * (BG_COLORS.length - 1))]}
            className="h-32 w-32"
            iconClassName="h-20 w-20"
          />
          <div className="flex-1">
            <Label>Icons</Label>
            <div className="mt-4 flex flex-wrap gap-4">
              {Object.values(EXPENSE_ICONS).map((ei, i) => (
                <img key={i} src={`/assets/svgs/icon-${ei}.svg`} className={'h-8 w-8'} alt="icon" />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <Label>Colors</Label>
            <div className="mt-4 flex flex-wrap gap-4">
              {BG_COLORS.map((c, i) => (
                <div key={i} className="h-8 w-8 rounded-lg" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  )
}
