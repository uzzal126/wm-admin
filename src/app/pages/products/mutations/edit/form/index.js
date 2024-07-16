import {Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {Form, Nav, Tab} from 'react-bootstrap'
import {Toaster} from 'react-hot-toast'
import {useNavigate, useParams} from 'react-router-dom'

import {toast} from 'react-toastify'
import {PRODUCT_DETAILS_NEW, UPDATE_PRODUCT} from '../../../../../constants/api.constants'
import {productTypes} from '../../../../../constants/products.constants'
import {getQueryRequest, queryRequest} from '../../../../../library/api.helper'
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
import Thumb from '../../components/sidebar/thumb'
import {initialFormData} from '../helper/inisialValue'
import {schema} from '../helper/validation'

const ProductForm = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(true)
  const [initialForm, setInitialForm] = useState(initialFormData)
  let [type, setType] = React.useState([])
  let navigate = useNavigate()

  useEffect(() => {
    getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllData = async () => {
    const res = await getQueryRequest(`${PRODUCT_DETAILS_NEW}/${id}`)
    if (res.success && res.status_code === 200) {
      setLoading(false)
      let gallery = []
      let typ = productTypes.filter((f) => f.title.includes(res.data.product_type))
      for (let i = 0; i < 5; i++) {
        if (i < (res.data.gallery && res.data.gallery.length)) {
          gallery.push(res.data.gallery[i])
        } else {
          gallery.push({
            src: '',
            alt: '',
          })
        }
      }
      let variants = [...res.data.variants]
      if (variants && variants.length > 0) {
        variants.map((item, i) => {
          variants[i] = {
            ...initialFormData.variants[0],
            ...item,
          }
        })
      }
      let initial = {
        ...initialFormData,
        ...res.data,
        gallery: gallery,
        variants: variants,
        overview: res.data.overview
          ? res.data.overview
          : {
              has: false,
              data: [],
              url: '',
              target: '_blank',
            },
      }
      setInitialForm(initial)

      setType(typ)
    }
  }

  const handleFormSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)
    try {
      values = {
        ...values,
        product_type: type ? type[0].title : '',
        gallery: values.gallery.filter((f) => f.src !== ''),
      }
      if (values.variants && values.variants.length > 1) {
        delete values.variants
      }
      const res = await queryRequest(UPDATE_PRODUCT, values)
      console.log('send values >>', values)
      if (res.success && res.status_code === 200) {
        toast.success(res.message)
        navigate('/products/index')
      } else {
        toast.error(res.message)
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
        initialValues={initialForm}
      >
        {({handleSubmit, values, setFieldValue, setTouched}) => (
          <Form onSubmit={handleSubmit}>
            <div className='form d-flex flex-column flex-lg-row'>
              <div className='d-none d-lg-flex flex-column gap-3 gap-lg-5 w-100 min-w-250px min-w-lg-275px mw-300px mb-7 me-lg-4'>
                <FormSidebar
                  setFieldValue={setFieldValue}
                  setLoading={setLoading}
                  values={values}
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
                          values.variants.length === 1 && (
                            <FormPricing
                              setFieldValue={setFieldValue}
                              type={type}
                              values={values}
                            />
                          )
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
                        <Inventory edit />
                        {type && type[0].id && (type[0].id === 1 || type[0].id === 3) && (
                          <>
                            <TechOverview setFieldValue={setFieldValue} values={values} />
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
                    // onClick={addNewProduct}
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
