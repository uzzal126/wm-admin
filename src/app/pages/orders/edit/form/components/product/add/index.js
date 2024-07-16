import {Formik} from 'formik'
import {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {POST_ORDER_PRODUCT_ADD} from '../../../../../../../constants/api.constants'
import {queryRequest} from '../../../../../../../library/api.helper'
import {initialData} from '../components/helper/initialData'
import {schema} from '../components/helper/validation'
import ProductSearchable from '../components/productSearchable'

const AddProduct = ({data, refetch}) => {
  const [modal, setModal] = useState(false)
  const orderSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)

    try {
      const res = await queryRequest(`${POST_ORDER_PRODUCT_ADD}/${values?.oid}`, values, 'put')
      if (res.success && res.status_code === 200) {
        toast.success(res.message)
        refetch(true)
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
      <button
        className='btn btn-icon btn-active-light-primary w-30px h-30px'
        onClick={() => setModal(true)}
      >
        <i className='fas fa-plus-circle fs-3'></i>
      </button>
      <Modal size='lg' show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New order item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik validationSchema={schema} onSubmit={orderSubmit} initialValues={initialData}>
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
                <div>
                  <ProductSearchable values={values} data={data} setFieldValue={setFieldValue} />
                </div>
                {isValid && touched && (
                  <div className='d-flex align-items-center justify-content-end my-4 gap-2'>
                    <Button onClick={() => setModal(false)} className='btn btn-sm' variant='light'>
                      Cancel
                    </Button>
                    <Button
                      variant='primary'
                      type='submit'
                      size='sm'
                      disabled={isUserLoading || isSubmitting}
                      // onClick={() => setFieldValue('order_status', 2)}
                    >
                      {isUserLoading ? (
                        <span className='indicator-progress d-block'>
                          Please wait...
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      ) : (
                        <span className='indicator-label'>Add Product</span>
                      )}
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddProduct
