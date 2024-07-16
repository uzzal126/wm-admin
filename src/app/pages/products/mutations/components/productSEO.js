import React from 'react'
import {Col} from 'react-bootstrap'
import FormTextField from '../../../../modules/components/formik/fields/form-field'

const ProductSEO = ({values}) => {
  return (
    <div className='card card-flush py-4'>
      <div className='card-header min-h-auto'>
        <div className='card-title'>
          <h2>Meta Options</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
        <div className='mb-5'>
          <FormTextField
            as={Col}
            controlId='validationFormik_meta_tag_title'
            label='Meta Tag Title'
            type='text'
            name='seo.meta_tag_title'
            tooltip='Set a meta tag title. Recommended to be simple and precise keywords'
          />
        </div>
        <div className='mb-5'>
          <FormTextField
            as={Col}
            controlId='validationFormik_meta_tag_description'
            label='Meta Tag Description'
            inputType='textarea'
            name='seo.meta_tag_description'
            tooltip='Set a Meta Tag Description. Recommended to be simple and precise keywords'
          />
        </div>
        <div>
          <FormTextField
            as={Col}
            controlId='validationFormik_meta_tag_keywords'
            label='Meta Tag Keywords'
            type='text'
            name='seo.meta_tag_keywords'
            tooltip='Set a list of keywords that the product is related to. Separate the keywords by adding a comma <code>,</code>between each keyword.'
          />
        </div>
        <div className='mt-3'>
          <label className='form-label'>SEO Preview</label>
          <div className='d-flex align-items-center'>
            <div className='flex-grow-1'>
              <p className='fw-bolder text-primary fs-5 mb-0'>{values.seo.meta_tag_title}</p>
              <span className='text-success d-block'>{`https://example.com/products/${values.product_slug}`}</span>
              <span className='d-block'>
                <span className='text-muted'>{`${new Date().toLocaleDateString()} - `} </span>{' '}
                {values.seo.meta_tag_description}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSEO
