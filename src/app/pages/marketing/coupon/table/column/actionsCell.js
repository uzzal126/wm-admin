/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteCoupon} from '../../core/_requests'

const ActionsCell = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation({
    mutationFn: () => deleteCoupon(id),
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries({ queryKey: [`${QUERIES.USERS_LIST}-${query}`] })
    },
  })

  const handlerDelete = async () => {
    // async () => await deleteItem.mutateAsync()
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this coupon!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteItem.mutateAsync()
        toast.success('Your coupon has been deleted!')
      }
    })
  }

  return (
    <>
      <button
        onClick={openEditModal}
        className='btn btn-sm btn-icon btn-light-primary w-30px h-30px'
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
        title='Delete product'
      >
        <i className='la la-trash-o fs-3'></i>
      </button>
    </>
  )
}

export {ActionsCell}
