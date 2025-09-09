'use client'

import { ReactNode } from 'react'
import { Button } from './ui/button'
import { LuArrowLeft, LuSearch } from 'react-icons/lu'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'

type PageHeaderProps = {
  title: string
  hasBackBtn?: boolean
  hasSearch?: boolean
  action?: ReactNode
  searchPlaceholder?: string
  onSearch?: (value: string) => void
}

const searchFormSchema = z.object({
  search: z.string().min(3, 'Enter atleast 3 letters'),
})

type searchFromType = z.infer<typeof searchFormSchema>

export function PageHeader({
  title,
  hasBackBtn = false,
  hasSearch = false,
  action,
  searchPlaceholder,
  onSearch,
}: PageHeaderProps) {
  const router = useRouter()

  const searchForm = useForm<searchFromType>({
    resolver: zodResolver(searchFormSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      search: '',
    },
  })

  const onSubmit = (value: searchFromType) => {
    onSearch?.(value.search)
  }

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
            <Form {...searchForm}>
              <form onSubmit={searchForm.handleSubmit(onSubmit)} className="flex w-full gap-4">
                <FormField
                  control={searchForm.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="flex-1 md:max-w-sm">
                      <FormControl>
                        <Input
                          startIcon={() => <LuSearch />}
                          placeholder={searchPlaceholder || 'Search...'}
                          type="search"
                          onInput={(e) => !e.currentTarget.value && onSearch?.('')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Search</Button>
              </form>
            </Form>
          )}
          {action && <div className="hidden md:flex">{action}</div>}
        </div>
      )}
    </div>
  )
}
