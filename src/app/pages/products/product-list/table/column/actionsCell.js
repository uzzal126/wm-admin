/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {QUERIES} from '../../../../../../_metronic/helpers'
import {Can} from '../../../../../../_metronic/redux/ability'
import {Link} from '../../../../../modules/helper/linkHandler'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'

const ActionsCell = ({id, pid, checkout, status}) => {
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${QUERIES.USERS_LIST}-${query}`] })
    },
  })

  const handlerDelete = async () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this product!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteItem.mutateAsync()
        if (res.success && res.status_code) {
          swal('Your product has been deleted!', {
            icon: 'success',
          })
        } else {
          toast.error(res.message)
        }
      } else {
        swal('Your product is safe!')
      }
    })
  }

  const CopyButton = ({textToCopy}) => {
    const copyToClipboard = () => {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => toast.success('Checkout link copied!'))
        .catch((err) => toast.error('Error in copying text: ', err))
    }

    return (
      <button onClick={copyToClipboard} className='text-start btn btn-sm btn-light mb-2'>
        <span className='text-info'>
          <i className='fas fa-cart-plus fs-3 text-info'></i> Quick Checkout
        </span>
      </button>
    )
  }

  return typeof status === 'string' && status?.toLocaleLowerCase()?.includes('delete') ? (
    <></>
  ) : (
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
        <CopyButton textToCopy={checkout} />
        <Can access='Manage Stock' group='products'>
          <Link
            to={`/products/stock/${pid}`}
            state={{id: id}}
            className='text-start btn btn-light btn-sm mb-2'
          >
            <span className='text-success'>
              <i className='fas fa-layer-group text-success'></i> Manage Stock
            </span>
          </Link>
        </Can>
        <Can access='Manage Variants' group='products'>
          <Link to={`/products/variable/${pid}`} className='text-start btn btn-light btn-sm mb-2'>
            <span className='text-dark'>
              <i className='fas fa-layer-group text-dark'></i> Manage Variants
            </span>
          </Link>
        </Can>
        <Can access='Edit Product' group='products'>
          <Link to={`/products/edit/${pid}`} className='text-start btn btn-sm btn-light mb-2'>
            <span className='text-primary'>
              <i className='fas fa-pencil-alt fs-3 text-primary'></i> Edit Product
            </span>
          </Link>
        </Can>
        <Can access='Delete Product' group='products'>
          <button className='text-start btn btn-sm btn-light' onClick={() => handlerDelete()}>
            <span className='text-danger'>
              <i className='la la-trash-o fs-3 text-danger'></i> Delete Product
            </span>
          </button>
        </Can>
      </div>
    </>
  )
}

export {ActionsCell}
