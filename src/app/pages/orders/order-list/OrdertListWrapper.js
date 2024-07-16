import {KTCard} from '../../../../_metronic/helpers'
import PageToolbar from '../../../../_metronic/layout/components/toolbar/PageToolbar'
import {pageBreadCrumbs} from '../helper'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'

const OrderList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  return (
    <>
      <PageToolbar breadcrumbs={pageBreadCrumbs('order')}>
        <TableHeader />
      </PageToolbar>
      <KTCard>
        <DataTable />
      </KTCard>
    </>
  )
}

const OrdertListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <OrderList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {OrdertListWrapper}
