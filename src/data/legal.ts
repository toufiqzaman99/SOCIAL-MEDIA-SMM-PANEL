export type LegalKind = 'terms' | 'privacy' | 'refund'

export interface LegalSection {
  heading: string
  body: string[]
}

export interface LegalDoc {
  title: string
  updated: string
  sections: LegalSection[]
}

export const legalDocs: Record<LegalKind, LegalDoc> = {
  terms: {
    title: 'Terms of Service',
    updated: 'August 2026',
    sections: [
      {
        heading: '1. Overview & demo disclosure',
        body: [
          'Boostly is a demonstration project showcasing a social media growth and marketing services platform. No real services are provided, no real payments are processed, and all orders, balances and activity shown in the application are simulated for demonstration purposes.',
          'By using this website you agree to these Terms of Service. If you do not agree with any part of them, please do not use the website.',
        ],
      },
      {
        heading: '2. Our services',
        body: [
          'Boostly offers marketing and growth services for Instagram, TikTok, YouTube, Facebook, X and Telegram, including follower, like, view, comment and engagement campaigns. All services are marketing/growth services delivered gradually as campaigns.',
          'Results are never guaranteed. Actual outcomes vary depending on many factors outside of our control, and any figures shown in the interface are illustrative.',
        ],
      },
      {
        heading: '3. Orders & delivery',
        body: [
          'When you place an order, you receive an order ID and live status updates (Pending, Processing, Completed or Cancelled) in your dashboard. Delivery estimates are shown on each package and at checkout and refer to when a campaign is estimated to begin, not to any guaranteed outcome.',
        ],
      },
      {
        heading: '4. No credentials required',
        body: [
          'We only ever require the public URL of the profile or page you want to grow. We will never ask for your password or any account credentials. Never share your password with anyone claiming to act on our behalf.',
        ],
      },
      {
        heading: '5. Payments (demo)',
        body: [
          'The checkout in this demo is not connected to a payment gateway. Selecting a payment method and confirming an order does not initiate, authorise or complete any real payment.',
        ],
      },
      {
        heading: '6. Acceptable use',
        body: [
          'You agree to only order services for profiles, pages and channels that you own or are authorised to promote. You are responsible for complying with the terms of service of the social platforms you use.',
        ],
      },
      {
        heading: '7. Liability',
        body: [
          'The website is provided "as is" without warranties of any kind. To the maximum extent permitted by law, we are not liable for any direct or indirect damages arising from the use of the website or the simulated services described on it.',
        ],
      },
      {
        heading: '8. Changes to these terms',
        body: [
          'We may update these Terms of Service from time to time. The date at the top of this page indicates the latest revision.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'August 2026',
    sections: [
      {
        heading: '1. Demo disclosure',
        body: [
          'Boostly is a demonstration project. Any data you enter (names, email addresses, profile URLs, order details) is stored only in your browser and is never transmitted to a server.',
        ],
      },
      {
        heading: '2. Data we collect',
        body: [
          'In this demo, the application stores account details you enter (name and email), order details (platform, service, package, profile URL, payment method selection) and support messages locally in your browser.',
        ],
      },
      {
        heading: '3. How we use data',
        body: [
          'Locally stored data is used only to render the demo experience — your dashboard, order history, wallet and transactions. It is not shared, sold or analysed.',
        ],
      },
      {
        heading: '4. Storage & retention',
        body: [
          'All data lives in your browser\'s local storage and can be removed at any time by clearing your browser data for this site.',
        ],
      },
      {
        heading: '5. Payment information',
        body: [
          'The checkout is a demo and is not connected to any payment gateway. Any card details typed into the demo form are used only for client-side validation and are not transmitted or stored anywhere.',
        ],
      },
      {
        heading: '6. Third-party services',
        body: [
          'A production version of this platform would integrate payment processors and analytics providers. Those integrations are not present in this demo.',
        ],
      },
      {
        heading: '7. Contact',
        body: [
          'Questions about this policy can be sent via the contact page. Since this is a demo, no formal data controller relationship exists.',
        ],
      },
    ],
  },
  refund: {
    title: 'Refund Policy',
    updated: 'August 2026',
    sections: [
      {
        heading: '1. Demo disclosure',
        body: [
          'This is a demonstration platform. No real payments are collected, so no real refunds are processed. This policy describes how refunds would work in a production deployment.',
        ],
      },
      {
        heading: '2. Eligibility',
        body: [
          'Orders that have not started within the estimated window are eligible for a full refund. If we are unable to begin or complete a campaign due to an error on our side, you are entitled to a full or partial refund proportional to the undelivered portion.',
        ],
      },
      {
        heading: '3. Non-refundable cases',
        body: [
          'Orders that have been fully or partially delivered are generally non-refundable, as are orders placed for profiles that are private, restricted or otherwise unreachable — unless the issue is on our side.',
        ],
      },
      {
        heading: '4. How to request a refund',
        body: [
          'Open a support ticket from your dashboard with your order ID and the reason for the request. Requests are reviewed within 2 business days.',
        ],
      },
      {
        heading: '5. Processing time',
        body: [
          'Approved refunds are returned to the original payment method within 5–10 business days depending on the payment provider.',
        ],
      },
    ],
  },
}
