import moment from 'moment'
import {useEffect, useState} from 'react'
import {usePageData} from '../../../../_metronic/layout/core'
import {DASHBOARD_STATUS_SUMMARY} from '../../../constants/api.constants'
import {getQueryRequest} from '../../../library/api.helper'

const StatusGraph = () => {
  const {datePickerData} = usePageData()

  const [status, setStatus] = useState([
    {
      qty: 0,
      label: 'Order Placed',
    },
    {
      qty: 0,
      label: 'Draft Order',
    },
    {
      qty: 0,
      label: 'Ready To ship',
    },
    {
      qty: 0,
      label: 'In Transit',
    },
    {
      qty: 0,
      label: 'Canceled',
    },
    {
      qty: 0,
      label: 'Order Delivered',
    },
    {
      qty: 0,
      label: 'Return',
    },
  ])

  useEffect(() => {
    getData()
  }, [datePickerData])

  const getData = async () => {
    let slug = `?subtitle=${datePickerData?.selected?.label || 'Today'}&start_date=${
      datePickerData.start_date || moment(new Date()).format('yyyy-MM-DD')
    }&end_date=${datePickerData.end_date || moment(new Date()).format('yyyy-MM-DD')}`
    const res = await getQueryRequest(DASHBOARD_STATUS_SUMMARY + slug)
    if (res.success && res.status_code === 200) {
      setStatus(res.data)
    }
  }
  return (
    <div className='card h-lg-100'>
      <div className='card-header pt-4 '>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-gray-800'>Order by Status</span>
          <span className='text-muted fs-5 mt-3'>
            {Object.keys(datePickerData).length > 0
              ? datePickerData?.selected?.label ||
                `${moment(datePickerData.start_date).format('MMM DD, YY')} - ${moment(
                  datePickerData.end_date
                ).format('MMM DD, YY')}`
              : 'Today'}
          </span>
        </h3>
      </div>
      <div className='card-body d-flex flex-column'>
        {status &&
          status.length > 0 &&
          status.map((item, i) => {
            let color = item.label.includes('Ready To shift')
              ? 'primary'
              : item.label.includes('Order Delivered')
              ? 'primary'
              : item.label.includes('In Transit')
              ? 'info'
              : item.label.includes('Return')
              ? 'danger'
              : item.label.includes('Canceled')
              ? 'danger'
              : 'dark'
            return (
              <div
                className='d-flex flex-stack mb-3 border-gray-200 border-dashed rounded p-3'
                key={i}
              >
                <div className='d-flex align-items-center me-2'>
                  <div>
                    <p className={`fs-3 mb-0 text-${color} fw-bold`}>{item.label}</p>
                  </div>
                </div>
                <div className={`badge badge-light-${color} fw-semibold py-2 px-3`}>{item.qty}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default StatusGraph
