/* eslint-disable array-callback-return */
import {useEffect, useState} from 'react'
import Select from 'react-select'
import {CITY_LIST} from '../../../../../app/constants/api.constants'
import {getQueryRequest} from '../../../../../app/library/api.helper'

const Districts = ({id, onChange, city_id, bn, className, lable, changeLabel, placeholder}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getData = async () => {
    const res = await getQueryRequest(`${CITY_LIST}/${id}`)
    if (res.success && res.status_code === 200) {
      let item = []
      if (res.data && res.data.length > 0) {
        res.data.map((div) => {
          const ct = {
            ...div,
            label: bn ? div.title_bn : div.title,
            value: div.id,
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
          {changeLabel || (bn ? 'জেলা' : 'City')}
        </label>
      )}
      <Select
        defaultValue={[]}
        name='customers'
        options={data}
        value={data.filter((f) => f.id === city_id)}
        className={`location-select ${className}`}
        placeholder={`${placeholder || 'Search district'}`}
        onChange={(e) => onChange(e, 'city_id')}
      />
    </div>
  )
}

export default Districts
