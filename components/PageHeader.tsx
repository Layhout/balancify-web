'use client'

import { ReactNode } from 'react'
import { Button } from './ui/button'
import { LuArrowLeft } from 'react-icons/lu'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type PageHeaderProps = {
  title: string
  hasBackBtn?: boolean
  hasSearch?: boolean
  action?: ReactNode
  searchPlaceholder?: string
  onSearch?: (value: string) => void
}

export function PageHeader({
  title,
  hasBackBtn = false,
  hasSearch = false,
  action,
  searchPlaceholder,
  onSearch,
}: PageHeaderProps) {
  const router = useRouter()

  return (
    <div className="mb-6">
      <div className="mt-4 flex items-center justify-between md:mt-0">
        <div className="flex items-center gap-2">
          {hasBackBtn && (
            <Button variant="ghost" size="icon" className="md:hidden" onClick={router.back}>
              <LuArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-xl font-bold md:text-3xl">{title}</h1>
        </div>
        {action && <div className={cn('md:hidden', { 'md:block': !hasSearch })}>{action}</div>}
      </div>
      {hasSearch && action && (
        <div className="mt-6 flex items-center justify-between gap-4">
          {hasSearch && (
            <Input
              className="md:max-w-sm"
              placeholder={searchPlaceholder || 'Search...'}
              onKeyDown={(e) => {
                const ele = e.target as HTMLInputElement

                if (e.key === 'Enter') onSearch?.(ele.value)
              }}
              onChange={(e) => {
                if (!e.target.value) onSearch?.(e.target.value)
              }}
              type="search"
            />
          )}
          {action && <div className="hidden md:flex">{action}</div>}
        </div>
      )}
    </div>
  )
}
