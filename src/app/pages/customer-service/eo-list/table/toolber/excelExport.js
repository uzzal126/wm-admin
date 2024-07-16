import moment from 'moment'
import {useEffect, useMemo, useState} from 'react'
import {CSVLink} from 'react-csv'
import slugify from 'react-url-slugify'
import {getAuth} from '../../../../../modules/auth'
import {dateUnixReadable} from '../../../../../modules/helper/misc'
import {useQueryResponseData, useQueryResponseLoading} from '../../core/QueryResponseProvider'

const ExcelExport = () => {
  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const [csvData, setCsvData] = useState([])

  let auth = getAuth()

  useEffect(() => {
    let csv = []
    if (data && data.length > 0) {
      // eslint-disable-next-line array-callback-return
      data.map((item) => {
        csv.push({
          'Product Name': item?.name,
          SKU: item?.sku,
          Categories: item?.categories?.toString(),
          Brand: item?.brand,
          Tags: item?.tags?.toString(),
          price:
            item?.price?.min === item?.price?.max
              ? item?.price?.min
              : `${item?.price?.min} - ${item?.price?.max}`,
          'Product Status': item?.product_status,
          'In Stock': item?.in_stock,
          Date: dateUnixReadable(item?.created_at),
        })
      })
    }
    setCsvData(csv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data && data.length > 0])

  return !isLoading ? (
    <div className='menu-item px-3'>
      <CSVLink
        className='menu-link px-3'
        filename={`${slugify(
          `${
            auth?.shop_info?.business_name ? auth?.shop_info?.business_name : 'wm'
          }-product-${moment().format('MM-DD-YY HH-mm-ss')}`
        )}.csv`}
        data={csvData}
      >
        Export Excel
      </CSVLink>
    </div>
  ) : null
}

export default ExcelExport
