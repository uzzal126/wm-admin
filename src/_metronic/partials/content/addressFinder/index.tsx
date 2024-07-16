import React, {useEffect, useRef, useState} from 'react'
import {AREA_LIST, CITY_LIST, ZONE_LIST} from '../../../../app/constants/api.constants'
import {getQueryRequest} from '../../../../app/library/api.helper'
import './style.scss'

type DataType = {
  region_id?: number
  city_id?: number
  zone_id?: number
  area_id?: number
  region_name?: string
  city_name?: string
  zone_name?: string
  area_name?: string
}
type Prop = {
  label: string
  setData: DataType
  onChange: any
}

const AddressFinder: React.FC<Prop> = ({setData, onChange}) => {
  const [show, setShow] = useState(false)
  const [loader, setLoader] = useState(false)
  const [state, setState] = useState('city')
  const [listData, setListData] = useState<any>([])

  const [selected, setSelected] = useState<DataType>({
    region_id: 0,
    city_id: 0,
    zone_id: 0,
    area_id: 0,
    region_name: '',
    city_name: '',
    zone_name: '',
    area_name: '',
  })

  const myRef: any = useRef()

  const handleClickOutside = (e: any) => {
    if (!myRef.current.contains(e.target)) {
      setShow(false)
    }
  }

  const handleClickInside = () => setShow(true)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])
  useEffect(() => {
    if (setData.area_id !== 0 && setData.area_id !== selected.area_id) {
      getArea(setData)
    } else if (setData.area_id === 0) {
      setSelected({
        region_id: 0,
        city_id: 0,
        zone_id: 0,
        area_id: 0,
        region_name: '',
        city_name: '',
        zone_name: '',
        area_name: '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setData.area_id])

  const getArea = async (data: any) => {
    if (data?.city_id) {
      setLoader(true)
      const res = await getQueryRequest(
        `${AREA_LIST}?city_id=${data.city_id}&zone_id=${data.zone_id}&area_id=${data.area_id}`
      )
      if (res.success && res.status_code === 200) {
        if (res.data && res.data.length > 0) {
          setSelected(res.data[0])
        }
      }
      setLoader(false)
    }
  }

  const getData = async () => {
    if (state === 'city') {
      const res = await getQueryRequest(`${CITY_LIST}?region_id=${selected.region_id}`)
      if (res.success && res.status_code === 200) {
        setListData(res.data)
        setLoader(false)
      }
    }
    if (state === 'zone') {
      const res = await getQueryRequest(`${ZONE_LIST}?city_id=${selected.city_id}`)
      if (res.success && res.status_code === 200) {
        setListData(res.data)
        setLoader(false)
      }
    }
    if (state === 'area') {
      const res = await getQueryRequest(
        `${AREA_LIST}?city_id=${selected.city_id}&zone_id=${selected.zone_id}`
      )
      if (res.success && res.status_code === 200) {
        setListData(res.data)
        setLoader(false)
      }
    }
  }

  const onSearch = async (val: any) => {
    if (val === '') {
      if (selected.city_id !== 0) {
        setState('zone')
      }
      if (selected.zone_id !== 0) {
        setState('area')
      } else {
        setState('city')
      }
    } else if (val.length > 2) {
      setState('search')
      setLoader(true)
      const res = await getQueryRequest(
        `${AREA_LIST}?city_id=${selected.city_id}&zone_id=${selected.zone_id}&search_key=${val}`
      )
      if (res.success && res.status_code === 200) {
        setListData(res.data)
        setLoader(false)
      }
    }
  }

  const handleOnChange = (item: any) => {
    if (state === 'city') {
      setSelected({
        ...selected,
        city_id: item.city_id,
        city_name: item.city_name,
        zone_id: 0,
        zone_name: '',
        area_id: 0,
        area_name: '',
      })
      setState('zone')
      setLoader(true)
      setListData([])
    }
    if (state === 'zone') {
      setSelected({
        ...selected,
        zone_id: item.zone_id || item.id,
        zone_name: item.zone_name || item.title,
        area_name: '',
        area_id: 0,
      })
      setListData([])
      setLoader(true)
      setState('area')
    }
    if (state === 'area') {
      setSelected(item)
      onChange &&
        onChange({
          region_id: item.region_id,
          city_id: item.city_id,
          zone_id: item.zone_id,
          area_id: item.area_id,
          region_name: item.region_name,
          city_name: item.city_name,
          zone_name: item.zone_name,
          area_name: item.area_name,
        })
      setState('city')
      setLoader(true)
      setListData([])
      setShow(false)
    }
  }

  return (
    <div className='af-wrap' ref={myRef}>
      <div className='af-form' onClick={handleClickInside}>
        {selected.city_name !== '' && (
          <div className='af-form-selected'>
            {selected.city_name !== '' && (
              <div
                className={`af-form-selected-label ${state === 'city' ? 'fw-bold' : ''}`}
                onClick={() => setState('city')}
              >
                {selected.city_name}
              </div>
            )}
            {selected.zone_name !== '' && (
              <div
                className={`af-form-selected-label ${state === 'zone' ? 'fw-bold' : ''}`}
                onClick={() => setState('zone')}
              >
                {selected.zone_name}
              </div>
            )}
            {selected.area_name !== '' && (
              <div
                className={`af-form-selected-label ${state === 'area' ? 'fw-bold' : ''}`}
                onClick={() => setState('area')}
              >
                {selected.area_name}
              </div>
            )}
          </div>
        )}
        <div className='af-form-search'>
          {selected.area_name === '' && (
            <input
              type='text'
              className='af-form-search-control'
              placeholder='Search area'
              onChange={(e) => onSearch(e.target.value)}
            />
          )}
        </div>
        <div className='af-form-close'>
          {selected.city_name !== '' ? (
            <button
              type='button'
              onClick={() => {
                setSelected({
                  region_id: 0,
                  city_id: 0,
                  zone_id: 0,
                  area_id: 0,
                  region_name: '',
                  city_name: '',
                  zone_name: '',
                  area_name: '',
                })
                onChange({
                  region_id: 0,
                  city_id: 0,
                  zone_id: 0,
                  area_id: 0,
                  region_name: '',
                  city_name: '',
                  zone_name: '',
                  area_name: '',
                })
                setState('city')
                setShow(true)
              }}
            >
              &#10006;
            </button>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
            </svg>
          )}
        </div>
      </div>
      {/* END INPUT FORM AREA */}
      {show && (
        <div className='af-filter'>
          <span className='fs-5 text-muted'>Select {state}</span>
          <ul className='af-filter-list'>
            {loader ? (
              <li>Loading....</li>
            ) : listData && listData.length > 0 ? (
              state !== 'search' ? (
                listData.map((item: any, i: any) => (
                  <li key={i} onClick={() => handleOnChange(item)}>
                    <span>{item?.title}</span>
                    <span className='icon'>&#11166;</span>
                  </li>
                ))
              ) : (
                listData.map((item: any, i: any) => (
                  <li
                    key={i}
                    onClick={() => {
                      setSelected(item)
                      onChange &&
                        onChange({
                          region_id: item.region_id,
                          city_id: item.city_id,
                          zone_id: item.zone_id,
                          area_id: item.area_id,
                          region_name: item.region_name,
                          city_name: item.city_name,
                          zone_name: item.zone_name,
                          area_name: item.area_name,
                        })
                      setState('city')
                      setListData([])
                      setShow(false)
                    }}
                  >
                    <div>
                      <span className='fs-5 fw-bold'>{item?.title}</span>
                      <div className=''>
                        <span>{item?.city_name}</span>
                        <span className='mx-2'>&#11166;</span>
                        <span className='text-muted'>{item?.zone_name}</span>
                      </div>
                    </div>
                  </li>
                ))
              )
            ) : (
              <li>No Data Found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AddressFinder
