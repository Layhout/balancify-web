import { AppTheme, THEME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

type ThemeDemoProps = {
  theme?: AppTheme
  className?: React.ComponentProps<'div'>['className']
}

export function ThemeDemo({ theme = THEME.LIGHT, className }: ThemeDemoProps) {
  const { bgColor, fgColor15, fgColor10 } = useMemo(() => {
    if (theme === THEME.LIGHT) {
      return {
        bgColor: 'bg-white',
        fgColor15: 'bg-black/15',
        fgColor10: 'bg-black/10',
      }
    } else {
      return {
        bgColor: 'bg-black',
        fgColor15: 'bg-white/15',
        fgColor10: 'bg-white/10',
      }
    }
  }, [theme])

  return (
    <div className={cn('h-[150px] w-[250px] overflow-hidden rounded-xl border', bgColor, theme, className)}>
      <div
        className={cn(
          'relative flex h-full w-full translate-x-[10%] translate-y-[10%] gap-2 rounded-xl p-2',
          fgColor15,
        )}
      >
        <div className="h-full flex-1 shrink-0">
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-[#FF605C]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#FFBD44]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#00CA4E]" />
          </div>
          <div className="mt-3.5 flex flex-col gap-1">
            <div className={cn('h-1.5 w-1/2 rounded-full', fgColor15)} />
            <div className={cn('h-1.5 w-full rounded-full', fgColor15)} />
            <div className={cn('h-1.5 w-1/3 rounded-full', fgColor15)} />
          </div>
          <div className="mt-14 flex items-center gap-1">
            <div className={cn('h-4 w-4 shrink-0 rounded-full', fgColor15)} />
            <div className={cn('h-1.5 flex-1 rounded-full', fgColor15)} />
          </div>
        </div>
        <div className={cn('h-full flex-[3] shrink-0 overflow-hidden rounded-xl p-5 shadow', bgColor)}>
          <div className="flex flex-col gap-1">
            <div className={cn('h-1.5 w-1/6 rounded-full', fgColor15)} />
            <div className={cn('h-1.5 w-1/3 rounded-full', fgColor10)} />
          </div>
          <div className="my-5 flex items-center gap-2">
            <div className={cn('h-8 w-12 rounded', fgColor10)} />
            <div className={cn('h-8 w-12 rounded', fgColor10)} />
            <div className={cn('h-8 w-12 rounded', fgColor10)} />
          </div>
          <div className={cn('h-1.5 w-1/6 rounded-full', fgColor15)} />
        </div>
      </div>
    </div>
  )
}
