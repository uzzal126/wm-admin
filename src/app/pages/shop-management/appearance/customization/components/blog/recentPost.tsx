import { Form, Offcanvas } from 'react-bootstrap'
import QueryConfig from './queryConfig'

const RecentBlogSetting = ({
  data,
  handlerOnChange,
}: {
  data: any
  handlerOnChange: any
}) => {
  return (
    <Offcanvas.Body>
      <>
        <div className='form-group'>
          <label className=''>Section Title</label>
          <input
            type='text'
            className='form-control'
            value={data?.title || ''}
            placeholder='Name'
            onChange={(e) =>
              handlerOnChange(
                {
                  ...data,
                  title: e.target.value,
                },
                true
              )
            }
          />
        </div>

        <QueryConfig data={data} handlerOnChange={handlerOnChange} />
        <div className='mt-4'>
          <Form.Label>Choose Style</Form.Label>
          <Form.Select
            aria-label='style'
            value={data?.setting?.template}
            onChange={(e) =>
              handlerOnChange({
                ...data,
                setting: { ...data.setting, template: e.target.value },
              })
            }
          >
            <option value='blog-recent-1'>Style One</option>
            <option value='blog-recent-2'>Style Two</option>
            <option value='blog-recent-3'>Style Three</option>
            <option value='blog-recent-4'>Style Four</option>
          </Form.Select>
        </div>
      </>
    </Offcanvas.Body>
  )
}

export default RecentBlogSetting
