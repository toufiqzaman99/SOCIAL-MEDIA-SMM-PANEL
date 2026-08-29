import { CheckCircle2, Clock, LifeBuoy, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import { Input, Select, TextArea } from '@/components/ui/Field'
import { Reveal } from '@/components/ui/Reveal'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { isValidEmail } from '@/lib/utils'

const infoCards = [
  {
    icon: Mail,
    title: 'Email us',
    text: 'support@boostly.com',
  },
  {
    icon: Clock,
    title: 'Support hours',
    text: '24/7, every day of the year',
  },
  {
    icon: LifeBuoy,
    title: 'Response time',
    text: 'Within 24 hours',
  },
]

const topics = ['General question', 'Orders & Delivery', 'Payments & Billing', 'Partnership', 'Other']

export default function ContactPage() {
  const { createTicket } = useApp()
  const { push } = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; topic?: string; message?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (name.trim().length < 2) next.name = 'Enter your name'
    if (!isValidEmail(email)) next.email = 'Enter a valid email address'
    if (!topic) next.topic = 'Select a topic'
    if (message.trim().length < 10) next.message = 'Tell us a bit more (at least 10 characters)'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      await createTicket({ subject: `${topic} — ${name.trim()}`, category: topic, message: message.trim() })
      setSent(true)
      push({ title: 'Message sent', description: 'We will reply within 24 hours (demo).', type: 'success' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Talk to our <span className="text-gradient">support team</span>
          </>
        }
        subtitle="Questions about services, orders or your account? We are here around the clock."
      />

      <section className="pb-24">
        <div className="container-x grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Info cards */}
          <Reveal className="space-y-4">
            {infoCards.map((card) => (
              <div key={card.title} className="glass flex items-start gap-4 rounded-3xl p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-300">
                  <card.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">{card.title}</p>
                  <p className="mt-0.5 text-sm text-slate-400">{card.text}</p>
                </div>
              </div>
            ))}
            <p className="px-2 text-xs leading-relaxed text-slate-600">
              Demo site — messages are stored locally in your browser and never sent to a real team.
            </p>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-bold text-white">Message sent!</h2>
                  <p className="mt-2 max-w-sm text-sm text-slate-400">
                    Thanks for reaching out — our team would reply within 24 hours. This is a demo, so the
                    message stays in your browser.
                  </p>
                  <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                      placeholder="Alex Morgan"
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                      placeholder="you@example.com"
                    />
                  </div>
                  <Select
                    label="Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    error={errors.topic}
                    placeholder="Select a topic"
                    options={topics.map((t) => ({ value: t, label: t }))}
                  />
                  <TextArea
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={errors.message}
                    placeholder="How can we help?"
                    rows={6}
                  />
                  <Button type="submit" fullWidth size="lg" loading={submitting} icon={Send}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
