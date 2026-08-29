import { AlertCircle, ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useId } from 'react'
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

import { cn } from '@/lib/utils'

interface FieldFrameProps {
  id: string
  label?: string
  error?: string
  hint?: string
  children: ReactNode
}

function FieldFrame({ id, label, error, hint, children }: FieldFrameProps) {
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-200">
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  )
}

const inputClasses = (error?: string, withIcon?: boolean) =>
  cn(
    'h-11 w-full rounded-xl border bg-white/[0.04] px-4 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-violet-400/60 focus:bg-white/[0.06] focus:outline-none',
    withIcon && 'pl-11',
    error ? 'border-rose-500/60' : 'border-white/10',
  )

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: LucideIcon
}

export function Input({ label, error, hint, icon: Icon, className, id, ...rest }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <FieldFrame id={inputId} label={label} error={error} hint={hint}>
      <div className="relative">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        ) : null}
        <input id={inputId} className={cn(inputClasses(error, Boolean(Icon)), className)} {...rest} />
      </div>
    </FieldFrame>
  )
}

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
}

export function Select({ label, error, hint, options, placeholder, className, id, value, ...rest }: SelectProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <FieldFrame id={inputId} label={label} error={error} hint={hint}>
      <div className="relative">
        <select
          id={inputId}
          value={value}
          className={cn(inputClasses(error), 'appearance-none pr-10', value === '' && 'text-slate-500', className)}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-ink-900 text-white">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </FieldFrame>
  )
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export function TextArea({ label, error, hint, className, id, ...rest }: TextAreaProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <FieldFrame id={inputId} label={label} error={error} hint={hint}>
      <textarea
        id={inputId}
        className={cn(
          'w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-violet-400/60 focus:bg-white/[0.06] focus:outline-none',
          error ? 'border-rose-500/60' : 'border-white/10',
          className,
        )}
        {...rest}
      />
    </FieldFrame>
  )
}
