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
    title: '邮件联系',
    text: 'support@boostly.com',
  },
  {
    icon: Clock,
    title: '客服时间',
    text: '全年 7×24 小时',
  },
  {
    icon: LifeBuoy,
    title: '响应时间',
    text: '24 小时内回复',
  },
]

const topics = ['一般咨询', '订单与交付', '支付与账单', '商务合作', '其他']

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
    if (name.trim().length < 2) next.name = '请输入您的姓名'
    if (!isValidEmail(email)) next.email = '请输入有效的邮箱地址'
    if (!topic) next.topic = '请选择主题'
    if (message.trim().length < 10) next.message = '请再多写一些内容（至少 10 个字符）'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      await createTicket({ subject: `${topic} — ${name.trim()}`, category: topic, message: message.trim() })
      setSent(true)
      push({ title: '消息已发送', description: '我们将在 24 小时内回复。', type: 'success' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="联系我们"
        title={
          <>
            与我们的<span className="text-gradient">客服团队</span>沟通
          </>
        }
        subtitle="对服务、订单或账户有疑问？我们全天候为您服务。"
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
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-bold text-white">消息已发送！</h2>
                  <p className="mt-2 max-w-sm text-sm text-slate-400">
                    感谢您的来信——我们的团队会在 24 小时内回复您。
                  </p>
                  <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
                    再发一条消息
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="姓名"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                      placeholder="张三"
                    />
                    <Input
                      label="邮箱"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                      placeholder="you@example.com"
                    />
                  </div>
                  <Select
                    label="主题"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    error={errors.topic}
                    placeholder="请选择主题"
                    options={topics.map((t) => ({ value: t, label: t }))}
                  />
                  <TextArea
                    label="内容"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={errors.message}
                    placeholder="有什么可以帮您？"
                    rows={6}
                  />
                  <Button type="submit" fullWidth size="lg" loading={submitting} icon={Send}>
                    发送消息
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
