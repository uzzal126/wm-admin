import {KTCard} from '../../../../_metronic/helpers'
import PageToolbar from '../../../../_metronic/layout/components/toolbar/PageToolbar'

import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {Payments} from './table/DataTable'
import {TableHeader} from './table/TableHeader'

const profileBreadCrumbs = []

const PaymentList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <PageToolbar breadcrumbs={profileBreadCrumbs}>
        <TableHeader />
      </PageToolbar>
      <KTCard>
        <Payments />
      </KTCard>
      {/* {itemIdForUpdate !== undefined && <UserEditModal />} */}
    </>
  )
}

const PaymentWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <PaymentList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {PaymentWrapper}
