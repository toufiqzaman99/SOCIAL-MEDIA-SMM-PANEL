import { Facebook, Instagram, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

import { TikTokIcon, XIcon } from '@/components/icons/PlatformIcons'
import Logo from '@/components/ui/Logo'

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Instagram Growth', to: '/services?platform=instagram' },
  { label: 'TikTok Growth', to: '/services?platform=tiktok' },
  { label: 'YouTube Growth', to: '/services?platform=youtube' },
]

const supportLinks = [
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Refund Policy', to: '/refund' },
  { label: 'Support', to: '/contact' },
]

const socials = [
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'TikTok', icon: TikTokIcon, href: '#' },
  { label: 'YouTube', icon: Youtube, href: '#' },
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'X', icon: XIcon, href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-ink-900/40">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Social media growth and marketing services for creators, brands and businesses — across every
            major platform.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                onClick={(e) => e.preventDefault()}
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-violet-400/40 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-slate-400 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-slate-400 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Support</h3>
          <ul className="mt-4 space-y-2.5">
            {supportLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-slate-400 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500">© 2026 Boostly. All rights reserved.</p>
          <p className="max-w-md text-xs leading-relaxed text-slate-600">
            Demo platform — all orders, payments and live activity shown are simulated. Payment gateway not
            connected.
          </p>
        </div>
      </div>
    </footer>
  )
}
