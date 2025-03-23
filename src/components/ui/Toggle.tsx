import * as React from 'react';
import { cn } from '@/lib/utils';

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
}

export function Toggle({ pressed, onPressedChange, className, ...props }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      data-state={pressed ? 'on' : 'off'}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-1',
        'text-sm font-medium transition-colors',
        'hover:bg-gray-100 hover:text-gray-900',
        pressed && 'bg-gray-200 text-gray-900',
        className
      )}
      {...props}
    />
  );
}