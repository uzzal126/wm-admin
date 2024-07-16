import moment from 'moment'
import {useEffect, useMemo, useState} from 'react'
import {CSVLink} from 'react-csv'
import slugify from 'react-url-slugify'
import {getAuth} from '../../../../../../modules/auth'
import {dateReadable} from '../../../../../../modules/helper/misc'
import {useQueryResponseData, useQueryResponseLoading} from '../../core/QueryResponseProvider'
import {TableModal} from '../../core/_models'

const ExcelExport = () => {
  const response = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => response, [response])
  const [csvData, setCsvData] = useState([])

  let auth = getAuth()

  useEffect(() => {
    let csv: any = []
    if (data && data.length > 0) {
      // eslint-disable-next-line array-callback-return
      data.map((item: TableModal) => {
        let customer = typeof item.customer === 'string' ? JSON.parse(item.customer) : []

        if (customer && customer.length > 1) {
          customer.map((cus: any) => {
            csv.push({
              'Product Name': item.NAME,
              SKU: item.sku,
              'In Stock': item.in_stock,
              'Customer Name': cus.name,
              Email: cus.email,
              Mobile: cus.msisdn,
              date: dateReadable(item.created_at),
            })
          })
        } else {
          csv.push({
            'Product Id': item?.product_id,
            'Product Name': item.product_name,
            SKU: item.sku,
            'Average Rating': item?.avg_rating,
            'Total Reviews': item?.total_review,
            // 'In Stock': item.in_stock,
            // 'Customer Name': customer.length > 0 ? customer[0].name : '',
            // Email: customer.length > 0 ? customer[0].email : '',
            // Mobile: customer.length > 0 ? customer[0].msisdn : '',
            // date: dateReadable(item.created_at),
          })
        }
      })
    }
    setCsvData(csv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length > 0])

  return !isLoading ? (
    <div className='menu-item px-3'>
      <CSVLink
        className='menu-link px-3'
        filename={`${slugify(
          `${
            auth?.shop_info?.business_name ? auth?.shop_info?.business_name : 'wm'
          }-profit-loss-${moment().format('MM-DD-YY HH-mm-ss')}`
        )}.csv`}
        data={csvData}
      >
        CSV
      </CSVLink>
    </div>
  ) : null
}

export default ExcelExport
