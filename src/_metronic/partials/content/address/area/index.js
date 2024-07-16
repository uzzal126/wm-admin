/* eslint-disable array-callback-return */
import {useEffect, useState} from 'react'
import Select from 'react-select'
import {AREA_LIST} from '../../../../../app/constants/api.constants'
import {getQueryRequest} from '../../../../../app/library/api.helper'

const Upazilas = ({id, onChange, area_id, bn, className, lable, changeLabel, placeholder}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getData = async () => {
    const res = await getQueryRequest(`${AREA_LIST}/${id}`)
    if (res.success && res.status_code === 200) {
      let item = []
      let data = res.data.data || res.data
      if (data && data.length > 0) {
        data.map((div) => {
          const ct = {
            ...div,
            label: bn ? div.title_bn : div.area_name,
            value: div.area_id,
          }
          item.push(ct)
        })
        setData(item)
      }
    }
  }

  return (
    <div className='form-location'>
      {(lable === undefined || lable === true) && (
        <label className='form-check-label ms-0 fw-bolder fs-6 text-gray-700'>
          {changeLabel || (bn ? 'উপজেলা' : 'Area')}
        </label>
      )}
      <Select
        defaultValue={[]}
        value={area_id && data.filter((f) => f.area_id === area_id)}
        name='customers'
        options={data}
        className={`location-select ${className}`}
        placeholder={`${placeholder || 'Search Area'}`}
        onChange={(e) => onChange(e, 'area_id')}
      />
    </div>
  )
}
export {Upazilas}
