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

const ActionsCell = ({id, pid}) => {
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [`${QUERIES.USERS_LIST}-${query}`] }),
  });

  const handlerDelete = async () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteItem.mutateAsync()
        if (res.success && res.status_code) {
          swal('Blog post has been deleted!', {
            icon: 'success',
          })
        } else {
          toast.error(res.message)
        }
      } else {
        swal('Blog post was not deleted')
      }
    })
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
        <Link to={`/blogs/${pid}/comments`} className='text-start btn btn-sm btn-light mb-2'>
          <span className='text-primary'>
            <i className='fas fa-comment-alt fs-3 text-primary'></i> View Comments
          </span>
        </Link>
        <Can access='Edit Post' group='blog'>
          <Link to={`/blogs/edit/${pid}`} className='text-start btn btn-sm btn-light mb-2'>
            <span className='text-primary'>
              <i className='fas fa-pencil-alt fs-3 text-primary'></i> Edit Post
            </span>
          </Link>
        </Can>
        <Can access='Edit Post' group='blog'>
          <button className='text-start btn btn-sm btn-light' onClick={() => handlerDelete()}>
            <span className='text-danger'>
              <i className='la la-trash-o fs-3 text-danger'></i> Delete Post
            </span>
          </button>
        </Can>
      </div>
    </>
  )
}

export {ActionsCell}
