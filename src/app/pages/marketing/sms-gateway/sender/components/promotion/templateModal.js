import {Fragment} from 'react'

export default function TemplateModal({data, formik}) {
  const handleCheck = (id) => {
    const template = data?.filter((e) => e?.id === id)[0]
    if (formik.values.content === template?.text) {
      formik.setFieldValue('template', null)
      formik.setFieldValue('content', '')
    } else {
      formik.setFieldValue('template', id)
      formik.setFieldValue('content', template?.text)
    }
  }

  return (
    <Fragment>
      <div className='table-responsive mt-4'>
        <table className='table table-row-bordered table-striped table-rounded border border-gray-300 px-2 g-2'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Text</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((sms, i) => (
                <tr key={i}>
                  <td>{sms.id}</td>
                  <td>{sms?.name}</td>
                  <td className='text-left'>{sms?.text}</td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      data-kt-check={sms?.text === formik?.values?.content}
                      data-kt-check-target='#kt_table_users .form-check-input'
                      checked={sms?.text === formik?.values?.content}
                      onChange={() => handleCheck(sms?.id)}
                    />
                  </div>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}
