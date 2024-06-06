import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { getOrder } from '@/data'
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon, CreditCardIcon } from '@heroicons/react/16/solid'
import { notFound } from 'next/navigation'
import { RefundOrder } from './refund'

export async function generateMetadata({ params }) {
  let order = await getOrder(params.id)

  return {
    title: order && `Order #${order.id}`,
  }
}

export default async function Order({ params }) {
  let order = await getOrder(params.id)

  if (!order) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/orders" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Orders
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Cashflow #{order.id}</Heading>
          <Badge color="lime">Successful</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>${order.income}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CreditCardIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span className="inline-flex gap-3">
                {order.barel}
              </span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>Year{' '} {order.year}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <RefundOrder outline amount={order.income}>
              Refund
            </RefundOrder>
            <Button>Resend Invoice</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Expenses</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Invest Capital</DescriptionTerm>
          <DescriptionDetails>{order.invest.capital}</DescriptionDetails>
          <DescriptionTerm>Invest Non Capital</DescriptionTerm>
          <DescriptionDetails>{order.invest.nonCapital}</DescriptionDetails>
          <DescriptionTerm>Operational Expense</DescriptionTerm>
          <DescriptionDetails>{order.opex}</DescriptionDetails>
          <DescriptionTerm>Depreciation</DescriptionTerm>
          <DescriptionDetails>{order.income}</DescriptionDetails>
          <DescriptionTerm>Taxable Income</DescriptionTerm>
          <DescriptionDetails>{order.taxableIncome}</DescriptionDetails>
          <DescriptionTerm>Tax</DescriptionTerm>
          <DescriptionDetails>{order.tax}</DescriptionDetails>
          <DescriptionTerm>Total</DescriptionTerm>
          <DescriptionDetails>
            {order.invest.capital + order.invest.nonCapital + order.opex + order.income + order.taxableIncome + order.tax}
          </DescriptionDetails>
        </DescriptionList>
      </div>
      <div className="mt-12">
        <Subheading>Summary</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Net Cash Flow</DescriptionTerm>
          <DescriptionDetails>{order.ncf}</DescriptionDetails>
        </DescriptionList>
      </div>
    </>
  )
}
