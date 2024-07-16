import {useEffect, useState} from 'react'
import Select from 'react-select'
import {toast} from 'react-toastify'
import {PAGE_URL, SETTING_UPDATE} from '../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../library/api.helper'

const Checkout = ({data, setData, handleUpdate}) => {
  // console.log(data)
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState([])
  const [selectedPages, setSelectedPages] = useState(
    Array.isArray(data?.checkout_setting?.privacy_policy)
      ? data?.checkout_setting?.privacy_policy
      : []
  )
  // console.log({selectedPages})
  const handleChange = (selected) => {
    setSelectedPages([...selected])
    setData({
      ...data,
      checkout_setting: {
        ...data?.checkout_setting,
        privacy_policy: [...selected],
      },
    })
    // console.log(selected);
  }

  const updateSetting = async (post) => {
    const res = await queryRequest(SETTING_UPDATE, {
      setting_name: 'checkout_setting',
      setting_data: data?.checkout_setting,
    })
    if (res.success && res.status_code === 200) {
      toast.success('Setting Updated successfully!')
      await queryRequest(SETTING_UPDATE, {
        setting_name: 'general_settings',
        setting_data: data?.general_settings,
      })
    } else {
      toast.error(res.message)
    }
  }

  useEffect(() => {
    getPageList()
    setLoading(false)
  }, [])
  const getPageList = async () => {
    const res = await getQueryRequest(`${PAGE_URL}?page=1&items_per_page=1000`)
    if (res?.success) {
      const list = []
      for (let i = 0; Array.isArray(res?.data) && i < res?.data?.length; i++) {
        list.push({
          ...res?.data[i],
          value: res?.data[i]?.id,
          label: res?.data[i]?.page_name,
        })
      }
      setPages(list)
    }
  }

  useEffect(() => {
    setSelectedPages(
      Array.isArray(data?.checkout_setting?.privacy_policy)
        ? data?.checkout_setting?.privacy_policy
        : []
    )
  }, [data])
  if (loading) return <>loading...</>

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <h2 className='title'>Checkout Settings</h2>
          <div className='row row-cols-auto mt-5 g-5'>
            <div className='col'>
              <label className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={data?.checkout_setting?.shop_checkout_allow?.allow_guest_checkout}
                  onChange={(e) =>
                    setData({
                      ...data,
                      checkout_setting: {
                        ...data?.checkout_setting,
                        shop_checkout_allow: {
                          ...data?.checkout_setting?.shop_checkout_allow,
                          allow_guest_checkout:
                            !data?.checkout_setting?.shop_checkout_allow?.allow_guest_checkout,
                        },
                      },
                    })
                  }
                />
                <span className='form-check-label'>Allow guest checkout</span>
              </label>
            </div>
            {/* <div className='col'>
              <label className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={data?.checkout_setting?.shop_checkout_allow?.allow_seperate_delivery}
                  onChange={(e) =>
                    setData({
                      ...data,
                      checkout_setting: {
                        ...data?.checkout_setting,
                        shop_checkout_allow: {
                          ...data?.checkout_setting?.shop_checkout_allow,
                          allow_seperate_delivery:
                            !data?.checkout_setting?.shop_checkout_allow?.allow_seperate_delivery,
                        },
                      },
                    })
                  }
                />
                <span className='form-check-label'>Allow seperate delivery address</span>
              </label>
            </div>
            <div className='col'>
              <label className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={
                    data?.checkout_setting?.shop_checkout_allow
                      ?.allow_customer_to_login_with_facebook
                  }
                  onChange={(e) =>
                    setData({
                      ...data,
                      checkout_setting: {
                        ...data?.checkout_setting,
                        shop_checkout_allow: {
                          ...data?.checkout_setting?.shop_checkout_allow,
                          allow_customer_to_login_with_facebook:
                            !data?.checkout_setting?.shop_checkout_allow
                              ?.allow_customer_to_login_with_facebook,
                        },
                      },
                    })
                  }
                />
                <span className='form-check-label'>
                  Allow customer to login with facebook account
                </span>
              </label>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className='card mt-5'>
        <div className='card-body'>
          <h2 className='mb-3'>Checkout Field Settings</h2>
          <div className='row row-cols-2 row-cols-lg-auto justify-content-between gy-5'>
            <div className='col'>
              <p>
                <strong>Full Nmae</strong>
              </p>
              <div className='d-flex flex-column'>
                <label className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.checkout_field?.full_name === 'Optional'
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          checkout_field: {
                            ...data?.checkout_setting?.checkout_field,
                            full_name: 'Optional',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Optional</span>
                </label>
                <label className='form-check form-check-custom form-check-solid mt-2'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.checkout_field?.full_name === 'Required'
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          checkout_field: {
                            ...data?.checkout_setting?.checkout_field,
                            full_name: 'Required',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Required</span>
                </label>
                <label className='form-check form-check-custom form-check-solid mt-2'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.checkout_field?.full_name === 'Hidden' ? true : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          checkout_field: {
                            ...data?.checkout_setting?.checkout_field,
                            full_name: 'Hidden',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Hidden</span>
                </label>
              </div>
            </div>
            <div className='col'>
              <p>
                <strong>Email Address</strong>
              </p>
              <div className='d-flex flex-column'>
                <label className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.checkout_field?.email === 'Optional' ? true : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          checkout_field: {
                            ...data?.checkout_setting?.checkout_field,
                            email: 'Optional',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Optional</span>
                </label>
                <label className='form-check form-check-custom form-check-solid mt-2'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.checkout_field?.email === 'Required' ? true : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          checkout_field: {
                            ...data?.checkout_setting?.checkout_field,
                            email: 'Required',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Required</span>
                </label>
                <label className='form-check form-check-custom form-check-solid mt-2'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.checkout_field?.email === 'Hidden' ? true : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          checkout_field: {
                            ...data?.checkout_setting?.checkout_field,
                            email: 'Hidden',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Hidden</span>
                </label>
              </div>
            </div>
            <div className='col'>
              <p>
                <strong>Phone Number</strong>
              </p>
              <div className='d-flex flex-column'>
                <label className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.checkout_field?.mobile === 'Optional' ? true : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          checkout_field: {
                            ...data?.checkout_setting?.checkout_field,
                            mobile: 'Optional',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Optional</span>
                </label>
                <label className='form-check form-check-custom form-check-solid mt-2'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.checkout_field?.mobile === 'Required' ? true : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          checkout_field: {
                            ...data?.checkout_setting?.checkout_field,
                            mobile: 'Required',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Required</span>
                </label>
                <label className='form-check form-check-custom form-check-solid mt-2'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.checkout_field?.mobile === 'Hidden' ? true : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          checkout_field: {
                            ...data?.checkout_setting?.checkout_field,
                            mobile: 'Hidden',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Hidden</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className='card mt-4'>
        <div className='card-body'>
          <h4>Billing Or Shipping information</h4>
          <div className='row row-cols-2 row-cols-lg-auto justify-content-between gy-5'>
            <div className='col'>
              <p>
                <strong>Country</strong>
              </p>
              <div className='d-flex flex-column'>
                <label className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.billing_shipping_info?.country === 'Optional'
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          billing_shipping_info: {
                            ...data?.checkout_setting?.billing_shipping_info,
                            country: 'Optional',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Optional</span>
                </label>
                <label className='form-check form-check-custom form-check-solid mt-2'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.billing_shipping_info?.country === 'Required'
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          billing_shipping_info: {
                            ...data?.checkout_setting?.billing_shipping_info,
                            country: 'Required',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Required</span>
                </label>
              </div>
            </div>
            <div className='col'>
              <p>
                <strong>Region/City/Area</strong>
              </p>
              <div className='d-flex flex-column'>
                <label className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.billing_shipping_info?.city_zone_area === 'Optional'
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          billing_shipping_info: {
                            ...data?.checkout_setting?.billing_shipping_info,
                            city_zone_area: 'Optional',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Optional</span>
                </label>
                <label className='form-check form-check-custom form-check-solid mt-2'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.billing_shipping_info?.city_zone_area === 'Required'
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          billing_shipping_info: {
                            ...data?.checkout_setting?.billing_shipping_info,
                            city_zone_area: 'Required',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Required</span>
                </label>
              </div>
            </div>
            <div className='col'>
              <p>
                <strong>Address</strong>
              </p>
              <div className='d-flex flex-column'>
                <label className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.billing_shipping_info?.address === 'Optional'
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          billing_shipping_info: {
                            ...data?.checkout_setting?.billing_shipping_info,
                            address: 'Optional',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Optional</span>
                </label>
                <label className='form-check form-check-custom form-check-solid mt-2'>
                  <input
                    className='form-check-input'
                    type='radio'
                    checked={
                      data?.checkout_setting?.billing_shipping_info?.address === 'Required'
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkout_setting: {
                          ...data?.checkout_setting,
                          billing_shipping_info: {
                            ...data?.checkout_setting?.billing_shipping_info,
                            address: 'Required',
                          },
                        },
                      })
                    }
                  />
                  <span className='form-check-label'>Required</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className='card mt-4'>
        <div className='card-body'>
          <div className='row row-cols-2 row-cols-lg-4 gy-5'>
            <div className='col'>
              <h4>Product Vat Show</h4>
              <div className='d-flex flex-column'>
                <div className='mb-1'>
                  <input
                    type='text'
                    className='form-control form-control-solid mb-3 mb-lg-0'
                    placeholder='Enter VAT text'
                    value={data?.general_settings?.product_page?.vat_text}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general_settings: {
                          ...data?.general_settings,
                          product_page: {
                            ...data?.general_settings?.product_page,
                            vat_text: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className='col'>
              <h4>Privacy policy</h4>
              <Select value={selectedPages} options={pages} isMulti onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
      <div className='card-footer d-flex justify-content-end py-6 px-9'>
        <button type='submit' onClick={() => updateSetting()} className='btn btn-dark btn-sm'>
          SAVE CHANGE
        </button>
      </div>
    </>
  )
}

export default Checkout
