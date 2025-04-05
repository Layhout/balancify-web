import Summary from './_components/Summary'
import SettleList from './_components/SettleList'
import SpendingGraph from './_components/SpendingGraph'

export default function Dashboard() {
  return (
    <div className="container pb-4">
      <h1 className="mt-8 text-3xl font-bold md:mt-0">Dashboard</h1>
      <div className="mt-8 flex items-start gap-4">
        <div className="flex flex-[2] flex-col gap-4">
          <Summary />
          <SpendingGraph />
        </div>
        <div className="flex-1">
          <SettleList />
        </div>
      </div>
    </div>
  )
}
