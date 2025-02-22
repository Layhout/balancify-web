import Summary from './_components/Summary'
import SettleList from './_components/SettleList'

export default function Dashboard() {
  return (
    <div className="container pb-4">
      <h1 className="mt-8 text-3xl font-bold md:mt-0">Dashboard</h1>
      <div className="mt-8 flex items-start gap-4">
        <div className="flex-[2]">
          <Summary />
        </div>
        <div className="flex-1">
          <SettleList />
        </div>
      </div>
    </div>
  )
}
