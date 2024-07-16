import moment from 'moment'
import {KTSVG} from '../../../../../_metronic/helpers'
import {usePageData} from '../../../../../_metronic/layout/core'
import {useVisitorSummaryQuery} from '../../../../../_metronic/redux/slices/visitor'
import {Link} from '../../../../modules/helper/linkHandler'
import {kFormatter, timeFormatter} from '../../../../modules/helper/misc'
import LiveVisitor from './liveVisitor'

const VisitorInfo = ({isStatics}: {isStatics: any}) => {
  const {datePickerData} = usePageData()
  const {data: response} = useVisitorSummaryQuery(
    `?start_date=${datePickerData.start_date || moment(new Date()).format('yyyy-MM-DD')}&end_date=${
      datePickerData.end_date || moment(new Date()).format('yyyy-MM-DD')
    }`
  )

  return (
    <div className='col'>
      <div className='card card-flush'>
        <Link to='/reports/analytics/visitors' className='card-body pt-5'>
          <div
            className={`row row-cols-${isStatics ? '2' : '1'} ${
              isStatics ? 'row-cols-lg-2' : 'row-cols-lg-4'
            } g-4`}
          >
            <div className='col'>
              <LiveVisitor />
            </div>
            <div className='col'>
              <div className='d-flex align-items-center me-2'>
                <div className='symbol symbol-50px me-3'>
                  <div className='symbol-label bg-light-primary'>
                    <KTSVG
                      path={'/media/icons/duotune/coding/cod006.svg'}
                      className={'svg-icon-1 svg-icon-primary rotate-180'}
                    />
                  </div>
                </div>
                <div>
                  <div className='fs-4 text-dark fw-bold'>
                    {response && response?.visitors_data?.total_unique_user}
                  </div>
                  <div className='fs-7 text-muted fw-bold'>
                    {datePickerData?.selected?.label || 'Today'}
                  </div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='d-flex align-items-center me-2'>
                <div className='symbol symbol-50px me-3'>
                  <div className='symbol-label bg-light-danger'>
                    <KTSVG
                      path={'/media/icons/duotune/abstract/abs046.svg'}
                      className={'svg-icon-1 svg-icon-danger rotate-180'}
                    />
                  </div>
                </div>
                <div>
                  <div className='fs-4 text-dark fw-bold'>
                    {response && timeFormatter(response?.visitors_data?.avg_session_time)}
                  </div>
                  <div className='fs-7 text-muted fw-bold'>Avg. Session</div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='d-flex align-items-center me-2'>
                <div className='symbol symbol-50px me-3'>
                  <div className='symbol-label bg-light-warning'>
                    <KTSVG
                      path={'/media/icons/duotune/graphs/gra004.svg'}
                      className={'svg-icon-1 svg-icon-warning rotate-180'}
                    />
                  </div>
                </div>
                <div>
                  <div className='fs-4 text-dark fw-bold'>
                    {response && kFormatter(response?.lifetime_visitors_data?.total_unique_user)}
                  </div>
                  <div className='fs-7 text-muted fw-bold'>Lifetime</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default VisitorInfo
