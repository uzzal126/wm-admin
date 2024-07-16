// import {useListView} from '../../core/ListViewProvider'
// import {StoreListGrouping} from './StoreListGrouping'
import {StoreListToolbar} from './StoreListToolbar'
import {UsersListSearchComponent} from './StoreListSearchComponent'

const StoreListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <UsersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {/* {selected.length > 0 ? <StoreListGrouping /> : <StoreListToolbar />} */}
        <StoreListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {StoreListHeader}
