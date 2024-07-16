import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersTable} from './table/StoreTable'
import {StoreEditModal} from './edit-modal/StoreEditModal'
import {KTCard} from '../../../../../../../_metronic/helpers'
import {StoreListHeader} from './components/header/StoreListHeader'

const StoreList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <StoreListHeader />
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <StoreEditModal />}
    </>
  )
}

const StoreListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <StoreList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {StoreListWrapper}
