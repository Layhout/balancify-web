import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LuLayoutGrid } from 'react-icons/lu'
import { VscGraph } from 'react-icons/vsc'
import { CalendarHeatMap } from './CalendarHeatMap'
import { SpendingBarChart } from './SpendingBarChart'
import { Dashboard } from '@/types/common'

export function SpendingGraph({ spendingHistory }: { spendingHistory: Dashboard['spendingHistory'] }) {
  return (
    <Card>
      <Tabs defaultValue="grid">
        <CardHeader className="flex-row items-center justify-between pb-0">
          <CardTitle>Spending History</CardTitle>
          <TabsList>
            <TabsTrigger value="grid">
              <LuLayoutGrid />
            </TabsTrigger>
            <TabsTrigger value="graph">
              <VscGraph />
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value="grid">
          <CardContent className="flex items-center justify-center">
            <CalendarHeatMap spendingHistory={spendingHistory} />
          </CardContent>
        </TabsContent>
        <TabsContent value="graph">
          <CardContent>
            <SpendingBarChart spendingHistory={spendingHistory} />
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
