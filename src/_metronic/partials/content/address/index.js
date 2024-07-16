import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Districts from './city'
import {Divisions} from './region'
import {Upazilas} from './area'
import Zone from './zone'

const BDLocations = ({onChange, bn, row, className, showLable, label, setData, placeholder}) => {
  const [selected, setSelected] = useState({
    region_id: 0,
    city_id: 0,
    zone_id: 0,
    area_id: 0,
  })

  useEffect(() => {
    if (setData && Object.keys(setData).length > 0) {
      setSelected({
        region_id: setData.region_id,
        city_id: setData.city_id,
        zone_id: setData.zone_id,
        area_id: setData.area_id,
      })
    }
  }, [setData])

  const onChangeHandler = (e, location) => {
    if (location === 'region_id')
      setSelected({
        ...selected,
        region_id: e.id,
        city_id: 0,
        zone_id: 0,
        area_id: 0,
      })
    if (location === 'city_id')
      setSelected({
        ...selected,
        city_id: e.id,
        zone_id: 0,
        area_id: 0,
      })
    if (location === 'zone_id')
      setSelected({
        ...selected,
        zone_id: e.id,
        area_id: 0,
      })
    if (location === 'area_id') {
      let data = {
        ...selected,
        area_id: e.area_id,
      }
      setSelected(data)
      onChange && onChange(data)
    }
  }

  return (
    <div className={`dblocation row row-cols-${row || 1} `}>
      <div className='col'>
        <Divisions
          bn={bn}
          lable={showLable}
          className={className}
          changeLabel={label?.division}
          placeholder={placeholder?.division}
          region_id={selected.region_id}
          onChange={(e, location) => onChangeHandler(e, location)}
        />
      </div>
      <div className='col'>
        {selected.region_id && selected.region_id > 0 ? (
          <Districts
            bn={bn}
            lable={showLable}
            className={className}
            id={selected.region_id}
            city_id={selected.city_id}
            onChange={(e, location) => onChangeHandler(e, location)}
            changeLabel={label?.district}
            placeholder={placeholder?.district}
          />
        ) : null}
      </div>
      <div className='col'>
        {selected.city_id && selected.city_id > 0 ? (
          <Zone
            bn={bn}
            lable={showLable}
            className={className}
            id={selected.city_id}
            zone_id={selected.zone_id}
            onChange={(e, location) => onChangeHandler(e, location)}
            changeLabel={label?.zone}
            placeholder={placeholder?.zone}
          />
        ) : null}
      </div>
      <div className='col'>
        {selected.zone_id && selected.zone_id > 0 ? (
          <Upazilas
            bn={bn}
            lable={showLable}
            className={className}
            id={selected.zone_id}
            area_id={selected.area_id}
            onChange={(e, location) => onChangeHandler(e, location)}
            changeLabel={label?.upazila}
            placeholder={placeholder?.upazila}
          />
        ) : null}
      </div>
    </div>
  )
}

BDLocations.propTypes = {
  onChange: PropTypes.func,
  bn: PropTypes.bool,
  className: PropTypes.string,
  row: PropTypes.string,
  showLable: PropTypes.bool,
  setData: PropTypes.shape({
    region_id: PropTypes.number,
    city_id: PropTypes.number,
    zone_id: PropTypes.number,
    area_id: PropTypes.number,
  }),
  label: PropTypes.shape({
    division: PropTypes.string,
    district: PropTypes.string,
    upazila: PropTypes.string,
    zone: PropTypes.string,
  }),
  placeholder: PropTypes.shape({
    division: PropTypes.string,
    district: PropTypes.string,
    upazila: PropTypes.string,
    zone: PropTypes.string,
  }),
}

export {BDLocations}
