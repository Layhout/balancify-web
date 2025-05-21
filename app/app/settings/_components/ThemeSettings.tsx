import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AppTheme, THEME } from '@/lib/constants'
import { ThemeDemo } from './ThemeDemo'

type ThemeSettingsProps = {
  appTheme: AppTheme
  // eslint-disable-next-line no-unused-vars
  setAppTheme: (value: AppTheme) => void
}

export function ThemeSettings({ appTheme, setAppTheme }: ThemeSettingsProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex-1 shrink-0">
        <h1 className="mb-1 font-bold">Appearance</h1>
        <p className="text-xs text-muted-foreground">Manage how your app looks</p>
      </div>
      <RadioGroup
        className="flex flex-[2] flex-col flex-wrap gap-4 md:flex-row"
        value={appTheme}
        onValueChange={(v: AppTheme) => setAppTheme(v)}
      >
        <Label htmlFor={`theme-${THEME.LIGHT}`} className="cursor-pointer">
          <ThemeDemo className="hidden md:block" />
          <div className="mt-2 flex items-center gap-2">
            <RadioGroupItem value={THEME.LIGHT} id={`theme-${THEME.LIGHT}`} />
            <h1>Light</h1>
          </div>
        </Label>
        <Label htmlFor={`theme-${THEME.DARK}`} className="cursor-pointer">
          <ThemeDemo theme="dark" className="hidden md:block" />
          <div className="mt-2 flex items-center gap-2">
            <RadioGroupItem value={THEME.DARK} id={`theme-${THEME.DARK}`} />
            <h1>Dark</h1>
          </div>
        </Label>
        <Label htmlFor={`theme-${THEME.SYSTEM}`} className="cursor-pointer">
          <div className="relative hidden h-[150px] w-[250px] overflow-hidden rounded-xl border md:block">
            <div className="absolute left-1/2 top-0 h-full w-full bg-black">
              <ThemeDemo theme={THEME.DARK} className="border-none" />
            </div>
            <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
              <ThemeDemo theme={THEME.LIGHT} className="border-none" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <RadioGroupItem value="system" id={`theme-${THEME.SYSTEM}`} />
            <h1>Auto</h1>
          </div>
        </Label>
      </RadioGroup>
    </div>
  )
}
