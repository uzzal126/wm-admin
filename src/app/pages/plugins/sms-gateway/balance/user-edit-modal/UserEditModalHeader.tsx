import {useListView} from '../core/ListViewProvider'

const UserEditModalHeader = () => {
  const {setItemIdForUpdate, itemIdForUpdate} = useListView()

  return (
    <div className='modal-header py-2'>
      <h2 className='fw-bolder'>{`${itemIdForUpdate ? 'Update Request' : 'Request a Bundle'}`}</h2>
      <div
        className=' btn btn-icon btn-sm btn-active-light-primary'
        data-bs-dismiss='modal'
        aria-label='Close'
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <span className='fas fa-times fs-5' />
      </div>
    </div>
  )
}

export {UserEditModalHeader}
