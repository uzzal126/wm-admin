import {useFormik} from 'formik'
import moment from 'moment'
import {useEffect, useMemo, useState} from 'react'
import {Modal} from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {SEND_SMS, SMS_BALANCE} from '../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../library/api.helper'
import {utf8ByteLength} from '../../../../modules/helper/misc'
import TagInputs from '../../../products/mutations/components/variant/TagInputs2'
import TemplateModal from './components/promotion/templateModal'
import {useQueryResponseData} from './core/QueryResponseProvider'

interface InitialValues {
  account_type: 'Masking' | 'Non-Masking'
  mobile: string[]
  type: string
  content: string
  send_now: boolean
  scheduled_at: string
}

const smsSchema = Yup.object().shape({
  mobile: Yup.array()
    .of(Yup.string())
    .test('valid-mobiles', 'Please add valid phone numbers!', function (value) {
      if (!value) return false // Ensure the array is not empty
      return value.every((phoneNumber: any) => {
        return /^(\88|0088)?(01){1}[3456789]{1}(\d){8}$/.test(phoneNumber)
      })
    })
    .min(1, 'At least one valid mobile number is required'),
  type: Yup.string().oneOf(['text', 'unicode'], 'Invalid Type'),
  content: Yup.string().when('type', {
    is: 'unicode',
    then: Yup.string()
      // .test('utf8-byte-length', 'Maximum UTF-8 byte length is 160', function (value) {
      //   const maxLength = 160 // Adjust the maximum byte length as needed
      //   const encoder = new TextEncoder()
      //   const byteLength = encoder.encode(value).length
      //   return byteLength <= maxLength
      // })
      .required('content is required'),
    // otherwise: Yup.string().max(160, 'Maximum 160 symbols').required('content is required'),
    otherwise: Yup.string().required('Content is required'),
  }),
  account_type: Yup.string().oneOf(['Masking', 'Non-Masking'], 'Invalid Account Type').required(),
  send_now: Yup.boolean(),
  scheduled_at: Yup.string(),
  template: Yup.number(),
})

const initialValues: InitialValues = {
  mobile: [],
  type: 'text',
  account_type: 'Non-Masking',
  content: '',
  send_now: true,
  scheduled_at: moment().format('YYYY-MM-DD hh:mm:ss'),
}

const smsTypes = [
  {
    id: 1,
    title: 'Text',
    value: 'text',
  },
  {
    id: 2,
    title: 'Unicode',
    value: 'unicode',
  },
]

const RegularSender = () => {
  const [balance, setBalance] = useState<any>(null)
  const data = useQueryResponseData()
  const templates = useMemo(() => data, [data])

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const res = await getQueryRequest(SMS_BALANCE)
    if (res?.success) {
      try {
        setBalance(res?.data)
      } catch (err) {
        setBalance(null)
      }
    } else {
      setBalance(null)
    }
  }

  const [modal, setModal] = useState(false)

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: smsSchema,
    isInitialValid: false,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const res = await queryRequest(SEND_SMS, {
          mobile: values.mobile,
          type: values.type,
          account_type: values.account_type,
          content: values.content,
          scheduled_at: values.send_now
            ? moment().format('YYYY-MM-DD hh:mm:ss')
            : values.scheduled_at,
        })
        if (res?.success) {
          toast.success(res?.message || 'Successfully scheduled SMS!')
          formik.resetForm()
          formik.setValues(initialValues)
        } else {
          toast.error(res?.message || 'Could not schedule SMS')
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        // cancel(true)
      }
    },
  })

  console.log({formik})

  return (
    <>
      <form
        className='form'
        action='#'
        id='kt_modal_update_customer_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label fw-bold '>Available Balance:</label>
          <div className='col-sm-10  align-items-center'>
            <div>
              <span className='fw-bold fs-6 text-gray-800'>Masking: </span>
              <span>{`${balance?.masking_balance || 0} SMS`}</span>
            </div>
            <div>
              <span className='fw-bold fs-6 text-gray-800'>Non-Masking: </span>
              <span>{`${balance?.non_masking_balance || 0} SMS`}</span>
            </div>
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='mobilenumbers' className='col-sm-2 col-form-label'>
            Enter Mobile Numbers
          </label>
          <div className='col-sm-10'>
            <TagInputs
              setValues={formik.values.mobile}
              onChange={(e: any) => {
                formik.setFieldValue('mobile', e)
                formik.setTouched({mobile: true})
              }}
              suggest={null}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.mobile || ''}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <fieldset className='row py-3'>
          <legend className='col-form-label col-sm-2 pt-0'>Select SMS Type</legend>
          <div className='col-sm-10 d-flex'>
            {smsTypes.map((item, indx) => (
              <div className='form-check me-2' key={indx}>
                <input
                  className='form-check-input'
                  type='radio'
                  name={item?.value}
                  id={item?.value}
                  value={item?.value}
                  checked={item?.value === formik.values.type}
                  onChange={() => formik.setFieldValue('type', item?.value)}
                />
                <label className='form-check-label' htmlFor='smstype1'>
                  {item?.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className='row mb-3'>
          <label htmlFor='smscontent' className='col-sm-2 col-form-label'>
            Enter SMS Content
          </label>
          <div className='col-sm-10'>
            <textarea
              className='form-control'
              name='content'
              id='smscontent'
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.content && formik.errors.content && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.content || ''}</span>
                </div>
              </div>
            )}
            <div className='d-flex mt-2'>
              <span className=''>{`${
                formik.values.type === 'unicode'
                  ? utf8ByteLength(formik.values.content)
                  : formik.values.content?.length
              } Characters`}</span>
              <span className='w-1px bg-light-dark mx-2'></span>
              <span className=''>{`${Math.ceil(
                utf8ByteLength(formik.values.content) / 160
              )} SMS`}</span>
              <span className='w-1px bg-light-dark mx-2'></span>
              <span className=''>160 Char/SMS</span>
              <span className='w-1px bg-light-dark mx-2'></span>
              <label className='btn btn-light-primary py-0 px-3' onClick={() => setModal(true)}>
                Insert SMS Template
              </label>
            </div>
            {formik.values.mobile.length > 0 && formik.values.content.length > 0 && (
              <span className='text-primary'>{`NB:Total ${
                formik.values.mobile.length * Math.ceil(utf8ByteLength(formik.values.content) / 160)
              } messages will be deducted from your balance.`}</span>
            )}
          </div>
        </div>

        <fieldset className='row py-3'>
          <legend className='col-form-label col-sm-2 pt-0'>Status</legend>
          <div className='col-sm-10'>
            <div className='d-flex'>
              <div
                className='form-check me-2'
                onClick={() => formik.setFieldValue('send_now', true)}
              >
                <input
                  className='form-check-input'
                  type='radio'
                  name='smsStatus'
                  id='smsStatus1'
                  value='option1'
                  checked={formik.values.send_now}
                />
                <label className='form-check-label' htmlFor='smsStatus1'>
                  Send Now
                </label>
              </div>
              <div className='form-check' onClick={() => formik.setFieldValue('send_now', false)}>
                <input
                  className='form-check-input'
                  type='radio'
                  name='smsStatus'
                  id='smsStatus2'
                  value='option2'
                  checked={formik.values.send_now === false}
                />
                <label className='form-check-label' htmlFor='smsStatus2'>
                  Send Later
                </label>
              </div>
            </div>
            {!formik.values.send_now && (
              <div className='sender-later d-block mt-3'>
                <Flatpickr
                  placeholder='Pick date &amp; time'
                  className='form-control'
                  data-enable-time
                  value={new Date()}
                  onChange={([date]) => {
                    formik.setFieldValue('scheduled_at', moment(date).format('YYYY-MM-DD hh:mm:ss'))
                  }}
                />
              </div>
            )}
          </div>
        </fieldset>
        <div className='text-end'>
          <button
            type='submit'
            className='btn btn-dark btn-sm'
            disabled={
              !formik.isValid ||
              formik.isSubmitting ||
              formik.values.mobile.length * Math.ceil(utf8ByteLength(formik.values.content) / 160) >
                balance
            }
          >
            Submit
          </button>
        </div>
      </form>
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TemplateModal data={templates} formik={formik} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default RegularSender
