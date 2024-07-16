import moment from 'moment'
import {useState} from 'react'
import Flatpickr from 'react-flatpickr'
import {toast} from 'react-toastify'
import swal from 'sweetalert'

const Tax = ({data, setData, handleUpdate}) => {
  const [formField, setFormField] = useState({
    name: '',
    rate: '',
    status: '',
  })
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isEdit, setIsEdit] = useState('')
  const [handleError, setHandleError] = useState('')

  const handleAddTax = () => {
    if (formField.name === '') {
      setHandleError('Name field must not empty')
    } else if (formField.rate === '') {
      setHandleError('Rate field must not empty')
    } else if (formField.status === '') {
      setHandleError('Status field must not empty')
    } else if (startDate === '') {
      setHandleError('Please select start date')
    } else if (endDate === '') {
      setHandleError('Please select end date')
    } else {
      let list = data?.key_value?.tax_setting
      list.push({
        ...formField,
        end_date: endDate,
        start_date: startDate,
      })
      const post = {
        ...data,
        key_value: {
          ...data?.key_value,
          tax_setting: list,
        },
      }
      setData(post)
      handleUpdate(post)
      setFormField({
        name: '',
        rate: '',
        status: '',
      })
    }
  }

  const handleEdit = (i) => {
    const newElement = data?.key_value?.tax_setting[i]
    setFormField({
      name: newElement.name,
      rate: newElement.rate,
      status: newElement.status,
    })
    setStartDate(newElement.start_date)
    setEndDate(newElement.end_date)
    setIsEdit(i)
  }

  const handleDelete = (idx) => {
    swal({
      title: 'Are you sure?',
      text: `Once Delete! You will not recover this tax`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        const newList =
          data?.key_value?.tax_setting &&
          data?.key_value?.tax_setting.length > 0 &&
          data?.key_value?.tax_setting.filter((f, i) => idx !== i)
        const post = {
          ...data,
          key_value: {
            ...data?.key_value,
            tax_setting: newList,
          },
        }
        setData(post)
        handleUpdate(post)
      }
    })
  }

  const handleCancle = () => {
    setFormField({
      name: '',
      rate: '',
      status: '',
    })
    setStartDate('')
    setEndDate('')
    setIsEdit('')
  }

  const handleEditTax = () => {
    let list = data?.key_value?.tax_setting
    if (list && list.length > 0) {
      list.map((item, i) => {
        if (i === isEdit)
          list[i] = {
            ...formField,
            end_date: endDate,
            start_date: startDate,
          }
      })
      const post = {
        ...data,
        key_value: {
          ...data?.key_value,
          tax_setting: list,
        },
      }
      setData(post)
      handleUpdate(post)
      setIsEdit('')
      setStartDate('')
      setEndDate('')
      setFormField({
        name: '',
        rate: '',
        status: '',
      })
    } else {
      toast.error('Something wrong! Please try again  ')
    }
  }

  return (
    <div className='row'>
      <div className='col-lg-4'>
        <div className='card'>
          <div className='card-body'>
            <div className='mb-3'>
              <label htmlFor='' className='required form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-control form-control-solid'
                value={formField.name}
                onChange={(e) => {
                  setFormField({...formField, name: e.target.value})
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='' className='required form-label'>
                Rate
              </label>
              <input
                type='text'
                className='form-control form-control-solid'
                value={formField.rate}
                onChange={(e) => {
                  setFormField({...formField, rate: e.target.value})
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='' className='required form-label'>
                Date Range
              </label>
              <div className='d-flex align-items-center'>
                <div className='me-3'>
                  <Flatpickr
                    placeholder='Start date'
                    className='form-control'
                    autoClose
                    value={startDate}
                    onChange={([date]) => setStartDate(moment(date).format('YYYY-MM-DD'))}
                  />
                </div>
                <div className='mb-0'>
                  <Flatpickr
                    placeholder='Start date'
                    className='form-control'
                    autoClose
                    value={endDate}
                    onChange={([date]) => setEndDate(moment(date).format('YYYY-MM-DD'))}
                  />
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='' className='required form-label'>
                Status
              </label>
              <select
                className='form-control form-control-solid'
                value={formField.status}
                onChange={(e) => {
                  setFormField({...formField, status: e.target.value})
                }}
              >
                <option>Select Status</option>
                <option value='1'>Active</option>
                <option value='0'>Deactivate</option>
              </select>
            </div>
            {isEdit !== '' ? (
              <>
                <button className='btn btn-sm btn-dark mt-1' onClick={() => handleEditTax()}>
                  Update Tax Rate
                </button>
                <button
                  className='btn btn-sm btn-light-danger mt-1 ms-2'
                  onClick={() => handleCancle()}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className='btn btn-sm btn-dark mt-1' onClick={() => handleAddTax()}>
                Add New Tax Rate
              </button>
            )}
            {handleError && <p className='badge badge-danger'>{handleError}</p>}
          </div>
        </div>
      </div>

      <div className='col'>
        <div className='card'>
          <div className='card-body'>
            <h3>All Tax Rate</h3>
            <div className='table-responsive'>
              <table className='table table-row-dashed table-row-gray-300 g-3'>
                <thead>
                  <tr className='fw-bolder fs-6 text-gray-800'>
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Daterange</th>
                    <th className='w-100px'>Status</th>
                    <th className='w-100px'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.key_value?.tax_setting &&
                    data?.key_value?.tax_setting.length > 0 &&
                    data?.key_value?.tax_setting.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.rate}</td>
                        <td>
                          {item.start_date} to {item.end_date}
                        </td>
                        <td>
                          <span
                            className={`badge badge-light-${
                              item.status === '1' ? 'success' : 'danger'
                            }`}
                          >
                            {item.status === '1' ? 'Active' : 'Deactivate'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleEdit(i)}
                            className='btn btn-sm btn-icon btn-light-primary w-30px h-30px'
                          >
                            <i className='fas fa-pencil-alt fs-3'></i>
                          </button>
                          <button
                            onClick={() => handleDelete(i)}
                            className='btn btn-sm btn-icon btn-light-danger w-30px h-30px'
                          >
                            <i className='la la-trash-o fs-3'></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tax
