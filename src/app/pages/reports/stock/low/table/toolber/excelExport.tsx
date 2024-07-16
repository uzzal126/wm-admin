import moment from 'moment'
import React, {useEffect, useMemo, useState} from 'react'
import {CSVLink} from 'react-csv'
import slugify from 'react-url-slugify'
import {getAuth} from '../../../../../../modules/auth'
import {useQueryResponseData, useQueryResponseLoading} from '../../core/QueryResponseProvider'

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
      data.map((item: any) => {
        csv.push({
          'Product Name': item.name,
          SKU: item.sku,
          'Cost Price': item.cost_price,
          'Selling Price': item.selling_price,
          'Total Added': item.total_added,
          'Total Committed': item.committed,
          'Total Sold': item.sold,
          'Total Available': item.in_stock,
          'Total Returned': item.returned,
          'Total Canceled': item.canceled,
        })
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
