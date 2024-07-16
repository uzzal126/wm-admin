import {KTCard} from '../../../../_metronic/helpers'
import PageToolbar from '../../../../_metronic/layout/components/toolbar/PageToolbar'
import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ProdutDataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'
import {UserEditModal} from './user-edit-modal/UserEditModal'

const profileBreadCrumbs = []

const STPList = () => {
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
        <ProdutDataTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  )
}

const STPWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <STPList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {STPWrapper}
