import {FieldArray} from 'formik'
import {Accordion, Button, Card, Col, useAccordionButton} from 'react-bootstrap'
import CropperComponents from '../../../../modules/components/cropper/CropperComponents'
import FormTextField from '../../../../modules/components/formik/fields/form-field'
import Discount from './discount'
const defaultImage = '/media/products/dummy-product.jpg'

function CustomToggle({children, eventKey}) {
  const decoratedOnClick = useAccordionButton(eventKey, () => console.log('totally custom!'))

  return (
    <button type='button' className='btn btn-primary btn-sm' onClick={decoratedOnClick}>
      {children}
    </button>
  )
}

const GiftItem = ({setFieldValue, values}) => {
  return (
    <div className='card card-flush py-4'>
      <div className='card-header min-h-auto'>
        <div className='card-title'>
          <h2>Gift Code Diary</h2>
        </div>
      </div>
      <div className='card-body p-3'>
        <Accordion defaultActiveKey='0'>
          <FieldArray
            name='variants'
            render={(arrayHelpers) => {
              return (
                <div>
                  {values.variants && values.variants.length > 0 ? (
                    <>
                      {values.variants.map((item, i) => (
                        <div className='rounded border-dashed p-3 mb-3'>
                          <Card.Header className='d-flex align-items-center py-2 min-h-auto'>
                            <div className='fs-3'>{item.option}</div>
                            <div>
                              <CustomToggle eventKey={i}>Customize</CustomToggle>
                              <Button
                                type='button'
                                variant='danger'
                                size='sm'
                                className='ms-2'
                                onClick={() => arrayHelpers.remove(i)} // remove a friend from the list
                              >
                                <i className='fas fa-trash' /> Delete
                              </Button>
                            </div>
                          </Card.Header>
                          <Accordion.Collapse eventKey={i}>
                            <Card.Body>
                              <div className='d-flex align-items-center justify-content-between'>
                                <div className='mb-5 fv-row'>
                                  <FormTextField
                                    as={Col}
                                    controlId='validationFormikCost'
                                    label='Coupon Name'
                                    type='text'
                                    name={`variants.${i}.option`}
                                    tooltip='Set Coupon Name'
                                    onChange={(e) => {
                                      setFieldValue(`variants.${i}.option`, e.target.value)
                                      setFieldValue(`variants.${i}.value`, e.target.value)
                                    }}
                                  />
                                </div>
                                <div className='mb-5 fv-row'>
                                  <FormTextField
                                    as={Col}
                                    controlId='validationFormikCost'
                                    label='Cost price (৳)'
                                    type='number'
                                    name={`variants.${i}.price.cost_price`}
                                    tooltip='Set purchase price.'
                                  />
                                </div>
                                <div className='mb-5 fv-row'>
                                  <FormTextField
                                    as={Col}
                                    controlId='validationFormikSale'
                                    label='Sale price (৳)'
                                    type='number'
                                    name={`variants.${i}.price.selling_price`}
                                    tooltip='Set Sale price.'
                                  />
                                </div>
                                <div className='fv-row'>
                                  <CropperComponents
                                    onCroped={(url) => {
                                      setFieldValue(`variants.${i}.thumbnail.src`, url[0])
                                      setFieldValue(`variants.${i}.thumbnail.alt`, url[1])
                                    }}
                                    className='w-75px h-50px'
                                    width={600}
                                    height={620}
                                    src={
                                      item.thumbnail_url !== '' ? item.thumbnail_url : defaultImage
                                    }
                                  />
                                </div>
                              </div>
                              <FieldArray
                                name={`variants.${i}.gift_coupons`}
                                render={(couponArrayHelpers) => {
                                  return (
                                    <div className='border rounded px-3 pt-3 mb-3'>
                                      {item.gift_coupons && item.gift_coupons.length > 0 ? (
                                        <>
                                          <table className='table align-middle table-row-dashed fs-6 gy-1'>
                                            <thead>
                                              <tr>
                                                <th className=''>Code</th>
                                                <th>Expire Date</th>
                                                <th className='text-end w-100px'>Action</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {item.gift_coupons.map((info, j) => (
                                                <tr key={'inf' + i}>
                                                  <td className=''>
                                                    <FormTextField
                                                      as={Col}
                                                      controlId='validationFormikSale'
                                                      //   label='Coupon Code'
                                                      type='text'
                                                      name={`variants.${i}.gift_coupons${j}.code`}
                                                      //   tooltip='Add new code'
                                                    />
                                                  </td>
                                                  <td>
                                                    <FormTextField
                                                      as={Col}
                                                      controlId='validationFormikSale'
                                                      //   label='Coupon Code'
                                                      type='date'
                                                      name={`variants.${i}.gift_coupons${j}.expire_date`}
                                                      //   tooltip='Add new code'
                                                    />
                                                  </td>
                                                  <td className='text-end'>
                                                    <Button
                                                      type='button'
                                                      variant='light-primary'
                                                      size='sm'
                                                      className='btn-icon me-2'
                                                      onClick={() =>
                                                        couponArrayHelpers.push(
                                                          values.variants[0].gift_coupons
                                                        )
                                                      }
                                                    >
                                                      <i className='fas fa-plus'></i>
                                                    </Button>
                                                    <Button
                                                      type='button'
                                                      variant='danger'
                                                      size='sm'
                                                      className='btn-icon'
                                                      onClick={() => couponArrayHelpers.remove(j)} // remove a friend from the list
                                                    >
                                                      <i className='fas fa-minus' />
                                                    </Button>
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </>
                                      ) : (
                                        <Button
                                          type='button'
                                          variant='light-primary'
                                          size='sm'
                                          onClick={() =>
                                            couponArrayHelpers.push(values.variants[0].gift_coupons)
                                          }
                                        >
                                          <i className='fas fa-plus'></i> Add
                                        </Button>
                                      )}
                                    </div>
                                  )
                                }}
                              />
                              <Discount setFieldValue={setFieldValue} values={values} index={i} />
                            </Card.Body>
                          </Accordion.Collapse>
                        </div>
                      ))}
                      <Button
                        type='button'
                        variant='light-success'
                        size='sm'
                        onClick={() => arrayHelpers.push(values.variants[0])}
                      >
                        + Add
                      </Button>
                    </>
                  ) : (
                    <Button
                      type='button'
                      variant='light-primary'
                      size='sm'
                      onClick={() => arrayHelpers.push(values.variants[0])}
                    >
                      <i className='fas fa-plus'></i> Add Information
                    </Button>
                  )}
                </div>
              )
            }}
          />
        </Accordion>
      </div>
    </div>
  )
}

export default GiftItem
