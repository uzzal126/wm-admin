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

const Dimensions = ({index, setFieldValue, onBlur, values}) => {
  return (
    <div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-2'>
        <div className='mb-5 fv-row'>
          {/* <FormTextField
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
          /> */}
          <div className='col'>
            <label className='form-label required'>
              <span className='me-1'>Weight</span>
              <i className='fas fa-info-circle fs-6' />
            </label>
            <div className='input-group'>
              <input
                name={`variants[${index || 0}].shipping_attribute.weight`}
                type='number'
                id='validationFormikWeight'
                className='required form-control'
                value={values?.variants[index || 0]?.shipping_attribute?.weight}
                min={0.1}
                step={0.1}
                onChange={(e) => {
                  if (Number(e.target.value) >= 0.1 && Number(e.target.value) <= 9999) {
                    setFieldValue(
                      `variants[${index || 0}].shipping_attribute.weight`,
                      Number(e.target.value) || 0
                    )
                  }
                }}
                onBlur={(e) => onBlur && onBlur(e)}
              />
              <div className='input-group-text p-0'>
                <div>
                  <select
                    name={`variants[${index || 0}].shipping_attribute.weight_class_id`}
                    className='form-select'
                    id='validationFormikWeight'
                    onBlur={(e) => onBlur && onBlur(e)}
                    onChange={(e) =>
                      setFieldValue(
                        `variants[${index || 0}].shipping_attribute.weight_class_id`,
                        Number(e.target.value)
                      )
                    }
                  >
                    <option
                      value={1}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.weight_class_id === 1
                      }
                    >
                      kg
                    </option>
                    <option
                      value={2}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.weight_class_id === 2
                      }
                    >
                      gm
                    </option>
                    <option
                      value={3}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.weight_class_id === 3
                      }
                    >
                      lb
                    </option>
                  </select>
                  <div className='invalid-feedback' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-5 fv-row'>
          {/* <FormTextField
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
          /> */}
          <div className='col'>
            <label className='form-label required'>
              <span className='me-1'>Length</span>
              <i className='fas fa-info-circle fs-6' />
            </label>
            <div className='input-group'>
              <input
                name={`variants[${index || 0}].shipping_attribute.length`}
                type='number'
                id='validationFormikLength'
                className='required form-control'
                value={values?.variants[index || 0]?.shipping_attribute?.length}
                min={0.1}
                step={0.1}
                onChange={(e) => {
                  if (Number(e.target.value) >= 0.1 && Number(e.target.value) <= 9999) {
                    setFieldValue(
                      `variants[${index || 0}].shipping_attribute.length`,
                      Number(e.target.value) || 0
                    )
                  }
                }}
                onBlur={(e) => onBlur && onBlur(e)}
              />
              <div className='input-group-text p-0'>
                <div>
                  <select
                    name={`variants[${index || 0}].shipping_attribute.length_class_id`}
                    className='form-select'
                    id='validationFormikLength'
                    onBlur={(e) => onBlur && onBlur(e)}
                    onChange={(e) =>
                      setFieldValue(
                        `variants[${index || 0}].shipping_attribute.length_class_id`,
                        Number(e.target.value)
                      )
                    }
                  >
                    <option
                      value={1}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 1
                      }
                    >
                      mm
                    </option>
                    <option
                      value={2}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 2
                      }
                    >
                      cm
                    </option>
                    <option
                      value={3}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 3
                      }
                    >
                      m
                    </option>
                    <option
                      value={4}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 4
                      }
                    >
                      in
                    </option>
                    <option
                      value={5}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 5
                      }
                    >
                      ft
                    </option>
                  </select>
                  <div className='invalid-feedback' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-2'>
        <div className='mb-5 fv-row'>
          {/* <FormTextField
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
          /> */}
          <div className='col'>
            <label className='form-label required'>
              <span className='me-1'>Width</span>
              <i className='fas fa-info-circle fs-6' />
            </label>
            <div className='input-group'>
              <input
                name={`variants[${index || 0}].shipping_attribute.width`}
                type='number'
                id='validationFormikWidth'
                className='required form-control'
                value={values?.variants[index || 0]?.shipping_attribute?.width}
                min={0.1}
                step={0.1}
                onChange={(e) => {
                  if (Number(e.target.value) >= 0.1 && Number(e.target.value) <= 9999) {
                    setFieldValue(
                      `variants[${index || 0}].shipping_attribute.width`,
                      Number(e.target.value) || 0
                    )
                  }
                }}
                onBlur={(e) => onBlur && onBlur(e)}
              />
              <div className='input-group-text p-0'>
                <div>
                  <select
                    name={`variants[${index || 0}].shipping_attribute.length_class_id`}
                    className='form-select'
                    id='validationFormikLength'
                    onBlur={(e) => onBlur && onBlur(e)}
                    onChange={(e) =>
                      setFieldValue(
                        `variants[${index || 0}].shipping_attribute.length_class_id`,
                        Number(e.target.value)
                      )
                    }
                  >
                    <option
                      value={1}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 1
                      }
                    >
                      mm
                    </option>
                    <option
                      value={2}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 2
                      }
                    >
                      cm
                    </option>
                    <option
                      value={3}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 3
                      }
                    >
                      m
                    </option>
                    <option
                      value={4}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 4
                      }
                    >
                      in
                    </option>
                    <option
                      value={5}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 5
                      }
                    >
                      ft
                    </option>
                  </select>
                  <div className='invalid-feedback' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-5 fv-row'>
          {/* <FormTextField
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
          /> */}
          <div className='col'>
            <label className='form-label required'>
              <span className='me-1'>Height</span>
              <i className='fas fa-info-circle fs-6' />
            </label>
            <div className='input-group'>
              <input
                name={`variants[${index || 0}].shipping_attribute.height`}
                type='text'
                id='validationFormikHeight'
                className='required form-control'
                value={values?.variants[index || 0]?.shipping_attribute?.height}
                min={0.1}
                step={0.1}
                onChange={(e) => {
                  if (Number(e.target.value) >= 0.1 && Number(e.target.value) <= 9999) {
                    setFieldValue(
                      `variants[${index || 0}].shipping_attribute.height`,
                      Number(e.target.value) || 0
                    )
                  }
                }}
                onBlur={(e) => onBlur && onBlur(e)}
              />
              <div className='input-group-text p-0'>
                <div>
                  <select
                    name={`variants[${index || 0}].shipping_attribute.length_class_id`}
                    className='form-select'
                    id='validationFormikLength'
                    onBlur={(e) => onBlur && onBlur(e)}
                    onChange={(e) =>
                      setFieldValue(
                        `variants[${index || 0}].shipping_attribute.length_class_id`,
                        Number(e.target.value)
                      )
                    }
                  >
                    <option
                      value={1}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 1
                      }
                    >
                      mm
                    </option>
                    <option
                      value={2}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 2
                      }
                    >
                      cm
                    </option>
                    <option
                      value={3}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 3
                      }
                    >
                      m
                    </option>
                    <option
                      value={4}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 4
                      }
                    >
                      in
                    </option>
                    <option
                      value={5}
                      selected={
                        values?.variants[index || 0]?.shipping_attribute?.length_class_id === 5
                      }
                    >
                      ft
                    </option>
                  </select>
                  <div className='invalid-feedback' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dimensions
