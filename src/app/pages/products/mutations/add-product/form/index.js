import {Formik} from 'formik'
import React, {useState} from 'react'
import {Form, Nav, Tab} from 'react-bootstrap'
import {Toaster} from 'react-hot-toast'
import {useNavigate, useSearchParams} from 'react-router-dom'
import swal from 'sweetalert'

import {ADD_NEW_PRODUCT} from '../../../../../constants/api.constants'
import {productTypes} from '../../../../../constants/products.constants'
import {queryRequest} from '../../../../../library/api.helper'
import LoaderComponent from '../../../../../modules/components/loader/LoaderComponent'
import {Link} from '../../../../../modules/helper/linkHandler'
import Gallery from '../../components/gallery-block'
import GeneralField from '../../components/general-block'
import GiftItem from '../../components/giftItem'
import Inventory from '../../components/inventory'
import TechOverview from '../../components/overview'
import FormPricing from '../../components/pricing-block'
import ProductSEO from '../../components/productSEO'
import FormSidebar from '../../components/sidebar'
// import ProductThumb from '../../components/sidebar/ProductThumb'
import Thumb from '../../components/sidebar/thumb'
import ProductVariant from '../../components/variant'
import {initialFormData} from '../helper/inisialValue'
import {schema} from '../helper/validation'

const ProductForm = () => {
  const [loading, setLoading] = useState(false)
  let [searchParams] = useSearchParams()
  let [type] = React.useState(productTypes.filter((f) => f.slug === searchParams.get('type')))
  let navigate = useNavigate()

  const handleFormSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)
    try {
      values = {
        ...values,
        product_type: type ? type[0].title : '',
        gallery: values.gallery.filter((f) => f.src !== ''),
      }
      const res = await queryRequest(ADD_NEW_PRODUCT, values)
      if (res.success && res.status_code === 200) {
        swal('Success!', res.message, 'success').then(() => {
          navigate('/products/index')
        })
      } else {
        swal('Sorry!', res.message, 'error')
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setSubmitting(true)
    }
  }

  if (type.length <= 0) return <LoaderComponent />
  if (loading) return <LoaderComponent />

  return (
    <div>
      <Formik
        validateOnBlur={true}
        validationSchema={schema}
        onSubmit={handleFormSubmit}
        initialValues={initialFormData}
      >
        {({handleSubmit, values, errors, setFieldValue, touched, setTouched}) => (
          <Form onSubmit={handleSubmit}>
            <div className='form d-flex flex-column flex-lg-row'>
              <div className='d-none d-lg-flex flex-column gap-3 gap-lg-5 w-100 min-w-250px min-w-lg-275px mw-300px mb-7 me-lg-4'>
                {/* <ProductThumb
                  className='d-none d-lg-block mb-5'
                  setFieldValue={setFieldValue}
                  values={values}
                  touched={touched}
                  errors={errors}
                /> */}
                <FormSidebar
                  setFieldValue={setFieldValue}
                  setLoading={setLoading}
                  values={values}
                  errors={errors}
                  touched={touched}
                />
              </div>
              {/* END : LEFT */}
              <div className='d-flex flex-column flex-row-fluid gap-3 gap-lg-5'>
                <Tab.Container id='product-form' defaultActiveKey='general'>
                  <Nav className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-n2'>
                    <Nav.Item>
                      <Nav.Link className='text-active-primary pb-1' eventKey='general'>
                        General
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className='text-active-primary pb-1' eventKey='advance'>
                        Advanced
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    <Tab.Pane eventKey='general'>
                      <div className='d-flex flex-column gap-3 gap-lg-5'>
                        <GeneralField
                          setFieldValue={setFieldValue}
                          values={values}
                          onTextEditorTextChange={(event) => {
                            setTouched({
                              [event.target.name]: true,
                            })
                          }}
                        />
                        <Thumb
                          className='d-block d-lg-none'
                          setFieldValue={setFieldValue}
                          values={values}
                        />

                        <Gallery setFieldValue={setFieldValue} values={values} />
                        {type && type[0].id && type[0].id === 2 ? (
                          <GiftItem setFieldValue={setFieldValue} type={type} values={values} />
                        ) : (
                          <FormPricing setFieldValue={setFieldValue} type={type} values={values} />
                        )}

                        {/* END PRICE */}
                        <div className='d-block d-lg-none'>
                          <FormSidebar
                            setFieldValue={setFieldValue}
                            setLoading={setLoading}
                            values={values}
                          />
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey='advance'>
                      <div className='d-flex flex-column gap-3 gap-lg-5'>
                        <Inventory />
                        {type && type[0].id && (type[0].id === 1 || type[0].id === 3) && (
                          <>
                            <TechOverview setFieldValue={setFieldValue} values={values} />
                            <ProductVariant
                              type={type}
                              setFieldValue={setFieldValue}
                              values={values}
                            />
                          </>
                        )}
                        <ProductSEO setFieldValue={setFieldValue} values={values} />
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
                <div className='d-flex justify-content-end mb-3'>
                  <Link to='/products/index' className='btn btn-light me-5'>
                    Cancel
                  </Link>
                  <button
                    type='submit'
                    id='kt_ecommerce_add_product_submit'
                    className='btn btn-dark'

                    // disabled={isUserLoading || isSubmitting || !isValid || !touched}
                  >
                    <span className='indicator-label'>Save Changes</span>
                    {/* {isUserLoading ? (
                      <span className='indicator-progress d-block'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    ) : (
                      <span className='indicator-label'>Save Changes</span>
                    )} */}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Toaster />
    </div>
  )
}

export default ProductForm
