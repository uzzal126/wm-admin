import moment from 'moment'
import {useEffect, useRef, useState} from 'react'
// import {DateRange} from 'react-date-range'
import {Button} from 'react-bootstrap'

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import {MenuComponent} from '../../../assets/ts/components'
import {usePageData} from '../../../layout/core'

const DateRangeMaker = ({onChange, hideTitle = false, className = '', title = ''}) => {
  const interviewDateRef = useRef()
  const {setdatePickerData} = usePageData()

  const [custom, setCustom] = useState(false)
  const [changed, setChanged] = useState({
    label: 'Today',
    custom: false,
  })
  const [data, setData] = useState({
    startDate: moment(new Date()).format('yyyy-MM-DD'),
    endDate: moment(new Date()).format('yyyy-MM-DD'),
    key: 'selection',
    autoFocus: true,
  })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    MenuComponent.reinitialization()

    return () => {
      setdatePickerData({})
    }
  }, [])

  const handleOnChange = (date) => {
    interviewDateRef.current.focus()
    setData({
      ...data,
      startDate: date,
    })
  }
  /*  const onOkay = (data, item = {}) => {
    setChanged(item)
    if (onChange)
      onChange({
        start_date: moment(data.startDate).format('yyyy-MM-DD'),
        end_date: moment(data.endDate).format('yyyy-MM-DD'),
        selected: item,
      })
    var com = document.querySelector('#kt_menu_63b3b3ba02686')
    MenuComponent.hideDropdowns(com)
  } */

  const onOkay = (data, item = {}) => {
    if (moment(data.endDate).isSameOrAfter(data.startDate)) {
      setChanged(item)
      if (onChange) {
        onChange({
          start_date: moment(data.startDate).format('yyyy-MM-DD'),
          end_date: moment(data.endDate).format('yyyy-MM-DD'),
          selected: item,
        })
      }
      setErrorMessage('')
    } else {
      setErrorMessage('End date must not be less than start date')
      return
    }

    var com = document.querySelector('#kt_menu_63b3b3ba02686')
    MenuComponent.hideDropdowns(com)
  }

  const handleCustom = (item) => {
    setChanged(item)
    setCustom(!custom)
  }

  const dateRange = [
    {
      label: 'Today',
      custom: false,
      range: {
        startDate: new Date(),
        endDate: new Date(),
      },
    },
    {
      label: 'Yesterday',
      custom: false,
      range: {
        startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    },
    {
      label: 'Last 7 Days',
      custom: false,

      range: {
        startDate: new Date(new Date().setDate(new Date().getDate() - 6)),
        endDate: new Date(),
      },
    },
    {
      label: 'Last 30 Days',
      custom: false,

      range: {
        startDate: new Date(new Date().setDate(new Date().getDate() - 29)),
        endDate: new Date(),
      },
    },
    {
      label: 'This Month',
      custom: false,
      range: {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
    },
    {
      label: 'Last Month',
      custom: false,
      range: {
        startDate: new Date(
          new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear(),
          new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1,
          1
        ),
        endDate: new Date(
          new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear(),
          new Date().getMonth() === 0 ? 12 : new Date().getMonth(),
          0
        ),
      },
    },
    {
      label: 'This Year',
      custom: false,
      range: {
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date(new Date().getFullYear(), 11, 31),
      },
    },
    {
      label: 'Last Year',
      custom: false,
      range: {
        startDate: moment().subtract(1, 'year').startOf('year'),
        endDate: moment().subtract(1, 'year').endOf('year'),
      },
    },
    {
      label: 'Custom',
      range: {},
      custom: true,
    },
  ]
  return (
    <>
      {!hideTitle && <label className='form-label fs-6 fw-bold'>{`Date Range${title}:`}</label>}
      <div className='time position-relative min-w-150px' id='date-range-ref'>
        <button
          type='button'
          className={`d-flex form-select ${
            className || 'form-select-solid'
          } align-items-center px-3 w-100 border justify-content-between`}
          data-kt-menu-trigger='click'
          data-kt-menu-placement='bottom-start'
          id='kt_menu'
        >
          {changed && Object.keys(changed).length > 0 && !changed.custom ? (
            changed.label
          ) : (
            <div className='min-w-200px'>
              {moment(data.startDate).format('MMM DD, YY')} -
              {data.endDate ? moment(data.endDate).format('MMM DD, YY') : 'Select End'}
            </div>
          )}
        </button>
        <div
          className={`menu menu-sub menu-sub-dropdown w-75 w-md-300px mw-300px`}
          data-kt-menu='true'
          data-kt-submenu='true'
          id='kt_menu_6a02686'
        >
          <div>
            <div className={custom ? 'd-none' : ''}>
              {dateRange &&
                dateRange.map((item, i) => (
                  <div key={i} className='menu-item d-block p-1'>
                    <Button
                      variant='secondary'
                      size='sm'
                      className='w-100'
                      onClick={() => (item.custom ? handleCustom(item) : onOkay(item.range, item))}
                    >
                      <span className='menu-title'>{item.label}</span>
                    </Button>
                  </div>
                ))}
            </div>
            <div className={!custom ? 'd-none' : ''}>
              {/* <DateRange
                editableDateInputs={true}
                showDateDisplay={false}
                onChange={(item) => handleOnChange(item)}
                moveRangeOnFirstSelection={false}
                ranges={[data]}
              /> */}
              <div className='p-2'>
                <div className='row row-cols-2 g-2 '>
                  <div className='col'>
                    <label className='d-block'>
                      From
                      <input
                        className='form-control form-control-sm'
                        type='date'
                        placeholder='MM/DD/YYYY'
                        value={data.startDate}
                        required
                        onChange={(e) => handleOnChange(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className='col'>
                    <label className='d-block'>
                      To
                      <input
                        ref={interviewDateRef}
                        className='form-control form-control-sm'
                        value={data.endDate}
                        placeholder='MM/DD/YYYY'
                        type='date'
                        required
                        onChange={(e) =>
                          setData({
                            ...data,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
                {errorMessage && (
                  <p className='text-danger fs-6 fw-normal text-center mb-0 mt-1'>{errorMessage}</p>
                )}
              </div>
              <div className='text-end mt-3'>
                <Button
                  variant='light'
                  size='sm'
                  className='me-2 px-6 mb-2'
                  onClick={() => handleCustom()}
                >
                  Close
                </Button>
                <Button
                  variant='info'
                  size='sm'
                  className='me-8 px-8 mb-2'
                  onClick={() => onOkay(data)}
                >
                  Ok
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DateRangeMaker
