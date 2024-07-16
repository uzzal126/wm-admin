import moment from 'moment'
import {useEffect, useState} from 'react'
import {CSVLink} from 'react-csv'
import slugify from 'react-url-slugify'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {GET_WISHLIST} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {getAuth} from '../../../../../modules/auth'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {TableModal} from '../../core/_models'

const ExcelExport = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const {state} = useQueryRequest()

  let auth: any = getAuth()
  const [filename] = useState<string>(
    `customer-wishlist-${slugify(
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
    const res: any = await getQueryRequest(`${GET_WISHLIST}?${query}`)
    setLoading(false)

    if (res.success && res.status_code === 200) {
      let lists: any = []
      if (res.data && res.data.length > 0) {
        res.data.map((item: TableModal) => {
          lists.push({
            id: item?.id,
            name: item?.name,
            prod_id: item?.prod_id,
            product_type: item?.product_type,
            sku: item?.sku,
            brand: item?.brand,
            categories: item?.categories,
            variant_count: item?.variant_count,
            in_stock: item?.in_stock,
            on_sale: item?.on_sale,
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
