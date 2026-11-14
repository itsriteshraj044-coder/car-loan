/**
 * Central business details.
 *
 * No verified public CARZENX contact details were found at build time, so every
 * value below marked `placeholder: true` is an editable placeholder. Replace the
 * `value`/`href`, set `placeholder: false`, and the UI updates everywhere.
 */

export interface ContactItem {
  label: string
  value: string
  href?: string
  placeholder: boolean
}

export const site = {
  name: 'CARZENX',
  tagline: 'Car Loan • DSA Distributor',
  url: 'https://www.carzenx.com', // placeholder domain — update before going live
  description:
    'CARZENX is a pan-India car loan DSA distributor, working since 2017, that helps car buyers, dealers and distributors connect with banks such as Axis Bank and ICICI Bank for new car, used car, refinance and balance transfer top-up loans, along with RTO support.',
  contact: {
    phone: { label: 'Phone', value: '+91 91525 28886', href: 'tel:+919152528886', placeholder: false } as ContactItem,
    email: { label: 'Email', value: '[Add email address]', placeholder: true } as ContactItem,
    office: { label: 'Head branch', value: 'Mumbai, Maharashtra', placeholder: false } as ContactItem,
    hours: { label: 'Business hours', value: 'Mon–Sat', placeholder: false } as ContactItem,
  },
  /** Add official profiles only. Left empty on purpose — none were verified. */
  social: [] as { label: string; href: string }[],
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

export const disclosure =
  'CARZENX acts as a Direct Selling Agent (DSA) and does not lend money. All credit decisions, interest rates, fees and loan terms are determined solely by the respective bank or NBFC lending partner, subject to their eligibility criteria and documentation. Loan disbursal and repayments take place directly between the borrower and the lender.'
