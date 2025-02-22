import { Button } from '@/components/ui/button'
import { AppLinkType } from '../_hooks/useAppLayout'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

type MobileNavProps = {
  appLinks: AppLinkType[]
  pathname: string
}

export default function MobileNav({ appLinks, pathname }: MobileNavProps) {
  return (
    <div className="md:hidden">
      <nav className="fixed bottom-0 left-0 right-0 block h-20 p-2 pt-0">
        <Card className="relative h-full w-full">
          <CardContent className="grid h-full w-full grid-cols-5 overflow-hidden p-0">
            {appLinks.map(({ Icon, SelectedIcon, link, title }) => (
              <div className="flex flex-col items-center justify-center" key={title}>
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  className={cn('translate-y-2 transition-all duration-300 hover:bg-background', {
                    'translate-y-0': pathname.startsWith(link),
                  })}
                >
                  <Link href={link}>
                    <Icon className={cn('hidden h-4 w-4 flex-shrink-0', { block: !pathname.startsWith(link) })} />
                    <SelectedIcon
                      className={cn('hidden h-4 w-4 flex-shrink-0', { block: pathname.startsWith(link) })}
                    />
                  </Link>
                </Button>
                <span
                  className={cn('translate-y-full text-xs opacity-0 transition-all duration-300', {
                    'translate-y-0 opacity-100': pathname.startsWith(link),
                  })}
                >
                  {title}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </nav>
      <div className="h-20" />
    </div>
  )
}
