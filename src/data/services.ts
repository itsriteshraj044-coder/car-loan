import type { LucideIcon } from 'lucide-react'
import { CarFront, RefreshCcw, Landmark, ClipboardCheck, FileStack, Network } from 'lucide-react'

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
 * Services appropriate for a DSA distributor: CARZENX assists, prepares and
 * routes applications — the lender approves, prices and disburses.
 */
export const services: Service[] = [
  {
    id: 'new-car-loan',
    index: '01',
    icon: CarFront,
    title: 'New Car Loan Assistance',
    short: 'Guidance from showroom quotation to a lender-ready application for your new car.',
    description:
      'Buying a new car involves choosing the vehicle and the finance together. We help you understand the options available through our lending partners, prepare your application around the on-road quotation, and keep the process moving with the dealer and the lender.',
    includes: [
      'Requirement and budget discussion',
      'Introductions to suitable lending partners',
      'Application preparation around the dealer quotation',
      'Follow-up through to the lender’s decision',
    ],
    image: 'showroom-white',
    imageAlt: 'A white performance car displayed in a bright, glass-fronted showroom',
  },
  {
    id: 'used-car-loan',
    index: '02',
    icon: RefreshCcw,
    title: 'Used Car Loan Assistance',
    short: 'Support for pre-owned car finance, including vehicle and ownership paperwork.',
    description:
      'Pre-owned car finance usually needs more than personal documents — lenders also look at the vehicle’s age, registration, insurance and valuation. We help you understand what is typically required and assemble a complete application.',
    includes: [
      'Guidance on lender criteria for pre-owned vehicles',
      'RC, insurance and valuation paperwork checklist',
      'Coordination with the seller or dealer',
      'Application submission to suitable partners',
    ],
    image: 'black-car-rain',
    imageAlt: 'A black luxury coupé parked on a city street, raindrops on its paintwork',
  },
  {
    id: 'finance-assistance',
    index: '03',
    icon: Landmark,
    title: 'Car Finance Assistance',
    short: 'Help comparing the finance options presented by lending partners — clearly explained.',
    description:
      'Loan offers differ in tenure, processing charges and conditions. We help you read and compare the options that lending partners present, so you can make an informed choice. Final rates and terms are always set by the lender.',
    includes: [
      'Plain-language explanation of loan terms',
      'Side-by-side view of options received',
      'Tenure and EMI planning conversations',
      'Transparent communication at every stage',
    ],
    image: 'consultation',
    imageAlt: 'A finance consultant reviewing paperwork at a desk inside a car showroom',
  },
  {
    id: 'application-support',
    index: '04',
    icon: ClipboardCheck,
    title: 'Loan Application Support',
    short: 'Accurate, complete applications that reduce back-and-forth with lenders.',
    description:
      'Incomplete or inconsistent applications are among the most common causes of delay. We help you fill in applications correctly, check details before submission and track status with the lending partner on your behalf.',
    includes: [
      'Application form assistance',
      'Pre-submission completeness check',
      'Status tracking with the lender',
      'A single point of contact',
    ],
    image: 'documentation',
    imageAlt: 'Two people signing documents across a white table in a modern office',
  },
  {
    id: 'documentation',
    index: '05',
    icon: FileStack,
    title: 'Documentation Guidance',
    short: 'A clear checklist of KYC, income and vehicle documents lenders typically request.',
    description:
      'From KYC and income proof to bank statements and vehicle paperwork, we explain what lenders typically ask for, help you organise it, and flag gaps early — so your application is ready the first time.',
    includes: [
      'Personalised document checklist',
      'Salaried and self-employed guidance',
      'Vehicle paperwork for new and used cars',
      'Secure, consent-based handling of documents',
    ],
    image: 'keys-closeup',
    imageAlt: 'Close-up of car keys being handed from one person to another',
  },
  {
    id: 'dealer-distribution',
    index: '06',
    icon: Network,
    title: 'Dealer Finance Distribution',
    short: 'A finance desk partner for dealerships — connecting your buyers to lending partners.',
    description:
      'For automotive dealers, CARZENX acts as a finance distribution partner: we help your customers access suitable lending partners, support their paperwork and keep your sales team informed, so finance supports the sale instead of slowing it.',
    includes: [
      'Customer finance support for dealerships',
      'Connectivity with multiple lending partners',
      'Documentation handling for dealer customers',
      'Regular status updates for sales teams',
    ],
    image: 'dealer-showroom',
    imageAlt: 'Luxury cars displayed inside a contemporary dealership with polished floors',
  },
]
