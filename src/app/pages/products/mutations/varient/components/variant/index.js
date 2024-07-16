import React, {useState} from 'react'
import CreatableSelect from 'react-select/creatable'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {options} from '../../../../../../constants/products.constants'
import {ToolTipLabel} from '../../../../../../modules/helper/misc'
import {initialFormData} from '../helper/inisialValue'
import ExistingVariants from './existing'
import NewVariants from './newVariants'

const ProductVariant = ({
  product,
  values,
  setFieldValue,
  type,
  isUserLoading,
  isSubmitting,
  isValid,
  touched,
}) => {
  // // console.log('values', values)
  const [variationRows, setVariationRows] = useState([])
  // const [variations, setVariations] = useState([])
  // const [values1, setValues1] = useState(null)
  // const [values2, setValues2] = useState(null)
  // const [values3, setValues3] = useState(null)

  const handleRowChange = (idx, key, value) => {
    // // console.log(value)
    // let row = [...variationRows]

    // row[idx] = {
    //   ...row[idx],
    //   [key]: value,
    // }
    // console.log({row})
    // setVariationRows(row)

    let newRows = []

    for (let i = 0; i < variationRows.length; i++) {
      const row = variationRows[i]
      if (i === idx) {
        console.log({row})
        if (key === 'variantName' && typeof value === 'string' && value.length > 0) {
          newRows.push({
            ...row,
            [key]: value,
            variantValues: [],
          })
        } else {
          newRows.push({
            ...row,
            [key]: [...value],
          })
        }
      } else if (value) {
        newRows.push(row)
      }
    }
    console.log({newRows})
    setVariationRows(newRows)

    // if (key === 'variantName') {
    //   row[idx] = {
    //     ...row[idx],
    //     [key]: value,
    //   }
    //   setVariationRows(row)
    // } else {
    //   if (idx === 0) {
    //     setValues1(value)
    //   }
    //   if (idx === 1) {
    //     setValues2(value)
    //   }
    //   if (idx === 2) {
    //     setValues3(value)
    //   }
    // }
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

  const getVariantValues = (variantName) => {
    const option = options.filter((e) => e?.value === variantName)
    const list = (Array.isArray(option) && option[0]?.list) || []

    const values = []
    for (let i = 0; i < list.length; i++) {
      const row = variationRows.filter((e) => e?.variantName === variantName)[0]
      if (row && Array.isArray(row?.variantValues) && !row?.variantValues?.includes(list[i])) {
        values.push({
          id: i,
          label: list[i],
          value: list[i],
        })
      }
    }

    return values
  }

  const generateVariables = () => {
    // // console.log('variants', values1)
    // const existingVariants = values.variants.filter(
    //   (f) => f.variant_type !== 'new' && f.option !== null && f.option !== 'Variant'
    // )
    // let variants = [...existingVariants]
    // if (values.variants.length === 1 && values.variants[0].value === 'Default') {
    //   setFieldValue('keep_previous', false)
    // }

    swal({
      title: 'Are you sure?',
      text: 'Existing variants will be deleted, once you generate new variants!',
      icon: 'warning',
      buttons: true,
      // dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const variants = []
        setFieldValue('keep_previous', false)

        const option1 = variationRows.length > 0 ? variationRows[0].variantName : null
        const option2 = variationRows.length > 1 ? variationRows[1].variantName : null
        const option3 = variationRows.length > 2 ? variationRows[2].variantName : null

        const _values1 = variationRows.length > 0 ? variationRows[0].variantValues : null
        const _values2 = variationRows.length > 1 ? variationRows[1].variantValues : null
        const _values3 = variationRows.length > 2 ? variationRows[2].variantValues : null

        console.log({option1, option2, option3})
        console.log({_values1, _values2, _values3})

        if (option1 === '' || option2 === '' || option3 === '') {
          toast.error('Variant name required')
        } else if (
          _values1.length === 0 ||
          (_values2 !== null && _values2.length === 0) ||
          (_values3 !== null && _values3.length === 0)
        ) {
          toast.error('Variant value required')
        } else {
          for (let i = 0; i < _values1.length; i++) {
            let vrnt = variants.length > 0 ? variants[0] : initialFormData.variants[0]
            let row = {
              ...vrnt,
              price: {
                ...vrnt?.price,
                cost_price: product?.cost_price,
                selling_price: product?.selling_price,
              },
              option: option1,
              qty: 0,
              value: _values1[i]?.trim(),
              variant_type: 'new',
              thumbnail: product?.thumbnail || {src: '', alt: ''},
            }
            delete row.id

            if (_values2 && _values2.length > 0) {
              for (let j = 0; j < _values2.length; j++) {
                const newRow = {...row, option2: option2, value2: _values2[j]?.trim()}

                if (_values3 && _values3.length > 0) {
                  for (let k = 0; k < _values3.length; k++) {
                    const newNewRow = {...newRow, option3: option3, value3: _values3[k]?.trim()}
                    variants.push(newNewRow)
                  }
                } else {
                  variants.push(newRow)
                }
              }
            } else {
              variants.push(row)
            }

            setFieldValue('variants', variants)
          }
        }
      }
    })
  }

  const handleDeleteVariantRow = (indx) => {
    const newVariantRows = []
    for (let i = 0; i < variationRows.length; i++) {
      if (i !== indx) {
        newVariantRows.push(variationRows[i])
      }
    }
    setVariationRows(newVariantRows)
  }

  const extractValues = (e) => {
    let values = []
    if (Array.isArray(e)) {
      for (let i = 0; i < e.length; i++) {
        values.push(e[i]?.value)
      }
    }
    return values
  }

  const selectifyValues = (e) => {
    let values = []
    if (Array.isArray(e)) {
      for (let i = 0; i < e.length; i++) {
        values.push({
          label: e[i],
          value: e[i],
        })
      }
    }

    return values
  }

  React.useEffect(() => {
    let options = []
    let option = values.variants.filter((d) => d.option !== null && d.option !== 'null')
    // option = values.variants.filter((d) => )
    if (option && option.length > 0) {
      options.push({
        variantName: option[0].option,
        variantValues: [...new Set(values.variants.map((f) => f.value))],
      })
    }
    let option2 = values.variants.filter((d) => d.option2 !== null && d.option2 !== 'null')
    if (option2 && option2.length > 0) {
      options.push({
        variantName: option2[0].option2,
        variantValues: [...new Set(values.variants.map((f) => f.value2))],
      })
    }
    let option3 = values.variants.filter((d) => d.option3 !== null && d.option3 !== 'null')
    // option3 = values.variants.filter((d) => )
    if (option3 && option3.length > 0) {
      options.push({
        variantName: option3[0].option3,
        variantValues: [...new Set(values.variants.map((f) => f.value3))],
      })
    }
    setVariationRows(options)
  }, [values.variants])

  // // console.log('variationRows', variationRows)
  // // console.log('values.variants', values.variants)
  // // console.log(values.variants.filter((f) => f.variant_type !== 'new' && f.option !== null))
  return (
    <div className='card card-flush pt-4'>
      <div className='card-body py-0'>
        <div id='kt_docs_repeater_basic'>
          <div className='form-group'>
            <div data-repeater-list='kt_docs_repeater_basic'>
              {variationRows &&
                variationRows.length > 0 &&
                variationRows.map((item, indx) => (
                  <div data-repeater-item key={`pv-${indx}`}>
                    <div className={`row g-3 mb-2`}>
                      <div className='col-sm-2'>
                        {indx === 0 && (
                          <ToolTipLabel
                            label='Variant Name'
                            tooltip='Enter the product variant name like color, size, weight etc.'
                          />
                        )}
                        <CreatableSelect
                          // setValues={
                          //   options.filter((f) => f.value === item.variantName).length > 0
                          //     ? options.filter((f) => f.value === item.variantName)
                          //     : item.variantName
                          // }
                          // suggest={getOptions(indx)}
                          value={
                            options.filter((f) => f.value === item.variantName).length > 0
                              ? options.filter((f) => f.value === item.variantName)
                              : [{label: item.variantName, value: item?.variantName}]
                          }
                          options={getOptions(indx)}
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
                        <CreatableSelect
                          options={getVariantValues(item?.variantName)}
                          value={
                            item.variantValues !== null && item.variantValues !== 'null'
                              ? selectifyValues(item.variantValues.filter((f) => f !== null))
                              : []
                          }
                          onChange={(e) => {
                            handleRowChange(indx, 'variantValues', extractValues(e))
                          }}
                          isMulti
                          isSearchable
                        />

                        {/* <TagInputVariantValues
                          setValues={
                            item.variantValues !== null && item.variantValues !== 'null'
                              ? item.variantValues.filter((f) => f !== null)
                              : []
                          }
                          suggest={
                            options.filter((f) => f.value === item.variantName).length > 0
                              ? options.filter((f) => f.value === item.variantName)
                              : []
                          }
                          onChange={(e) => {
                            handleRowChange(indx, 'variantValues', e)
                          }}
                        /> */}
                      </div>
                      {variationRows.length > 1 && (
                        <div className='col-auto'>
                          <button
                            onClick={
                              () => handleDeleteVariantRow(indx)
                              // setVariationRows(variationRows.filter((f, i) => i !== indx))
                            }
                            type='button'
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

          <div className='form-group row mt-5'>
            <div className='col-sm-2 pe-0'>
              <button
                type='button'
                disabled={variationRows.length > 2 ? true : false}
                className='btn btn-secondary btn-sm w-100'
                onClick={() => {
                  variationRows.length < 3 &&
                    setVariationRows([...variationRows, {variantName: '', variantValues: []}])
                }}
              >
                <i className='la la-plus'></i>Add Variant
              </button>
            </div>
            <div className='col text-end'>
              <button
                type='button'
                className='btn btn-sm btn-dark ms-2'
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
      </div>
      <div className='separator separator-dashed border-dark my-4'></div>

      {values.variants &&
        values.variants.filter((f) => f.variant_type !== 'new' && f.option !== null).length > 0 && (
          <ExistingVariants values={values} type={type} setFieldValue={setFieldValue} />
        )}
      {values.variants && values.variants.filter((f) => f.variant_type === 'new').length > 0 && (
        <NewVariants
          values={values}
          type={type}
          setFieldValue={setFieldValue}
          isUserLoading={isUserLoading}
          isSubmitting={isSubmitting}
          isValid={isValid}
          touched={touched}
        />
      )}
    </div>
  )
}

export default ProductVariant
