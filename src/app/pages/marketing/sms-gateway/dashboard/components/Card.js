import {KTSVG} from '../../../../../../_metronic/helpers'
import {formatNumber, hasProperties} from '../../../../../modules/helper/misc'

export default function Card({title, data, loading, icon, textColor}) {
  return (
    <div className='col-sm-6 col-xl-2 mb-xl-5'>
      <div className='card h-lg-100'>
        <div className='card-body d-flex justify-content-between align-items-start flex-column'>
          <div className='m-0'>
            <KTSVG path={icon} className='svg-icon-3x' />
          </div>
          <div className='d-flex flex-column my-7'>
            <span className='fw-semibold fs-3x text-gray-800 lh-1 ls-n2'>
              {loading
                ? '...'
                : `${
                    hasProperties(data, ['number_of_sms'])
                      ? formatNumber(data.number_of_sms, 0)
                      : '0'
                  }`}
            </span>
            {/* <div className='m-0'>
              <span className={`fw-bold fs-5 text-${textColor}`}>{title} </span>
            </div> */}
          </div>

          <div className='m-0'>
            <span className={`fw-bold fs-5 text-${textColor}`}>{title} </span>
          </div>
          {/* <span className='badge badge-light-success fs-base'>
            <i className='ki-duotone ki-arrow-up fs-5 text-success ms-n1'>
              <span className='path1' />
              <span className='path2' />
            </i>
            2.1%
          </span> */}
        </div>
      </div>
    </div>
  )
}
