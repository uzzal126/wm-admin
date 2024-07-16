import {Col} from 'react-bootstrap'
import FormTextField from '../../../../modules/components/formik/fields/form-field'
import FormSelectField from '../../../../modules/components/formik/fields/form-select-field'

export const weight = [
  {
    id: 1,
    name: 'kg',
    description: 'Kilogram',
  },
  {
    id: 2,
    name: 'gm',
    description: 'gram',
  },
  {
    id: 3,
    name: 'lb',
    description: 'pound',
  },
]

const length = [
  {
    id: 1,
    name: 'mm',
    description: 'Millimeter',
  },
  {
    id: 2,
    name: 'cm',
    description: 'Centimeter',
  },
  {
    id: 3,
    name: 'm',
    description: 'Meter',
  },
  {
    id: 4,
    name: 'in',
    description: 'Inch',
  },
  {
    id: 5,
    name: 'ft',
    description: 'Feet',
  },
]

const Dimensions = ({index, setFieldValue, onBlur}) => {
  return (
    <div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-2'>
        <div className='mb-5 fv-row'>
          <FormTextField
            as={Col}
            controlId='validationFormikWeight'
            label='Weight'
            type='text'
            name={`variants[${index || 0}].shipping_attribute.weight`}
            tooltip='Set the product Weight.'
            groupEnd={true}
            required
            className='required'
            onBlur={(e) => onBlur && onBlur(e)}
            inputGroupPrepend={
              <div className='input-group-text p-0'>
                <FormSelectField
                  // as={Col}
                  type='number'
                  controlId='validationFormikWeight'
                  name={`variants[${index || 0}].shipping_attribute.weight_class_id`}
                  onBlur={(e) => onBlur && onBlur(e)}
                  onChange={(e) =>
                    setFieldValue(
                      `variants[${index || 0}].shipping_attribute.weight_class_id`,
                      Number(e.target.value)
                    )
                  }
                >
                  {weight.map((item, i) => (
                    <option value={item.id} key={i}>
                      {item.name}
                    </option>
                  ))}
                </FormSelectField>
              </div>
            }
          />
        </div>
        <div className='mb-5 fv-row'>
          <FormTextField
            as={Col}
            controlId='validationFormikLength'
            label='Length'
            type='text'
            required
            className='required'
            onBlur={(e) => onBlur && onBlur(e)}
            name={`variants[${index || 0}].shipping_attribute.length`}
            tooltip='Set the product Length.'
            groupEnd={true}
            inputGroupPrepend={
              <div className='input-group-text p-0'>
                <FormSelectField
                  controlId='validationFormikLength'
                  name={`variants[${index || 0}].shipping_attribute.length_class_id`}
                  onBlur={(e) => onBlur && onBlur(e)}
                  onChange={(e) =>
                    setFieldValue(
                      `variants[${index || 0}].shipping_attribute.length_class_id`,
                      Number(e.target.value)
                    )
                  }
                >
                  {length.map((item, i) => (
                    <option value={item.id} key={i}>
                      {item.name}
                    </option>
                  ))}
                </FormSelectField>
              </div>
            }
          />
        </div>
      </div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-2'>
        <div className='mb-5 fv-row'>
          <FormTextField
            as={Col}
            controlId='validationFormikWidth'
            label='Width'
            type='text'
            required
            className='required'
            onBlur={(e) => onBlur && onBlur(e)}
            name={`variants[${index || 0}].shipping_attribute.width`}
            tooltip='Set Width.'
            groupEnd={true}
            inputGroupPrepend={
              <div className='input-group-text p-0'>
                <FormSelectField
                  controlId='validationFormikLength'
                  name={`variants[${index || 0}].shipping_attribute.length_class_id`}
                  onBlur={(e) => onBlur && onBlur(e)}
                  onChange={(e) =>
                    setFieldValue(
                      `variants[${index || 0}].shipping_attribute.length_class_id`,
                      Number(e.target.value)
                    )
                  }
                >
                  {length.map((item, i) => (
                    <option value={item.id} key={i}>
                      {item.name}
                    </option>
                  ))}
                </FormSelectField>
              </div>
            }
          />
        </div>
        <div className='mb-5 fv-row'>
          <FormTextField
            as={Col}
            controlId='validationFormikHeight'
            label='Height'
            type='text'
            name={`variants[${index || 0}].shipping_attribute.height`}
            onBlur={(e) => onBlur && onBlur(e)}
            tooltip='Set Height.'
            groupEnd={true}
            required
            className='required'
            inputGroupPrepend={
              <div className='input-group-text p-0'>
                <FormSelectField
                  controlId='validationFormikLength'
                  name={`variants[${index || 0}].shipping_attribute.length_class_id`}
                  onChange={(e) =>
                    setFieldValue(
                      `variants[${index || 0}].shipping_attribute.length_class_id`,
                      Number(e.target.value)
                    )
                  }
                >
                  {length.map((item, i) => (
                    <option value={item.id} key={i}>
                      {item.name}
                    </option>
                  ))}
                </FormSelectField>
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Dimensions
