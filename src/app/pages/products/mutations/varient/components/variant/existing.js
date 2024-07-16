import {Col} from 'react-bootstrap'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {
  ATTRIBUTE_ADD,
  ATTRIBUTE_DELETE,
  ATTRIBUTE_EDIT,
} from '../../../../../../constants/api.constants'
import {queryRequest} from '../../../../../../library/api.helper'
import CropperComponents from '../../../../../../modules/components/cropper/CropperComponents'
import FormTextField from '../../../../../../modules/components/formik/fields/form-field'

import VariantSalePrice from './SalePriceField'
import DimensionsInput from './dimension-new/DimensionsInput'

const defaultImage = '/media/products/dummy-product.jpg'

const ExistingVariants = ({values, type, setFieldValue}) => {
  const addAttribute = async (item, indx) => {
    if (
      item.thumbnail.src === '' ||
      item.value === '' ||
      item.value2 === '' ||
      item.value2 === ''
    ) {
      if (item.value === '' || item.value2 === '' || item.value2 === '')
        toast.error('Value is required')

      if (item.thumbnail.src === '') toast.error('Thumbnail is required')
    } else {
      let post = {
        pd_id: values.pd_id,
        keep_previous: true,
        attributes: [{...item}],
      }
      let res = await queryRequest(ATTRIBUTE_ADD, post)
      if (res.success && res.status_code === 200) {
        setFieldValue(`variants.${indx}.is_sync`, false)
        setFieldValue(`variants.${indx}.id`, res.variants[0])
        setFieldValue('is_sync', false)
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    }
  }

  const attributeDelete = (id, indx) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this attribute!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        let post = {
          pd_id: values.pd_id,
          attribute_id: id,
        }
        let res = await queryRequest(ATTRIBUTE_DELETE, post)
        if (res.success && res.status_code === 200) {
          setFieldValue(
            'variants',
            values.variants.filter((f, i) => i !== indx)
          )
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  const updateVariant = async (index) => {
    let variant = values.variants[index]
    // // console.log('values', values)
    // // console.log('variant', variant)
    let post = {
      pd_id: values.pd_id,
      variant_id: variant.id,
      variant: variant,
    }
    const res = await queryRequest(ATTRIBUTE_EDIT, post)
    if (res.success && res.status_code === 200) {
      toast.success(res.message)
      setFieldValue(`variants.${index}.need_save`, false)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <>
      {values.variants && values.variants.filter((f) => f.variant_type === 'new').length > 0 && (
        <h3>Existing Variants</h3>
      )}
      <div className='variable-container'>
        {values.variants.length > 0 ? (
          values.variants[0].value !== 'Default' && (
            <div className='table-responsive'>
              <table className='table table-row-dashed table-row-gray-300 g-1 mb-0'>
                <thead>
                  <tr className='fw-bolder fs-6 text-gray-800'>
                    {values.variants.length > 0 && (
                      <>
                        {values.variants.filter((d) => d.option && d.variant_type !== 'new')
                          .length > 0 &&
                          values.variants.filter((d) => d.option)[0].option && (
                            <th>{values.variants.filter((d) => d.option)[0].option}</th>
                          )}
                        {values.variants.filter((d) => d.option2 && d.variant_type !== 'new')
                          .length > 0 &&
                          values.variants.filter((d) => d.option2)[0].option2 &&
                          (values.variants.filter((d) => d.option2)[0].option2 !== 'null' ? (
                            <th>{values.variants.filter((d) => d.option2)[0].option2}</th>
                          ) : null)}
                        {values.variants.filter((d) => d.option3 && d.variant_type !== 'new')
                          .length > 0 &&
                          values.variants.filter((d) => d.option3)[0].option3 &&
                          (values.variants.filter((d) => d.option3)[0].option3 !== 'null' ? (
                            <th>{values.variants.filter((d) => d.option3)[0].option3}</th>
                          ) : null)}
                      </>
                    )}
                    {/* <th className='w-125px'>Stock</th> */}
                    <th className='w-150px'>Purchase price (৳)</th>
                    <th>Price (৳)</th>
                    {type && type[0].id && type[0].id === 1 && <th>Dimensions</th>}
                    <th>Image</th>
                    <th className='text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {values.variants.map(
                    (item, indx) =>
                      item.variant_type !== 'new' && (
                        <tr key={`fds-${indx}`}>
                          {item.value !== null && item.value !== 'null' && (
                            <td>
                              <FormTextField
                                as={Col}
                                controlId='validationFormik-value'
                                type='text'
                                className={item?.is_sync ? '' : 'form-control-solid'}
                                readOnly={item?.is_sync ? false : true}
                                name={`variants.${indx}.value`}
                              />
                            </td>
                          )}
                          {item.value2 !== null && item.value2 !== 'null' && (
                            <td>
                              <FormTextField
                                as={Col}
                                controlId='validationFormik-value2'
                                type='text'
                                className={item?.is_sync ? '' : 'form-control-solid'}
                                readOnly={item?.is_sync ? false : true}
                                name={`variants.${indx}.value2`}
                              />
                            </td>
                          )}
                          {item.value3 !== null && item.value3 !== 'null' && (
                            <td>
                              <FormTextField
                                as={Col}
                                controlId='validationFormik-value3'
                                type='text'
                                className={item?.is_sync ? '' : 'form-control-solid'}
                                readOnly={item?.is_sync ? false : true}
                                name={`variants.${indx}.value3`}
                              />
                            </td>
                          )}
                          {/* <td>
                            <StockField
                              onBlur={() => setFieldValue(`variants.${indx}.need_save`, true)}
                              item={item}
                              setFieldValue={setFieldValue}
                              index={indx}
                            />
                          </td> */}
                          <td className='min-w-100px'>
                            {/* <FormTextField
                              as={Col}
                              controlId='validationFormik-sale'
                              type='number'
                              min={0}
                              name={`variants.${indx}.price.cost_price`}
                              onBlur={() => setFieldValue(`variants.${indx}.need_save`, true)}
                              validate={(value) => {
                                let error
                                if (Number(value) <= 0 || Number(value) > 100000000) {
                                  error = 'Value must be greater than 1'
                                }
                                return error
                              }}
                            /> */}
                            <div className='col'>
                              <input
                                name={`variants.${indx}.price.cost_price`}
                                min={0}
                                type='number'
                                id='validationFormik-sale'
                                className='form-control'
                                value={values.variants[indx]?.price?.cost_price || 0}
                                onChange={(e) => {
                                  if (
                                    Number(e.target.value) >= 0 &&
                                    Number(e.target.value) <= 100000000
                                  ) {
                                    setFieldValue(
                                      `variants.${indx}.price.cost_price`,
                                      Number(e.target.value) || 0
                                    )
                                  }
                                }}
                                onBlur={() => setFieldValue(`variants.${indx}.need_save`, true)}
                              />
                            </div>
                          </td>
                          <td>
                            <VariantSalePrice
                              item={item}
                              setFieldValue={setFieldValue}
                              index={indx}
                              values={values}
                              onBlur={() => setFieldValue(`variants.${indx}.need_save`, true)}
                            />
                          </td>
                          {type && type[0].id && type[0].id === 1 && (
                            <td>
                              <DimensionsInput
                                item={item}
                                setFieldValue={setFieldValue}
                                index={indx}
                                values={values}
                              />
                            </td>
                          )}
                          <td>
                            <CropperComponents
                              onCroped={(url) => {
                                setFieldValue(`variants.${indx}.thumbnail.src`, url[0])
                                setFieldValue(`variants.${indx}.thumbnail.alt`, url[1])
                                setFieldValue(`variants.${indx}.need_save`, true)
                              }}
                              className='w-75px h-50px'
                              width={600}
                              height={620}
                              src={item.thumbnail?.src !== '' ? item.thumbnail?.src : defaultImage}
                            />
                          </td>
                          <td className='text-end'>
                            {item?.is_sync ? (
                              <>
                                <button
                                  type='button'
                                  onClick={() => addAttribute(item, indx)}
                                  className='btn btn-icon btn-sm btn-info ms-2'
                                >
                                  <i className='la la-sync-alt'></i>
                                </button>
                                <button
                                  type='button'
                                  onClick={() => {
                                    setFieldValue(
                                      'variants',
                                      values.variants.filter((f, i) => i !== indx)
                                    )
                                    setFieldValue('is_sync', false)
                                  }}
                                  className='btn btn-icon btn-sm btn-light-danger ms-2'
                                >
                                  <i className='la la-times'></i>
                                </button>
                              </>
                            ) : (
                              <div className='d-flex gap-3 ms-3'>
                                {item?.need_save ? (
                                  <button
                                    type='button'
                                    onClick={() => updateVariant(indx)}
                                    className='btn btn-sm btn-light-success'
                                  >
                                    {/* <i className='la la-check'></i> */}
                                    Save Changes
                                  </button>
                                ) : null}
                                <button
                                  type='button'
                                  disabled={values.variants.length <= 1}
                                  onClick={() => attributeDelete(item.id, indx)}
                                  className='btn btn-icon btn-sm btn-light-danger'
                                >
                                  <i className='la la-trash-o'></i>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
                <tbody>
                  <td>
                    {values.variants &&
                      values.variants.filter((f) => f.variant_type === 'new').length <= 0 && (
                        <button
                          type='button'
                          disabled={values.is_sync}
                          className='btn btn-secondary btn-sm w-100'
                          onClick={() => {
                            setFieldValue('variants', [
                              ...values.variants,
                              {
                                ...values.variants[0],
                                is_sync: true,
                                value: values.variants[0].value !== null ? '' : null,
                                value2: values.variants[0].value2 !== null ? '' : null,
                                value3: values.variants[0].value3 !== null ? '' : null,
                              },
                            ])
                            setFieldValue('is_sync', true)
                          }}
                        >
                          <i className='la la-plus'></i>Add Variant Value
                        </button>
                      )}
                  </td>
                </tbody>
              </table>
            </div>
          )
        ) : (
          <p style={{textAlign: 'center'}}>Generate Variables to add attribute</p>
        )}
      </div>
    </>
  )
}

export default ExistingVariants
