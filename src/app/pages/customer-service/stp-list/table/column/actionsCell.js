/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import swal from 'sweetalert'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {getAuth} from '../../../../../modules/auth'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'

const ActionsCell = ({id, data}) => {
  const {query, refetch} = useQueryResponse()
  const queryClient = useQueryClient()
  const {setItemIdForUpdate} = useListView()
  const auth = getAuth()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation({
    mutationFn: () => deleteUser({action_type: 'delete', setting_name: 'stp_list', setting_data: data}),
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      refetch()
      // queryClient.invalidateQueries({ queryKey: [`${QUERIES.USERS_LIST}-${query}`] })
    },
  })

  const handlerDelete = async () => {
    // async () => await deleteItem.mutateAsync()
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this STP List!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteItem.mutateAsync()
        swal('Your STP List has been deleted!', {
          icon: 'success',
        })
      } else {
        swal('Your STP List is safe!')
      }
    })
  }

  return (
    <>
      <button
        className='btn btn-sm btn-icon btn-light-primary w-30px h-30px'
        data-bs-custom-class='cs-tooltip'
        data-bs-toggle='tooltip'
        data-bs-dimiss='click'
        title='Edit User'
        onClick={() => setItemIdForUpdate(data)}
      >
        <i className='fas fa-pencil-alt fs-3'></i>
      </button>
      <button
        className='btn btn-sm btn-icon btn-light-danger w-30px h-30px'
        data-bs-custom-class='cs-tooltip'
        data-kt-users-table-filter='delete_row'
        onClick={() => handlerDelete()}
        data-bs-toggle='tooltip'
        data-bs-dimiss='click'
        title='Delete User'
      >
        <i className='la la-trash-o fs-3'></i>
      </button>
    </>
  )
}

export {ActionsCell}
