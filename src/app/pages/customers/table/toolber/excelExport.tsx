import moment from 'moment'
import {useEffect, useState} from 'react'
import {CSVLink} from 'react-csv'
import slugify from 'react-url-slugify'
import {isNotEmpty} from '../../../../../_metronic/helpers'
import {CUSTOMER_LIST} from '../../../../constants/api.constants'
import {getQueryRequest} from '../../../../library/api.helper'
import {getAuth} from '../../../../modules/auth'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {User} from '../../core/_models'

const ExcelExport = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const {state} = useQueryRequest()

  let auth: any = getAuth()
  const [filename] = useState<string>(
    `customer-${slugify(
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
    const res: any = await getQueryRequest(`${CUSTOMER_LIST}?${query}`)
    setLoading(false)

    if (res.success && res.status_code === 200) {
      let lists: any = []
      if (res.data && res.data.length > 0) {
        res.data.map((item: User) => {
          // let address =
          //   typeof item.shipping_address === 'string'
          //     ? JSON.parse(item.shipping_address)
          //     : item.shipping_address

          // let st_address = `${address.street_address}, ${address.area}, ${address.zone}, ${address.city}`
          // st_address = st_address.trim().replace(/\n/g, '')

          lists.push({
            id: item?.id,
            name: item?.name,
            profile: item?.profile,
            email: item?.email,
            msisdn: item?.msisdn,
            type: item?.type,
            country: item?.country,
            total_order_canceled: item?.total_order_canceled,
            total_order_committed: item?.total_order_committed,
            total_order_delivered: item?.total_order_delivered,
            total_order_placed: item?.total_order_placed,
            total_shopping_value: item?.total_shopping_value,
            created_at: moment.unix(item?.created_at).format('LLL'),
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
