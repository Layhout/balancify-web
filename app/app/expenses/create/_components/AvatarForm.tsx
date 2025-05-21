import { ExpanseAvatar } from '@/components/ExpanseAvatar'
import { Label } from '@/components/ui/label'
import { BG_COLORS, EXPENSE_ICONS } from '@/lib/constants'

export function AvatarForm() {
  return (
    <div className="flex flex-[0.3] flex-col gap-4">
      <div className="flex justify-center md:justify-start">
        <ExpanseAvatar
          icon={Object.values(EXPENSE_ICONS)[Math.floor(Math.random() * (Object.values(EXPENSE_ICONS).length - 1))]}
          iconBgColor={BG_COLORS[Math.floor(Math.random() * (BG_COLORS.length - 1))]}
          className="h-32 w-32 rounded-xl"
          iconClassName="h-20 w-20"
        />
      </div>
      <div className="flex-1">
        <Label>Icons</Label>
        <div className="mt-2 flex flex-wrap gap-4">
          {Object.values(EXPENSE_ICONS).map((e, i) => (
            <div
              key={i}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-accent ring-2 ring-primary"
            >
              <img src={`/assets/svgs/icon-${e}.svg`} className={'h-6 w-6 dark:invert'} alt="icon" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex-1">
        <Label>Colors</Label>
        <div className="mt-2 flex flex-wrap gap-4">
          {BG_COLORS.map((c, i) => (
            <div
              key={i}
              className="h-8 w-8 cursor-pointer rounded-md ring-2 ring-primary"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
