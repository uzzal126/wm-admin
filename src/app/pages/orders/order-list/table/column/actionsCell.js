/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {QUERIES} from '../../../../../../_metronic/helpers'
import {Can} from '../../../../../../_metronic/redux/ability'
import {getAuth} from '../../../../../modules/auth'
import {Link} from '../../../../../modules/helper/linkHandler'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'

const ActionsCell = ({id, invoice_id, channel}) => {
  const {query, refetch} = useQueryResponse()
  const queryClient = useQueryClient()
  const user = getAuth()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(invoice_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${QUERIES.USERS_LIST}-${query}-delete-${invoice_id}`] })
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
        await deleteItem.mutateAsync()
        refetch()
        toast.success('Your order has been deleted!')
      }
    })
  }

  const CopyButton = ({textToCopy}) => {
    const copyToClipboard = () => {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => toast.success('Link copied!'))
        .catch((err) => toast.error('Error in copying text: ', err))
    }

    return (
      <button onClick={copyToClipboard} className='text-start btn btn-sm btn-light mb-2'>
        <span className='text-primary'>
          <i className='fas fa-shuffle fs-3 text-primary'></i> Track Order
        </span>
      </button>
    )
  }

  return (
    <>
      <button
        disabled={false}
        type='button'
        className='btn-action rounded fw-bold bg-transparent border-transparent mx-3 min-w-25px'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='fas fa-ellipsis-vertical text-black' />
      </button>
      <div className='menu menu-sub text-start menu-sub-dropdown w-175px p-2' data-kt-menu='true'>
        <CopyButton
          textToCopy={`https://${user?.shop_info?.domain}/tracking?invoice_id=${invoice_id}`}
        />
        <Can access='Order Print' group='orders'>
          <Link
            target='_blank'
            to={`/orders/invoice`}
            onClick={() => localStorage.setItem('iv_id', JSON.stringify([invoice_id]))}
            className='text-start btn btn-sm btn-light mb-2'
          >
            <span className='text-info'>
              <i className='fas fa-print fs-3 text-info'></i> Print Order
            </span>
          </Link>
        </Can>
        <Can access='Order Label' group='orders'>
          <Link
            target='_blank'
            onClick={() => localStorage.setItem('ids', JSON.stringify([invoice_id]))}
            to={`/orders/shipping-label`}
            className='text-start btn btn-sm btn-light mb-2'
          >
            <span className='text-success'>
              <i className='fas fa-print fs-3 text-success'></i> Generate Label
            </span>
          </Link>
        </Can>
        {!channel.includes('Website') && (
          <>
            <Can access='Order Edit' group='orders'>
              <Link
                to={`/orders/edit/${id}/${invoice_id}`}
                className='text-start btn btn-sm btn-light mb-2'
              >
                <span className='text-primary'>
                  <i className='fas fa-pencil-alt fs-3 text-primary'></i> Edit Order
                </span>
              </Link>
            </Can>
            <Can access='Order Delete' group='orders'>
              <button
                className='text-start btn btn-sm btn-light'
                disabled={channel.includes('Website')}
                onClick={() => handlerDelete()}
              >
                <span className='text-danger'>
                  <i className='fas fa-trash fs-3 text-danger'></i> Delete Order
                </span>
              </button>
            </Can>
          </>
        )}
      </div>
    </>
  )
}

export {ActionsCell}
