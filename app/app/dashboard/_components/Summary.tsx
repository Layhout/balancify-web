import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TbArrowDownLeft, TbArrowUpRight } from 'react-icons/tb'

export default function Summary() {
  return (
    <div className="flex gap-4">
      <Card className="flex-1 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">Get back</CardTitle>
          <TbArrowDownLeft />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
        </CardContent>
      </Card>
      <Card className="flex-1 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">Owed</CardTitle>
          <TbArrowUpRight />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
        </CardContent>
      </Card>
    </div>
  )
}
