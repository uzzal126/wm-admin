import {Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import {Toaster} from 'react-hot-toast'
import {useNavigate, useParams} from 'react-router-dom'
import swal from 'sweetalert'

import {PageTitle} from '../../../../../../_metronic/layout/core'
import {ATTRIBUTE_ADD, PRODUCT_DETAILS_NEW} from '../../../../../constants/api.constants'
import {productTypes} from '../../../../../constants/products.constants'
import {getQueryRequest, queryRequest} from '../../../../../library/api.helper'
import LoaderComponent from '../../../../../modules/components/loader/LoaderComponent'
import {PageBack} from '../../../ProductPage'
import {initialFormData} from '../components/helper/inisialValue'
import {schema} from '../components/helper/validation'
import ProductVariant from '../components/variant'

const ProductVariantForm = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(true)
  const [initialForm, setInitialForm] = useState(initialFormData)
  const [product, setProduct] = useState({})
  let [type, setType] = React.useState([])
  let [title, setTitle] = React.useState('Manage Variant')
  let navigate = useNavigate()

  useEffect(() => {
    getAllData()
  }, [])

  const getAllData = async () => {
    const res = await getQueryRequest(`${PRODUCT_DETAILS_NEW}/${id}`)
    if (res.success && res.status_code === 200) {
      setProduct(res?.data)
      setTitle(res.data.product_name)
      let typ = productTypes.filter((f) => f.title.includes(res.data.product_type))
      setType(typ)
      let variants = []
      if (res.data.variants && res.data.variants.length > 0) {
        res.data.variants.map((item) => {
          variants.push({
            ...initialFormData.variants[0],
            ...item,
            // qty: item.in_stock,
          })
        })
      } else {
        variants = initialFormData.variants
      }
      setInitialForm({
        ...initialFormData,
        pd_id: res.data.pd_id,
        product_type: res.data.product_type,
        variants: variants,
      })
      setLoading(false)
    }
  }

  const handleFormSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)
    try {
      let postData = {...values}
      delete postData.variants
      let variants =
        values.variants && values.variants.length > 0
          ? values.variants.filter((f) => f.variant_type === 'new')
          : []

      postData.attributes = [...variants]
      const res = await queryRequest(ATTRIBUTE_ADD, postData)
      if (res.success && res.status_code === 200) {
        swal('Success!', res.message, 'success').then(() => {
          navigate('/products/index')
        })
      } else {
        swal('Sorry!', res.message, 'error')
      }
    } catch (ex) {
      swal('Sorry!', ex?.message || 'An error occured.', 'error')
      console.error(ex)
    } finally {
      setSubmitting(true)
    }
  }

  if (loading) return <LoaderComponent />
  return (
    <>
      <PageTitle backLink={PageBack}>{title}</PageTitle>
      <Formik validationSchema={schema} onSubmit={handleFormSubmit} initialValues={initialForm}>
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
            <div className='form d-flex flex-column flex-lg-row'>
              <div className='d-flex flex-column flex-row-fluid gap-3 gap-lg-5'>
                <ProductVariant
                  product={product}
                  type={type}
                  setFieldValue={setFieldValue}
                  values={values}
                  isUserLoading={isUserLoading}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  touched={touched}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Toaster />
    </>
  )
}

export default ProductVariantForm
