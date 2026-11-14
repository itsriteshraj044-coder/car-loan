import type { LucideIcon } from 'lucide-react'
import { CarFront, RefreshCcw, ArrowLeftRight, BadgeIndianRupee, FileCheck2, Network } from 'lucide-react'

export interface Service {
  id: string
  index: string
  icon: LucideIcon
  title: string
  short: string
  description: string
  includes: string[]
  image: string
  imageAlt: string
}

/**
 * CARZENX loan products (DSA distributor: CARZENX assists, prepares and routes
 * applications — the lending partner approves, prices and disburses).
 * Tenures are indicative and always subject to the lender's policy.
 */
export const services: Service[] = [
  {
    id: 'new-car-loan',
    index: '01',
    icon: CarFront,
    title: 'New Car Loan',
    short: 'Finance for your new car with a tenure of 5 to 7 years, from quotation to disbursal.',
    description:
      'Buying a new car involves choosing the vehicle and the finance together. We prepare your application around the on-road quotation, connect you with banks such as Axis Bank and ICICI Bank, and keep the process moving with the dealer and the lender — with loan tenures of 5 to 7 years.',
    includes: [
      'Loan tenure of 5 to 7 years',
      'Application prepared around the dealer quotation',
      'Partner banks such as Axis Bank and ICICI Bank',
      'Loan + RTO support in one place',
    ],
    image: 'showroom-white',
    imageAlt: 'A white performance car displayed in a bright, glass-fronted showroom',
  },
  {
    id: 'used-car-loan',
    index: '02',
    icon: RefreshCcw,
    title: 'Used Car Loan',
    short: 'Pre-owned car finance with a tenure of 5 to 6 years, including vehicle paperwork.',
    description:
      'Pre-owned car finance needs more than personal documents — lenders also look at the vehicle’s age, registration, insurance and valuation. We assemble a complete application, coordinate with the seller or dealer and route it to suitable partner banks, with loan tenures of 5 to 6 years.',
    includes: [
      'Loan tenure of 5 to 6 years',
      'RC, insurance and valuation paperwork checklist',
      'Coordination with the seller or dealer',
      'RTO transfer support alongside the loan',
    ],
    image: 'black-car-rain',
    imageAlt: 'A black luxury coupé parked on a city street, raindrops on its paintwork',
  },
  {
    id: 'car-refinance',
    index: '03',
    icon: ArrowLeftRight,
    title: 'Car Refinance',
    short: 'Raise funds against a car you already own, with a tenure of up to 5 years.',
    description:
      'Already own your car outright? A refinance loan lets you unlock funds against it. We check the vehicle and your profile against lender criteria, prepare the paperwork and submit your application to suitable partner banks — with tenures of up to 5 years.',
    includes: [
      'Loan tenure of up to 5 years',
      'Vehicle and profile check against lender criteria',
      'RC and insurance documentation guidance',
      'Application submission and status tracking',
    ],
    image: 'consultation',
    imageAlt: 'A finance consultant reviewing paperwork at a desk inside a car showroom',
  },
  {
    id: 'bt-top-up',
    index: '04',
    icon: BadgeIndianRupee,
    title: 'BT Top-up (Balance Transfer)',
    short: 'Move your running car loan and take a top-up on it — for cars up to 12 years old.',
    description:
      'With a balance transfer top-up, your existing car loan moves to a partner bank such as Axis Bank or ICICI Bank, with an additional top-up amount on it. Available for cars up to 12 years old, with tenures of up to 5 years, subject to the lender’s assessment.',
    includes: [
      'For cars up to 12 years old',
      'Loan tenure of up to 5 years',
      'Partner banks such as Axis Bank and ICICI Bank',
      'Foreclosure and transfer paperwork handled',
    ],
    image: 'documentation',
    imageAlt: 'Two people signing documents across a white table in a modern office',
  },
  {
    id: 'loan-rto',
    index: '05',
    icon: FileCheck2,
    title: 'Loan + RTO Services',
    short: 'Your car loan and RTO work handled together — registration, transfer and hypothecation.',
    description:
      'A car loan is only half the job — the RTO paperwork has to follow. Alongside your loan, we help with registration, ownership transfer and hypothecation entries, so the loan and the vehicle records stay in step.',
    includes: [
      'New registration support',
      'Ownership transfer for used cars',
      'Hypothecation addition and removal',
      'One point of contact for loan and RTO',
    ],
    image: 'keys-closeup',
    imageAlt: 'Close-up of car keys being handed from one person to another',
  },
  {
    id: 'dealer-distribution',
    index: '06',
    icon: Network,
    title: 'Dealer & Distributorship',
    short: 'Pan-India distributorship for dealers and partners — connecting your buyers to banks.',
    description:
      'Since 2017, CARZENX has worked pan-India with dealers, distributors and banks. We offer distributorship to partners and act as a finance desk for dealerships — helping customers access suitable lending partners, supporting their paperwork and keeping your sales team informed.',
    includes: [
      'Pan-India distributorship opportunities',
      'Customer finance support for dealerships',
      'Connectivity with partner banks',
      'Regular status updates for sales teams',
    ],
    image: 'dealer-showroom',
    imageAlt: 'Luxury cars displayed inside a contemporary dealership with polished floors',
  },
]
