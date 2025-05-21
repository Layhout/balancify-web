import { cn } from '@/lib/utils'
import { AppNavLink } from '../_hooks/useAppLayout'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { UserResource } from '@clerk/types'
import { Dispatch, SetStateAction } from 'react'
import { motion, Variants } from 'motion/react'
import { Skeleton } from '@/components/ui/skeleton'
import { dark } from '@clerk/themes'
import { useAtomValue } from 'jotai'
import { isDarkModeAtom } from '@/repositories/layout'
import { ROUTES } from '@/lib/constants'
import { LuExternalLink } from 'react-icons/lu'
import { APP_V } from '@/lib/version'

type DesktopNavProps = {
  isCollapsed: boolean
  appNavLinks: AppNavLink[]
  pathname: string
  userLoaded: boolean
  user: UserResource | null | undefined
  setIsCollapsed: Dispatch<SetStateAction<boolean>>
}

const navVariants: Variants = {
  open: {
    width: 250,
  },
  close: {
    width: 70,
  },
}

export function DesktopNav({ isCollapsed, appNavLinks, pathname, userLoaded, user, setIsCollapsed }: DesktopNavProps) {
  const isDarkMode = useAtomValue(isDarkModeAtom)

  return (
    <motion.nav
      className="relative z-50 hidden flex-shrink-0 flex-col justify-between border-r p-4 md:flex"
      variants={navVariants}
      initial={false}
      animate={isCollapsed ? 'close' : 'open'}
    >
      <div>
        <h1 className={cn('overflow-hidden whitespace-nowrap text-lg font-bold', { hidden: isCollapsed })}>
          Balancify{' '}
          <Link
            href={ROUTES.LANDING.BLOGS}
            className="inline-flex cursor-pointer items-center gap-1 text-xs font-normal text-muted-foreground"
          >
            v{APP_V} <LuExternalLink />
          </Link>
        </h1>
        <h1 className={cn('hidden text-center text-lg font-bold', { block: isCollapsed })}>B</h1>
      </div>
      <div className={cn('flex flex-col gap-2 overflow-hidden', { 'items-center': isCollapsed })}>
        {appNavLinks.map(({ Icon, link, title }) => (
          <Tooltip key={title} open={isCollapsed ? undefined : false}>
            <TooltipTrigger asChild>
              <Link
                href={link}
                className={buttonVariants({
                  variant: pathname.startsWith(link) ? 'default' : 'ghost',
                  size: isCollapsed ? 'icon' : undefined,
                  className: 'gap-4 whitespace-nowrap',
                })}
                style={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
              >
                <Icon className="h-4 w-4 flex-shrink-0" /> <span className={cn({ hidden: isCollapsed })}>{title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className="flex h-9 items-center gap-2">
        {userLoaded ? (
          <>
            <UserButton
              appearance={{ elements: { avatarBox: 'h-9 w-9 border' }, baseTheme: isDarkMode ? dark : undefined }}
            />
            <div
              className={cn('flex flex-col overflow-hidden', {
                hidden: isCollapsed,
              })}
            >
              <h1 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
                {user?.firstName}
              </h1>
              <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </>
        ) : (
          <>
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className={cn('h-4 flex-1', { hidden: isCollapsed })} />
          </>
        )}
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="group absolute right-0 top-1/2 z-10 flex h-14 w-8 -translate-y-1/2 translate-x-full cursor-pointer items-center justify-center"
            onClick={() => setIsCollapsed((p) => !p)}
          >
            <div className="relative h-6 w-1 translate-y-1">
              <span
                className={cn(
                  'absolute left-0 top-0 h-3 w-full origin-top rotate-0 rounded-full bg-border transition-all duration-300 group-hover:bg-muted-foreground',
                  { 'group-hover:-rotate-[20deg]': isCollapsed, 'group-hover:rotate-[20deg]': !isCollapsed },
                )}
              />
              <span
                className={cn(
                  'absolute bottom-0 left-0 h-3 w-full origin-bottom -translate-y-1 rotate-0 rounded-full bg-border transition-all duration-300 group-hover:bg-muted-foreground',
                  { 'group-hover:rotate-[20deg]': isCollapsed, 'group-hover:-rotate-[20deg]': !isCollapsed },
                )}
              />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{isCollapsed ? 'Open' : 'Close'} sidebar</p>
        </TooltipContent>
      </Tooltip>
    </motion.nav>
  )
}
