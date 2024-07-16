import QueryConfig from './queryConfig'

const BlogSetting = ({
  data,
  handlerOnChange,
}: {
  data: any
  handlerOnChange: any
}) => {
  return (
    <div>
      <div className='p-3'>
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
        <div className='form-group'>
          <label className=''>Section Subtitle</label>
          <input
            type='text'
            className='form-control'
            value={data?.subtitle || ''}
            placeholder='Name'
            onChange={(e) =>
              handlerOnChange(
                {
                  ...data,
                  subtitle: e.target.value,
                },
                true
              )
            }
          />
        </div>
        <div className='form-group'>
          <label className=''>Section Description</label>
          <textarea
            className='form-control'
            value={data?.details || ''}
            placeholder='Name'
            onChange={(e) =>
              handlerOnChange(
                {
                  ...data,
                  details: e.target.value,
                },
                true
              )
            }
          />
        </div>
      </div>
      <QueryConfig data={data} handlerOnChange={handlerOnChange} />
      <button type="button" className='btn btn-dark btn-sm' onClick={() => handlerOnChange(data)}>Update</button>
    </div>
  )
}

export default BlogSetting
