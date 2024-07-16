import React from 'react'
import {Col} from 'react-bootstrap'
import FormTextField from '../../../../modules/components/formik/fields/form-field'

const Inventory = ({edit}) => {
  return (
    <div className='card card-flush py-4'>
      <div className='card-header min-h-auto'>
        <div className='card-title'>
          <h2>Inventory</h2>
        </div>
      </div>
      <div className='card-body py-0'>
        <div className='row row-cols-1 row-cols-sm-2'>
          <div className='mb-5 fv-row'>
            <FormTextField
              as={Col}
              controlId='validationFormik-sku'
              label='Product SKU'
              type='text'
              name='sku'
              tooltip='Enter the product SKU.'
            />
          </div>
          {edit === undefined && (
            <div className='mb-5 fv-row'>
              <FormTextField
                as={Col}
                controlId='validationFormik-sku'
                label='Product Quantity'
                type='number'
                name='variants[0].qty'
                tooltip='Enter the product Quantity.'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Inventory
