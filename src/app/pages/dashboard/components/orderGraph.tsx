import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {usePageData} from '../../../../_metronic/layout/core'
import LineApexChart from '../../../../_metronic/partials/widgets/charts/LineApexChat'
import {DASHBOARD_ORDER_GRAPH} from '../../../constants/api.constants'
import {getQueryRequest} from '../../../library/api.helper'

const OrderGraph = () => {
  const {datePickerData} = usePageData()
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [datePickerData])

  const getData = async () => {
    let slug = `?subtitle=${datePickerData?.selected?.label || 'Today'}&start_date=${
      datePickerData.start_date || moment(new Date()).format('yyyy-MM-DD')
    }&end_date=${datePickerData.end_date || moment(new Date()).format('yyyy-MM-DD')}`

    const res = await getQueryRequest(DASHBOARD_ORDER_GRAPH + slug)
    if (res.success && res.status_code === 200) {
      setData(res.data)
    }
  }

  return (
    <div className='card card-flush overflow-hidden h-lg-100'>
      <div className='card-header pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-dark'>Order History</span>
          <span className='text-gray-400 mt-1 fw-semibold fs-6'>
            {data.length} Order{' '}
            {Object.keys(datePickerData).length > 0
              ? datePickerData?.selected?.label ||
                `${moment(datePickerData.start_date).format('MMM DD, YY')} - ${moment(
                  datePickerData.end_date
                ).format('MMM DD, YY')}`
              : 'Today'}
          </span>
        </h3>
      </div>
      <div className='card-body d-flex align-items-end p-0'>
        <LineApexChart height={400} data={data} title='Order' yaxis='Order' />
      </div>
    </div>
  )
}

export default OrderGraph
