import React, {useState} from 'react'
import {Col} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {options} from '../../../../../constants/products.constants'
import CropperComponents from '../../../../../modules/components/cropper/CropperComponents'
import {ToolTipLabel} from '../../../../../modules/helper/misc'
import TagInputs from './TagInputs2'
import DimensionsInput from './DimensionsInput'
import VariantSalePrice from './SalePriceField'
import StockField from './StockField'
import SelectOption from './TagInputs'
import FormTextField from '../../../../../modules/components/formik/fields/form-field'

const defaultImage = '/media/products/dummy-product.jpg'

const ProductVariant = ({values, setFieldValue, type}) => {
  const [variationRows, setVariationRows] = useState([])
  const [variantsLabel, setVariantsLabel] = useState([])
  const [values1, setValues1] = useState(null)
  const [values2, setValues2] = useState(null)
  const [values3, setValues3] = useState(null)

  const handleRowChange = (idx, key, value) => {
    let row = [...variationRows]

    if (key === 'variantName') {
      row[idx] = {
        ...row[idx],
        [key]: value,
      }
      setVariationRows(row)
    } else {
      if (idx === 0) {
        setValues1(value)
      }
      if (idx === 1) {
        setValues2(value)
      }
      if (idx === 2) {
        setValues3(value)
      }
    }
  }
  const getOptions = (indx) => {
    let list = []
    for (let i = 0; i < options.length; i++) {
      let taken = false
      variationRows.forEach((el, idx) => {
        if (el?.variantName === options[i]?.value && idx !== indx) {
          taken = true
        }
      })
      if (!taken) {
        list.push(options[i])
      }
    }
    return list
  }

  const generateVariables = () => {
    let variants = []

    const option1 = variationRows.length > 0 ? variationRows[0].variantName : null
    const option2 = variationRows.length > 1 ? variationRows[1].variantName : null
    const option3 = variationRows.length > 2 ? variationRows[2].variantName : null

    if (option1 === '' || option2 === '' || option3 === '') {
      toast.error('Variant name required')
    } else if (
      values1.length === 0 ||
      (values2 !== null && values2.length === 0) ||
      (values3 !== null && values3.length === 0)
    ) {
      toast.error('Variant value required')
    } else {
      for (let i = 0; i < values1.length; i++) {
        let row = {
          ...values.variants[0],
          option: option1,
          value: values1[i]?.trim(),
        }

        if (values2 && values2.length > 0) {
          for (let j = 0; j < values2.length; j++) {
            const newRow = {...row, option2: option2, value2: values2[j]?.trim()}

            if (values3 && values3.length > 0) {
              for (let k = 0; k < values3.length; k++) {
                const newNewRow = {...newRow, option3: option3, value3: values3[k]?.trim()}
                variants.push(newNewRow)
              }
            } else {
              variants.push(newRow)
            }
          }
        } else {
          variants.push(row)
        }

        setVariantsLabel(variationRows.map((f) => f.variantName).filter((f) => f !== ''))
        setFieldValue('variants', variants)
      }
    }
  }

  return (
    <div className='card card-flush py-4'>
      <div className='card-header min-h-auto'>
        <div className='card-title'>
          <h2>Variations</h2>
        </div>
      </div>
      <div className='card-body py-0'>
        <div id='kt_docs_repeater_basic'>
          <div className='form-group'>
            <div data-repeater-list='kt_docs_repeater_basic'>
              {variationRows &&
                variationRows.length > 0 &&
                variationRows.map((item, indx) => (
                  <div data-repeater-item key={`pv-${indx}`}>
                    <div className={`row g-3 mb-2`}>
                      <div className='col-sm-3'>
                        {indx === 0 && (
                          <ToolTipLabel
                            label='Variant Name'
                            tooltip='Enter the product variant name like color, size, weight etc.'
                          />
                        )}
                        <SelectOption
                          setValues={
                            options.filter((f) => f.value === item.variantName).length > 0
                              ? options.filter((f) => f.value === item.variantName)
                              : item.variantName
                          }
                          suggest={getOptions(indx)}
                          onChange={(e) => handleRowChange(indx, 'variantName', e.value)}
                        />
                      </div>
                      <div className='col'>
                        {indx === 0 && (
                          <ToolTipLabel
                            label='Variant Value'
                            tooltip='Enter the product variant value like black, white, 1kg, xl etc.'
                          />
                        )}
                        <TagInputs
                          setValues={item.variantValues}
                          suggest={
                            options.filter((f) => f.value === item.variantName).length > 0
                              ? options.filter((f) => f.value === item.variantName)
                              : []
                          }
                          onChange={(e) => handleRowChange(indx, 'variantValues', e)}
                        />
                      </div>
                      {variationRows.length > 1 && (
                        <div className='col-auto'>
                          <button
                            onClick={() =>
                              variationRows.length > 1 &&
                              setVariationRows(variationRows.filter((f, i) => i !== indx))
                            }
                            data-repeater-delete
                            className={`btn btn-icon btn-light-danger ${
                              indx === 0 ? 'mt-3 mt-md-8' : ''
                            }`}
                          >
                            <i className='la la-trash-o fs-2'></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className='form-group mt-5 text-end'>
            <button
              type='button'
              disabled={variationRows.length > 2 ? true : false}
              className='btn btn-light-primary btn-sm'
              onClick={() => {
                variationRows.length < 3 &&
                  setVariationRows([...variationRows, {variantName: '', variantValues: []}])
              }}
            >
              <i className='la la-plus'></i>Add Variant
            </button>
            <button
              type='button'
              className='btn btn-sm btn-dark ms-5'
              onClick={() => generateVariables()}
            >
              <span className='indicator-label'>Generate Variant</span>
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className='separator separator-dashed border-dark my-4'></div>
      <div className='variable-container'>
        {values.variants.length > 0 ? (
          values.variants[0].value !== 'Default' && (
            <table className='table table-row-dashed table-row-gray-300 g-1'>
              <thead>
                <tr className='fw-bolder fs-6 text-gray-800'>
                  {variantsLabel.map((item, indx) => (
                    <th key={`pfs-${indx}`}>{item}</th>
                  ))}
                  <th>Stock</th>
                  <th>Cost Price (৳)</th>
                  <th>Sale Price (৳)</th>
                  {type && type[0].id && type[0].id === 1 && <th>Dimensions</th>}
                  <th>Image</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {values.variants.map((item, indx) => (
                  <tr key={`fds-${indx}`}>
                    <td>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        readOnly
                        value={item.value}
                      />
                    </td>
                    {variantsLabel.length > 1 && (
                      <td>
                        <input
                          type='text'
                          className='form-control form-control-solid'
                          readOnly
                          value={item.value2}
                        />
                      </td>
                    )}
                    {variantsLabel.length === 3 && (
                      <td>
                        <input
                          type='text'
                          className='form-control form-control-solid'
                          readOnly
                          value={item.value3}
                        />
                      </td>
                    )}
                    <td>
                      <StockField item={item} setFieldValue={setFieldValue} index={indx} />
                    </td>
                    <td>
                      <FormTextField
                        as={Col}
                        controlId='validationFormik-sale'
                        type='text'
                        name={`variants.${indx}.price.cost_price`}
                      />
                    </td>
                    <td>
                      <VariantSalePrice
                        item={item}
                        setFieldValue={setFieldValue}
                        index={indx}
                        values={values}
                      />
                    </td>
                    {type && type[0].id && type[0].id === 1 && (
                      <td>
                        <DimensionsInput item={item} setFieldValue={setFieldValue} index={indx} />
                      </td>
                    )}
                    <td>
                      <CropperComponents
                        onCroped={(url) => {
                          setFieldValue(`variants.${indx}.thumbnail.src`, url[0])
                          setFieldValue(`variants.${indx}.thumbnail.alt`, url[1])
                        }}
                        className='w-75px h-50px'
                        width={600}
                        height={620}
                        src={item.thumbnail_url !== '' ? item.thumbnail_url : defaultImage}
                      />
                    </td>
                    <td className='text-end'>
                      <button
                        onClick={() => setFieldValue('variants', values.variants.remove(indx))}
                        className='btn btn-icon btn-sm btn-light-danger'
                      >
                        <i className='la la-trash-o'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <p style={{textAlign: 'center'}}>Generate Variables to add attribute</p>
        )}
      </div>
    </div>
  )
}

export default ProductVariant
