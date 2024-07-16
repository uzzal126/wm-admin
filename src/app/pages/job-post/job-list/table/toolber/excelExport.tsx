import moment from 'moment'
import {useEffect, useState} from 'react'
import {CSVLink} from 'react-csv'
import slugify from 'react-url-slugify'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {ORDER_LIST} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {getAuth} from '../../../../../modules/auth'
import {dateUnixReadable} from '../../../../../modules/helper/misc'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {TableModal} from '../../core/_models'

const ExcelExport = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const {state} = useQueryRequest()

  let auth: any = getAuth()
  const [filename] = useState<string>(
    `order-${slugify(
      `${auth?.shop_info?.business_name ? auth?.shop_info?.business_name : 'wm'}-${moment().format(
        'MM-DD-YY'
      )}`
    )}.csv`
  )

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    if (!loading) setLoading(true)
    // console.log('state', state)
    let filter = state.filter
      ? Object.entries(state.filter as Object)
          .filter((obj) => isNotEmpty(obj[1]))
          .map((obj) => {
            return `${obj[0]}=${obj[1]}`
          })
          .join('&')
      : ''
    let query = `items_per_page=999&page=1${filter ? '&' + filter : ''}${
      state.search ? '&search=' + state.search : ''
    }`
    const res: any = await getQueryRequest(`${ORDER_LIST}?${query}`)
    setLoading(false)

    if (res.success && res.status_code === 200) {
      let lists: any = []
      if (res.data && res.data.length > 0) {
        res.data.map((item: TableModal) => {
          // let address =
          //   typeof item.shipping_address === 'string'
          //     ? JSON.parse(item.shipping_address)
          //     : item.shipping_address

          // let st_address = `${address.street_address}, ${address.area}, ${address.zone}, ${address.city}`
          // st_address = st_address.trim().replace(/\n/g, '')

          lists.push({
            'Invoice Id': item.invoice_id,
            'Order Data': dateUnixReadable(item.delivery_date),
            'Customer Name': item.customer_name,
            'Mobile Number': item.msisdn,
            Email: item.email,
            // 'Customer Address': st_address,
            'Order Status': item.order_status,
            Price: item.price,
            Discount: item.discount + item.extra_discount + item.promo_discount,
            Subtotal: item.subtotal,
            'Delivery Cost': item.shipping_fee,
            Tax: item.tax,
            Total: item.total,
            'Payment Method': item.payment_method,
          })
        })
      }
      // console.log(lists)
      setData(lists)
    }
  }

  // console.log(data)
  // if (data.length > 0) return <CSVDownload target='_self' filename={filename} data={data} />

  return loading ? (
    <div className='menu-item px-3'>
      <div className='menu-link px-3'>{'Loading...'}</div>
    </div>
  ) : (
    <CSVLink data={data} filename={filename} target='_blank'>
      <div className='menu-item px-3'>
        <div className='menu-link px-3'>{'CSV'}</div>
      </div>
    </CSVLink>
  )
}

export default ExcelExport
