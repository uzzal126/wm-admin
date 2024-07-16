import swal from 'sweetalert'
import {POST_CATEGORY_REMOVE_PRODUCT} from '../../../../../../constants/api.constants'
import {queryRequest} from '../../../../../../library/api.helper'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const DatableGrouping = ({category}) => {
  const {selected, clearSelected} = useListView()
  const {refetch} = useQueryResponse()

  const handlerDelete = async () => {
    // async () => await deleteItem.mutateAsync()
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this product!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        // await deleteSelectedItems.mutateAsync();
        const res = await queryRequest(POST_CATEGORY_REMOVE_PRODUCT, {
          pd_id: selected,
          cat_id: parseInt(category.id) || parseInt(category.original.id),
        })

        if (res.success) {
          clearSelected()
          refetch()
          swal('Your product has been deleted!', {
            icon: 'success',
          })
        }
      }
    })
  }

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button type='button' className='btn btn-danger btn-sm' onClick={() => handlerDelete()}>
        Delete
      </button>
    </div>
  )
}

export {DatableGrouping}
