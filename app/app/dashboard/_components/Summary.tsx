import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TbArrowDownLeft, TbArrowUpRight } from 'react-icons/tb'
import { Skeleton } from '@/components/ui/skeleton'

export function Summary({ getBack, owed, loading }: { getBack: number; owed: number; loading: boolean }) {
  return (
    <div className="flex gap-4">
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">Get back</CardTitle>
          <TbArrowDownLeft />
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="mt-1.5 h-6 w-20" /> : <div className="text-2xl font-bold">${getBack}</div>}
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">Owed</CardTitle>
          <TbArrowUpRight />
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="mt-1.5 h-6 w-20" /> : <div className="text-2xl font-bold">${owed}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
