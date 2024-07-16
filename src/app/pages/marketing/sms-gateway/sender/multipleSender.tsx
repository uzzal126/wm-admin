import {useFormik} from 'formik'
import moment from 'moment'
import {useEffect, useMemo, useState} from 'react'
import {Modal} from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {SEND_SMS, SMS_BALANCE, SMS_CUSTOMERS} from '../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../library/api.helper'
import {utf8ByteLength} from '../../../../modules/helper/misc'
import TemplateModal from './components/promotion/templateModal'
import {useQueryResponseData} from './core/QueryResponseProvider'
import {SMS} from './core/_models'

type Props = {
  isUserLoading: boolean
  user: SMS
}

const smsSchema = Yup.object().shape({
  group: Yup.object().required('group is required'),
  // mobile: Yup.array()
  //   .of(
  //     Yup.string().matches(
  //       /(^(\88|0088)?(01){1}[3456789]{1}(\d){8})$/,
  //       'Please add valid phone numbers!'
  //     )
  //   )
  //   .min(1, 'At least one mobile number is required'),
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

const initialValues = {
  group: {
    id: 1,
    title: 'All Customers',
    slug: 'all',
  },
  account_type: 'Non-Masking',
  // mobile: [''],
  type: 'text',
  content: '',
  send_now: true,
  scheduled_at: moment().format('YYYY-MM-DD hh:mm:ss'),
}

const groups = [
  {
    id: 1,
    title: 'All Customers',
    slug: 'all',
  },
  {
    id: 2,
    title: 'At Least One Time Ordered Customers',
    slug: 'at-least-one-time-ordered-customers',
  },
  {
    id: 11,
    title: 'One Time Ordered Customers',
    slug: 'one-time-ordered-customers',
  },
  {
    id: 12,
    title: 'Two Times Ordered Customers',
    slug: 'two-times-ordered-customers',
  },
  {
    id: 13,
    title: 'More Than Two Times Ordered Customers',
    slug: 'more-than-two-times-ordered-customers',
  },
  {
    id: 3,
    title: 'Registered Customers',
    slug: 'registered-customers',
  },
  {
    id: 4,
    title: 'Not Registered Customers',
    slug: 'not-registered-customers',
  },
  {
    id: 5,
    title: 'Registered But not Ordered',
    slug: 'registered-but-not-ordered',
  },
  {
    id: 6,
    title: 'Ordered But Not Registered',
    slug: 'ordered-but-not-registered',
  },
  {
    id: 7,
    title: 'New Customers(Last 7 Days)',
    slug: 'new-customers',
  },
  {
    id: 8,
    title: 'Old Customers(Before 7 Days)',
    slug: 'old-customers',
  },
  {
    id: 9,
    title: 'Frequent Customers',
    slug: 'frequent-customers',
  },
  {
    id: 10,
    title: 'Big Spenders(more than 5000 BDT)',
    slug: 'big-spenders',
  },

  // {
  //   id: 2,
  //   title: '1 time order',
  //   slug: 'one_time_order',
  // },
  // {
  //   id: 3,
  //   title: 'Cancel Order',
  //   slug: 'cancel_order',
  // },
]

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

const PromotionalSender = () => {
  const [balance, setBalance] = useState<any>(null)
  const [customerCount, setCustomerCount] = useState(0)
  const data = useQueryResponseData()
  const templates = useMemo(() => data, [data])

  const [modal, setModal] = useState(false)

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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: smsSchema,
    isInitialValid: false,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const res = await queryRequest(SEND_SMS, {
          group: values.group.slug,
          // mobile: values.mobile,
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

  useEffect(() => {
    getCustomerCount()
  }, [formik.values.group])

  const getCustomerCount = async () => {
    const res = await getQueryRequest(`${SMS_CUSTOMERS}/${formik.values.group.slug}`)
    if (res?.success) {
      try {
        setCustomerCount(res?.data?.customers)
      } catch (err) {
        setCustomerCount(0)
      }
    } else {
      setCustomerCount(0)
    }
  }

  // console.log({formik})

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
          <label htmlFor='group' className='col-sm-2 col-form-label'>
            Select Audience
          </label>
          <div className='col-sm-10'>
            <select
              className='form-select'
              id='group'
              onChange={(e) => {
                formik.setFieldValue(
                  'group',
                  groups.filter((el: any) => el?.id == e.target.value)[0]
                )
              }}
            >
              <option value=''>Select Audience</option>
              {groups.map((item, indx) => (
                <option
                  value={item?.id}
                  key={indx}
                  selected={formik?.values?.group?.id === item?.id}
                >
                  {item?.title}
                </option>
              ))}
            </select>
            <span className='pt-2 d-block'>{`Total ${customerCount} customers found`}</span>
          </div>
        </div>

        {/* <div className='row mb-3'>
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
        </div> */}

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
            {customerCount * Math.ceil(utf8ByteLength(formik.values.content) / 160) > balance && (
              <span className='text-danger'>Low balance!</span>
            )}
            {customerCount > 0 &&
              formik.values.content.length > 0 &&
              customerCount * Math.ceil(utf8ByteLength(formik.values.content) / 160) <= balance && (
                <span className='text-primary'>{`NB:Total ${
                  customerCount * Math.ceil(utf8ByteLength(formik.values.content) / 160)
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
              <div className='sender-later d-block mt-3 col-lg-3'>
                <Flatpickr
                  placeholder='Pick date &amp; time'
                  className='form-control'
                  data-enable-time
                  value={formik.values.scheduled_at}
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
              customerCount * Math.ceil(utf8ByteLength(formik.values.content) / 160) > balance
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

export default PromotionalSender
