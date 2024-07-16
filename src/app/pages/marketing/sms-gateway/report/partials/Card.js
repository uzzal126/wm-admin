import {formatNumber, hasProperties} from '../../../../../modules/helper/misc'

export default function Card({
  data = {},
  title = '',
  total,
  textColor,
  loading,
  borderColor,
  backgroundColor,
}) {
  return (
    <div className='col-xl-2 col-md-2 col-sm-4'>
      <div
        className=' bg-opacity-70 rounded-2 px-6 py-5'
        style={{
          backgroundColor: backgroundColor,
          border: `1px dashed ${borderColor || '#333'}`,
          borderStyle: 'dashed',
        }}
      >
        {/*begin::Symbol*/}
        <div className='d-flex flex-column mb-7'>
          {/*begin::Title*/}
          <a href='#' className={`text-${textColor} text-hover-primary fw-bold fs-3`}>
            {title}
          </a>
          {/*end::Title*/}
        </div>
        {/*end::Symbol*/}
        {/*begin::Stats*/}
        <div className='m-0'>
          {/*begin::Number*/}
          <span className='text-gray-700 fw-bolder d-block fs-5 lh-1 ls-n1 mb-1'>
            {loading
              ? '...'
              : `${
                  hasProperties(data, ['number_of_sms']) ? formatNumber(data.number_of_sms, 0) : '0'
                } (${
                  hasProperties(data, ['number_of_sms']) && total > 0
                    ? Math.ceil((data.number_of_sms * 100) / total)
                    : '0'
                }%)`}
          </span>
          {/*end::Number*/}
        </div>
        {/*end::Stats*/}
      </div>
    </div>
  )
}
