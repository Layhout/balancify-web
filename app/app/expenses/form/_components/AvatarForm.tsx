import { ExpenseAvatar } from '@/components/ExpenseAvatar'
import { BG_COLORS, EXPENSE_ICONS } from '@/lib/constants'
import { UseFormReturn } from 'react-hook-form'
import { ExpenseFormType } from '../hooks/useExpenseForm'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { cn } from '@/lib/utils'

type AvatarFormProps = {
  form: UseFormReturn<ExpenseFormType>
}

export function AvatarForm({ form }: AvatarFormProps) {
  const [icon, iconBgColor] = form.watch(['icon', 'iconBgColor'])

  return (
    <div className="flex flex-[0.3] flex-col gap-4">
      <div className="flex justify-center md:justify-start">
        <ExpenseAvatar
          icon={icon}
          iconBgColor={iconBgColor}
          className="h-32 w-32 rounded-xl"
          iconClassName="h-20 w-20"
        />
      </div>
      <FormField
        control={form.control}
        name="icon"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Icons</FormLabel>
            <div className="mt-2 flex flex-wrap gap-4">
              {Object.values(EXPENSE_ICONS).map((e, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-muted',
                    field.value === e && 'bg-accent ring-2 ring-primary hover:bg-accent',
                  )}
                  onClick={() => field.onChange(e)}
                >
                  <img src={`/assets/svgs/icon-${e}.svg`} className={'h-6 w-6 dark:invert'} alt="icon" />
                </div>
              ))}
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="iconBgColor"
        render={({ field }) => (
          <FormItem className="mt-4 flex-1">
            <FormLabel>Colors</FormLabel>
            <div className="mt-2 flex flex-wrap gap-4">
              {BG_COLORS.map((c, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-8 w-8 cursor-pointer rounded-md ring-2 ring-transparent',
                    field.value === c && 'ring-2 ring-primary',
                  )}
                  style={{ backgroundColor: c }}
                  onClick={() => field.onChange(c)}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}
