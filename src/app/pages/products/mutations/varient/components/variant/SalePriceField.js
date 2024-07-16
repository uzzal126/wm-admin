import moment from 'moment'
import {useEffect} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import Discount from '../../../components/discount'
import { FormField } from '../../../../components/FormField'

export default function VariantSalePrice({item, setFieldValue, index, values, onBlur = false}) {
  const getSalePrice = () => {
    if (item?.price.has_discount) {
      if (item?.price.discount_type === 'Fixed') {
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
      >
        {item?.price.has_discount ? (
          <div className='d-flex flex-column'>
            <div className='badge badge-success fw-bolder'>On Sale</div>
            {`${getSalePrice().toFixed(2)}`}
          </div>
        ) : (
          `${item?.price.selling_price}`
        )}
      </button>
      <form className='menu menu-sub menu-sub-dropdown w-350px w-md-500px' data-kt-menu='true'>
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Pricing</div>
        </div>

        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {/* <FormTextField
            as={Col}
            label='Sale Price'
            controlId='validationFormik-salie'
            type='number'
            name={`variants.${index}.price.selling_price`}
            onBlur={(e) => onBlur && onBlur(e)}
          /> */}
          <div className='col'>
            <label className='form-label' htmlFor='validationFormik-salie'>
              Sale Price
            </label>
            <FormField
              name={`variants.${index}.price.selling_price`}
              type='number'
              minimum={1}
              maximumLength={8}
              // id='validationFormik-salie'
              // className='form-control'
              value={values.variants[index]?.price?.selling_price || 0}
              onChange={(e) => {
                if (Number(e.target.value) >= 0 && Number(e.target.value) <= 100000000) {
                  setFieldValue(
                    `variants.${index}.price.selling_price`,
                    Number(e.target.value) || 0
                  )
                }
              }}
              onBlur={(e) => onBlur && onBlur(e)}
            />
          </div>
          {item?.price.has_discount && (
            <>
              <span className='me-2 mt-2 d-inline-block'>৳ {getSalePrice().toFixed(2)}</span>
              <del className='text-muted'> {item?.price.selling_price}</del>
            </>
          )}
          <div className='col'>
            <label className='form-check form-switch form-check-custom form-check-solid '>
              <span className='form-check-label me-5 ms-0'>On Sale</span>
              <input
                className='form-check-input'
                id='id-overview-url-enable'
                type='checkbox'
                checked={item?.price.has_discount}
                onChange={() => {
                  setFieldValue(`variants.${index}.price.has_discount`, !item?.price.has_discount)
                  setFieldValue(`variants.${index}.price.discount_type`, 'Percentage')
                  setFieldValue(
                    `variants[${index || 0}].price.discount_start_date`,
                    moment().format('YYYY-MM-DD hh:mm:ss')
                  )
                  setFieldValue(
                    `variants[${index || 0}].price.discount_end_date`,
                    moment().add(30, 'days').format('YYYY-MM-DD hh:mm:ss')
                  )
                  setFieldValue(`variants[${index || 0}].price.discount_amount`, 0)
                  setFieldValue(`variants[${index || 0}].price.discount_percentage`, 0)
                  setFieldValue(`variants[${index || 0}].need_save`, true)
                }}
              />
            </label>
          </div>
          {item?.price.has_discount && (
            <Discount
              onBlur={onBlur}
              setFieldValue={setFieldValue}
              values={values}
              minimum={true}
              index={index}
            />
          )}
        </div>
      </form>
    </>
  )
}
