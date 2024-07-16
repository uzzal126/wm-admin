import {useEffect, useState} from 'react'
import {getVisibilityStatusList} from './StatusHelper'

const StatusSelect = ({callBack, className}) => {
  const [brandList, setBrandList] = useState([])

  useEffect(() => {
    getCat()
  }, [])

  const getCat = async () => {
    const resp = await getVisibilityStatusList()
    setBrandList(resp)
  }

  return (
    <select
      data-kt-select2='true'
      data-placeholder='Change Status'
      data-allow-clear='true'
      data-kt-user-table-filter='status'
      data-hide-search='true'
      className={`form-select fw-bolder ${className ? className : ''}`}
      onChange={(event) => callBack(brandList.filter((e) => e.title == event.target.value)[0])}
    >
      <option value=''>Select Status</option>
      {brandList?.map((item, indx) => (
        <option value={item.title} key={indx}>
          {item.title}
        </option>
      ))}
    </select>
  )
}

export default StatusSelect
