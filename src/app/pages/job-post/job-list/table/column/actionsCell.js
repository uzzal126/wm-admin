/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import swal from 'sweetalert'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { Link } from '../../../../../modules/helper/linkHandler'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { deleteUser } from '../../core/_requests'

const ActionsCell = ({id, slug}) => {
  const {refetch} = useQueryResponse()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      refetch()
    },
  });

  const handlerDelete = async () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteItem.mutateAsync()
        if (res.success && res.status_code) {
          swal('Your post has been deleted!', {
            icon: 'success',
          })
        } else {
          toast.error(res.message)
        }
      } else {
        swal('Your post is safe!')
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
        {/* <Can access='Edit Post' group='post'> */}
        <Link to={`/career/jobs/${slug}/applicants`} className='text-start btn btn-sm btn-light mb-2'>
            <span className='text-primary'>
              <i className='fas fa-file-alt fs-3 text-primary'></i> View Applicants
            </span>
          </Link>
          <Link to={`/career/jobs/edit/${slug}`} className='text-start btn btn-sm btn-light mb-2'>
            <span className='text-primary'>
              <i className='fas fa-pencil-alt fs-3 text-primary'></i> Edit Post
            </span>
          </Link>
        {/* </Can> */}
        {/* <Can access='Delete Post' group='post'> */}
          <button className='text-start btn btn-sm btn-light' onClick={() => handlerDelete()}>
            <span className='text-danger'>
              <i className='la la-trash-o fs-3 text-danger'></i> Delete Post
            </span>
          </button>
        {/* </Can> */}
      </div>
    </>
  )
}

export { ActionsCell }

