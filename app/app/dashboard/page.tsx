'use client'

import Summary from './_components/Summary'
import SettleList from './_components/SettleList'
import SpendingGraph from './_components/SpendingGraph'
import { useDashboard } from './_hooks/useDashboard'

export default function Dashboard() {
  const { isPending, dashboardData } = useDashboard()

  return (
    <div className="container pb-4">
      <h1 className="mt-8 text-3xl font-bold md:mt-0">Dashboard</h1>
      <div className="mt-8 flex items-start gap-4">
        <div className="flex flex-[2] flex-col gap-4">
          <Summary getBack={dashboardData?.getBack || 0} owed={dashboardData?.owed || 0} loading={isPending} />
          <SpendingGraph spendingHistory={dashboardData?.spendingHistory || []} />
          <div className="block md:hidden">
            <SettleList toBeSettled={dashboardData?.toBeSettled || []} loading={isPending} />
          </div>
        </div>
        <div className="hidden flex-1 md:block">
          <SettleList toBeSettled={dashboardData?.toBeSettled || []} loading={isPending} />
        </div>
      </div>
    </div>
  )
}
