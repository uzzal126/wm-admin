import {useEffect, useState} from 'react'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'

import {ErrorMessage} from 'formik'
import moment from 'moment'
import {Button, Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import slugify from 'react-url-slugify'
import {getBrandData} from '../../../../../../_metronic/partials/content/forms/brand/BrandHelper'
import {getCatData} from '../../../../../../_metronic/partials/content/forms/category/categoryQuery'
import {generateCatLabel} from '../../../../../../_metronic/partials/content/forms/category/generateCategory'
import {getVisibilityStatusList} from '../../../../../../_metronic/partials/content/forms/publish-status/StatusHelper'
import {getTagData} from '../../../../../../_metronic/partials/content/forms/tag/TagHelper'
import {Can} from '../../../../../../_metronic/redux/ability'
import {ADD_NEW_CATEGORY} from '../../../../../constants/api.constants'
import {queryRequest} from '../../../../../library/api.helper'
import {OnlyTooltip, ToolTipLabel} from '../../../../../modules/helper/misc'
import BrandPopUp from './BrandPopUp'
import ProductThumb from './ProductThumb'
import TagPopUp from './TagPopUp'
import ProductConfig from './config'

const FormSidebar = ({values, setFieldValue, setLoading, errors, touched}) => {
  const [statusList, setStatusList] = useState([])
  const [brandList, setBrands] = useState([])
  const [categoryList, setCategories] = useState([])
  const [tagList, setTagList] = useState([])
  const [newCategory, setNewCategory] = useState({})

  const [showCatModal, setShowCatModal] = useState(false)
  const [showBrandModal, setShowBrandModal] = useState(false)
  const [showTagModal, setShowTagModal] = useState(false)

  useEffect(() => {
    getSyncData()
  }, [])

  const getSyncData = async () => {
    const respCat = await getCatData()
    setCategories(respCat)

    const respBrand = await getBrandData()
    setBrands(respBrand)

    const status = await getVisibilityStatusList()
    setStatusList(status)
    const tag = await getTagData()
    setTagList(tag)
    setLoading(false)
  }

  const saveNewCategory = async () => {
    const resp = await queryRequest(ADD_NEW_CATEGORY, {
      ...newCategory,
      slug: slugify(newCategory.title),
      description: '',
    })
    if (resp.success) {
      toast.success('Category added successfully!')
      setFieldValue('cat_ids', [...values.cat_ids, resp.catid])

      const catList = generateCatLabel(resp.tree)
      setCategories(catList)
      setNewCategory({})
      setShowCatModal(false)
    } else {
      toast.error(resp.message)
    }
  }

  const handleClose = () => setShowCatModal(false)
  const handleShow = () => setShowCatModal(true)

  return (
    <div>
      {/* <Thumb
        className='d-none d-lg-block mb-5'
        setFieldValue={setFieldValue}
        values={values}
      /> */}

      <ProductThumb
        className='d-none d-lg-block mb-5'
        setFieldValue={setFieldValue}
        values={values}
        touched={touched}
        errors={errors}
      />
      <div className='card card-flush py-4 mb-5'>
        <div className='card-header min-h-auto'>
          <div className='card-title pb-2'>
            <h2>
              Status
              <OnlyTooltip tooltip='Set the product status.' className='required' />
            </h2>
          </div>
          <div className='card-toolbar'>
            <div className='rounded-circle bg-success w-15px h-15px'></div>
          </div>
        </div>
        <ErrorMessage
          name={'product_status_id'}
          render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
        />
        <div className='card-body py-0'>
          <Select
            value={[statusList[values.product_status_id]]}
            name='colors'
            options={statusList}
            className='multi-select mb-2'
            classNamePrefix='select'
            onChange={(e) => setFieldValue('product_status_id', e.value)}
          />
          <div className={`${values.product_status_id !== 2 && 'd-none'} mt-10`}>
            <label htmlFor='kt_ecommerce_add_product_status_datepicker' className='form-label'>
              Select publishing date and time
            </label>
            <Flatpickr
              placeholder='Pick date &amp; time'
              className='form-control'
              data-enable-time
              value={values.scheduled_at}
              onChange={([date]) =>
                setFieldValue('scheduled_at', moment(date).format('YYYY-MM-DD hh:mm:ss'))
              }
            />
          </div>
        </div>
      </div>
      <div className='card card-flush py-4'>
        <div className='card-header min-h-auto'>
          <div className='card-title pb-2'>
            <h2>Product Details</h2>
          </div>
        </div>
        <div className='card-body py-0'>
          <ToolTipLabel label='Categories' tooltip='Add product to a category.' className='' />
          <ErrorMessage
            name={'cat_ids'}
            render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
          />
          <Select
            value={
              values.cat_ids.length > 0 &&
              categoryList &&
              values.cat_ids.map((t) => categoryList.filter((e) => e.id === t)[0])
            }
            name='colors'
            isMulti
            options={categoryList}
            className='multi-select mb-2'
            classNamePrefix='select'
            onChange={(e) =>
              setFieldValue(
                'cat_ids',
                e.map((f) => f.id)
              )
            }
          />
          <Can access='Add Category' group='products'>
            <button
              type='button'
              onClick={handleShow}
              className='btn btn-light-primary btn-sm mb-5'
            >
              <i className='fas fa-plus'></i> Create new category
            </button>
          </Can>
          <div className='mt-2'>
            <ToolTipLabel label='Brand' tooltip='Add product beand.' className='' />
            <ErrorMessage
              name={'brandList'}
              render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
            />
            <Select
              value={
                brandList ? brandList[brandList.findIndex((f) => f.id === values.brand_id)] : []
              }
              options={brandList}
              className='multi-select mb-2'
              onChange={(e) => setFieldValue('brand_id', e.value)}
            />
            <button
              type='button'
              onClick={() => setShowBrandModal(true)}
              className='btn btn-light-primary btn-sm mb-5'
            >
              <i className='fas fa-plus'></i> Manage Brand Name
            </button>
          </div>
          <div className='mt-2'>
            <ToolTipLabel label='Tags' tooltip='Add Tags for your product.' className='' />
            <ErrorMessage
              name={'tag_ids'}
              render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
            />
            <Select
              value={
                values.tag_ids.length > 0 &&
                tagList &&
                values.tag_ids.map((t) => tagList.filter((e) => e.id == t)[0])
              }
              isMulti
              options={tagList}
              onChange={(e) =>
                setFieldValue(
                  'tag_ids',
                  e.map((f) => f.id)
                )
              }
              className='multi-select mb-2'
              classNamePrefix='select'
            />

            <button
              type='button'
              onClick={() => setShowTagModal(true)}
              className='btn btn-light-primary btn-sm mb-5'
            >
              <i className='fas fa-plus'></i> Manage Tag
            </button>
          </div>
        </div>
      </div>
      <ProductConfig setFieldValue={setFieldValue} values={values} />

      <Modal show={showBrandModal} onHide={() => setShowBrandModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BrandPopUp
            setShowBrandModal={setShowBrandModal}
            brandList={brandList}
            setBrands={setBrands}
            values={values}
            setFieldValue={setFieldValue}
          />
        </Modal.Body>
      </Modal>
      <Modal show={showCatModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-5'>
            <label className='fs-6 form-label fw-bolder text-dark'>Category Name</label>
            <input
              type='text'
              className='form-control form-control'
              name=''
              placeholder='Enter your category name'
              value={newCategory.title}
              onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
            />
          </div>
          <div className='mb-5'>
            <label className='fs-6 form-label fw-bolder text-dark'>Set Parent</label>
            <Select
              defaultValue={[]}
              name='parent'
              options={categoryList}
              className='multi-select mb-2'
              classNamePrefix='select'
              onChange={(e) => setNewCategory({...newCategory, parent: e.id})}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='dark' onClick={saveNewCategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showTagModal} onHide={() => setShowTagModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Manage product tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TagPopUp
            setShowTagModal={setShowTagModal}
            tagList={tagList}
            setTagList={setTagList}
            values={values}
            setFieldValue={setFieldValue}
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default FormSidebar
