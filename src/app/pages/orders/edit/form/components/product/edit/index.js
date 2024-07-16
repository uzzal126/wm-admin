import {Formik} from 'formik'
import {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {POST_ORDER_PRODUCT_ADD} from '../../../../../../../constants/api.constants'
import {queryRequest} from '../../../../../../../library/api.helper'
import {initialData} from '../components/helper/initialData'
import {schema} from '../components/helper/validation'
import HandleProduct from './handleProduct'

const EditProduct = ({refetch, data, pro, replaceFunc = () => null}) => {
  const [modal, setModal] = useState(false)
  const [isDeletedVariant, setIsDeletedVariant] = useState(false)

  const orderSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)
    // // console.log(values)

    try {
      if (isDeletedVariant) {
        replaceFunc()
      }
      // // console.log(values)
      const res = await queryRequest(`${POST_ORDER_PRODUCT_ADD}/${values?.oid}`, values, 'put')
      if (res.success && res.status_code === 200) {
        toast.success(res.message)
        refetch(true)
        setIsDeletedVariant(false)
      } else {
        toast.error(res.message)
        setIsDeletedVariant(false)
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
        className='btn btn-icon btn-light-info me-2 w-30px h-30px'
        onClick={() => setModal(true)}
      >
        <i className='fas fa-pencil fs-3'></i>
      </button>
      <Modal size='lg' show={modal} onHide={() => setModal(false)}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Edit order item</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Button
            variant='light-danger'
            className='position-absolute end-0 top-0 btn-icon w-30px h-30px me-3 mt-3'
            onClick={() => setModal(false)}
          >
            <i className='fas fa-times' />
          </Button>
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
                {/* {// console.log(errors)} */}
                <div>
                  <HandleProduct
                    pro={pro}
                    data={data}
                    setFieldValue={setFieldValue}
                    values={values}
                    refetch={refetch}
                    setIsDeletedVariant={setIsDeletedVariant}
                  />
                </div>
                <div className='d-flex align-items-center justify-content-end mb-4 gap-2'>
                  <Button onClick={() => setModal(false)} className='btn btn-light btn-sm'>
                    Cancel
                  </Button>
                  <Button
                    variant='dark'
                    type='submit'
                    size='sm'
                    disabled={isUserLoading || isSubmitting || !isValid || !touched}
                    // onClick={() => setFieldValue('order_status', 2)}
                  >
                    {isUserLoading ? (
                      <span className='indicator-progress d-block'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    ) : (
                      <span className='indicator-label'>
                        {isDeletedVariant ? 'Replace Product' : 'Add Product'}
                      </span>
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditProduct
