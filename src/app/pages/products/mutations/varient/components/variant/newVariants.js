import CropperComponents from '../../../../../../modules/components/cropper/CropperComponents'
import {Link} from '../../../../../../modules/helper/linkHandler'

import VariantSalePrice from './SalePriceField'
import DimensionsInput from './dimension-new/DimensionsInput'
const defaultImage = '/media/products/dummy-product.jpg'

const NewVariants = ({
  values,
  type,
  setFieldValue,
  isUserLoading,
  isSubmitting,
  isValid,
  touched,
}) => {
  return (
    <div>
      <h3>Generated New Variants</h3>
      <div className='variable-container'>
        {values.variants.length > 0 ? (
          values.variants[0].value !== 'Default' && (
            <table className='table table-row-dashed table-row-gray-300 g-1'>
              <thead>
                <tr className='fw-bolder fs-6 text-gray-800'>
                  {values.variants.length > 0 && (
                    <>
                      {values.variants.filter((d) => d.option).length > 0 &&
                        values.variants.filter((d) => d.option)[0].option && (
                          <th>{values.variants.filter((d) => d.option)[0].option}</th>
                        )}
                      {values.variants.filter((d) => d.option2).length > 0 &&
                        values.variants.filter((d) => d.option2)[0].option2 && (
                          <th>{values.variants.filter((d) => d.option2)[0].option2}</th>
                        )}
                      {values.variants.filter((d) => d.option3).length > 0 &&
                        values.variants.filter((d) => d.option3)[0].option3 && (
                          <th>{values.variants.filter((d) => d.option3)[0].option3}</th>
                        )}
                    </>
                  )}
                  {/* <th>Stock</th> */}
                  <th>Purchase Price (৳)</th>
                  <th> Price (৳)</th>
                  {type && type[0].id && type[0].id === 1 && <th>Dimensions</th>}
                  <th>Image</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {values.variants.map(
                  (item, indx) =>
                    item.variant_type === 'new' && (
                      <tr key={`fds-${indx}`}>
                        {item.value !== '' && item.value !== null && (
                          <td>
                            <input
                              type='text'
                              className='form-control form-control-solid'
                              readOnly
                              value={item.value}
                            />
                          </td>
                        )}
                        {item.value2 !== '' && item.value2 !== null && (
                          <td>
                            <input
                              type='text'
                              className='form-control form-control-solid'
                              readOnly
                              value={item.value2}
                            />
                          </td>
                        )}
                        {item.value3 !== '' && item.value3 !== null && (
                          <td>
                            <input
                              type='text'
                              className='form-control form-control-solid'
                              readOnly
                              value={item.value3}
                            />
                          </td>
                        )}
                        {/* <td>
                          <StockField item={item} setFieldValue={setFieldValue} index={indx} />
                        </td> */}
                        <td>
                          {/* <FormTextField
                            as={Col}
                            controlId='validationFormik-sale'
                            type='number'
                            min={0}
                            name={`variants.${indx}.price.cost_price`}
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
                            />
                          </div>
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
                            }}
                            className='w-75px h-50px'
                            width={600}
                            height={620}
                            src={item.thumbnail?.src !== '' ? item.thumbnail?.src : defaultImage}
                          />
                        </td>
                        <td className='text-end'>
                          <button
                            type='button'
                            onClick={() =>
                              setFieldValue(
                                'variants',
                                values.variants.filter((f, i) => i !== indx)
                              )
                            }
                            className='btn btn-icon btn-sm btn-light-danger'
                          >
                            <i className='la la-times'></i>
                          </button>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          )
        ) : (
          <p style={{textAlign: 'center'}}>Generate Variables to add attribute</p>
        )}
      </div>
      {values.variants.length > 0 && values.variants[0].value !== 'Default' && (
        <div className='d-flex justify-content-end mb-3'>
          <Link to='/products/index' className='btn btn-light me-5'>
            Cancel
          </Link>
          <button
            type='submit'
            className='btn btn-dark'
            disabled={isUserLoading || isSubmitting || !isValid || !touched || values.is_sync}
          >
            {isUserLoading ? (
              <span className='indicator-progress d-block'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            ) : (
              <span className='indicator-label'>Save Changes</span>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default NewVariants
