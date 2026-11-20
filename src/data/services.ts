import type { LucideIcon } from 'lucide-react'
import { CarFront, Gauge, RefreshCcw, ArrowLeftRight, FileCheck2, Network } from 'lucide-react'

export interface Service {
  id: string
  index: string
  icon: LucideIcon
  title: string
  nav: string
  short: string
  headline: string
  intro: string
  tenure: string
  bestFor: string
  tags: string[]
  includes: string[]
  who: string[]
  docs: { title: string; items: string[] }[]
  steps: { t: string; d: string }[]
  faqs: { q: string; a: string }[]
  image: string
  imageAlt: string
}

const kyc = {
  title: 'Identity & address',
  items: ['PAN card', 'Aadhaar or another valid address proof', 'Recent passport-size photograph'],
}
const income = {
  title: 'Income',
  items: [
    'Salaried: recent salary slips and Form 16',
    'Self-employed: ITRs and business proof',
    'Bank statements for the last 6 months',
  ],
}

/**
 * CARZENX loan products. CARZENX assists, prepares and routes applications;
 * the lending partner approves, prices and disburses. Tenures are indicative.
 */
export const services: Service[] = [
  {
    id: 'new-car-loan',
    index: '01',
    icon: CarFront,
    title: 'New Car Loan',
    nav: 'Finance your next new car',
    short: 'Finance for a brand-new car, planned around your on-road quotation. Indicative tenure of 5 to 7 years.',
    headline: 'Drive out in a new car, with the finance already sorted.',
    intro:
      'Choosing the car and choosing the loan should happen together. We build your application around the dealer’s on-road quotation, match it with suitable lending partners such as Axis Bank and ICICI Bank, and keep the dealer, the lender and you on the same page until disbursal.',
    tenure: '5 to 7 years',
    bestFor: 'Buyers purchasing a new car from a dealership',
    tags: ['5–7 yrs', 'Salaried & self-employed'],
    includes: [
      'Application prepared around the dealer quotation',
      'Options from partner banks such as Axis Bank and ICICI Bank',
      'Document checklist and pick-up coordination',
      'Loan + RTO registration support in one place',
    ],
    who: ['Salaried individuals', 'Self-employed professionals and business owners', 'First-time car buyers', 'Buyers upgrading from an older car'],
    docs: [kyc, income, { title: 'Vehicle', items: ['Proforma invoice or on-road quotation from the dealer'] }],
    steps: [
      { t: 'Share the car and quotation', d: 'Tell us the model, the dealer and your budget.' },
      { t: 'Compare lender options', d: 'We check your profile against partner bank criteria.' },
      { t: 'Submit documents once', d: 'We organise and submit a complete application.' },
      { t: 'Sanction, disbursal, delivery', d: 'The lender pays the dealer and you take the keys.' },
    ],
    faqs: [
      { q: 'How much of the car price can be financed?', a: 'It depends on the lender, the car and your profile. Many lenders finance a large share of the on-road price; the exact amount is set by the lender after assessment.' },
      { q: 'Can I get a new car loan if I am self-employed?', a: 'Yes. Self-employed applicants usually share ITRs and business proof instead of salary slips. We tell you exactly what the chosen lender needs.' },
    ],
    image: 'black-car-rain',
    imageAlt: 'A new black SUV parked on an open road beside a field',
  },
  {
    id: 'used-car-loan',
    index: '02',
    icon: Gauge,
    title: 'Used Car Loan',
    nav: 'Finance a pre-owned car',
    short: 'Pre-owned car finance with the vehicle paperwork handled too. Indicative tenure of 5 to 6 years.',
    headline: 'A pre-owned car, financed without the paperwork headache.',
    intro:
      'With a used car, lenders look at the vehicle as closely as they look at you: its age, registration, insurance and valuation. We assemble a complete application, coordinate with the seller or dealer, route it to suitable partner banks and handle the ownership transfer alongside the loan.',
    tenure: '5 to 6 years',
    bestFor: 'Buyers purchasing a pre-owned car from a dealer or an individual',
    tags: ['5–6 yrs', 'Dealer or private sale'],
    includes: [
      'RC, insurance and valuation checklist',
      'Coordination with the seller or dealer',
      'Application routed to suitable partner banks',
      'RTO ownership transfer and hypothecation support',
    ],
    who: ['Buyers purchasing from a used-car dealer', 'Buyers purchasing directly from an owner', 'Salaried and self-employed applicants'],
    docs: [kyc, income, { title: 'Vehicle', items: ['Copy of the RC', 'Valid insurance', 'Valuation report (arranged with the lender)'] }],
    steps: [
      { t: 'Share the car details', d: 'Model, year, registration state and asking price.' },
      { t: 'Vehicle and profile check', d: 'We check the car and your profile against lender rules.' },
      { t: 'Valuation and documents', d: 'We coordinate valuation and collect paperwork.' },
      { t: 'Disbursal and transfer', d: 'The lender disburses and ownership is transferred.' },
    ],
    faqs: [
      { q: 'How old can the car be?', a: 'Each lender sets its own limit on vehicle age at the end of the loan. Share the year of manufacture and we will tell you which lenders fit.' },
      { q: 'Can I buy from a private seller?', a: 'Yes. We coordinate with the seller for RC, insurance and transfer paperwork so the lender has everything it needs.' },
    ],
    image: 'sedan-twilight',
    imageAlt: 'A busy Indian street lined with cars',
  },
  {
    id: 'car-refinance',
    index: '03',
    icon: RefreshCcw,
    title: 'Car Refinance',
    nav: 'Raise funds against your car',
    short: 'Unlock funds against a car you already own. Indicative tenure of up to 5 years.',
    headline: 'Your car already has value. Put it to work.',
    intro:
      'If you own your car, a refinance loan lets you raise funds against it for business, family or personal needs. We check the vehicle and your profile against lender criteria, prepare the paperwork and submit your application to suitable partner banks.',
    tenure: 'Up to 5 years',
    bestFor: 'Owners who want funds against a car they already own',
    tags: ['Up to 5 yrs', 'Car you own'],
    includes: [
      'Vehicle and profile check against lender criteria',
      'Valuation coordination',
      'RC and insurance documentation guidance',
      'Application submission and status tracking',
    ],
    who: ['Car owners needing funds for business or personal use', 'Self-employed owners looking for working capital', 'Salaried owners'],
    docs: [kyc, income, { title: 'Vehicle', items: ['Original RC in your name', 'Valid insurance'] }],
    steps: [
      { t: 'Tell us about the car', d: 'Model, year and ownership details.' },
      { t: 'Eligibility check', d: 'We match the car and your profile with lenders.' },
      { t: 'Valuation and paperwork', d: 'We coordinate valuation and hypothecation entry.' },
      { t: 'Funds in your account', d: 'The lender disburses after approval.' },
    ],
    faqs: [
      { q: 'Is car refinance the same as a balance transfer?', a: 'No. Refinance raises funds against a car you own. If you already have a running car loan and want to move it, see BT Top-up.' },
    ],
    image: 'sedan-front',
    imageAlt: 'Close-up of the bonnet and badge of a dark sedan',
  },
  {
    id: 'bt-top-up',
    index: '04',
    icon: ArrowLeftRight,
    title: 'BT Top-up',
    nav: 'Move your loan, add a top-up',
    short: 'Move a running car loan to a partner bank and check eligibility for a top-up. For cars up to 12 years old.',
    headline: 'Move your running car loan, and add a top-up on it.',
    intro:
      'With a balance transfer top-up, your existing car loan moves to a partner bank such as Axis Bank or ICICI Bank, with an additional top-up amount on it where you are eligible. It is available for cars up to 12 years old, subject to the lender’s assessment.',
    tenure: 'Up to 5 years',
    bestFor: 'Borrowers with a running car loan and a good repayment record',
    tags: ['Cars up to 12 yrs', 'Up to 5 yrs'],
    includes: [
      'Review of your current loan and repayment track',
      'Options from partner banks such as Axis Bank and ICICI Bank',
      'Foreclosure letter and transfer paperwork handled',
      'Hypothecation update at the RTO',
    ],
    who: ['Borrowers with a running car loan', 'Owners who need extra funds on their existing loan', 'Cars up to 12 years old'],
    docs: [kyc, income, { title: 'Existing loan', items: ['Loan account statement', 'Foreclosure letter from current lender', 'RC and insurance'] }],
    steps: [
      { t: 'Share your current loan', d: 'Lender, outstanding amount and EMI track.' },
      { t: 'Top-up eligibility check', d: 'We check options with partner banks.' },
      { t: 'Transfer paperwork', d: 'We handle foreclosure and transfer documents.' },
      { t: 'Loan moves, top-up disbursed', d: 'The new lender closes the old loan and pays the top-up.' },
    ],
    faqs: [
      { q: 'Will a balance transfer lower my EMI?', a: 'It may, if the new lender offers different terms, but it is not guaranteed. The new lender decides the rate, tenure and top-up amount.' },
    ],
    image: 'documentation',
    imageAlt: 'A team discussing paperwork in an office',
  },
  {
    id: 'loan-rto-services',
    index: '05',
    icon: FileCheck2,
    title: 'Loan + RTO Services',
    nav: 'Registration, transfer, hypothecation',
    short: 'Your car loan and RTO work handled together: registration, transfer and hypothecation.',
    headline: 'The loan and the RTO work, handled by one team.',
    intro:
      'A car loan is only half the job: the RTO records have to follow. Alongside your loan we coordinate registration, ownership transfer and hypothecation entries, so the loan and the vehicle records stay in step. The RTO makes all final decisions and sets official fees.',
    tenure: 'Alongside your loan',
    bestFor: 'Anyone taking a CARZENX-assisted loan who wants the RTO work coordinated',
    tags: ['Registration', 'Transfer', 'Hypothecation'],
    includes: [
      'New registration support',
      'Ownership transfer for used cars',
      'Hypothecation addition and removal',
      'One point of contact for the loan and the RTO',
    ],
    who: ['New car buyers', 'Used car buyers needing transfer', 'Borrowers closing a loan who need hypothecation removed'],
    docs: [kyc, { title: 'Vehicle', items: ['RC (for transfer or hypothecation changes)', 'Insurance', 'Lender NOC where applicable', 'Forms required by the RTO'] }],
    steps: [
      { t: 'Tell us what is needed', d: 'Registration, transfer or hypothecation.' },
      { t: 'Document checklist', d: 'We list exactly what the RTO will ask for.' },
      { t: 'Filing and follow-up', d: 'We coordinate submission and follow up.' },
      { t: 'Updated records', d: 'You receive the updated RC.' },
    ],
    faqs: [
      { q: 'How long does RTO work take?', a: 'Timelines and fees are set by the RTO and differ by state. We keep you updated throughout.' },
    ],
    image: 'consultation',
    imageAlt: 'Staff working through documents in an office',
  },
  {
    id: 'dealer-distributorship',
    index: '06',
    icon: Network,
    title: 'Dealer & Distributorship',
    nav: 'Partner with CARZENX',
    short: 'Pan-India distributorship and a finance desk for dealers, connecting your buyers to banks.',
    headline: 'Close more car sales with finance on your side.',
    intro:
      'Since 2017 CARZENX has worked pan-India with dealers, distributors and banks. We act as a finance desk for dealerships and offer distributorship to business partners, helping your customers reach suitable lenders and keeping your sales team informed.',
    tenure: 'Partnership',
    bestFor: 'New and used car dealers, DSAs and business partners',
    tags: ['Pan-India', 'Dealers & partners'],
    includes: [
      'Finance desk support for your customers',
      'Connections with partner banks',
      'Distributorship opportunities across India',
      'Regular status updates for your sales team',
    ],
    who: ['New car dealerships', 'Used car dealers', 'Automobile business partners', 'Finance consultants'],
    docs: [{ title: 'Business', items: ['Business registration / GST', 'PAN of the business', 'Showroom or office address'] }],
    steps: [
      { t: 'Share business details', d: 'Location, volume and the support you need.' },
      { t: 'Talk to our team', d: 'We discuss the partnership model.' },
      { t: 'Onboarding', d: 'Agreement and setup.' },
      { t: 'Start referring buyers', d: 'We take finance off your plate.' },
    ],
    faqs: [
      { q: 'Is there a fee to become a partner?', a: 'Commercial terms are discussed directly with our team during onboarding.' },
    ],
    image: 'showroom-white',
    imageAlt: 'A row of SUVs lined up for sale',
  },
]

export const loanServices = services.slice(0, 5)
export const findService = (id?: string) => services.find((s) => s.id === id)
