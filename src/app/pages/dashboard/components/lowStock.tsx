/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {usePageData} from '../../../../_metronic/layout/core'
import {DASHBOARD_LOW_STOCK} from '../../../constants/api.constants'
import {getQueryRequest} from '../../../library/api.helper'
import {Link} from '../../../modules/helper/linkHandler'

const LowStock = () => {
  const {datePickerData} = usePageData()

  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [datePickerData])

  const getData = async () => {
    let slug = `?subtitle=${datePickerData?.selected?.label || 'Today'}&start_date=${
      datePickerData.start_date || moment(new Date()).format('yyyy-MM-DD')
    }&end_date=${datePickerData.end_date || moment(new Date()).format('yyyy-MM-DD')}`
    const res = await getQueryRequest(DASHBOARD_LOW_STOCK + slug)
    if (res.success && res.status_code === 200) {
      setData(res.data)
    }
  }

  return (
    <div className={clsx('card h-100')}>
      <div className='card-header min-h-auto align-items-center mt-3'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark fs-3'>Low Stock</span>
        </h3>
        <div className='card-toolbar'>
          <Link to={'/reports/inventory/low'}>
            <span className='btn btn-light-primary btn-sm btn-icon'>
              <i className='fas fa-eye' />
            </span>
          </Link>
        </div>
      </div>
      <div className='card-body pb-0 pt-5'>
        {data &&
          data.length > 0 &&
          data.map((item: any, i: any) => (
            <div className='row' key={i}>
              <div className='col-9 ps-0'>
                <Link to={`/products/edit/${item?.prod_id}`}>
                  <div className='d-flex mb-7'>
                    <div className='symbol symbol-50px symbol-circle flex-shrink-0 me-4'>
                      <img src={item.thumbnail.src} className='mw-100' alt='' />
                    </div>
                    <div className='d-flex align-items-center flex-wrap flex-grow-1 mt-n2 mt-lg-n1'>
                      <div className='d-flex flex-column flex-grow-1 my-lg-0 my-2 pe-3'>
                        <span className='fs-5 text-gray-600 text-hover-primary fw-bolder'>
                          {item.name}
                        </span>
                        <span className='text-gray-400 fw-bold fs-7 my-1'>SKU: {item.sku}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='col-3 px-0'>
                {item.in_stock <= 0 ? (
                  <div className='text-end py-lg-0 py-2'>
                    <span className='text-danger fw-boldest fs-3'>{item.in_stock}</span>
                    <span className='text-danger fs-7 fw-bold d-block'>Out of Stock</span>
                  </div>
                ) : (
                  <div className='text-end py-lg-0 py-2'>
                    <span className='text-danger fw-boldest fs-3'>{item.in_stock}</span>
                    <span className='text-danger fs-7 fw-bold d-block'>Low Stock</span>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default LowStock
