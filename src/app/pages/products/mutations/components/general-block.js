import {ErrorMessage, Field} from 'formik'
import {Col, Form, InputGroup} from 'react-bootstrap'
import slugify from 'react-url-slugify'
import TextEditor from '../../../../../_metronic/partials/content/forms/editor'
import {ToolTipLabel} from '../../../../modules/helper/misc'
import AdditionalInfo from './info'

const GeneralField = ({values, setFieldValue, onTextEditorLoad, onTextEditorTextChange}) => {
  return (
    <div className='card card-flush py-4'>
      <div className='card-header min-h-auto'>
        <div className='card-title'>
          <h2>General </h2>
        </div>
      </div>
      <div className='card-body py-0'>
        <div className='mb-5 fv-row'>
          <Field name='product_name'>
            {({field, inputType}) => (
              <Form.Group as={Col} md='md' controlId='validationFormik01'>
                <Form.Label>Product name</Form.Label>
                <ToolTipLabel tooltip='Product name required' className='required' />
                <InputGroup>
                  <Form.Control
                    {...field}
                    onChange={(e) => {
                      setFieldValue('product_name', e.target.value)
                      setFieldValue('product_slug', slugify(e.target.value))
                      setFieldValue('seo.meta_tag_title', slugify(e.target.value))
                    }}
                    type='text'
                    placeholder='Product Name'
                    as={inputType}
                  />
                </InputGroup>

                <ErrorMessage
                  name={field.name || 'product_name'}
                  render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
                />
              </Form.Group>
            )}
          </Field>
        </div>
        <div className='mb-5 fv-row'>
          <Field name='product_slug'>
            {({field}) => (
              <Form.Group as={Col} md='md' controlId='validationFormik-slug'>
                <Form.Label>Product Slug</Form.Label>
                <ToolTipLabel
                  tooltip='A product slug is required and recommended to be unique'
                  className='required'
                />
                <InputGroup>
                  <InputGroup.Text id='basic-url'>https://example.com/products/</InputGroup.Text>
                  <Form.Control
                    {...field}
                    type='text'
                    placeholder='Product Slug'
                    tooltip='A product slug is required and recommended to be unique.'
                  />
                </InputGroup>

                <ErrorMessage
                  name={field.name || 'product_slug'}
                  render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
                />
              </Form.Group>
            )}
          </Field>
        </div>
        <div className='mb-5 fv-row'>
          <Field name='product_s_description'>
            {({field}) => (
              <Form.Group as={Col} md='md' controlId='validationFormik-description'>
                <Form.Label>Short Description</Form.Label>
                <ToolTipLabel tooltip='Product Short Description' className='required' />
                <InputGroup>
                  <TextEditor
                    name={'product_s_description'}
                    defaultValue={values.product_s_description}
                    onChange={(event) => {
                      typeof onTextEditorTextChange === 'function' && onTextEditorTextChange(event)

                      const sanitizedValue = event.target.isEmpty
                        ? event.target.extractedTextValue
                        : event.target.value

                      setFieldValue(event.target.name, sanitizedValue)
                    }}
                    onLoad={onTextEditorLoad}
                  />
                </InputGroup>

                <ErrorMessage
                  name={field.name || 'product_s_description'}
                  render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
                />
              </Form.Group>
            )}
          </Field>
        </div>
        <AdditionalInfo additional_info={values.additional_info} setFieldValue={setFieldValue} />
      </div>
    </div>
  )
}

export default GeneralField
