/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import swal from 'sweetalert'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {getAuth} from '../../../../../../modules/auth'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'

const ActionsCell = ({data}) => {
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const auth = getAuth()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(data.id),
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
      text: 'Once deleted, you will not be able to recover this product!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteItem.mutateAsync()
        swal('Your product has been deleted!', {
          icon: 'success',
        })
      } else {
        swal('Your product is safe!')
      }
    })
  }

  //

  return (
    <>
      <a
        rel='noreferrer'
        target={'_blank'}
        href={`${import.meta.env.VITE_THEME_GUEST_URL}/edit/page/${data.pid}/${auth?.user?.refresh_token}`}
        className='btn btn-sm btn-icon btn-light-primary w-30px h-30px'
        data-bs-custom-class='cs-tooltip'
        data-bs-toggle='tooltip'
        data-bs-dimiss='click'
        title='Edit page'
      >
        <i className='fas fa-pencil-alt fs-3'></i>
      </a>

      <button
        className='btn btn-sm btn-icon btn-light-danger w-30px h-30px'
        data-bs-custom-class='cs-tooltip'
        data-kt-users-table-filter='delete_row'
        onClick={() => handlerDelete()}
        data-bs-toggle='tooltip'
        data-bs-dimiss='click'
        title='Delete page'
      >
        <i className='la la-trash-o fs-3'></i>
      </button>
    </>
  )
}

export {ActionsCell}
