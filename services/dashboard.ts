import { faker } from '@faker-js/faker'
import { Dashboard, DashboardResult } from './dashboard.model'
import { services } from './index'
import { djs } from '@/lib/dayjsExt'
import { STANDARD_DATE_FORMAT } from '@/lib/constants'

export class DashboardService {
  async getDashboard(): Promise<DashboardResult> {
    const fakeData: Dashboard = {
      getBack: faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
      owed: faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
      spendingHistory: faker.date
        .betweens({
          from: djs().add(-2, 'month').toDate(),
          to: djs().toDate(),
          count: 60,
        })
        .map((date) => ({
          date: djs(date).format(STANDARD_DATE_FORMAT),
          amount: faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
        })),
      toBeSettled: (await services.expense.getExpenses()).data,
    }

    const response = await new Promise<DashboardResult>((resolve) => {
      setTimeout(
        () => {
          resolve({
            data: fakeData,
          })
        },
        faker.number.int({ min: 1000, max: 3000 }),
      )
    })

    return response
  }
}
