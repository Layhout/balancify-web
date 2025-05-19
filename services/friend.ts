import { faker } from '@faker-js/faker'
import { FriendResult } from './friend.model'
import { Person } from './group.model'
import { BG_COLORS } from '@/lib/constants'

export class FriendService {
  async getFriends(): Promise<FriendResult> {
    const fakeData: Person[] = Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      imageUrl: faker.image.avatar(),
      profileBgColor: BG_COLORS[faker.number.int({ min: 0, max: BG_COLORS.length - 1 })],
      email: faker.internet.email(),
    }))

    const response = await new Promise<FriendResult>((resolve) => {
      setTimeout(
        () => {
          resolve({
            data: fakeData,
            pagination: {
              count: fakeData.length,
              limit: 0,
              offset: 0,
            },
          })
        },
        faker.number.int({ min: 1000, max: 3000 }),
      )
    })

    return response
  }
}
