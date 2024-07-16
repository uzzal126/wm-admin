import {useFormik} from 'formik'
import {useState} from 'react'
import {Button, Nav, Tab} from 'react-bootstrap'
import * as Yup from 'yup'
import Content from './content'
import Settings from './settings'

const SliderModal = ({close, show, component, onChange}) => {
  console.log('component', component)
  const [imgUrl1, setImgUrl1] = useState(
    component?.body?.content?.urls ? component?.body?.content?.urls[0] : ''
  )
  const [imgUrl2, setImgUrl2] = useState(
    component?.body?.content?.urls ? component?.body?.content?.urls[1] : ''
  )
  const [imgUrl3, setImgUrl3] = useState(
    component?.body?.content?.urls ? component?.body?.content?.urls[2] : ''
  )
  const [imgUrl4, setImgUrl4] = useState(
    component?.body?.content?.urls ? component?.body?.content?.urls[3] : ''
  )
  const [imgUrl5, setImgUrl5] = useState(
    component?.body?.content?.urls ? component?.body?.content?.urls[4] : ''
  )
  const schema = Yup.object().shape({
    title: Yup.string().optional(),
    caption: Yup.string().optional(),
    url1: Yup.string().optional(),
    url2: Yup.string().optional(),
    url3: Yup.string().optional(),
    url4: Yup.string().optional(),
    url5: Yup.string().optional(),
    link: Yup.string().url('Invalid URL').optional(),
  })
  const initialValues = {
    title: component?.body?.content?.title || '',
    caption: component?.body?.content?.caption || '',
    url1: component?.body?.content?.url1 || '',
    url2: component?.body?.content?.url2 || '',
    url3: component?.body?.content?.url3 || '',
    url4: component?.body?.content?.url4 || '',
    url5: component?.body?.content?.url5 || '',
    link: component?.body?.content?.link || '',
  }
  const handleOnChange = (key, value) => {
    let changed = {
      ...component,
      body: {
        ...component.body,
        [key]: value,
      },
    }
    console.log('img changed', changed)
    onChange(changed)
  }
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      handleOnChange('content', {
        ...component.body.content,
        title: values?.title,
        caption: values?.caption,
        urls: [imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5],
        link: values?.link,
      })
      close(!show)
    },
  })
  return (
    <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
      <div className='drag-header handle'>
        <div className='d-flex w-100 align-items-center justify-content-between'>
          <Nav className=''>
            <Nav.Item>
              <Nav.Link eventKey='first'>Content</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='second'>Setting</Nav.Link>
            </Nav.Item>
          </Nav>
          <Button
            variant='light-danger'
            size='sm'
            className='btn-icon'
            onClick={() => close(!show)}
          >
            <i className='fas fa-times' />
          </Button>
        </div>
      </div>
      <div className='drag-body'>
        <Tab.Content>
          <Tab.Pane eventKey='first'>
            <>
              <form
                className='form w-100'
                onSubmit={formik.handleSubmit}
                noValidate
                id='kt_login_signin_form'
              >
                <div className='d-flex flex-row flex-wrap'>
                  <div style={{width: '80px'}}>
                    <Content
                      content={imgUrl1}
                      {...formik.getFieldProps('url1')}
                      onChange={(v) => {
                        setImgUrl1(v)
                        formik.setFieldValue('url1', v)
                      }}
                    />
                  </div>
                  <div style={{width: '80px'}}>
                    <Content
                      content={imgUrl2}
                      {...formik.getFieldProps('url2')}
                      onChange={(v) => {
                        setImgUrl2(v)
                        formik.setFieldValue('url2', v)
                      }}
                    />
                  </div>
                  <div style={{width: '80px'}}>
                    <Content
                      content={imgUrl3}
                      {...formik.getFieldProps('url3')}
                      onChange={(v) => {
                        setImgUrl3(v)
                        formik.setFieldValue('url3', v)
                      }}
                    />
                  </div>
                  <div style={{width: '80px'}}>
                    <Content
                      content={imgUrl4}
                      {...formik.getFieldProps('url4')}
                      onChange={(v) => {
                        setImgUrl4(v)
                        formik.setFieldValue('url4', v)
                      }}
                    />
                  </div>

                  <div style={{width: '80px'}}>
                    <Content
                      content={imgUrl5}
                      {...formik.getFieldProps('url5')}
                      onChange={(v) => {
                        setImgUrl5(v)
                        formik.setFieldValue('url5', v)
                      }}
                    />
                  </div>
                </div>
                <div className='d-flex flex-column'>
                  <h5 className='text-muted my-2'>Link</h5>
                  <input
                    type='text'
                    className={`form-control`}
                    {...formik.getFieldProps('link')}
                    style={{
                      border: formik.errors.link ? '1px solid red' : '1px solid #EEEEEE',
                    }}
                    placeholder='Image URL (Optional)'
                    name='link'
                    defaultValue={component?.body?.content?.link}
                  />
                </div>
                {formik.touched.link && formik.errors.link && (
                  <div className='text-danger'>
                    <span>{formik.errors.link}</span>
                  </div>
                )}
                <div className='input-group mb-3 d-flex flex-column'>
                  <div className='d-flex flex-column py-2'>
                    <h5 className='text-muted my-2'>Title</h5>
                    <input
                      type='text'
                      className={`form-control`}
                      {...formik.getFieldProps('title')}
                      style={{
                        border: formik.errors.title ? '1px solid red' : '1px solid #EEEEEE',
                      }}
                      placeholder='Image Title'
                      name='title'
                      defaultValue={component?.body?.content?.title}
                    />
                  </div>
                  {formik.touched.title && formik.errors.title && (
                    <div className='text-danger'>
                      <span>{formik.errors.title}</span>
                    </div>
                  )}
                  <div className='d-flex flex-column py-2'>
                    <h5 className='text-muted my-2'>Caption</h5>
                    <input
                      type='text'
                      className={`form-control`}
                      {...formik.getFieldProps('caption')}
                      style={{
                        border: formik.errors.caption ? '1px solid red' : '1px solid #EEEEEE',
                      }}
                      placeholder='Image Caption'
                      name='caption'
                      defaultValue={component?.body?.content?.caption}
                    />
                  </div>
                  {formik.touched.caption && formik.errors.caption && (
                    <div className='text-danger'>
                      <span>{formik.errors.caption}</span>
                    </div>
                  )}
                </div>
                <div className='d-flex flex-column align-items-center mt-5'>
                  <button
                    className='btn btn-primary'
                    type='submit'
                    style={{
                      width: '300px',
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </>
          </Tab.Pane>
          <Tab.Pane eventKey='second'>
            <Settings
              handleChange={handleOnChange}
              component={component}
              close={() => close(!show)}
            />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  )
}

export default SliderModal
