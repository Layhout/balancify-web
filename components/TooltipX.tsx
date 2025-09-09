import { isMobileBrowser } from '@/lib/utils'
import { useMemo } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type TooltipXProps = {
  trigger: JSX.Element
  content: JSX.Element
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined
  align?: 'center' | 'end' | 'start' | undefined
}

export function TooltipX({ trigger, content, align, side }: TooltipXProps) {
  const isMobileDevice = useMemo(isMobileBrowser, [])

  if (isMobileDevice) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent side={side} align={align}>
          {content}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent side={side} align={align}>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
