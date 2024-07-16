/* eslint-disable array-callback-return */
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
        if (item.total_variant > 0) {
          item.variants &&
            item.variants.length > 0 &&
            item.variants.map((variant: any) => {
              csv.push({
                'Product Name': item.name,
                Variant: variant.variant_name,
                'Cost Price': variant.cost_price,
                'Selling Price': variant.selling_price,
                'In Stock': variant.in_stock,
                Delivered: variant.delivered,
                Committed: variant.committed,
                Returned: variant.returned,
                Canceled: variant.canceled,
              })
            })
        } else {
          csv.push({
            'Product Name': item.name,
            Variant: '',
            'Cost Price': item.variants[0].cost_price,
            'Selling Price': item.variants[0].selling_price,
            'In Stock': item.in_stock,
            Delivered: item.delivered,
            Committed: item.committed,
            Returned: item.returned,
            Canceled: item.canceled,
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
          }-inventory-report-${moment().format('MM-DD-YY HH-mm-ss')}`
        )}.csv`}
        data={csvData}
      >
        CSV
      </CSVLink>
    </div>
  ) : null
}

export default ExcelExport
