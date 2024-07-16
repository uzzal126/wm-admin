import {Col} from 'react-bootstrap'
import FormTextField from '../../../../modules/components/formik/fields/form-field'
import Dimensions from './dimensions'
import Discount from './discount'

const FormPricing = ({values, setFieldValue, type}) => {
  return (
    <div className='card card-flush py-4'>
      <div className='card-header min-h-auto'>
        <div className='card-title'>
          <h2>Pricing</h2>
        </div>
      </div>
      <div className='card-body py-0'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-2'>
          <div className='mb-5 fv-row'>
            <FormTextField
              as={Col}
              controlId='validationFormikCost'
              label='Cost price (৳)'
              type='number'
              min='0'
              name='variants[0].price.cost_price'
              tooltip='Set purchase price.'
              className='required'
              required
              placeholder='0'
            />
          </div>
          <div className='mb-5 fv-row'>
            <FormTextField
              as={Col}
              controlId='validationFormikSale'
              label='Sale price (৳)'
              type='number'
              min='0'
              name='variants[0].price.selling_price'
              className='required'
              placeholder='0'
              onChange={(e) => {
                setFieldValue('variants[0].price.selling_price', Number(e.target.value))
                setFieldValue('selling_price', Number(e.target.value))
              }}
              tooltip='Set Sale price.'
              required
            />
          </div>
        </div>
        {type && type[0].id && type[0].id === 1 && <Dimensions setFieldValue={setFieldValue} />}
        <Discount setFieldValue={setFieldValue} values={values} />
      </div>
    </div>
  )
}

export default FormPricing
