import {useFormik} from 'formik'
import {useState} from 'react'
import {Button, Nav, Tab} from 'react-bootstrap'
import * as Yup from 'yup'
import Settings from './settings'

const ButtonModal = ({close, show, component, onChange}) => {
  const [url, setUrl] = useState(component?.body?.content?.url || '')
  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    url: Yup.string().url('Invalid URL').optional(),
  })

  const initialValues = {
    title: component?.body?.content?.title,
    url: url,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      handleOnChange('content', {
        ...component.body.content,
        title: values?.title,
        url: values?.url,
      })
      close(!show)
    },
  })

  const handleOnChange = (key, value) => {
    let changed = {
      ...component,
      body: {
        ...component.body,
        [key]: value,
      },
    }
    onChange(changed)
  }
  const handleOnChangeSettings = (key, value) => {
    let changed = {
      ...component,
      body: {
        ...component.body,
        setting: {
          [key]: value,
        },
      },
    }
    onChange(changed)
  }
  return (
    <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
      <div className='drag-header handle'>
        <div className='d-flex w-100 align-items-center justify-content-between'>
          <Nav className=''>
            <Nav.Item>
              <Nav.Link eventKey='first'>Content</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='second'>Settings</Nav.Link>
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
            <form
              className='form w-100'
              onSubmit={formik.handleSubmit}
              noValidate
              id='kt_login_signin_form'
            >
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
                    placeholder='Button Title'
                    name='title'
                    defaultValue={component?.body?.content?.title}
                  />
                </div>
                {formik.touched.title && formik.errors.title && (
                  <div className='text-danger'>
                    <span>{formik.errors.title}</span>
                  </div>
                )}
                <div className='d-flex flex-column'>
                  <h5 className='text-muted my-2'>Link</h5>
                  <input
                    type='text'
                    className={`form-control`}
                    {...formik.getFieldProps('url')}
                    style={{
                      border: formik.errors.url ? '1px solid red' : '1px solid #EEEEEE',
                    }}
                    placeholder='Button URL (Optional)'
                    name='url'
                    defaultValue={component?.body?.content?.url}
                  />
                </div>
                {formik.touched.url && formik.errors.url && (
                  <div className='text-danger'>
                    <span>{formik.errors.url}</span>
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

export default ButtonModal
