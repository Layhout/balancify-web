import dayjs from 'dayjs'

type BlogListItemProps = Readonly<{
  children: React.ReactNode
  date: string
  title: string
  version: string
}>

export default function BlogListItem({ children, date, title, version }: BlogListItemProps) {
  return (
    <li className="group flex gap-8 pl-2 md:gap-14 md:pl-0">
      <div className="hidden w-20 pt-0.5 md:block">
        <h1 className="whitespace-nowrap text-right text-sm text-muted-foreground">
          {dayjs(date, 'DD/MM/YYYY').format('DD MMM YYYY')}
        </h1>
      </div>
      <div className="relative w-0.5 translate-y-3 bg-border group-last:bg-transparent">
        <div className="absolute left-1/2 top-0 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-border">
          <div className="h-2 w-2 rounded-full bg-background"></div>
        </div>
      </div>
      <div className="flex-1 pb-12">
        <h1 className="font-bold">{title}</h1>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">
          <span className="inline text-sm text-muted-foreground md:hidden">{date} • </span>
          {version}
        </p>
        <p>What we did:</p>
        {children}
      </div>
    </li>
  )
}
