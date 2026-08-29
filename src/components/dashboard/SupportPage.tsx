import { LifeBuoy, Send } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import Button from '@/components/ui/Button'
import { Input, Select, TextArea } from '@/components/ui/Field'
import { EmptyState, Skeleton } from '@/components/ui/States'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { useDemoLoading } from '@/lib/hooks'
import { cn, formatRelative } from '@/lib/utils'

const categories = ['Orders & Delivery', 'Payments & Billing', 'Account', 'Other']

export default function SupportPage() {
  const { state, createTicket } = useApp()
  const { push } = useToast()
  const loading = useDemoLoading(450)

  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ subject?: string; category?: string; message?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (subject.trim().length < 4) next.subject = 'Enter a short subject'
    if (!category) next.category = 'Select a category'
    if (message.trim().length < 10) next.message = 'Describe your issue (at least 10 characters)'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      await createTicket({ subject: subject.trim(), category, message: message.trim() })
      setSubject('')
      setCategory('')
      setMessage('')
      push({
        title: 'Ticket created',
        description: 'Our team will reply within 24 hours (demo).',
        type: 'success',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <LifeBuoy className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
        <p className="text-xs leading-relaxed text-slate-400">
          Support is available 24/7. Tickets in this demo are stored locally in your browser and receive
          simulated replies.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Ticket list */}
        <div className="space-y-3">
          <h3 className="font-display text-lg font-semibold text-white">Your tickets</h3>
          {loading ? (
            <>
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </>
          ) : state.tickets.length === 0 ? (
            <EmptyState
              icon={LifeBuoy}
              title="No tickets yet"
              description="Open a ticket and it will appear here."
            />
          ) : (
            state.tickets.map((ticket) => (
              <div key={ticket.id} className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate text-sm font-semibold text-white">{ticket.subject}</p>
                  <span
                    className={cn(
                      'shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
                      ticket.status === 'answered'
                        ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'
                        : 'border-amber-400/25 bg-amber-400/10 text-amber-300',
                    )}
                  >
                    {ticket.status === 'answered' ? 'Answered' : 'Open'}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-xs text-slate-400">{ticket.message}</p>
                <p className="mt-2 text-[11px] text-slate-600">
                  {ticket.id} · {ticket.category} · {formatRelative(ticket.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* New ticket form */}
        <form onSubmit={handleSubmit} className="glass h-fit rounded-3xl p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-white">Open a new ticket</h3>
          <p className="mt-1 text-sm text-slate-400">We usually reply within 24 hours.</p>

          <div className="mt-5 space-y-4">
            <Input
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              error={errors.subject}
              placeholder="Brief summary of your issue"
            />
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              error={errors.category}
              placeholder="Select a category"
              options={categories.map((c) => ({ value: c, label: c }))}
            />
            <TextArea
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={errors.message}
              placeholder="Tell us what is going on — include your order ID if you have one."
              rows={5}
            />
            <Button type="submit" fullWidth loading={submitting} icon={Send}>
              Submit Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
