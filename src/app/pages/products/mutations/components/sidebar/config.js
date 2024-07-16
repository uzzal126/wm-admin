import React from 'react'
import FormCheckboxField from '../../../../../modules/components/formik/fields/form-field-checkbox'
import {ToolTipLabel} from '../../../../../modules/helper/misc'

const ProductConfig = ({setFieldValue, values}) => {
  return (
    <div className='card card-flush py-4 mt-5'>
      <div className='card-header min-h-auto'>
        <div className='card-title pb-2'>
          <h2>Configuration</h2>
        </div>
      </div>
      <div className='card-body py-0'>
        <ToolTipLabel
          label='Price'
          tooltip='Do you want to hide price to your client.'
          className='required'
        />
        <div className='separator mb-2' />
        <div className='mb-5 fv-row'>
          <FormCheckboxField
            controlId='priceCheckbox'
            label='Price Visibility'
            name='price_visibility'
            onChange={(e) =>
              setFieldValue('price_visibility', values.price_visibility === 1 ? 0 : 1)
            }
            size='xs'
            check={values.price_visibility === 1}
            required
          />
        </div>
        <ToolTipLabel
          label='Add To Cart'
          tooltip='Do you want to hide add to cart button to your client.'
          className='required'
        />
        <div className='separator mb-2' />
        <div className='mb-5 fv-row'>
          <FormCheckboxField
            controlId='cartCheckbox'
            label='Cart Visibility'
            name='cart_visibility'
            onChange={(e) => setFieldValue('cart_visibility', values.cart_visibility === 1 ? 0 : 1)}
            size='xs'
            check={values.cart_visibility === 1}
            required
          />
        </div>
      </div>
    </div>
  )
}

export default ProductConfig
