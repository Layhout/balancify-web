import { z } from 'zod'

export const MemberFormSchema = z.object({
  firstName: z.string().min(1, 'name is required'),
  lastName: z.string().min(1, 'name is required'),
  imageUrl: z.string().min(1, 'image is required'),
  email: z.string().email().min(1, 'email is required'),
  ownedAmount: z.number().min(1, 'amount is required'),
})

export const CreateExpenseFormSchema = z.object({
  name: z.string().min(1, 'name is required'),
  totalCost: z.number().min(1, 'amount is required'),
  members: z.array(MemberFormSchema).min(1, 'member is required'),
  icon: z.string(),
  iconBgColor: z.string(),
  createdByYou: z.boolean().default(false),
})

/**
 * id: faker.string.uuid(),
      name: faker.word.noun(),
      createdAt: djs(faker.date.recent()).format(DEFAULT_DATE_FORMAT),
      createdBy: faker.person.fullName(),
      totalCost: total,
      totalOwe: faker.number.float({ min: 5, max: total, fractionDigits: 2 }),
      members: Array.from<number, ExpenseDetailsMember>({ length: faker.number.int({ min: 3, max: 10 }) }, () => ({
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        imageUrl: faker.image.avatar(),
        profileBgColor: BG_COLORS[faker.number.int({ min: 0, max: BG_COLORS.length - 1 })],
        email: faker.internet.email(),
        ownedAmount: faker.number.float({ min: 5, max: total, fractionDigits: 2 }),
      })),
      hasSettled: faker.datatype.boolean(),
      icon: icons[faker.number.int({ min: 0, max: icons.length - 1 })],
      iconBgColor: BG_COLORS[faker.number.int({ min: 0, max: BG_COLORS.length - 1 })],
      createdByYou: faker.datatype.boolean(),
      timelines,
 */
