import * as React from 'react'

import { cn } from '@/lib/utils'
import { IconType } from 'react-icons/lib'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: IconType
  endIcon?: IconType
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon
    const EndIcon = endIcon

    return (
      <div className="relative w-full">
        {StartIcon && (
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
            <StartIcon size={18} className="text-muted-foreground" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            startIcon ? 'pl-6' : '',
            endIcon ? 'pr-6' : '',
            className,
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            <EndIcon className="text-muted-foreground" size={18} />
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
