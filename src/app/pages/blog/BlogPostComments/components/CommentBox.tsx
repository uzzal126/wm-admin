import moment from 'moment'
import {Fragment} from 'react'
import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {deleteUser, restoreUser} from '../core/_requests'

export default function CommentBox({comment}: any) {
  function isValidURL(url: any) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

    return urlPattern.test(url)
  }

  const {refetch} = useQueryResponse()

  const deleteItem = useMutation({
    mutationFn: (id: any) => deleteUser(id),
    onSuccess: () => refetch(),
  });

  const restoreItem = useMutation({
    mutationFn: (id: any) => restoreUser(id),
    onSuccess: () => refetch(),
  });

  const handlerDelete = async (id: any) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, all of its children comments will also be deleted!',
      icon: 'warning',
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res: any = await deleteItem.mutateAsync(id)
        if (res.success && res.status_code) {
          // swal('Your post has been deleted!', {
          //   icon: 'success',
          // })
        } else {
          toast.error(res.message)
        }
      } else {
        swal('This comment is safe!')
      }
    })
  }

  const handleRestore = async (id: any) => {
    swal({
      title: 'Are you sure?',
      text: 'If you restore the comment all of its parents will also be restored!',
      icon: 'warning',
      dangerMode: true,
    }).then(async (willRestore) => {
      if (willRestore) {
        const res: any = await restoreItem.mutateAsync(id)
        if (res.success && res.status_code) {
          // swal('Your post has been deleted!', {
          //   icon: 'success',
          // })
        } else {
          toast.error(res.message)
        }
      } else {
        swal('This comment is safe!')
      }
    })
  }

  return (
    <div
      className='devs-box rounded p-3 rounded-3 border border-dashed border-gray-300 mb-2'
      id={`kt_post_comment_${comment?.id}`}
      data-kt-reply-id={comment?.id}
    >
      <div className='mb-0'>
        <div className='d-flex flex-stack flex-wrap'>
          <a href='javascript:void(0)'>
            <div className='d-flex align-items-center py-1'>
              <div className='symbol symbol-30px me-2'>
                <img
                  src={
                    isValidURL(comment?.image_url)
                      ? comment?.image_url
                      : 'https://lh3.googleusercontent.com/a/AEdFTp4jOvKt_JS06Pzo07DLPVnj-YN_20qlDNLKz93e=s96-c'
                  }
                  alt='user'
                />
              </div>
              <div className='d-flex flex-column align-items-start justify-content-center'>
                <span className='d-flex align-items-center text-gray-900 fs-7 fw-bolder lh-1 mb-1'>
                  {comment?.commenter_name}
                </span>
                <span
                  className='text-muted fs-8 fw-semibold lh-1'
                  data-bs-toggle='tooltip'
                  data-bs-dismiss='click'
                  data-bs-original-title='11 Jan, 2023 6:07 PM UTC'
                  data-kt-initialized={1}
                >
                  {moment.unix(comment?.created_at).format('LLL')}
                </span>
              </div>
            </div>
          </a>
          <div className='d-flex align-items-center py-1 me-n3 gap-2' style={{paddingRight: '5px'}}>
            {comment?.status ? (
              <button
                className='btn btn-sm btn-bordered py-2 px-3'
                data-bs-toggle='modal'
                data-bs-target='#page_modal_account_login'
                onClick={() => handlerDelete(comment?.id)}
              >
                <span className='text-danger'>
                  <i className='fas fa-trash fs-3 text-danger'></i> Delete
                </span>
              </button>
            ) : (
              <button
                className='btn btn-sm btn-bordered  py-2 px-3'
                data-bs-toggle='modal'
                data-bs-target='#page_modal_account_login'
                onClick={() => handleRestore(comment?.id)}
              >
                <span className='text-gray'>
                  <i className='fas fa-reply fs-3 text-gray'></i> Restore Comment
                </span>
              </button>
            )}
          </div>
        </div>
        <div
          className='fs-6 fw-normal text-gray-800 overflow-hidden'
          data-kt-element='reply-text'
          data-kt-original-text={comment?.comment_text}
          data-kt-review=''
          data-kt-public={1}
        >
          {comment?.status ? (
            <Fragment>
              <br />
              <p>{comment?.comment_text}</p>
            </Fragment>
          ) : (
            <i>This comment was deleted!</i>
          )}
        </div>
      </div>
    </div>
  )
}
