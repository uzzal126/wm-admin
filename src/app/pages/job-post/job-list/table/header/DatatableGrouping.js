import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import swal from 'sweetalert'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { deleteSelectedUsers } from '../../core/_requests'

const DatableGrouping = () => {
  const {selected, clearSelected} = useListView()
  const { refetch} = useQueryResponse()

  const deleteSelectedItems = useMutation({
    mutationFn: () => deleteSelectedUsers(selected),
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      // queryClient.invalidateQueries({ queryKey: [`${QUERIES.USERS_LIST}-${query}`] })
      refetch();
      clearSelected()
    },
  })

  const handlerDelete = async () => {
    // async () => await deleteItem.mutateAsync()
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteSelectedItems.mutateAsync()
        toast.success('Your post has been deleted!')
      }
    })
  }

  return (
    <div className='d-flex align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button type='button' className='btn btn-danger btn-sm' onClick={() => handlerDelete()}>
        Delete
      </button>
    </div>
  )
}

export { DatableGrouping }

