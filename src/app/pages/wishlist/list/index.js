import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import PageToolbar from '../../../../_metronic/layout/components/toolbar/PageToolbar'
import {PageTitle} from '../../../../_metronic/layout/core'
import {pageBreadCrumbs} from '../helper'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'

const Report = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)

  const PageBack = [
    {
      title: 'Back Orders',
      path: '/orders/index',
    },
  ]

  return (
    <>
      <PageToolbar breadcrumbs={pageBreadCrumbs('order')}>
        <PageTitle backLink={PageBack}>Wishlist</PageTitle>
        <TableHeader />
      </PageToolbar>

      <KTCard>
        <KTCardBody>
          <DataTable />
        </KTCardBody>
      </KTCard>
    </>
  )
}

const Wishlist = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <Report />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {Wishlist}
