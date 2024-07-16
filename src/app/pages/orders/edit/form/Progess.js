import moment from 'moment'
import {useEffect, useState} from 'react'
import {ORDER_PROGRESS_LIST} from '../../../../constants/api.constants'
import {getQueryRequest} from '../../../../library/api.helper'
import './progress.scss'

const OrderProgress = ({invoice_id}) => {
  const [progress, setProgress] = useState([])
  useEffect(() => {
    getProgress(invoice_id)
  }, [invoice_id])

  const getProgress = async (id) => {
    const res = await getQueryRequest(`${ORDER_PROGRESS_LIST}/${id}`)
    if (res.success && res.status_code === 200) {
      setProgress(res.data)
    }
  }
  // console.log('progress', progress)

  return (
    progress &&
    progress.length > 0 && (
      <div className='card my-5'>
        <div className='card-body'>
          <div className='order-track'>
            <h4>Order Status</h4>
            <div className='separator separator-dashed border-dark mb-3'></div>
            {progress.map((item, i) => (
              <div className='order-track-step' key={i}>
                <div className='order-track-date w-40px text-center me-4 min-w-auto'>
                  <p className='order-track-date-stat text-muted'>
                    {moment.unix(item?.created_at).format('MMM DD HH:mm')}
                  </p>
                </div>
                <div className={`order-track-status ${i === 0 ? 'active' : 'completed'} `}>
                  <span className='order-track-status-dot align-items-center d-flex justify-content-center'>
                    <i className='fas fa-check fs-5 text-white' />
                  </span>
                  <span className='order-track-status-line'></span>
                </div>
                <div className='order-track-text'>
                  <p className={`order-track-text-stat ${i === 0 ? 'text-primary' : ''}`}>
                    {item?.current_order_status}
                  </p>
                  <span className='order-track-text-sub'>{item?.order_note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}

export default OrderProgress
