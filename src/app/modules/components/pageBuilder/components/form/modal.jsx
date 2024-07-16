import {useFormik} from 'formik'
import {useState} from 'react'
import {Button, Nav, Tab} from 'react-bootstrap'
import * as Yup from 'yup'
import Settings from './settings'

const FormModal = ({close, show, component, onChange}) => {
  console.log('component', component)
  const [imgUrl, setImgUrl] = useState(component?.body?.content?.url || '')
  const schema = Yup.object().shape({
    title: Yup.string().required(),
    name: Yup.boolean().optional(),
    gender: Yup.boolean().optional(),
    email: Yup.boolean().optional(),
    phone: Yup.boolean().optional(),
    address: Yup.boolean().optional(),
    additionalInfo: Yup.boolean().optional(),
  })
  const initialValues = {
    title: component?.body?.content?.title || '',
    name: component?.body?.content?.name || '',
    gender: component?.body?.content?.gender || '',
    email: component?.body?.content?.email || '',
    phone: component?.body?.content?.phone || '',
    address: component?.body?.content?.address || '',
    additionalInfo: component?.body?.content?.additionalInfo || '',
  }
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
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      handleOnChange('content', {
        ...component.body.content,
        title: values?.title,
        name: values?.name,
        gender: values?.gender,
        email: values?.email,
        phone: values?.phone,
        address: values?.address,
        additionalInfo: values?.additionalInfo,
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
                <div className='d-flex flex-column py-2'>
                  <h5 className='text-muted my-2'>Title</h5>
                  <input
                    type='text'
                    className={`form-control`}
                    {...formik.getFieldProps('title')}
                    style={{
                      border: formik.errors.title ? '1px solid red' : '1px solid #EEEEEE',
                    }}
                    placeholder='Form Title'
                    name='title'
                    defaultValue={component?.body?.content?.title}
                  />
                </div>
                <div className='py-3'>
                  <div className='form-check mb-3'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='name'
                      name='name'
                      defaultChecked={component?.body?.content?.name}
                      {...formik.getFieldProps('name')}
                    />
                    <label className='form-check-label' for='name'>
                      Show Name Field
                    </label>
                  </div>
                  <div className='form-check mb-3'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='email'
                      name='email'
                      defaultChecked={component?.body?.content?.email}
                      {...formik.getFieldProps('email')}
                    />
                    <label className='form-check-label' for='email'>
                      Show Email Field
                    </label>
                  </div>
                  <div className='form-check mb-3'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='phone'
                      name='phone'
                      defaultChecked={component?.body?.content?.phone}
                      {...formik.getFieldProps('phone')}
                    />
                    <label className='form-check-label' for='phone'>
                      Show Phone Field
                    </label>
                  </div>
                  <div className='form-check mb-3 '>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='gender'
                      name='gender'
                      defaultChecked={component?.body?.content?.gender}
                      {...formik.getFieldProps('gender')}
                    />
                    <label className='form-check-label' for='gender'>
                      Show Gender Field
                    </label>
                  </div>
                  <div className='form-check mb-3'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='address'
                      name='address'
                      defaultChecked={component?.body?.content?.address}
                      {...formik.getFieldProps('address')}
                    />
                    <label className='form-check-label' for='address'>
                      Show Address Field
                    </label>
                  </div>
                  <div className='form-check mb-3'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='additionalInfo'
                      name='additionalInfo'
                      defaultChecked={component?.body?.content?.additionalInfo}
                      {...formik.getFieldProps('additionalInfo')}
                    />
                    <label className='form-check-label' for='additionalInfo'>
                      Show Additional Info Field
                    </label>
                  </div>
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

export default FormModal
