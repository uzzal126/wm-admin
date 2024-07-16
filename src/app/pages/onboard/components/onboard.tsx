import clsx from 'clsx'
import {Formik} from 'formik'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import * as yup from 'yup'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {useCreateStoreMutation} from '../../../../_metronic/redux/slices/onboard'
import {betterParse, setLocal} from '../../../modules/helper/misc'
import CouponField from './CouponField'

export const schema = yup.object({
  account_details: yup
    .object()
    .shape({
      name: yup.string().required('Name Required'),
      msisdn: yup.string().required('Mobile Number Required'),
      email: yup.string().required('Email Required'),
      password: yup
        .string()
        .required('Password Required')
        .min(8, 'Password must be at least 8 characters'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password Required'),
      address: yup.string().required('Address Required'),
    })
    .required('User Details Required'),
  package: yup
    .object()
    .shape({
      is_free: yup.boolean(),
      package_id: yup.number().required().integer(),
      store_cat_id: yup.number().required().integer(),
      payment_partner_id: yup
        .number()
        .integer()
        .when('is_free', (is_free, schema) => {
          if (!is_free)
            return schema.required('Must be select channel').positive('Must be select channel')
          return schema
        }),
      is_ondemand: yup.boolean().required(),
      emi_price: yup.string().when('is_free', (is_free, schema) => {
        if (!is_free) return schema.required('Must be select your package')
        return schema
      }),
    })
    .required('Package Details Required'),
})

export const paymentChannel = [
  {
    id: 1,
    title: 'bKash',
    icon: '/media/icons/bKash_logo_black.svg',
    icon_white: '/media/icons/bKash_logo_white.svg',
  },
]

const Onboard = () => {
  const route = useParams()
  const navigate = useNavigate()
  const [pricingPackage, setPackage] = useState<any>({})
  const [pricing, setPricing] = useState<any>({})
  const [seePass, setSeePass] = useState(false)
  const [seeConfirmPass, setSeeConfirmPass] = useState(false)

  const url =
    import.meta.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/pricing'
      : 'https://webmanza.com/pricing'

  const [addStore, {data: response, isLoading}] = useCreateStoreMutation()
  const {mode} = useThemeMode()

  const [post, setPost] = useState({
    account_details: {
      name: '',
      msisdn: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
    },
    package: {
      package_id: 0,
      payment_partner_id: 1,
      store_cat_id: 0,
      is_ondemand: false,
      emi_price: '',
      is_free: false,
    },
  })

  const [coupon, setCoupon] = useState<any>('')

  useEffect(() => {
    if (!route.package) {
      window.location.href = url
    }
    try {
      const deCodePackage = atob(route.package || '')
      const parsePackage =
        deCodePackage && JSON.parse(deCodePackage || '') ? JSON.parse(deCodePackage || '') : {}
      if (parsePackage) {
        const prices = parsePackage?.pricing ? betterParse(parsePackage?.pricing) : {}
        setPricing(prices?.emi_price)
        const features = parsePackage?.features ? betterParse(parsePackage?.features) : []

        setPackage({...parsePackage, features})

        setPost({
          ...post,
          package: {
            ...post.package,
            is_free: parsePackage?.is_free === 1,
            package_id: parsePackage?.id,
            store_cat_id: parsePackage?.store_cat_id,
            emi_price:
              parsePackage?.is_free === 1
                ? ''
                : Object.keys(prices?.emi_price).length > 0
                ? Object.keys(prices?.emi_price)[0]
                : '',
          },
        })
      }
    } catch (error) {
      // window.location.href = url
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, url])

  const validity = (value: string) =>
    value === 'half_yearly'
      ? '6 month'
      : value === 'yearly'
      ? '1 year'
      : value === 'quarterly'
      ? '4 month'
      : value === 'monthly'
      ? '30 days'
      : '14 days'

  const parseDurationToDate = (value: string) => {
    const matches = value.match(/^(\d+) (\w+)$/)
    if (matches) {
      const value = parseInt(matches[1])
      const unit = matches[2]
      return moment()
        .add(value as never, unit)
        .format('MMMM DD, YYYY')
    }
    return null
  }

  const cerateStore = async (values: any, {setSubmitting}: any) => {
    setSubmitting(true)
    try {
      if (pricingPackage?.id !== 0) {
        const postData = {
          ...values,
          package: {
            ...values.package,
            package_id: pricingPackage?.id,
            store_cat_id: pricingPackage?.store_cat_id,
          },
        }
        const res = await addStore(postData).unwrap()
        if (res?.status_code === 200 && res.success) {
          setLocal(
            {
              ...res.data,
              ...postData.package,
            },
            'payment'
          )
          if (res.data.chargingUrl && res.data.paymentID) {
            window.location.href = res.data.chargingUrl
          } else {
            navigate('/onboard/success')
          }
        } else {
          toast.error(res?.message)
        }
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setSubmitting(true)
    }
  }

  const applyCoupon = () => {
    // Implement coupon application logic here
    console.log('Coupon applied:', coupon)
    // You can send the coupon to your backend for validation and apply any discounts accordingly
  }

  if (!pricingPackage || Object.keys(pricingPackage).length === 0) {
    return <div className='text-center py-5'>Package not found</div>
  } else {
    return (
      <div>
        <header className='my-2 text-center'>
          {pricingPackage && Object.keys(pricingPackage).length > 0 && (
            <h2>
              <span className='text-primary'>{pricingPackage?.title} </span> Plan
            </h2>
          )}
        </header>
        <Formik
          enableReinitialize
          validationSchema={schema}
          onSubmit={cerateStore}
          initialValues={post}
        >
          {({
            handleSubmit,
            isValid,
            isSubmitting,
            touched,
            errors,
            getFieldProps,
            setFieldValue,
            values,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {(isLoading || isSubmitting) && (
                <div className='position-absolute w-100 h-100 start-0 top-0 bg-dark z-index-3 rounded-5 bg-opacity-50 d-flex align-items-center justify-content-center'>
                  <h1>
                    {/* <span className='spinner-border spinner-border-sm align-middle ms-2'></span> */}
                    <span className='splash-loader ms-auto me-auto'></span>
                    <span className='text-white'>We are processing ...</span>
                  </h1>
                </div>
              )}

              <div className='row'>
                <div className='col-lg-8'>
                  {pricingPackage?.is_free !== 1 && (
                    <div className='card border border-gray-300 bg-white'>
                      <div className='card-body px-4 py-5'>
                        <h3 className='mt-5'>Billing cycle*</h3>
                        <p className='text-muted'>
                          Choose how often you’d like to be billed. You can cancel anytime
                        </p>
                        <div
                          data-kt-buttons='true'
                          className='border rounded-3 overflow-hidden mb-10'
                        >
                          {Object.keys(pricing).length > 0 &&
                            Object.keys(pricing).map((price, i) => (
                              <label
                                key={i}
                                className={` bg-active-light bg-opacity-50 d-flex flex-stack text-start px-6 py-3 ${
                                  values.package.emi_price === price ? 'active' : ''
                                } ${isLoading || isSubmitting ? 'disabled' : 'cursor-pointer'}`}
                              >
                                <div className='d-flex align-items-center me-2'>
                                  <div className='form-check form-check-custom form-check-solid form-check-primary me-6'>
                                    <input
                                      onChange={() => {
                                        setFieldValue('package.emi_price', price)
                                        setFieldValue(
                                          'package.payment_partner_id',
                                          price === 'yearly' ? 0 : 1
                                        )
                                        // setFieldValue('package.is_ondemand', price === 'yearly') (for bkash no on_demand)
                                      }}
                                      className='form-check-input'
                                      type='radio'
                                      checked={values.package.emi_price === price}
                                      disabled={isLoading || isSubmitting}
                                      name='plan'
                                      defaultValue='startup'
                                    />
                                  </div>
                                  <div className='flex-grow-1'>
                                    <h2 className='d-flex align-items-center fs-3 fw-bold flex-wrap mb-0 text-capitalize'>
                                      {price === 'half_yearly' ? 'Half Yearly' : price}
                                    </h2>
                                    <div className='fw-semibold opacity-50'>
                                      Pay BDT {pricing[price]}/
                                      {price === 'half_yearly' ? 'Half Yearly' : price}
                                    </div>
                                  </div>
                                </div>
                              </label>
                            ))}
                          {touched.package?.emi_price && errors?.package?.emi_price && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{errors?.package.emi_price}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* END */}
                        <h3>Select Payment Option*</h3>
                        <div className='row row-cols-1 row-cols-lg-3 pt-2'>
                          {paymentChannel.map((item, i) => (
                            <div className='col h-100' key={i}>
                              <label
                                className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6  ${
                                  (values.package.emi_price !== 'yearly' && item.id === 2) ||
                                  isLoading ||
                                  isSubmitting
                                    ? 'disabled'
                                    : ''
                                }`}
                              >
                                <div className='d-flex align-items-center me-2'>
                                  <div className='form-check form-check-custom form-check-solid form-check-primary me-6'>
                                    <input
                                      className='form-check-input'
                                      type='radio'
                                      name='channel'
                                      checked={values.package.payment_partner_id === item.id}
                                      disabled={
                                        (values.package.emi_price !== 'yearly' && item.id === 2) ||
                                        isLoading ||
                                        isSubmitting
                                      }
                                      value={item.id}
                                      onChange={() =>
                                        setFieldValue('package.payment_partner_id', item.id)
                                      }
                                    />
                                  </div>
                                  <div className='flex-grow-1'>
                                    <h2 className='d-flex align-items-center flex-column fs-3 fw-bold flex-wrap'>
                                      <img
                                        src={mode === 'dark' ? item.icon_white : item.icon}
                                        alt={item.title}
                                        className='img-fluid mw-100 w-auto mh-40px'
                                      />
                                    </h2>
                                  </div>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                        {touched.package?.payment_partner_id &&
                          errors?.package?.payment_partner_id && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{errors?.package.payment_partner_id}</span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                  <div className='px-10 pt-15 pb-8'>
                    <div className='row'>
                      <div className='col-lg-6'>
                        <div className='mb-4'>
                          <label className='required fw-bold fs-6 mb-2 min-w-60px'>Name</label>
                          <div>
                            <input
                              placeholder='John Doe'
                              {...getFieldProps('account_details.name')}
                              type='text'
                              name='account_details.name'
                              className={clsx(
                                'form-control mb-3 mb-lg-0',
                                {
                                  'is-invalid':
                                    touched.account_details?.name && errors.account_details?.name,
                                },
                                {
                                  'is-valid':
                                    touched.account_details?.name && !errors.account_details?.name,
                                }
                              )}
                              autoComplete='off'
                              disabled={isSubmitting || isLoading}
                            />
                            {touched.account_details?.name && errors.account_details?.name && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{errors.account_details?.name}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='mb-4'>
                          <label className='required fw-bold fs-6 mb-2 min-w-60px'>Email</label>
                          <div>
                            <input
                              placeholder='jone@example.com'
                              {...getFieldProps('account_details.email')}
                              type='email'
                              name='account_details.email'
                              className={clsx(
                                'form-control mb-3 mb-lg-0',
                                {
                                  'is-invalid':
                                    touched.account_details?.email && errors.account_details?.email,
                                },
                                {
                                  'is-valid':
                                    touched.account_details?.email &&
                                    !errors.account_details?.email,
                                }
                              )}
                              autoComplete='off'
                              disabled={isSubmitting || isLoading}
                            />
                            {touched.account_details?.email && errors.account_details?.email && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{errors.account_details?.email}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='mb-4'>
                          <label className='required fw-bold fs-6 mb-2 min-w-60px'>Address</label>
                          <div>
                            <textarea
                              {...getFieldProps('account_details.address')}
                              name='account_details.address'
                              className={clsx(
                                'form-control mb-3 mb-lg-0',
                                {
                                  'is-invalid':
                                    touched.account_details?.address &&
                                    errors.account_details?.address,
                                },
                                {
                                  'is-valid':
                                    touched.account_details?.address &&
                                    !errors.account_details?.address,
                                }
                              )}
                              autoComplete='off'
                              disabled={isSubmitting || isLoading}
                            />
                            {touched.account_details?.address &&
                              errors.account_details?.address && (
                                <div className='fv-plugins-message-container'>
                                  <div className='fv-help-block'>
                                    <span role='alert'>{errors.account_details?.address}</span>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-6'>
                        <div className='mb-4'>
                          <label className='required fw-bold fs-6 mb-2 min-w-60px'>
                            Phone Number
                          </label>
                          <div>
                            <input
                              {...getFieldProps('account_details.msisdn')}
                              placeholder='017XX XXXXXX'
                              type='text'
                              name='account_details.msisdn'
                              className={clsx(
                                'form-control mb-3 mb-lg-0',
                                {
                                  'is-invalid':
                                    touched.account_details?.msisdn &&
                                    errors.account_details?.msisdn,
                                },
                                {
                                  'is-valid':
                                    touched.account_details?.msisdn &&
                                    !errors.account_details?.msisdn,
                                }
                              )}
                              autoComplete='off'
                              disabled={isSubmitting || isLoading}
                            />
                            {touched.account_details?.msisdn && errors.account_details?.msisdn && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{errors.account_details?.msisdn}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='mb-4'>
                          <label className='required fw-bold fs-6 mb-2 min-w-60px'>Password</label>
                          <div className='input-group'>
                            <input
                              {...getFieldProps('account_details.password')}
                              type={seePass ? 'text' : 'password'}
                              name='account_details.password'
                              className={clsx(
                                'form-control mb-0 mb-lg-0',
                                {
                                  'is-invalid':
                                    touched.account_details?.password &&
                                    errors.account_details?.password,
                                },
                                {
                                  'is-valid':
                                    touched.account_details?.password &&
                                    !errors.account_details?.password,
                                }
                              )}
                              autoComplete='off'
                              disabled={isSubmitting || isLoading}
                            />
                            <span
                              className='input-group-text cursor-pointer'
                              onClick={() => setSeePass(!seePass)}
                            >
                              {seePass ? (
                                <i className='fas fa-eye-slash'></i>
                              ) : (
                                <i className='fas fa-eye'></i>
                              )}
                            </span>
                          </div>
                          {touched.account_details?.password &&
                            errors.account_details?.password && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{errors.account_details?.password}</span>
                                </div>
                              </div>
                            )}
                        </div>
                        <div className='mb-4'>
                          <label className='required fw-bold fs-6 mb-2 min-w-60px'>
                            Confirm Password
                          </label>
                          <div className='input-group'>
                            <input
                              {...getFieldProps('account_details.confirmPassword')}
                              type={seeConfirmPass ? 'text' : 'password'}
                              name='account_details.confirmPassword'
                              className={clsx(
                                'form-control mb-0 mb-lg-0',
                                {
                                  'is-invalid':
                                    touched.account_details?.confirmPassword &&
                                    errors.account_details?.confirmPassword,
                                },
                                {
                                  'is-valid':
                                    touched.account_details?.confirmPassword &&
                                    !errors.account_details?.confirmPassword,
                                }
                              )}
                              autoComplete='off'
                              disabled={isSubmitting || isLoading}
                            />
                            <span
                              className='input-group-text cursor-pointer'
                              onClick={() => setSeeConfirmPass(!seeConfirmPass)}
                            >
                              {seeConfirmPass ? (
                                <i className='fas fa-eye-slash'></i>
                              ) : (
                                <i className='fas fa-eye'></i>
                              )}
                            </span>
                          </div>
                          {touched.account_details?.confirmPassword &&
                            errors.account_details?.confirmPassword && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>
                                    {errors.account_details?.confirmPassword}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4'>
                  <div className='card border shadow-xs rounded-4'>
                    <div className='p-6'>
                      <h4>{pricingPackage?.title} Plan</h4>
                      <p className='text-muted'>You can cancel your plan at any time</p>
                      <div className='stepper stepper-pills stepper-column '>
                        <div className='stepper-nav '>
                          <div
                            className='stepper-item me-3 completed'
                            data-kt-stepper-element='nav'
                          >
                            <div className='stepper-wrapper d-flex align-items-center flex-grow-1'>
                              <div className='stepper-icon rounded-circle w-20px h-20px bg-primary'>
                                <i className='fas fa-check text-white' />
                              </div>
                              <div className='stepper-label flex-row align-items-center justify-content-between flex-grow-1'>
                                <div className=''>
                                  <h3 className='stepper-title mb-0 fw-bold text-dark'>Today</h3>
                                  <div className='stepper-desc'>{pricingPackage?.title}</div>
                                </div>
                                {/* <div className='fw-bold'>Free</div> */}
                              </div>
                            </div>
                            <div className='stepper-line w-20px h-40px border-gray-800 border-solid' />
                          </div>
                          <div className='stepper-item me-3 pb-0' data-kt-stepper-element='nav'>
                            <div className='stepper-wrapper d-flex align-items-center flex-grow-1'>
                              <div className='stepper-icon rounded-circle w-20px h-20px border-primary border'>
                                <i className='stepper-check fas fa-check' />
                                <span className='stepper-number'></span>
                              </div>
                              <div className='stepper-label flex-row align-items-center justify-content-between flex-grow-1'>
                                <div className=''>
                                  <h3 className='stepper-title mb-0 fw-bold text-dark'>
                                    {parseDurationToDate(validity(values.package.emi_price))}
                                  </h3>

                                  <div className='stepper-desc'>Validity</div>
                                </div>
                                <div className='text-end'>
                                  <div className='fw-bold'>
                                    {betterParse(pricingPackage?.pricing).currency}{' '}
                                    {pricing[values.package.emi_price]}
                                  </div>
                                  <div className='text-muted'>
                                    Billed {validity(values.package.emi_price)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='stepper-line w-20px h-40px ' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='py-3 px-6 border-top border-bottom border-gray-400 bor'>
                      <h4 className='m-0'>Plan Details:</h4>
                    </div>
                    <div className='px-6 py-4 border-bottom border-gray-400'>
                      <ul className='p-0 m-0 d-flex flex-column gap-2'>
                        {pricingPackage?.features &&
                          typeof pricingPackage?.features !== 'string' &&
                          pricingPackage?.features.length > 0 &&
                          pricingPackage?.features.map((feature: any, i: any) => (
                            <li className='d-flex align-items-center gap-3' key={i}>
                              {feature?.available ? (
                                <i className='fas fa-check text-primary'></i>
                              ) : (
                                <i className='fas fa-times text-primary'></i>
                              )}
                              <span>{feature?.title}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <CouponField
                      coupon={coupon}
                      setCoupon={setCoupon}
                      handleCouponSubmit={applyCoupon}
                    />
                    <div className='p-6'>
                      {pricingPackage?.is_free !== 1 && (
                        <div className='d-flex align-items-center justify-content-between mb-3'>
                          <p className='mb-0'>Total</p>
                          <p className='mb-0 fw-bolder fs-3'>
                            {betterParse(pricingPackage?.pricing).currency}{' '}
                            {pricing[values.package.emi_price]}
                          </p>
                        </div>
                      )}
                      <button
                        className='btn btn-dark w-100'
                        type='submit'
                        disabled={isLoading || isSubmitting || !isValid || !touched}
                      >
                        {pricingPackage?.is_free === 1 ? 'Free Trial' : 'Buy now'}
                      </button>
                      {!response?.success && response?.status_code !== 200 && (
                        <p className='text-danger mt-5'>{response?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default Onboard
