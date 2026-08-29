# ⚡ Boostly — Social Media Growth Services Platform

A premium, dark-themed storefront for social media growth & marketing services (demo).
Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide**.

> **Demo platform.** All orders, payments, wallet funds and live activity are simulated.
> No real services are delivered, no real payments are processed, and no data leaves
> your browser (everything persists to localStorage).

## ✨ Features

- **Marketing site** — animated hero with floating stat cards, platform cards (Instagram, TikTok, YouTube, Facebook, X, Telegram), 23-service catalog, pricing with one-time/monthly toggle, how-it-works, testimonials, simulated live activity feed, FAQ accordion, contact & legal pages.
- **Checkout** — multi-step animated modal (details → payment → done) with validation, card/PayPal/crypto placeholders, clearly labelled **"Demo checkout — payment gateway not connected"**. Never asks for passwords.
- **Dashboard** — responsive sidebar, stat cards with animated counters, orders table with status filters, order timeline, wallet with demo top-up, transactions, support tickets, settings. Auth-guarded route.
- **Auth** — login/register with validation, remember-me, Google placeholder, demo-mode notices.
- **Motion** — Framer Motion throughout: entrance, scroll reveals, counters, accordion, modals, mobile menus, animated aurora blobs + particle canvas (respects `prefers-reduced-motion`).
- **Backend-ready** — all data access goes through a typed mock API layer (`src/api/*`) behind a context store; swap in real HTTP calls without touching the UI.
- **Cinematic hero** — the homepage hero is a fullscreen video hero (background video blended into the dark theme, inline-icon heading in Helvetica Now Display Bold, "Explore Services" CTA, floating stat chips, local particles, staggered fadeUp entrance with a `[0.22, 1, 0.36, 1]` ease) with social-media growth copy.

## 🚀 Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173 — auto-increments if busy)
npm run build      # type-check (tsc) + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # TypeScript check only
```

## 🔑 Demo credentials

Any valid email + password (min 6 chars) signs you in — authentication is simulated.
Or register a new account; everything stays in your browser.

## 🗂 Folder structure

```
src/
├── api/                  # Backend-ready service layer (mock implementations)
│   ├── client.ts         #   shared mock delay/contract
│   ├── storage.ts        #   localStorage persistence + demo seed data
│   ├── auth.ts users.ts services.ts orders.ts payments.ts
│   ├── wallet.ts transactions.ts support.ts index.ts
├── components/
│   ├── auth/             # AuthShell, Google icon
│   ├── background/       # AuroraBackground, ParticlesCanvas
│   ├── checkout/         # OrderForm (multi-step), CheckoutModal
│   ├── dashboard/        # Layout, home, orders, wallet, transactions, support, settings
│   ├── home/             # Hero, platform cards, how-it-works, pricing preview, FAQ, …
│   ├── icons/            # Platform icons (TikTok/X custom SVGs), service icons
│   ├── layout/           # Navbar, Footer, PublicLayout, ScrollToTop, PageLoader
│   ├── pricing/          # PricingCard, PricingGrid
│   ├── services/         # ServiceCard
│   └── ui/               # Button, Field, Modal, Toast, Counter, Reveal, states, …
├── data/                 # Static catalog & content (platforms, services, FAQs, …)
├── lib/                  # utils (formatting, validation), hooks
├── pages/                # Route pages (public + legal + 404)
├── store/                # AppContext, ToastContext, CheckoutContext
├── types/                # Shared TypeScript domain types
├── App.tsx               # Providers + router (lazy-loaded pages, auth guard)
├── index.css             # Tailwind + design tokens (glass, gradients, grid)
└── main.tsx
```

## 🔌 Connecting a real backend

1. Re-implement the modules in `src/api/` against your HTTP endpoints (same return types).
2. The UI talks only to `src/store/AppContext` — no component changes needed.
3. Replace the demo payment notice in `src/components/checkout/OrderForm.tsx` with your
   gateway integration (Stripe / PayPal / crypto) and remove the simulated order
   progression timers in `src/store/AppContext.tsx`.

## ⚖️ Honest-labelling choices (kept by design)

- Services are described as **marketing/growth services**; results are never guaranteed.
- Checkout, wallet and live activity are explicitly labelled **demo**.
- Passwords/credentials are never requested — only a public profile URL.
