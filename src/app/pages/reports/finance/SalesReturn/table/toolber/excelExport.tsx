import moment from 'moment'
import React, {useMemo} from 'react'
import {CSVLink} from 'react-csv'
import slugify from 'react-url-slugify'
import {getAuth} from '../../../../../../modules/auth'
import {useQueryResponseData, useQueryResponseLoading} from '../../core/QueryResponseProvider'

const ExcelExport = () => {
  const response = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => response, [response])

  let auth = getAuth()

  return !isLoading ? (
    <div className='menu-item px-3'>
      <CSVLink
        className='menu-link px-3'
        filename={`${slugify(
          `${
            auth?.shop_info?.business_name ? auth?.shop_info?.business_name : 'wm'
          }-sale-return-${moment().format('MM-DD-YY HH-mm-ss')}`
        )}.csv`}
        data={data}
      >
        CSV
      </CSVLink>
    </div>
  ) : null
}

export default ExcelExport
