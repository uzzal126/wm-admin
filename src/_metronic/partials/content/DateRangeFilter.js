import 'bootstrap-daterangepicker/daterangepicker.css'
import moment from 'moment'
import {useState} from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'

const DateRangeFilter = ({state, setState}) => {
  // const [state, setState] = useState({
  //     start: moment().subtract(29, 'days'),
  //     end: moment(),
  // });
  const [start, setStart] = useState(moment().subtract(30, 'days'))
  const [end, setEnd] = useState(moment())

  const handleCallback = (start, end) => {
    // // console.log('start: ', start.format('yyyy-MM-DD'))
    setStart(start)
    setEnd(end)
    setState({...state, start_date: start.format('yyyy-MM-DD'), end_date: end.format('yyyy-MM-DD')})
  }
  const label = start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY')
  return (
    <DateRangePicker
      initialSettings={{
        startDate: start.toDate(),
        endDate: end.toDate(),
        ranges: {
          Today: [moment().toDate(), moment().toDate()],
          Yesterday: [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
          'Last 7 Days': [moment().subtract(6, 'days').toDate(), moment().toDate()],
          'Last 30 Days': [moment().subtract(29, 'days').toDate(), moment().toDate()],
          'This Month': [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
          'Last Month': [
            moment().subtract(1, 'month').startOf('month').toDate(),
            moment().subtract(1, 'month').endOf('month').toDate(),
          ],
        },
      }}
      onCallback={handleCallback}
    >
      <div
        id='reportrange'
        className='form-control'
        style={{
          background: '#fff',
          cursor: 'pointer',
          padding: '5px 10px',
          border: '1px solid #ccc',
          width: '100%',
        }}
      >
        <i className='fa fa-calendar'></i>&nbsp;
        <span>{label}</span> <i className='fa fa-caret-down'></i>
      </div>
    </DateRangePicker>
  )
}
export default DateRangeFilter
