import moment from 'moment'
import {ToolTipLabel} from '../../../../modules/helper/misc'
import {FormField} from '../../components/FormField'

const Discount = ({values, setFieldValue, minimum, index, onBlur = false}) => {
  const discountType = values.variants[index || 0].price.discount_type

  return (
    <div>
      <div className='fv-row mb-5'>
        <ToolTipLabel
          label='Discount Type'
          tooltip='Select a discount type that will be applied to this product.'
        />
        <div
          className={`row row-cols-1 row-cols-sm-${minimum ? '2' : '3'} row-cols-xl-${
            minimum ? '2' : '3'
          } g-3 g-xl-9`}
        >
          {(!minimum || minimum === undefined) && (
            <div className='col'>
              <label
                className={`btn btn-outline btn-outline-dashed btn-outline-default d-flex text-start p-6 ${
                  discountType === 'no' ? 'active' : ''
                }`}
              >
                <span className='form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='discount_option'
                    onChange={() => {
                      setFieldValue(`variants[${index || 0}].price.has_discount`, false)
                      setFieldValue(`variants[${index || 0}].price.discount_type`, 'no')
                    }}
                    checked={discountType === 'no' ? true : false}
                  />
                </span>
                <span className='ms-5'>
                  <span className='fs-4 fw-bolder text-gray-800 d-block'>
                    {minimum ? 'No' : 'No Discount'}
                  </span>
                </span>
              </label>
            </div>
          )}
          <div className='col'>
            <label
              className={`btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center text-start p-6 ${
                discountType === 'Percentage' ? 'active' : ''
              }`}
            >
              <span className='form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1'>
                <input
                  className='form-check-input'
                  type='radio'
                  onChange={() => {
                    setFieldValue(`variants[${index || 0}].price.discount_type`, 'Percentage')
                    setFieldValue(`variants[${index || 0}].price.has_discount`, true)
                  }}
                  checked={discountType === 'Percentage'}
                  name='discount_option'
                />
              </span>
              <span className='ms-3 w-100 d-flex align-items-center justify-content-between'>
                <span className='fs-4 fw-bolder text-gray-800 d-block'>
                  {minimum ? '%' : 'Percentage %'}
                </span>
                <FormField
                  type='number'
                  name='discounted_price'
                  className='form-control w-100px px-2 py-2'
                  minimum={1}
                  maximum={100}
                  maximumLength={3}
                  placeholder='%'
                  value={
                    values.variants[index || 0].price.discount_type === 'Percentage'
                      ? values.variants[index || 0].price.discount_percentage
                      : ''
                  }
                  onChange={(e) => {
                    setFieldValue(`variants[${index || 0}].price.discount_amount`, 0)
                    setFieldValue(
                      `variants[${index || 0}].price.discount_percentage`,
                      e.target.value
                    )
                    setFieldValue(`variants[${index || 0}].price.discount_type`, 'Percentage')
                    setFieldValue(`variants[${index || 0}].price.has_discount`, true)
                  }}
                  onBlur={(e) => onBlur && onBlur(e)}
                />
              </span>
            </label>
          </div>
          <div className='col'>
            <label
              className={`btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center text-start p-6 ${
                discountType === 'Fixed' ? 'active' : ''
              }`}
            >
              <span className='form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1'>
                <input
                  className='form-check-input'
                  type='radio'
                  onChange={() => {
                    setFieldValue(`variants[${index || 0}].price.discount_type`, 'Fixed')
                    setFieldValue(`variants[${index || 0}].price.has_discount`, true)
                  }}
                  checked={discountType === 'Fixed'}
                  name='discount_option'
                />
              </span>
              <span className='ms-5 w-100 d-flex align-items-center justify-content-between'>
                <span className='fs-4 me-2 fw-bolder text-gray-800 d-block'>
                  {minimum ? '৳' : 'Fixed Discount'}
                </span>
                <FormField
                  type='number'
                  name='dicsounted_price'
                  className='form-control w-100px px-2 py-2'
                  placeholder='৳'
                  minimum={1}
                  maximum={values?.variants[index || 0]?.price?.selling_price || 100000000}
                  maximumLength={8}
                  value={
                    values.variants[index || 0].price.discount_type === 'Fixed'
                      ? values.variants[index || 0].price.discount_amount
                      : ''
                  }
                  onChange={(e) => {
                    setFieldValue(
                      `variants[${index || 0}].price.discount_amount`,
                      Number(e.target.value)
                    )
                    setFieldValue(`variants[${index || 0}].price.discount_percentage`, 0)
                    setFieldValue(`variants[${index || 0}].price.discount_type`, 'Fixed')
                    setFieldValue(`variants[${index || 0}].price.has_discount`, true)
                  }}
                  onBlur={(e) => onBlur && onBlur(e)}
                />
              </span>
            </label>
          </div>
        </div>
      </div>
      {values.variants[index || 0].price.discount_type !== 'no' && (
        <>
          <div className='row row-cols-1 row-cols-lg-2'>
            <div className='mb-5'>
              <label htmlFor='start_datepicker' className='form-label'>
                Select start date
              </label>
              <input
                id='start_datepicker'
                value={moment(values.variants[index || 0].price.discount_start_date).format(
                  'YYYY-MM-DD'
                )}
                type='date'
                required
                className='form-control'
                onChange={(e) =>
                  setFieldValue(
                    `variants[${index || 0}].price.discount_start_date`,
                    moment(e.target.value).format('YYYY-MM-DD hh:mm:ss')
                  )
                }
              />
            </div>
            <div className='mb-5'>
              <label htmlFor='end_datepicker' className='form-label'>
                Select end date
              </label>

              <input
                id='end_datepicker'
                type='date'
                required
                className='form-control'
                value={moment(values.variants[index || 0].price.discount_end_date).format(
                  'YYYY-MM-DD'
                )}
                onChange={(e) =>
                  setFieldValue(
                    `variants[${index || 0}].price.discount_end_date`,
                    moment(e.target.value).format('YYYY-MM-DD hh:mm:ss')
                  )
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Discount
