import {useFormik} from 'formik'
import {useState} from 'react'
import {Nav, Tab} from 'react-bootstrap'
import swal from 'sweetalert'
import * as yup from 'yup'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {Can} from '../../../../../_metronic/redux/ability'
import {CATEGORY_DETAILS} from '../../../../constants/api.constants'
import {queryRequest} from '../../../../library/api.helper'
import CropperComponents from '../../../../modules/components/cropper/CropperComponents'
import {ProductList} from '../product/ProductList'
import IconPicker from './icon-picker'

const CategoryContents = ({pagination, slug, category, refetch}) => {
  const [icon, setIcon] = useState('')

  const validationSchema = yup.object().shape({
    parent: yup.number().integer().min(0).required(),
    slug: yup
      .string()
      .test('utf8Length', 'Category slug must not exceed 250 UTF-8 characters', function (value) {
        if (!value) {
          // Allow empty values
          return true
        }

        const encoder = new TextEncoder()
        const utf8Bytes = encoder.encode(value)

        return utf8Bytes.length <= 250
      })
      .required(),
    title: yup
      .string()
      .test('utf8Length', 'Catetgory title must not exceed 250 UTF-8 characters', function (value) {
        if (!value) {
          // Allow empty values
          return true
        }

        const encoder = new TextEncoder()
        const utf8Bytes = encoder.encode(value)

        return utf8Bytes.length <= 250
      })
      .required(),
    status: yup.number().integer().min(0).required(),
    description: yup
      .string()
      .test(
        'utf8Length',
        'Category description must not exceed 65500 UTF-8 characters',
        function (value) {
          if (!value) {
            // Allow empty values
            return true
          }

          const encoder = new TextEncoder()
          const utf8Bytes = encoder.encode(value)

          return utf8Bytes.length <= 65500
        }
      )
      .required(),
    category_id: yup.number().integer().min(0).required(),
    image_path: yup
      .string()
      .test('utf8Length', 'Image path must not exceed 250 UTF-8 characters', function (value) {
        if (!value) {
          // Allow empty values
          return true
        }

        const encoder = new TextEncoder()
        const utf8Bytes = encoder.encode(value)

        return utf8Bytes.length <= 250
      }),
    icon_path: yup
      .string()
      .test('utf8Length', 'Icon path must not exceed 250 UTF-8 characters', function (value) {
        if (!value) {
          // Allow empty values
          return true
        }

        const encoder = new TextEncoder()
        const utf8Bytes = encoder.encode(value)

        return utf8Bytes.length <= 250
      }),
    position: yup.number().integer().required(),
    keyword: yup.string(),
    seo: yup.object().shape({
      meta_title: yup
        .string()
        .test('utf8Length', 'Meta title must not exceed 250 UTF-8 characters', function (value) {
          if (!value) {
            // Allow empty values
            return true
          }

          const encoder = new TextEncoder()
          const utf8Bytes = encoder.encode(value)

          return utf8Bytes.length <= 250
        })
        .required(),
      meta_keyword: yup
        .string()
        .test('utf8Length', 'Meta keyword must not exceed 250 UTF-8 characters', function (value) {
          if (!value) {
            // Allow empty values
            return true
          }

          const encoder = new TextEncoder()
          const utf8Bytes = encoder.encode(value)

          return utf8Bytes.length <= 250
        })
        .required(),
      meta_description: yup
        .string()
        .test(
          'utf8Length',
          'Meta description must not exceed 250 UTF-8 characters',
          function (value) {
            if (!value) {
              // Allow empty values
              return true
            }

            const encoder = new TextEncoder()
            const utf8Bytes = encoder.encode(value)

            return utf8Bytes.length <= 250
          }
        )
        .required(),
    }),
  })

  const initialValues = {
    parent: isNaN(category.parent) ? 0 : category.parent,
    slug: category.original.slug,
    title: category.text.replace(/&amp;/g, '&') || '',
    status: 1,
    description: category.original.description,
    category_id: isNaN(category.id) ? 0 : category.id,
    image_path: category.original.image || '',
    icon_path: category.original.icon || '',
    position: category.original.position,
    keyword: category.original.keyword,
    seo: {
      meta_title: category.original.meta_title,
      meta_description: category.original.meta_description,
      meta_keyword: category.original.meta_keyword,
    },
  }

  const onSubmit = async (values) => {
    try {
      const resp = await queryRequest(CATEGORY_DETAILS, values)
      if (resp.success || resp.status_code === 200) {
        swal('Success!', 'category updated successfully', 'success')
        refetch()
      } else {
        swal('Sorry!', resp.message, 'error')
      }
    } catch (error) {
      swal('Sorry!', 'Sorry! An error occured.', 'error')
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  })

  const imagePicker = [
    {
      title: 'beauty care',
      url: 'media/icons/images/cat1.png',
    },
  ]

  return (
    <KTCard className='card-flush'>
      <div
        className='mt-4 ms-4 category-title fs-5'
        dangerouslySetInnerHTML={{__html: pagination}}
      ></div>
      <div className='separator mt-4 mb-3'></div>
      <KTCardBody className='pt-0'>
        <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
          <Nav className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
            <Nav.Item>
              <Nav.Link className='text-active-primary cusrsor-pointer' eventKey='first'>
                Information
              </Nav.Link>
            </Nav.Item>
            <Can access='Product Assign' group='products'>
              <Nav.Item>
                <Nav.Link className='text-active-primary cusrsor-pointer' eventKey='second'>
                  Products
                </Nav.Link>
              </Nav.Item>
            </Can>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey='first'>
              <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                  <div className='col'>
                    <div className='mb-5'>
                      <label className='fs-6 form-label fw-bolder text-dark'>Description</label>
                      <textarea
                        className={`form-control ${formik.errors.description ? 'is-invalid' : ''}`}
                        name=''
                        placeholder=''
                        // value={formData.description}
                        {...formik.getFieldProps('description')}
                        // onChange={(e) => setFormData({...formData, description: e.target.value})}
                      ></textarea>
                      {formik.errors.description && (
                        <div className='text-danger'>{formik.errors.description}</div>
                      )}
                    </div>
                    <div className='row'>
                      <div className='col-8'>
                        <div className='mb-5'>
                          <label className='fs-6 form-label fw-bolder text-dark'>Slug</label>
                          <input
                            type='text'
                            className={`form-control ${formik.errors.slug ? 'is-invalid' : ''}`}
                            placeholder=''
                            {...formik.getFieldProps('slug')}
                            // value={formData.slug}
                            // onChange={(e) => setFormData({...formData, slug: e.target.value})}
                          />
                          {formik.errors.slug && (
                            <div className='text-danger'>{formik?.errors?.slug}</div>
                          )}
                        </div>
                      </div>
                      <div className='col'>
                        <div className='mb-5'>
                          <label className='fs-6 form-label fw-bolder text-dark'>Status</label>
                          <select
                            type='text'
                            className='form-select'
                            onChange={
                              (e) => formik.setFieldValue('status', Number(e.target.value))
                              // setFormData({
                              //   ...formData,
                              //   status: e.target.value === 'active' ? 1 : 0,
                              // })
                            }
                          >
                            <option value='1'>Active</option>
                            <option value='0'>Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-5'>
                    <div className='category-image'>
                      <label className='form-label fs-6 fw-bolder'>Image (1920px X 350px)</label>
                      <div
                        className={`form-control ${
                          formik.errors.image_path ? 'form-control is-invalid' : ''
                        }`}
                      >
                        <CropperComponents
                          onCroped={(url) => {
                            formik.setFieldValue('image_path', url[0])
                            // setImageUrl(url[0])
                            // console.log(url)
                          }}
                          width={1920}
                          isRemove={true}
                          height={350}
                          className='w-100 h-80px'
                          full={true}
                          src={formik.values.image_path || '/media/products/dummy-product.jpg'}
                        />
                      </div>
                    </div>
                    <div
                      className={`form-control ${
                        formik.errors.icon_path ? 'form-control is-invalid mt-2' : 'mt-5'
                      }`}
                    >
                      <IconPicker
                        date={imagePicker}
                        icon={formik.values.icon_path}
                        setIcon={setIcon}
                        onPick={(url) => {
                          formik.setFieldValue('icon_path', url)
                        }}
                        // formData={formData}
                        // setFormData={setFormData}
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-8'>
                  <div className='border-dashed rounded p-4'>
                    <h3 className='mb-3'>SEO</h3>
                    <div className='separator mb-3'></div>
                    <div className='row'>
                      <div className='col mb-5'>
                        <label className='fs-6 form-label text-dark'>Meta Titte</label>
                        <input
                          type='text'
                          className={`form-control ${
                            formik?.errors?.seo?.meta_title ? 'is-invalid' : ''
                          }`}
                          name=''
                          placeholder=''
                          {...formik.getFieldProps('seo.meta_title')}
                          // value={formData.meta_title}
                          // onChange={(e) => setFormData({...formData, meta_title: e.target.value})}
                        />
                        {formik?.errors?.seo?.meta_title && (
                          <div className='text-danger'>{formik?.errors?.seo?.meta_title}</div>
                        )}
                      </div>
                      <div className='col mb-5'>
                        <label className='fs-6 form-label text-dark'>Meta Description</label>
                        <input
                          type='text'
                          className={`form-control ${
                            formik?.errors?.seo?.meta_description ? 'is-invalid' : ''
                          }`}
                          name=''
                          placeholder=''
                          {...formik.getFieldProps('seo.meta_description')}
                          // value={formData.meta_description}
                          // onChange={(e) =>
                          //   setFormData({...formData, meta_description: e.target.value})
                          // }
                        />
                        {formik?.errors?.seo?.meta_description && (
                          <div className='text-danger'>{formik?.errors?.seo?.meta_description}</div>
                        )}
                      </div>
                    </div>
                    <div className='mb-5'>
                      <label className='fs-6 form-label text-dark'>Meta Keywords</label>
                      <textarea
                        className={`form-control ${
                          formik?.errors?.seo?.meta_keyword ? 'is-invalid' : ''
                        }`}
                        name=''
                        placeholder=''
                        {...formik.getFieldProps('seo.meta_keyword')}
                        // value={formData.meta_keyword}
                        // onChange={(e) => setFormData({...formData, meta_keyword: e.target.value})}
                      ></textarea>
                      {formik?.errors?.seo?.meta_keyword && (
                        <div className='text-danger'>{formik?.errors?.seo?.meta_keyword}</div>
                      )}
                    </div>
                  </div>
                </div>
                <Can access='Edit Category' group='products'>
                  <div className='mt-8 text-end'>
                    <button className='btn btn-dark' type='submit'>
                      <span className='indicator-label'>Update</span>
                      <span className='indicator-progress'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    </button>
                  </div>
                </Can>
              </form>
            </Tab.Pane>
            <Can access='Product Assign' group='products'>
              <Tab.Pane eventKey='second'>
                <ProductList category={category} />
              </Tab.Pane>
            </Can>
          </Tab.Content>
        </Tab.Container>
      </KTCardBody>
    </KTCard>
  )
}

export default CategoryContents
