import {useFormik} from 'formik'
import {Button, Nav, Tab} from 'react-bootstrap'
import * as Yup from 'yup'
import Settings from './settings'

const SocialModal = ({close, show, component, onChange}) => {
  const schema = Yup.object().shape({
    url1: Yup.string().url('Invalid url').required('Url is required'),
    url2: Yup.string().url('Invalid url').optional(),
    url3: Yup.string().url('Invalid url').optional(),
    url4: Yup.string().url('Invalid url').optional(),
    url5: Yup.string().url('Invalid url').optional(),
  })

  const initialValues = {
    url1: component?.body?.content?.urls?.link1,
    url2: component?.body?.content?.urls?.link2,
    url3: component?.body?.content?.urls?.link3,
    url4: component?.body?.content?.urls?.link4,
    url5: component?.body?.content?.urls?.link5,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      handleOnChange('content', {
        ...component.body.content,
        urls: {
          link1: values?.url1,
          link2: values?.url2,
          link3: values?.url3,
          link4: values?.url4,
          link5: values?.url5,
        },
      })
      close(!show)
    },
  })
  // const handleOnChange = (data) => {
  //   let changed = {
  //     ...component,
  //     body: {
  //       ...component.body,
  //       content: {
  //         url: data?.url,
  //       },
  //       setting: {
  //         width: width,
  //         height: height,
  //         tittle: tittle,
  //         lazyLoading: lazyLoading,
  //         fullscreen: fullscreen,
  //       },
  //     },
  //   }
  //   console.log('map changed', changed)
  //   onChange(changed)
  // }
  const handleOnChange = (key, value) => {
    let changed = {
      ...component,
      body: {
        ...component.body,
        [key]: value,
      },
    }
    console.log('map changed', changed)
    onChange(changed)
  }
  let socialFields = [
    {
      id: 1,
      field: 'url1',
      title: 'Link 1 -',
      defaultValue: component?.body?.content?.urls?.link1,
      placeholder: 'Social URL 1',
    },
    {
      id: 2,
      field: 'url2',
      title: 'Link 2 -',
      defaultValue: component?.body?.content?.urls?.link2,
      placeholder: 'Social URL 2(Optional)',
    },
    {
      id: 3,
      field: 'url3',
      title: 'Link 3 -',
      defaultValue: component?.body?.content?.urls?.link3,
      placeholder: 'Social URL 3(Optional)',
    },
    {
      id: 4,
      field: 'url4',
      title: 'Link 4 -',
      defaultValue: component?.body?.content?.urls?.link4,
      placeholder: 'Social URL 4(Optional)',
    },
    {
      id: 5,
      field: 'url5',
      title: 'Link 5 -',
      defaultValue: component?.body?.content?.urls?.link5,
      placeholder: 'Social URL 5(Optional)',
    },
  ]
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
                {socialFields?.map((item) => (
                  <div key={item.id} className='my-1 mx-1'>
                    <h5 className='text-muted'>{item.title}</h5>
                    <div className='d-flex flex-row'>
                      <input
                        type='text'
                        className={`form-control`}
                        {...formik.getFieldProps(item.field)}
                        style={{
                          border: formik.errors[item.field] ? '1px solid red' : '1px solid #EEEEEE',
                        }}
                        placeholder={item.placeholder}
                        name={item.field}
                        defaultValue={item.defaultValue}
                      />
                    </div>
                    {formik.touched[item.field] && formik.errors[item.field] && (
                      <div className='text-danger'>
                        <span>{formik.errors[item.field]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className='d-flex flex-column align-items-center'>
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

export default SocialModal
