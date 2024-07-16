import {Formik} from 'formik'
import {Button, Col, Form, Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {POST_COURIER_FEE} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'
import FormTextField from '../../../modules/components/formik/fields/form-field'
import {schema} from './helpers/validation'

const CourierCharge = ({handleClose, courierFee, reFetch}) => {
  const orderSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)
    try {
      const res = await queryRequest(POST_COURIER_FEE, values)
      if (res.success && res.status_code === 200) {
        toast.success(res.message)
        handleClose()
        reFetch()
      } else {
        toast.error(res.message)
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setSubmitting(true)
    }
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={orderSubmit}
        enableReinitialize={true}
        initialValues={courierFee}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          isUserLoading,
          isValid,
          isSubmitting,
          setFieldValue,
          touched,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              <div className='table-responsive'>
                <table className='table table-row-bordered g-2 mb-0'>
                  <thead>
                    <tr className='fw-bold'>
                      <th>Location</th>
                      <th>Merchant Fee</th>
                      <th>Customer Fee</th>
                      <th>Additional per KG</th>
                      <th>COD Charge %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.data &&
                      values.data.length > 0 &&
                      values.data.map((item, i) => (
                        <tr key={i}>
                          <td className='text-muted'>{item?.location}</td>
                          <td className='text-muted text-center'>
                            {item.price_for_merchants_per_kg}
                          </td>
                          <td>
                            <Form.Group className='mw-150px'>
                              <FormTextField
                                as={Col}
                                controlId='validationFormik-1'
                                type='number'
                                name={`data.${i}.price_for_customer_per_kg`}
                                min={0}
                                maxLength={8}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className='mw-150px'>
                              <FormTextField
                                as={Col}
                                controlId='validationFormik-1'
                                type='number'
                                name={`data.${i}.additional_charge_per_kg`}
                                min={0}
                                maxLength={8}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className='mw-150px'>
                              <FormTextField
                                as={Col}
                                controlId='validationFormik-1'
                                type='number'
                                name={`data.${i}.cash_on_delivery_percentage`}
                                min={1}
                                max={100}
                                maxLength={3}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button
                type='submit'
                variant='dark'
                disabled={isUserLoading || isSubmitting || !isValid || !touched}
              >
                {isUserLoading ? (
                  <span className='indicator-progress d-block'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                ) : (
                  <span className='indicator-label'>Update Fees</span>
                )}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default CourierCharge
