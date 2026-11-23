/** Central business details. Edit here and the whole site updates. */
export const site = {
  name: 'Carzenx Pvt. Ltd.',
  tagline: 'Car Loan • DSA Distributor',
  url: 'https://carzenx.in',
  since: 2017,
  description:
    'Carzenx Pvt. Ltd. is a pan-India car loan DSA distributor, working since 2017, connecting car buyers, dealers and distributors with banks such as Axis Bank and ICICI Bank for new car, used car, refinance and BT top-up loans, along with RTO support.',
  phone: { display: '+91 91525 28886', href: 'tel:+919152528886' },
  email: { display: 'support@carzenx.in', href: 'mailto:support@carzenx.in' },
  info: { display: 'info@carzenx.in', href: 'mailto:info@carzenx.in' },
  office: 'Head branch: Mumbai, Maharashtra',
  hours: 'Monday to Saturday',
  /** WhatsApp number with country code, digits only. Leave empty to hide WhatsApp buttons. */
  whatsapp: '',
  directors: [
    { name: 'Arshia Naz', initials: 'AN', role: 'Director, Carzenx Pvt. Ltd.' },
    { name: 'Vishal Pandey', initials: 'VP', role: 'Director, Carzenx Pvt. Ltd.' },
  ],
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Loans', to: '/services' },
  { label: 'Dealer Network', to: '/dealer-network' },
  { label: 'Contact', to: '/contact' },
]

export const disclosure =
  'Carzenx Pvt. Ltd. acts as a Direct Selling Agent (DSA) and does not lend money. All credit decisions, interest rates, fees and loan terms are decided solely by the respective bank or NBFC, subject to their eligibility criteria and documentation. Loan disbursal and repayments take place directly between the borrower and the lender. Tenures shown are indicative.'

export const mailto = (subject: string, body: string) =>
  `${site.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
