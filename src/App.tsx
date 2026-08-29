import { lazy, Suspense } from 'react'
import type { ReactElement } from 'react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import AuroraBackground from '@/components/background/AuroraBackground'
import ParticlesCanvas from '@/components/background/ParticlesCanvas'
import PageLoader from '@/components/layout/PageLoader'
import PublicLayout from '@/components/layout/PublicLayout'
import ScrollToTop from '@/components/layout/ScrollToTop'
import { AppProvider, useApp } from '@/store/AppContext'
import { CheckoutProvider } from '@/store/CheckoutContext'
import { ToastProvider } from '@/store/ToastContext'

// Lazy-loaded pages — keeps the initial bundle small.
const HomePage = lazy(() => import('@/pages/HomePage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const PricingPage = lazy(() => import('@/pages/PricingPage'))
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage'))
const FaqPage = lazy(() => import('@/pages/FaqPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const LegalPage = lazy(() => import('@/pages/LegalPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

// Dashboard views
const DashboardLayout = lazy(() => import('@/components/dashboard/DashboardLayout'))
const DashboardHome = lazy(() => import('@/components/dashboard/DashboardHome'))
const NewOrderPage = lazy(() => import('@/components/dashboard/NewOrderPage'))
const OrdersPage = lazy(() => import('@/components/dashboard/OrdersPage'))
const WalletPage = lazy(() => import('@/components/dashboard/WalletPage'))
const TransactionsPage = lazy(() => import('@/components/dashboard/TransactionsPage'))
const SupportPage = lazy(() => import('@/components/dashboard/SupportPage'))
const SettingsPage = lazy(() => import('@/components/dashboard/SettingsPage'))

function RequireAuth({ children }: { children: ReactElement }) {
  const { state } = useApp()
  if (!state.user) {
    return <Navigate to="/login" replace state={{ from: '/dashboard' }} />
  }
  return children
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AppProvider>
          <ToastProvider>
            <CheckoutProvider>
              <AuroraBackground />
              <ParticlesCanvas />
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public pages */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/terms" element={<LegalPage kind="terms" />} />
                    <Route path="/privacy" element={<LegalPage kind="privacy" />} />
                    <Route path="/refund" element={<LegalPage kind="refund" />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>

                  {/* Dashboard (protected) */}
                  <Route
                    path="/dashboard"
                    element={
                      <RequireAuth>
                        <DashboardLayout />
                      </RequireAuth>
                    }
                  >
                    <Route index element={<DashboardHome />} />
                    <Route path="new" element={<NewOrderPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="wallet" element={<WalletPage />} />
                    <Route path="transactions" element={<TransactionsPage />} />
                    <Route path="support" element={<SupportPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </CheckoutProvider>
          </ToastProvider>
        </AppProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
