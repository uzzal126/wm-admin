import {FC} from 'react'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {POST_UPDATE_STATUS_COUPON} from '../../../../../constants/api.constants'
import {queryRequest} from '../../../../../library/api.helper'
import {useQueryResponse} from '../../core/QueryResponseProvider'

type Props = {
  badge?: any
}

const BadgeCell: FC<Props> = ({badge}) => {
  const {refetch} = useQueryResponse()

  const hanldeStatusChange = async (cmp: any) => {
    swal({
      title: 'Are you sure?',
      text: `Once ${cmp.active_status === 'Active' ? 'Inactive' : 'Active'} this '${
        cmp.promo_code
      }' campaign`,
      icon: 'warning',
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        const post = {
          coupon_id: cmp.id,
          active_status: cmp.active_status === 'Active' ? 'Inactive' : 'Active',
        }
        let res = await queryRequest(`${POST_UPDATE_STATUS_COUPON}/${cmp?.id}`, post, 'put')
        if (res.success && res.status_code === 200) {
          refetch()
          toast.success('Status change successfully')
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  const color = 'primary'
  return (
    <div>
      <label className='form-check form-switch form-check-custom form-check-solid'>
        <input
          className='form-check-input h-25px w-50px'
          type='checkbox'
          checked={badge.active_status === 'Active' ? true : false}
          onChange={() => hanldeStatusChange(badge)}
        />
        <span className='form-check-label'>{badge.active_status}</span>
      </label>
    </div>
  )
}

export {BadgeCell}
