import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          variant === 'default' && "bg-blue-600 text-white hover:bg-blue-700",
          variant === 'secondary' && "bg-gray-100 text-gray-900 hover:bg-gray-200",
          variant === 'outline' && "border border-gray-300 hover:bg-gray-50",
          size === 'sm' && "px-3 py-1.5 text-sm",
          size === 'md' && "px-4 py-2",
          size === 'lg' && "px-6 py-3 text-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"