/**
 * Lending partner logos for the partner marquee.
 *
 * Set `live` to false for any lender that should be hidden from the site.
 * Showing a lender's logo tells customers Carzenx Pvt. Ltd. works with that lender.
 * Logo files live in /public/images/partners/.
 */
export interface Partner {
  name: string
  logo: string
  live: boolean
}

const p = (name: string, file: string, live = true): Partner => ({ name, logo: `/images/partners/${file}`, live })

export const allPartners: Partner[] = [
  p('Axis Bank', 'axis-bank.webp', true),
  p('ICICI Bank', 'icici-bank.svg', true),
  p('HDFC Bank', 'hdfc-bank.webp'),
  p('TVS Credit', 'tvs-credit.webp'),
  p('Cholamandalam Finance', 'cholamandalam.webp'),
  p('Mahindra Finance', 'mahindra-finance.webp'),
  p('Kotak Mahindra Prime', 'kotak-prime.webp'),
  p('Yes Bank', 'yes-bank.webp'),
  p('Hero FinCorp', 'hero-fincorp.webp'),
  p('ITI Finance', 'iti-finance.webp'),
  p('Federal Bank', 'federal-bank.webp'),
  p('IndusInd Bank', 'indusind-bank.webp'),
  p('Muthoot Capital', 'muthoot-capital.webp'),
  p('Tata Capital', 'tata-capital.webp'),
  p('Poonawalla Fincorp', 'poonawalla-fincorp.webp'),
  p('IDFC FIRST Bank', 'idfc-first-bank.webp'),
  p('Manappuram Finance', 'manappuram.webp'),
  p('South Indian Bank', 'south-indian-bank.webp'),
  p('Bajaj Finserv', 'bajaj-finserv.webp'),
  p('HDB Financial Services', 'hdb-financial.webp'),
  p('AU Small Finance Bank', 'au-small-finance-bank.webp'),
  p('Equitas Small Finance Bank', 'equitas-sfb.webp'),
  p('Piramal Finance', 'piramal-finance.webp'),
  p('Kogta Financial', 'kogta-financial.webp'),
  p('Toyota Financial Services', 'toyota-financial.webp'),
  p('Indian Overseas Bank', 'indian-overseas-bank.webp'),
  p('RBL Bank', 'rbl-bank.webp'),
  p('Vastu Finserve', 'vastu-finserv.webp'),
  p('ESAF Small Finance Bank', 'esaf-sfb.webp'),
  p('IKF Finance', 'ikf-finance.webp'),
  p('LiquiLoans', 'liquiloans.webp'),
  p('Shriram Finance', 'shriram-finance.webp'),
  p('SK Finance', 'sk-finance.webp'),
  p('Bandhan Bank', 'bandhan-bank.webp'),
  p('IndoStar Capital Finance', 'indostar-capital.webp'),
  p('Loans24', 'loans24.webp'),
  p('Saraswat Co-operative Bank', 'saraswat-bank.webp'),
  p('Jana Small Finance Bank', 'jana-sfb.webp'),
  p('Bank of Baroda', 'bank-of-baroda.webp'),
  p('UCO Bank', 'uco-bank.webp'),
  p('Ujjivan Small Finance Bank', 'ujjivan-sfb.webp'),
  p('CSB Bank', 'csb-bank.webp'),
]

export const partners = allPartners.filter((x) => x.live)
