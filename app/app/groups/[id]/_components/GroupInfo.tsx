import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'

type GroupInfoProps = {
  name: string
  description: string
  loading: boolean
}

export function GroupInfo({ description, name, loading }: GroupInfoProps) {
  return (
    <div className="mt-6 flex flex-col items-stretch gap-4 md:flex-row md:items-start">
      <div className="flex flex-1 items-center">
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-muted-foreground">Name</p>
          {loading ? (
            <Skeleton className="mt-2 h-4 w-1/3" />
          ) : (
            <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold capitalize">{name}</h1>
          )}
        </div>
        <Button size="icon" className="md:hidden">
          <HiOutlineCog6Tooth />
        </Button>
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">Description</p>
        {loading ? <Skeleton className="mt-2 h-4 w-1/2" /> : <h1>{description}</h1>}
      </div>
    </div>
  )
}
