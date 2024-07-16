import {useEffect, useState} from 'react'
import {hasProperties} from '../../../../../modules/helper/misc'

export default function Card({data = {}, title = '', type, backgroundColor, loading}) {
  const [totalRequest, setTotalRequest] = useState(0)
  const [totalSMS, setTotalSMS] = useState(0)

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const cardData = data.filter((e) => e?.status === title && e?.account_type === type)[0]
      if (cardData && hasProperties(cardData, ['total_sms_count', 'total_request_count'])) {
        setTotalSMS(cardData?.total_sms_count)
        setTotalRequest(cardData?.total_request_count)
      } else {
        setTotalRequest(0)
        setTotalSMS(0)
      }
    }
  }, [data])

  return totalRequest === 0 && type === 'Masking' ? (
    <></>
  ) : (
    <div className='col-xl-2 col-md-2 col-sm-4'>
      <div
        className=' bg-opacity-70 rounded-2 px-6 py-5'
        style={{backgroundColor: backgroundColor}}
      >
        {/*begin::Symbol*/}
        <div className='d-flex flex-column mb-7'>
          {/*begin::Title*/}
          <a
            href='#'
            className={`text-${
              title === 'Approved'
                ? 'success'
                : title === 'Canceled'
                ? 'danger'
                : title === 'Pending'
                ? 'warning'
                : 'dark'
            } text-hover-primary fw-bold fs-3`}
          >
            {title}
          </a>
          {/*end::Title*/}
        </div>
        {/*end::Symbol*/}
        {/*begin::Stats*/}
        <div className='m-0'>
          {/*begin::Number*/}
          <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
            {loading ? '...' : `${totalRequest} / ${totalSMS}`}
          </span>
          {/*end::Number*/}
          {/*begin::Desc*/}
          <span className='text-gray-500 fw-semibold fs-6'>{type}</span>
          {/*end::Desc*/}
        </div>
        {/*end::Stats*/}
      </div>
    </div>
  )
}
