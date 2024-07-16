/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {REGION_LIST} from '../../../../../app/constants/api.constants'
import {getQueryRequest} from '../../../../../app/library/api.helper'

const Divisions = ({onChange, bn, region_id, className, lable, changeLabel, placeholder}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await getQueryRequest(REGION_LIST)
    if (res.success && res.status_code === 200) {
      let item = []
      res.data &&
        res.data.map((div) => {
          const ct = {
            ...div,
            label: div.title,
            value: div.id,
          }
          item.push(ct)
        })
      setData(item)
    }
  }

  return (
    <div className='form-location'>
      {(lable === undefined || lable === true) && (
        <label className='form-check-label ms-0 fw-bolder fs-6 text-gray-700'>
          {changeLabel || (bn ? 'বিভাগ' : 'Region')}
        </label>
      )}
      <Select
        value={region_id && data.filter((f) => f.id === region_id)}
        name='region'
        options={data}
        className={`location-select ${className}`}
        placeholder={`${placeholder || 'Search region'}`}
        onChange={(e) => onChange(e, 'region_id')}
      />
    </div>
  )
}

export {Divisions}
