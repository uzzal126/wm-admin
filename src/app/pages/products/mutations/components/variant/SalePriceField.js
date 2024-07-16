import React, {useEffect} from 'react'
import {Col} from 'react-bootstrap'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import FormTextField from '../../../../../modules/components/formik/fields/form-field'
import Discount from '../discount'

export default function VariantSalePrice({item, setFieldValue, index, values}) {
  const getSalePrice = () => {
    if (item?.price.has_discount) {
      if (item?.price.discount_type === 'fixed') {
        return item?.price.selling_price - (Number(item?.price.discount_amount) || 0)
      } else {
        return (
          item?.price.selling_price -
          ((item?.price.selling_price * Number(item?.price.discount_percentage)) / 100 || 0)
        )
      }
    } else {
      return item?.price.selling_price
    }
  }
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])
  return (
    <>
      <button
        disabled={false}
        type='button'
        className='btn border btn-sm min-w-95px'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        {item?.price.has_discount ? (
          <div className='d-flex flex-column'>
            <div className='badge badge-success fw-bolder'>On Sale</div>
            {`৳ ${getSalePrice()}`}
          </div>
        ) : (
          `৳ ${item?.price.selling_price}`
        )}
      </button>
      <div className='menu menu-sub menu-sub-dropdown w-350px w-md-350px' data-kt-menu='true'>
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Sale Price</div>
        </div>

        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {item?.price.has_discount && (
            <>
              <span className='me-2'>৳ {getSalePrice()}</span>
              <del className='text-muted'>৳ {item?.price.selling_price}</del>
            </>
          )}
          <div className='col'>
            <label className='form-check form-switch form-check-custom form-check-solid '>
              <span className='form-check-label me-5'>On Sale</span>
              <input
                className='form-check-input'
                id='id-overview-url-enable'
                type='checkbox'
                checked={item?.price.has_discount}
                onChange={() => {
                  setFieldValue(`variants.${index}.price.has_discount`, !item?.price.has_discount)
                  setFieldValue(`variants.${index}.price.discount_type`, 'percentage')
                }}
              />
            </label>
          </div>
          {item?.price.has_discount && (
            <Discount setFieldValue={setFieldValue} values={values} minimum={true} index={index} />
          )}
          <FormTextField
            as={Col}
            label='Sale Price'
            controlId='validationFormik-salie'
            type='number'
            name={`variants.${index}.price.selling_price`}
          />
        </div>
      </div>
    </>
  )
}
