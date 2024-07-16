import {Formik} from 'formik'
import {Form} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {ORDER_ADD} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'
import {checkBdMobile, sumValuesByKey} from '../../../modules/helper/misc'
import InvoiceCustomer from './components/fields/invoiceCustomer'
import InvoiceFooter from './components/fields/invoiceFooter'
import InvoiceHeder from './components/fields/invoiceHeder'
import ProductTable from './components/fields/productTable'
import StatusButton from './components/fields/statusButton'
import {initialData} from './components/helper/initialData'
import {schema} from './components/helper/validation'

const CreateOrder = () => {
  const navigate = useNavigate()
  const orderSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)
    let oldWeight = values?.weight?.toFixed(2) || values?.weight
    let payload = {
      ...values,
      price: sumValuesByKey(values?.products, 'total_price'),
      weight: parseFloat(oldWeight),
    }
    // console.log('price', values?.price)
    try {
      if (!checkBdMobile(values?.customer.msisdn)) {
        setSubmitting(false)
        return swal('Sorry!', 'Invalid Mobile No. correct format 017XXXXXXXX', 'error')
      }
      if (checkBdMobile(values?.customer.msisdn)) {
        if (values?.customer.msisdn.includes('+')) {
          let prevPhone = values?.customer.msisdn
          let newPhone = prevPhone.replace('+', '')
          payload = {
            ...values,
            customer: {
              ...values?.customer,
              address: {
                ...values?.customer?.address,
                msisdn: newPhone,
              },
              msisdn: newPhone,
            },
          }
        }
      }
      const res = await queryRequest(ORDER_ADD, payload)
      if (res.success && res.status_code === 200) {
        swal('Success!', res.message, 'success').then(() => {
          navigate('/orders/index')
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
  return (
    <div className='mb-5'>
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
            <InvoiceHeder setFieldValue={setFieldValue} values={values} errors={errors} />
            <InvoiceCustomer setFieldValue={setFieldValue} values={values} errors={errors} />
            <KTCard>
              <KTCardBody className='overflow-auto'>
                <ProductTable setFieldValue={setFieldValue} values={values} />
                <InvoiceFooter setFieldValue={setFieldValue} values={values} />
                {/* {JSON.stringify(errors)} */}
                <StatusButton
                  setFieldValue={setFieldValue}
                  values={values}
                  errors={errors}
                  isUserLoading={isUserLoading}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  touched={touched}
                />
              </KTCardBody>
            </KTCard>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateOrder
