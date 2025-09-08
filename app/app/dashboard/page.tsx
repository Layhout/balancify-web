'use client'

import { Summary } from './_components/Summary'
import { SettleList } from './_components/SettleList'
import { SpendingGraph } from './_components/SpendingGraph'
import { useDashboard } from './_hooks/useDashboard'
import { PageHeader } from '@/components/PageHeader'
import { djs } from '@/lib/dayjsExt'
import { DEFAULT_DATE_FORMAT } from '@/lib/constants'

export default function Dashboard() {
  const { isPending, dashboardData } = useDashboard()

  return (
    <div className="container pb-4">
      <PageHeader
        title="Dashboard"
        description={`Summary from ${djs().subtract(1, 'week').format(DEFAULT_DATE_FORMAT)} to ${djs().format(DEFAULT_DATE_FORMAT)}`}
      />
      <div className="mt-8 flex items-start gap-4">
        <div className="flex flex-[2] flex-col gap-4">
          <Summary getBack={dashboardData?.getBack || 0} owed={dashboardData?.owed || 0} loading={isPending} />
          <SpendingGraph spendingHistory={dashboardData?.spendingHistory || []} />
          <div className="block md:hidden">
            <SettleList expenses={dashboardData?.toBeSettled || []} loading={isPending} />
          </div>
        </div>
        <div className="hidden flex-1 md:block">
          <SettleList expenses={dashboardData?.toBeSettled || []} loading={isPending} />
        </div>
      </div>
    </div>
  )
}
