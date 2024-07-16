import {useEffect, useState} from 'react'
import {STORE_CAT_LIST} from '../../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../../library/api.helper'

export default function CatSelect({setSelectedCat, className, selectedCat}: any) {
  const [cats, setCats] = useState([])
  useEffect(() => {
    getCatList()
  }, [])

  const getCatList = async () => {
    let res = await getQueryRequest(`${STORE_CAT_LIST}`)
    if (res?.success) {
      setCats(res?.data)
    }
  }
  return (
    <>
      <select
        data-kt-select2='true'
        data-placeholder='Change Status'
        data-allow-clear='true'
        data-kt-user-table-filter='status'
        data-hide-search='true'
        className={`form-select fw-bolder ${className ? className : ''}`}
        onChange={(e) => setSelectedCat(e?.target?.value)}
      >
        <option value='' selected={!selectedCat}>
          Select Category
        </option>
        {cats?.map((item: any, indx) => (
          <option
            value={item.store_category_id}
            key={indx}
            selected={selectedCat === item?.store_category_id}
          >
            {item.display_name}
          </option>
        ))}
      </select>
    </>
  )
}
