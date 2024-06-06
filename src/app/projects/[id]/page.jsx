import { Stat } from '@/app/page'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getEvent, getEventOrders } from '@/data'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  let event = await getEvent(params.id)

  return {
    title: event?.name,
  }
}

export default async function Event({ params }) {
  let event = await getEvent(params.id)
  let orders = await getEventOrders(params.id)

  if (!event) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Projects
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0">
            <img className="aspect-[3/2] rounded-lg shadow" src={event.imgUrl} alt="" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{event.name}</Heading>
              <Badge color={event.status === 'On Going' ? 'lime' : 'zinc'}>{event.status}</Badge>
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">
              {event.date} <span aria-hidden="true">·</span> {event.location} <span aria-hidden="true">·</span> {event.siteManager}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button outline>Edit</Button>
          <Button>View</Button>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-4">
        <Stat title="Net Cash Flow" value={event.totalRevenue} change={event.totalRevenueChange} />
        <Stat
          title="Production"
          value={`${event.ticketsSold} / ${event.ticketsAvailable} Mbbl`}
          change={event.ticketsSoldChange}
        />
        <Stat title="Depreciation" value={event.depreciation} change={event.depreciation} />
        <Stat title="Tax" value={event.tax} change={event.tax} />
      </div>
      <Subheading className="mt-12">Recent cashflows</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow className="text-center">
            <TableHeader>ID</TableHeader>
            <TableHeader>Year</TableHeader>
            <TableHeader>Production</TableHeader>
            <TableHeader>Income</TableHeader>
            <TableHeader colspan="2">Invest</TableHeader>
            <TableHeader>Opex</TableHeader>
            <TableHeader>Di</TableHeader>
            <TableHeader>Taxable Income</TableHeader>
            <TableHeader>Tax</TableHeader>
            <TableHeader>NCF</TableHeader>
            <TableHeader className="text-right">Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow className="text-center">
            <TableHeader colspan="2"></TableHeader>
            <TableHeader>(Mbbl)</TableHeader>
            <TableHeader>($M)</TableHeader>
            <TableHeader>Capital</TableHeader>
            <TableHeader>Non Capital</TableHeader>
            <TableHeader>($M)</TableHeader>
            <TableHeader>($M)</TableHeader>
            <TableHeader>($M)</TableHeader>
            <TableHeader>($M)</TableHeader>
            <TableHeader>($M)</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow className="text-center" key={order.id} href={`/orders/${order.id}`} title={`Order #${order.id}`}>
              <TableCell className="text-zinc-500">{order.id}</TableCell>
              <TableCell>{order.year}</TableCell>
              <TableCell>{order.barel}</TableCell>
              <TableCell>{order.income}</TableCell>
              <TableCell>{order.invest.capital}</TableCell>
              <TableCell>{order.invest.nonCapital}</TableCell>
              <TableCell>{order.opex}</TableCell>
              <TableCell>{order.di}</TableCell>
              <TableCell>{order.taxableIncome}</TableCell>
              <TableCell>{order.tax}</TableCell>
              <TableCell>{order.ncf}</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
