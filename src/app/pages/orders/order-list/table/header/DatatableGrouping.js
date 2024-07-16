import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {QUERIES} from '../../../../../../_metronic/helpers'
import {Can} from '../../../../../../_metronic/redux/ability'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteSelectedUsers} from '../../core/_requests'

const DatableGrouping = () => {
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const deleteSelectedItems = useMutation({
    mutationFn: () => deleteSelectedUsers(selected),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${QUERIES.USERS_LIST}-${query}`] })
      clearSelected()
    },
  })

  const handlerDelete = async () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this order!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteSelectedItems.mutateAsync()
        toast.success('Your order has been deleted!')
      }
    })
  }

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>
      <Can access='Order Delete' group='orders'>
        <button
          type='button'
          className='btn btn-danger btn-sm'
          onClick={async () => handlerDelete()}
        >
          Delete
        </button>
      </Can>
    </div>
  )
}

export {DatableGrouping}
