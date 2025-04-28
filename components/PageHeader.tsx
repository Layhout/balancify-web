import { ReactNode } from 'react'
import { Button } from './ui/button'
import { LuArrowLeft } from 'react-icons/lu'
import { Input } from './ui/input'
import Link from 'next/link'

type PageHeaderProps = {
  title: string
  hasBackBtn?: boolean
  hasSearch?: boolean
  action?: ReactNode
  backLink?: string
}

export function PageHeader({ title, hasBackBtn = false, hasSearch = false, action, backLink }: PageHeaderProps) {
  return (
    <>
      <div className="mt-8 flex items-center justify-between md:mt-0">
        <div className="flex items-center gap-2">
          {hasBackBtn && (
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <Link href={backLink || '/app'}>
                <LuArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          )}
          <h1 className="text-xl font-bold md:text-3xl">{title}</h1>
        </div>
        <div className="md:hidden">{action}</div>
      </div>
      {hasSearch && action && (
        <div className="my-6 flex items-center justify-between gap-4">
          {hasSearch && <Input className="md:max-w-sm" placeholder="Search..." type="search" />}
          <div className="hidden md:flex">{action}</div>
        </div>
      )}
    </>
  )
}
