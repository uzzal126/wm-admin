import DateRangeMaker from '../../../../../_metronic/partials/content/forms/dateRangePicker'

const EarningsBlock = () => {
  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>
          My Earning
          <span className='fs-6 text-gray-400 fw-bold ms-1'>30 Days</span>
        </h3>

        <div className='d-flex align-items-center my-2'>
          <div className='me-2'>
            <DateRangeMaker
              onChange={(e: any) => console.log(e)}
              hideTitle
              className='form-select-sm '
            />
          </div>
          <div className='me-5'>
            <select
              name='status'
              data-control='select2'
              data-hide-search='true'
              className='form-select form-select-white form-select-sm'
              defaultValue='1'
            >
              <option value='1'>Unsettled amount</option>
              <option value='2'>Payment Processing</option>
              <option value='3'>Paid amount</option>
            </select>
          </div>
        </div>
      </div>
      <div className='card'>
        <div className='card-body'></div>
      </div>
    </>
  )
}

export default EarningsBlock
