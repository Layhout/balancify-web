import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type AvatarStackProps = {
  items: AvatarStackItemProps[]
  maxSize?: number
  className?: React.ComponentProps<'div'>['className']
}

type AvatarStackItemProps = {
  imageSrc?: string
  initial: string
  bgColor?: string
}

export function AvatarStack({ items, maxSize = 5, className }: AvatarStackProps) {
  if (items.length === 0) return null

  return (
    <div className="flex items-center">
      {items.slice(0, maxSize).map((item, i) => (
        <Avatar key={i} className={cn('-ml-2 h-8 w-8 shadow first:ml-0', className)}>
          <AvatarImage src={item.imageSrc} alt={item.initial} />
          <AvatarFallback className="text-xs uppercase" style={{ backgroundColor: item.bgColor }}>
            {item.initial}
          </AvatarFallback>
        </Avatar>
      ))}
      {items.length > maxSize ? (
        <Avatar className={cn('-ml-2 h-8 w-8 shadow', className)}>
          <AvatarFallback className="text-xs">+{items.length - maxSize}</AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  )
}
