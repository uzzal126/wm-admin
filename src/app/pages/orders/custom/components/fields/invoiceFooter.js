import {Col, Form, Row} from 'react-bootstrap'
import {toast} from 'react-toastify'
import FormTextField from '../../../../../modules/components/formik/fields/form-field'

const InvoiceFooter = ({setFieldValue, values}) => {
  const setPartialPayment = (e) => {
    let par = Number(e.target.value)
    if (values.total >= par) {
      setFieldValue('paid_amount', par)
    } else {
      toast.error('Partial amount more then you total amount!')
    }
  }
  return (
    <div className='pb-6 pt-2'>
      <Row>
        <Col lg='6'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() =>
              setFieldValue('products', [
                ...values.products,
                {
                  id: 0,
                  attribute_id: 0,
                  discount: '',
                  price: '',
                  qty: 1,
                  tax: 0,
                  total_price: '',
                },
              ])
            }
          >
            <i className='fas fa-plus' /> Add Another Item
          </button>
          <div className='pt-5'>
            <FormTextField
              as={Col}
              controlId='validationFormik-customer-street_address'
              type='text'
              name='order_note'
              inputType='textarea'
              placeholder='Customer note'
              className='min-h-150px'
            />
          </div>
        </Col>
        <Col lg='6'>
          <div className='bg-light rounded-3 h-100 p-5'>
            <table className='table fs-5 text-dark fw-bold g-3'>
              <tr>
                <td>Sub Total</td>
                <td className='text-end'>৳{(values.subtotal || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Total Discount</td>
                <td className='text-end text-danger'>৳-{(values.discount || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  Shipping Charge <br />
                  <small className='fs-8 text-muted text-start px-0'>
                    (Total Weight {Number(values.weight).toFixed(2)} KG)
                  </small>
                </td>
                <td className='text-end'>৳{Number(values.shipping_fee).toFixed(2) || '00.00'}</td>
              </tr>
              <tr>
                <td>
                  <div
                    className='btn-group w-100 p-0'
                    data-kt-buttons='true'
                    data-kt-buttons-target='[data-kt-button]'
                  >
                    <label
                      className={`p-2 btn btn btn-outline btn-outline-dashed btn-active-light-primary ${
                        !values.partial_payment ? 'active' : ''
                      }`}
                      data-kt-button='true'
                    >
                      <input
                        className='btn-check'
                        type='radio'
                        name='d_type'
                        value='48'
                        checked={!values.partial_payment}
                        onChange={(e) => {
                          setFieldValue('partial_payment', false)
                          setFieldValue('payment_status', 0)
                          setFieldValue('paid_amount', values.total)
                        }}
                      />
                      Payment Received
                    </label>

                    <label
                      className={`p-2 btn btn btn-outline btn-outline-dashed btn-active-light-primary ${
                        values.partial_payment ? 'active' : ''
                      }`}
                      data-kt-button='true'
                    >
                      <input
                        className='btn-check'
                        type='radio'
                        name='d_type'
                        value='12'
                        checked={values.partial_payment}
                        onChange={() => {
                          setFieldValue('partial_payment', true)
                          setFieldValue('payment_status', 1)
                          setFieldValue('paid_amount', 0)
                        }}
                      />
                      Partial Payment
                    </label>
                  </div>
                  {values.partial_payment && (
                    <div className='d-flex align-items-center p-0'>
                      <div className='mt-3'>
                        <FormTextField
                          as={Col}
                          controlId='validationFormik-customer-street_address'
                          type='number'
                          name='paid_amount'
                          size='sm'
                          placeholder='0.00'
                          onChange={(e) => setPartialPayment(e)}
                        />
                      </div>
                    </div>
                  )}
                </td>
                <td className='text-end'>৳{values.paid_amount}</td>
              </tr>
              <tr className='border-top' style={{'--bs-border-color': '#999'}}>
                <td>Total</td>
                <td className='text-end'>৳{Number(values.total).toFixed(2) || '00.00'}</td>
              </tr>
              <tr className='text-success'>
                <td>Total Paid</td>
                <td className='text-end'>৳{Number(values.paid_amount).toFixed(2) || '00.00'}</td>
              </tr>
              <tr className='border-bottom text-danger' style={{'--bs-border-color': '#999'}}>
                <td>Due Balance</td>
                <td className='text-end'>
                  ৳{Number(values.total - values.paid_amount).toFixed(2) || '00.00'}
                </td>
              </tr>
              {values.partial_payment && (
                <tr className='pt-4'>
                  <td colSpan='2'>
                    <div className='p-0'>
                      <Form.Check
                        type='switch'
                        id='custom-cod'
                        label='Cash On Delivery'
                        checked={values.payment_status === 1}
                        onChange={() =>
                          setFieldValue('payment_status', values.payment_status === 1 ? 0 : 1)
                        }
                      />
                    </div>
                  </td>
                </tr>
              )}
            </table>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default InvoiceFooter
