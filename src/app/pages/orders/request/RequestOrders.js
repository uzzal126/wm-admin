import {KTCard} from '../../../../_metronic/helpers'
import PageToolbar from '../../../../_metronic/layout/components/toolbar/PageToolbar'
import {TableHeader} from './table/TableHeader'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DataTable} from './table/DataTable'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {ListViewProvider} from './core/ListViewProvider'
import {pageBreadCrumbs} from '../helper'

const OrderList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  return (
    <>
      <PageToolbar breadcrumbs={pageBreadCrumbs('request')}>
        <TableHeader />
      </PageToolbar>
      <KTCard>
        <DataTable />
      </KTCard>
    </>
  )
}

const RequestOrders = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <OrderList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {RequestOrders}
