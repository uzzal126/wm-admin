import {useEffect, useState} from 'react'
import {Col} from 'react-bootstrap'
import Select from 'react-select'
import {GET_COURIER_STORE} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'

const CourierField = ({setFieldValue, values}) => {
  const [store, setStore] = useState([])
  useEffect(() => {
    getStore()
  }, [])
  const getStore = async () => {
    const res = await getQueryRequest(GET_COURIER_STORE + '?page=1&items_per_page=100')
    if (res.success && res.status_code === 200) {
      let list = []
      if (res.data && res.data.length > 0) {
        setFieldValue('courier_enable', true)
        res.data.map((item) => {
          list.push({
            ...item,
            value: parseInt(item.courier_store_id),
            label: item.store_name + ' - ' + item.contact_name,
          })
        })
        let selected = list.filter((f) => f.is_default === 1)
        if (selected && selected.length > 0) {
          setFieldValue('courier_store_id', parseInt(selected[0].value))
        }
      }
      setStore(list)
    }
  }

  let pickup =
    store && store.length > 0 ? store.filter((f) => f.value === values.courier_store_id) : []

  return values?.courier_enable ? (
    <>
      <Col>
        <h6>Courier Pickup List</h6>
        <Select
          className='basic-single'
          classNamePrefix='select'
          value={
            store && store.length > 0
              ? store.filter((f) => f.value === values.courier_store_id)
              : []
          }
          isClearable
          isSearchable
          name='store'
          onChange={(e) => setFieldValue('courier_store_id', parseInt(e.value))}
          options={store}
        />
        {pickup && pickup.length > 0 && (
          <div className='flex flex-column bg-white p-2'>
            <p className='mb-0'>Your Selected Pickup Address:</p>
            <p className='mb-0 text-muted'>{pickup[0].address}</p>
          </div>
        )}
      </Col>
      <Col>
        <h6>Delivery Type</h6>
        <div
          className='btn-group w-100 w-lg-50'
          data-kt-buttons='true'
          data-kt-buttons-target='[data-kt-button]'
        >
          <label
            className={`btn btn-outline btn-outline-dashed btn-active-light-primary btn-primary ${
              values.delivery_type === 48 ? '' : 'active'
            }`}
            data-kt-button='true'
          >
            <input
              className='btn-check'
              type='radio'
              name='d_type'
              value='48'
              checked={values.delivery_type === 48}
              onChange={(e) => setFieldValue('delivery_type', parseInt(e.target.value))}
            />
            Regular
          </label>

          <label
            className={`btn btn-outline btn-outline-dashed btn-active-light-primary btn-primary ${
              values.delivery_type === 12 ? '' : 'active'
            }`}
            data-kt-button='true'
          >
            <input
              className='btn-check'
              type='radio'
              name='d_type'
              value='12'
              checked={values.delivery_type === 12}
              onChange={(e) => setFieldValue('delivery_type', parseInt(e.target.value))}
            />
            Express
          </label>
        </div>
      </Col>
    </>
  ) : null
}

export default CourierField
