import clsx from 'clsx'
import {useFormik} from 'formik'
import moment from 'moment'
import {FC, useEffect, useState} from 'react'
import {InputGroup, Spinner} from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {getBrandData} from '../../../../../_metronic/partials/content/forms/brand/BrandHelper'
import {getCatData} from '../../../../../_metronic/partials/content/forms/category/categoryQuery'
import {GET_PRODUCT_LIST} from '../../../../constants/api.constants'
import {getQueryRequest} from '../../../../library/api.helper'
import CropperComponents from '../../../../modules/components/cropper/CropperComponents'
import {DataTableLoading} from '../../../../modules/datatable/loading/DataTableLoading'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {Coupon} from '../core/_models'
import {createCoupon, updateCoupon} from '../core/_requests'
import {ProductAddModal} from './ProductAddModal'
import ProductListModal from './ProductListModal'

type Props = {
  isUserLoading: boolean
  user: Coupon
}

const blankImg = toAbsoluteUrl('/media/voucher.jpg')

const CouponEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [brandList, setBrands] = useState([])
  const [showDetails, setShowDetails] = useState<any>(false)
  const [productList, setProductList] = useState<any>(user?.items?.product || [])
  const [leastProductCost, setLeastProductCost] = useState<any>(999999)
  const [allProducts, setAllProducts] = useState<any>([])
  const [categoryList, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const editCouponSchema = Yup.object().shape({
    promo_code: Yup.string()
      .min(5, 'Minimum 5 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Coupon Code is required'),
    amount: Yup.number().required('amount is required').max(leastProductCost),
    percent: Yup.number().required('percent is required').max(100),
    start_in: Yup.string().required('Start is required'),
    end_in: Yup.string().required('End Date is required'),
  })

  useEffect(() => {
    getData()
  }, [])

  const getProductsData = async () => {
    setLoading(true)
    const resp = await getQueryRequest(`${GET_PRODUCT_LIST}?page=1&items_per_page=999&status_id=1`)
    if (resp.success && resp.status_code === 200) {
      const ar: any[] = []
      for (let i = 0; i < resp.data.length; i++) {
        ar.push({...resp.data[i], checked: false})
      }
      setAllProducts(ar)
      setLoading(false)
    } else {
      setAllProducts([])
      setLoading(false)
    }
  }

  const getData = async () => {
    setLoading(true)
    const respCat: any = await getCatData()
    setCategories(respCat || [])

    const respBrand: any = await getBrandData()
    setBrands(respBrand)

    getProductsData()
  }

  const [userForEdit] = useState<any>({
    ...user,
    active_status: user.active_status || 'Active',
    promo_code: user.promo_code || '',
    start_in: parseInt(user.start_in) * 1000 || moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
    end_in: parseInt(user.end_in) * 1000 || moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
    discount_type: user.discount_type || 'Fixed',
    thumbnail: user.thumbnail || '',
    banner: user.banner || '',
    percent: user.percent || 1,
    amount: user.amount || 1,
    max_use_limit: user.max_use_limit || 1,
    per_user_limit: user.per_user_limit || 1,
    application_type: user.application_type || '',
    min_order_value: parseInt(user.min_order_value) || 1,
    max_discount_limit: user.max_discount_limit || 1,
    items: {
      brand: user?.items?.brand || [],
      category: user?.items?.category || [],
      product: user?.items?.product || [],
    },
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik: any = useFormik({
    initialValues: userForEdit,
    enableReinitialize: true,
    validationSchema: editCouponSchema,
    onSubmit: async (values, {setSubmitting, setFieldError}) => {
      setSubmitting(true)
      if (values.discount_type === 'Fixed') {
        values.max_discount_limit = parseInt(values.amount) || null
        values.percent = '0'
        values.amount = parseInt(values.amount)
        if (parseInt(values.min_order_value) <= parseInt(values.amount)) {
          toast.error('Minimum order value must be greater than discount amount')
          return
        }
      }
      if (values.discount_type === 'Percentage') {
        values.amount = 0
        values.percent = values.percent.toString()
        values.items = {
          brand: [],
          category: [],
          product: [],
        }
      }
      if (values.application_type === 'flat') {
        values.items = {
          brand: [],
          category: [],
          product: [],
        }
      }
      if (values?.application_type === 'flat' && values?.min_order_value < values?.amount) {
        setFieldError('amount', 'Minimum order value is less than discount amount')
        toast.error('Invalid Discount Amount')
        return
      }
      if (productList && productList?.length > 0) {
        let leastPriceArray: any =
          allProducts &&
          allProducts?.length > 0 &&
          allProducts
            .filter((f: any) => productList.includes(f.id?.toString()))
            ?.map((item: any) => item?.price?.min)
        let leastPrice = Math.min(...leastPriceArray)
        setLeastProductCost(leastPrice)
        if (leastPrice > parseInt(formik.values.amount)) {
          submitCoupon(values, setSubmitting)
        } else if (leastPrice < parseInt(formik.values.amount)) {
          setFieldError('amount', 'discount amount exceeds minimum price')
          toast.error('Discount amount exceeds minimum price')
        }
      } else {
        if (values.application_type === 'specific') {
          if (
            values?.items?.brand?.length === 0 &&
            values?.items?.category?.length === 0 &&
            values?.items?.product?.length === 0
          ) {
            toast.error('Please select a Brand / Category / Product')
            // setFieldError('items', 'Please select a Brand / Category / Product')
          } else {
            submitCoupon(values, setSubmitting)
          }
        } else {
          submitCoupon(values, setSubmitting)
        }
      }
      // // console.log(values)
    },
  })

  const submitCoupon = async (values: any, setSubmitting: any) => {
    try {
      if (isNotEmpty(values.id)) {
        values = {
          ...values,
          max_use_limit: parseInt(values?.max_use_limit),
          percent: parseFloat(values?.percent),
          start_in: moment(values.start_in).format('YYYY-MM-DD hh:mm:ss'),
          end_in: moment(values.end_in).format('YYYY-MM-DD hh:mm:ss'),
          items: {
            ...values?.items,
            product: productList,
          },
          coupon_id: values.id,
        }
        await updateCoupon(values)
      } else {
        const newValues = {
          ...values,
          max_use_limit: parseInt(values?.max_use_limit),
          percent: parseFloat(values?.percent),
        }
        await createCoupon(newValues)
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setSubmitting(true)
      cancel(true)
    }
  }

  if (loading) {
    return (
      <div className='d-flex flex-column align-items-center py-3'>
        <Spinner animation='border' variant='primary' />;
      </div>
    )
  }

  return (
    <>
      <ProductListModal
        setShow={setShowDetails}
        show={showDetails}
        productList={productList}
        allProducts={allProducts}
        setProductList={setProductList}
        refetch={getData}
        setLeastProductCost={setLeastProductCost}
        currentLeastAmount={formik.values.amount}
        setErrors={formik.setErrors}
      />
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div className='d-flex flex-column'>
          <div className='row row-cols-1 row-cols-lg-2 g-4'>
            <div className='col'>
              <div className='mb-2'>
                <label className='fs-6 form-label fw-bolder text-dark required'>Coupon Code</label>
                <input
                  placeholder='Coupon Code'
                  {...formik.getFieldProps('promo_code')}
                  type='text'
                  name='promo_code'
                  className={clsx(
                    'form-control',
                    {'is-invalid': formik.touched.promo_code && formik.errors.promo_code},
                    {
                      'is-valid': formik.touched.promo_code && !formik.errors.promo_code,
                    }
                  )}
                  autoComplete='off'
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.promo_code && formik.errors.promo_code && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.promo_code}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='mb-3'>
                <label className='form-label mb-0 fw-bolder required'>Discount</label>
                <div className='discount row'>
                  <div className='d-flex col-auto'>
                    <div
                      className='form-check form-check-custom form-check-solid form-check-sm'
                      style={{cursor: 'pointer'}}
                    >
                      <input
                        id='Fixed'
                        {...formik.getFieldProps('discount_type')}
                        type='radio'
                        name='discount_type'
                        checked={formik.values.discount_type === 'Fixed' ? true : false}
                        value='Fixed'
                        className={'form-check-input'}
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                        style={{cursor: 'pointer'}}
                      />
                      <label
                        className='form-check-label'
                        htmlFor='Fixed'
                        style={{cursor: 'pointer'}}
                      >
                        Fixed
                      </label>
                    </div>
                    <div className='form-check form-check-custom form-check-solid form-check-sm ms-3'>
                      <input
                        id='Percent'
                        {...formik.getFieldProps('discount_type')}
                        type='radio'
                        name='discount_type'
                        checked={formik.values.discount_type === 'Percentage' ? true : false}
                        value='Percentage'
                        className={'form-check-input'}
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                        style={{cursor: 'pointer'}}
                      />
                      <label
                        className='form-check-label'
                        htmlFor='Percent'
                        style={{cursor: 'pointer'}}
                      >
                        Percentage
                      </label>
                    </div>
                  </div>
                  <div className='col'>
                    {formik.values.discount_type && (
                      <InputGroup className='mb-3'>
                        <input
                          placeholder='Enter Discount'
                          {...formik.getFieldProps(
                            formik.values.discount_type === 'Percentage' ? 'percent' : 'amount'
                          )}
                          type='number'
                          name={formik.values.discount_type === 'Percentage' ? 'percent' : 'amount'}
                          max={
                            formik.values.discount_type === 'Percentage' ? 100 : leastProductCost
                          }
                          className={clsx(
                            'form-control',
                            {
                              'is-invalid':
                                formik.values.discount_type === 'Percentage'
                                  ? formik.touched.percent && formik.errors.percent
                                  : formik.touched.amount && formik.errors.amount,
                            },
                            {
                              'is-valid':
                                formik.values.discount_type === 'Percentage'
                                  ? formik.touched.percent && !formik.errors.percent
                                  : formik.touched.amount && !formik.errors.amount,
                            }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting || isUserLoading}
                        />
                        {formik.values.discount_type === 'Percentage' && (
                          <InputGroup.Text id='basic-addon1'>%</InputGroup.Text>
                        )}
                        {formik.values.discount_type === 'Percentage'
                          ? formik.touched.percent && formik.errors.percent
                          : formik.touched.amount &&
                            formik.errors.amount && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{formik.errors.promo_code}</span>
                                </div>
                              </div>
                            )}
                      </InputGroup>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    {formik.values.discount_type === 'Percentage' && (
                      <>
                        <label className='fs-6 form-label fw-bolder text-dark'>
                          Max Discount Amount
                        </label>
                        <div className='input-group'>
                          {/* <button
                            className='btn btn-icon btn-outline btn-outline-secondary'
                            type='button'
                            onClick={() =>
                              formik.values.max_discount_limit > 0 &&
                              formik.setFieldValue(
                                'max_discount_limit',
                                formik.values.max_discount_limit - 1
                              )
                            }
                          >
                            <i className='bi bi-dash fs-1'></i>
                          </button> */}
                          <input
                            placeholder='Max Discount Amount'
                            {...formik.getFieldProps('max_discount_limit')}
                            type='text'
                            name='max_discount_limit'
                            className={clsx(
                              'form-control',
                              {
                                'is-invalid':
                                  formik.touched.max_discount_limit &&
                                  formik.errors.max_discount_limit,
                              },
                              {
                                'is-valid':
                                  formik.touched.max_discount_limit &&
                                  !formik.errors.max_discount_limit,
                              }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                          />
                          {formik.touched.max_discount_limit &&
                            formik.errors.max_discount_limit && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{formik.errors.max_discount_limit}</span>
                                </div>
                              </div>
                            )}
                          {/* <button
                            className='btn btn-icon btn-outline btn-outline-secondary'
                            type='button'
                            onClick={() =>
                              formik.setFieldValue(
                                'max_discount_limit',
                                parseInt(formik.values.max_discount_limit) + 1
                              )
                            }
                          >
                            <i className='bi bi-plus fs-1'></i>
                          </button> */}
                        </div>
                      </>
                    )}
                  </div>
                  <div className='col'>
                    <div>
                      <>
                        <label className='fs-6 form-label fw-bolder text-dark required'>
                          Minimum Order Amount
                        </label>
                        <div className='input-group'>
                          {/* <button
                          className='btn btn-icon btn-outline btn-outline-secondary'
                          type='button'
                          onClick={() =>
                            formik.values.min_order_value > 0 &&
                            formik.setFieldValue(
                              'min_order_value',
                              formik.values.min_order_value - 1
                            )
                          }
                        >
                          <i className='bi bi-dash fs-1'></i>
                        </button> */}
                          <input
                            placeholder='Minimum Order Amount'
                            {...formik.getFieldProps('min_order_value')}
                            type='number'
                            name='min_order_value'
                            className={clsx(
                              'form-control',
                              {
                                'is-invalid':
                                  formik.touched.min_order_value && formik.errors.min_order_value,
                              },
                              {
                                'is-valid':
                                  formik.touched.min_order_value && !formik.errors.min_order_value,
                              }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                          />
                          {formik.touched.min_order_value && formik.errors.min_order_value && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.min_order_value}</span>
                              </div>
                            </div>
                          )}
                          {/* <button
                          className='btn btn-icon btn-outline btn-outline-secondary'
                          type='button'
                          onClick={() =>
                            formik.setFieldValue(
                              'min_order_value',
                              parseInt(formik.values.min_order_value) + 1
                            )
                          }
                        >
                          <i className='bi bi-plus fs-1'></i>
                        </button> */}
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='row row-cols-1 row-cols-lg-2'>
                <div className='col'>
                  <label className='fs-6 form-label fw-bolder text-dark required'>Start Date</label>
                  <Flatpickr
                    placeholder='Start date'
                    className='form-control'
                    data-enable-time
                    value={moment(formik.values.start_in).format('YYYY-MM-DD hh:mm:ss')}
                    onChange={([date]: any) =>
                      formik.setFieldValue('start_in', moment(date).format('YYYY-MM-DD hh:mm:ss'))
                    }
                  />
                </div>
                <div className='col'>
                  <label className='fs-6 form-label fw-bolder text-dark required'>End Date</label>
                  <Flatpickr
                    placeholder='End date'
                    className='form-control'
                    data-enable-time
                    value={moment(formik.values.end_in).format('YYYY-MM-DD hh:mm:ss')}
                    onChange={([date]: any) =>
                      formik.setFieldValue('end_in', moment(date).format('YYYY-MM-DD hh:mm:ss'))
                    }
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <label className='fs-6 form-label fw-bolder text-dark'>Max Apply Limit</label>
                  <div className='input-group'>
                    <button
                      className='btn btn-icon btn-outline btn-outline-secondary'
                      type='button'
                      onClick={() =>
                        formik.values.max_use_limit > 0 &&
                        formik.setFieldValue('max_use_limit', formik.values.max_use_limit - 1)
                      }
                    >
                      <i className='bi bi-dash fs-1'></i>
                    </button>
                    <input
                      placeholder='Max Apply'
                      {...formik.getFieldProps('max_use_limit')}
                      type='text'
                      name='max_use_limit'
                      className={clsx(
                        'form-control',
                        {'is-invalid': formik.touched.max_use_limit && formik.errors.max_use_limit},
                        {
                          'is-valid': formik.touched.max_use_limit && !formik.errors.max_use_limit,
                        }
                      )}
                      autoComplete='off'
                      disabled={formik.isSubmitting || isUserLoading}
                    />
                    {formik.touched.max_use_limit && formik.errors.max_use_limit && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.max_use_limit}</span>
                        </div>
                      </div>
                    )}
                    <button
                      className='btn btn-icon btn-outline btn-outline-secondary'
                      type='button'
                      onClick={() =>
                        formik.setFieldValue(
                          'max_use_limit',
                          parseInt(formik.values.max_use_limit) + 1
                        )
                      }
                    >
                      <i className='bi bi-plus fs-1'></i>
                    </button>
                  </div>
                </div>

                <div className='col-12 col-md-6'>
                  <label className='fs-6 form-label fw-bolder text-dark'>
                    Max Apply Limit /User
                  </label>
                  <div className='input-group'>
                    <button
                      className='btn btn-icon btn-outline btn-outline-secondary'
                      type='button'
                      onClick={() =>
                        formik.values.per_user_limit > 0 &&
                        formik.setFieldValue('user_limit', formik.values.per_user_limit - 1)
                      }
                    >
                      <i className='bi bi-dash fs-1'></i>
                    </button>
                    <input
                      placeholder='Max Apply/User'
                      {...formik.getFieldProps('per_user_limit')}
                      type='text'
                      name='per_user_limit'
                      className={clsx(
                        'form-control',
                        {
                          'is-invalid':
                            formik.touched.per_user_limit && formik.errors.per_user_limit,
                        },
                        {
                          'is-valid':
                            formik.touched.per_user_limit && !formik.errors.per_user_limit,
                        }
                      )}
                      autoComplete='off'
                      disabled={formik.isSubmitting || isUserLoading}
                    />
                    {formik.touched.per_user_limit && formik.errors.per_user_limit && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.per_user_limit}</span>
                        </div>
                      </div>
                    )}
                    <button
                      className='btn btn-icon btn-outline btn-outline-secondary'
                      type='button'
                      onClick={() =>
                        formik.setFieldValue('user_limit', formik.values.per_user_limit + 1)
                      }
                    >
                      <i className='bi bi-plus fs-1'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row row-cols-1 row-cols-lg-2 g-4'>
            <div className='col mb-3'>
              <div className='d-flex flex-column' style={{maxWidth: '125px'}}>
                <label className='fs-6 form-label fw-bolder text-dark'>Thumbnail</label>
                <CropperComponents
                  className='w-125px h-125px'
                  full=''
                  height={400}
                  width={400}
                  showPencil={true}
                  onCroped={(img: any) => formik.setFieldValue('thumbnail', img[0])}
                  src={formik.values.thumbnail || blankImg}
                />
              </div>
            </div>
            <div className='col mb-3'>
              <div className='d-flex flex-column' style={{maxWidth: '300px'}}>
                <label className='fs-6 form-label fw-bolder text-dark'>Banner</label>
                <CropperComponents
                  className='w-300px h-125px'
                  full=''
                  height={300}
                  showPencil={true}
                  width={600}
                  onCroped={(img: any) => formik.setFieldValue('banner', img[0])}
                  src={formik.values.banner || blankImg}
                />
              </div>
            </div>
          </div>
          <div className='col mt-2'>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <div className='d-flex align-items-center'>
                  <label className='fs-6 me-3 form-label fw-bolder text-dark required'>
                    Apply To
                  </label>
                  <label className='form-check form-check-custom me-4' style={{cursor: 'pointer'}}>
                    <input
                      {...formik.getFieldProps('application_type')}
                      type='radio'
                      name='application_type'
                      checked={formik.values.application_type === 'flat' ? true : false}
                      value='flat'
                      className={'form-check-input'}
                      autoComplete='off'
                      disabled={formik.isSubmitting || isUserLoading}
                      style={{cursor: 'pointer'}}
                    />
                    <span className='form-check-label' style={{cursor: 'pointer'}}>
                      All Products
                    </span>
                  </label>
                  <label className='form-check form-check-custom'>
                    <input
                      {...formik.getFieldProps('application_type')}
                      type='radio'
                      name='application_type'
                      checked={formik.values.application_type === 'specific' ? true : false}
                      value='specific'
                      className={'form-check-input'}
                      autoComplete='off'
                      disabled={formik.isSubmitting || isUserLoading}
                      style={{cursor: 'pointer'}}
                    />
                    <span className='form-check-label' style={{cursor: 'pointer'}}>
                      Specific
                    </span>
                  </label>
                </div>
              </div>

              {formik.values.application_type === 'specific' && (
                <div className='col'>
                  <div className='row'>
                    <div className='col'>
                      <div className='mb-5'>
                        <Select
                          // defaultValue={brandList ? brandList[brandList.findIndex((f: any) => f.id === formik.values?.items?.brand[0])] : []}
                          value={
                            formik.values?.items?.brand.length > 0 &&
                            formik.values?.items?.brand.map(
                              (t: any) => brandList.filter((e: any) => e.id === parseInt(t))[0]
                            )
                          }
                          options={brandList}
                          name='items'
                          placeholder='Select Brand'
                          isMulti
                          className='multi-select mb-2'
                          onChange={(e: any) => {
                            formik.setFieldValue('items', {
                              ...formik.values.items,
                              brand: e.map((f: any) => f.id),
                            })
                          }}
                        />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='categories'>
                        <Select
                          value={
                            formik.values?.items?.category.length > 0 &&
                            formik.values?.items?.category.map(
                              (t: any) => categoryList.filter((e: any) => e.id === parseInt(t))[0]
                            )
                          }
                          options={categoryList}
                          className='multi-select mb-2'
                          name='items'
                          placeholder='Select Category'
                          isMulti
                          onChange={(e: any) =>
                            formik.setFieldValue('items', {
                              ...formik.values.items,
                              category: e.map((f: any) => f.id),
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <div className='mb-5'>
                        <h3>Specific Products</h3>
                        <ProductAddModal
                          setProductList={setProductList}
                          productList={productList}
                          disabled={false}
                          refetch={getData}
                        />
                      </div>
                    </div>
                  </div>
                  {allProducts &&
                    allProducts?.length > 0 &&
                    allProducts
                      .filter((f: any) => productList.includes(f.id?.toString()))
                      ?.slice(0, 2)
                      ?.map((item: any, indx: number) => (
                        <tr key={indx}>
                          <td className='w-100'>
                            <div className='d-flex align-items-center'>
                              <div className='me-5 position-relative'>
                                <div className='symbol symbol-50px symbol-circle'>
                                  <img alt='Pic' src={item.thumbnail?.src} />
                                </div>
                              </div>
                              <div className='d-flex flex-column justify-content-center'>
                                <span
                                  className='fs-6 text-gray-800 text-hover-primary'
                                  style={{cursor: 'pointer'}}
                                >
                                  {item.name}
                                </span>
                                <div className='fw-bold text-gray-400'>SKU: {item.sku}</div>
                              </div>
                            </div>
                            <div></div>
                          </td>
                          <td>
                            {item.price?.min === item.price?.max
                              ? item.price?.min
                              : `${item.price?.min} - ${item.price?.max}`}
                          </td>
                          <td>
                            <button
                              className='btn btn-sm btn-icon btn-light-danger w-30px h-30px mx-2'
                              data-bs-custom-class='cs-tooltip'
                              data-kt-users-table-filter='delete_row'
                              type='button'
                              onClick={() => {
                                let myArr = [...productList]
                                const index = myArr.findIndex(
                                  (f: any) => parseInt(f) === parseInt(item.id)
                                )
                                myArr.splice(index, 1)
                                setProductList(myArr)
                                if (productList && productList?.length > 0) {
                                  let leastPriceArray: any =
                                    allProducts &&
                                    allProducts?.length > 0 &&
                                    allProducts
                                      .filter((f: any) => myArr.includes(f.id?.toString()))
                                      ?.map((item: any) => item?.price?.min)
                                  let leastPrice = Math.min(...leastPriceArray)
                                  setLeastProductCost(leastPrice)
                                  if (leastPrice > parseInt(formik.values.amount)) {
                                    formik.setErrors({})
                                  }
                                }
                              }}
                              data-bs-toggle='tooltip'
                              data-bs-dimiss='click'
                              title='Delete product'
                            >
                              <i className='la la-trash-o fs-3'></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                  {productList && productList?.length > 2 && (
                    <span
                      className='text-primary'
                      style={{cursor: 'pointer'}}
                      onClick={() => setShowDetails(true)}
                    >
                      ...view more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* end::Scroll */}
        <div className='d-flex align-items-center justify-content-end mt-7'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-sm btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Close
          </button>
          <button
            type='submit'
            className='btn btn-sm btn-dark'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {(formik.isSubmitting || isUserLoading) && <DataTableLoading />}
    </>
  )
}

export {CouponEditModalForm}
