import moment from 'moment'
import {useState} from 'react'
import {KTCard} from '../../../../../_metronic/helpers'
import {BackLink, PageTitle} from '../../../../../_metronic/layout/core'
import DateRangeMaker from '../../../../../_metronic/partials/content/forms/dateRangePicker'
import {WidgetDepartmentalChart} from '../../../../../_metronic/partials/widgets/charts/widgetDipChart'
import {useByDeviceQuery} from '../../../../../_metronic/redux/slices/visitor'
import {kFormatter, timeFormatter} from '../../../../modules/helper/misc'
const colors = ['danger', 'success', 'info', 'warning', 'primary']

const PageBack: Array<BackLink> = [
  {
    title: 'Back',
    path: '/reports/analytics/visitors',
  },
]

const VisitorByDevice = ({hideTitle = false}) => {
  const [date, setDate] = useState<any>({
    start_date: moment(new Date()).format('yyyy-MM-DD'),
    end_date: moment(new Date()).format('yyyy-MM-DD'),
    selected: {
      label: 'Today',
      custom: false,
    },
  })

  const {data: deviceData} = useByDeviceQuery(
    `?start_date=${date.start_date}&end_date=${date.end_date}`
  )

  const deviceChart =
    deviceData && deviceData?.data && deviceData?.data?.length > 0
      ? deviceData?.data.map((item: any) => {
          return {
            value: item?.total_unique_user || timeFormatter(item.avg_session_time),
            category: item.device_type,
          }
        })
      : []

  return (
    <>
      {!hideTitle && <PageTitle backLink={PageBack}>By Device</PageTitle>}
      <KTCard>
        <div className='card-header'>
          <div className='card-title flex-column'>
            <h3 className='fw-bolder mb-1'>Visitors By Device</h3>
          </div>
          <div className='card-toolbar'>
            <DateRangeMaker onChange={(e: any) => setDate(e)} hideTitle />
          </div>
        </div>
      </KTCard>
      <div className='row'>
        <div className='col-lg-7'>
          <div className='card'>
            <div className='card-body'>
              <div className='table-responsive m-0'>
                <table className='table table-row-dashed g-4'>
                  <thead>
                    <tr className='fs-7 fw-bold border-0 text-gray-400 text-uppercase'>
                      <th className=''>Device</th>
                      <th className='text-center'>User</th>
                      <th className='text-center'>Countries</th>
                      <th className='text-center'>Cities</th>
                      <th className='text-end'>Avg. Session</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deviceData &&
                      deviceData?.data &&
                      deviceData?.data?.length > 0 &&
                      deviceData?.data?.map((item: any, i: any) => {
                        let clr = colors[Math.floor(Math.random() * colors.length)]
                        let icon =
                          item.device_type === 'smartphone'
                            ? 'mobile'
                            : item.device_type === 'phablet'
                            ? 'tablet'
                            : item.device_type
                        return (
                          <tr key={i}>
                            <td>
                              <p className='text-gray-600 fw-bold text-hover-primary mb-1 fs-6 d-flex align-items-center text-capitalize'>
                                <div className='symbol symbol-30px me-4'>
                                  <div
                                    className={`symbol-label fs-2 fw-semibold bg-${clr} text-inverse-${clr}`}
                                  >
                                    <i className={`fa fa-${icon} text-inverse-${clr}`}></i>
                                    {/* {item.device_type?.slice(0, 1)} */}
                                  </div>
                                </div>
                                <div className='me-5'>
                                  <span className='text-gray-800 fw-bold text-hover-primary fs-6'>
                                    {item.device_type}
                                  </span>
                                </div>
                              </p>
                            </td>
                            <td className='d-flex align-items-center justify-content-center border-0'>
                              <span className='fw-bold text-gray-800 fs-6 me-3 text-truncate'>
                                {kFormatter(item?.total_unique_user)}
                              </span>

                              {/* <div className='flex-grow-1 w-60px'>
                                                    <ProgressBar now={Number(item?.click_percentage)} label={`${parseFloat(item?.click_percentage).toFixed(1)}%`} className='rounded-start-0' />
                                                </div> */}
                            </td>

                            <td className='text-center'>{item?.unique_country}</td>
                            <td className='text-center'>{item?.unique_city}</td>
                            <td className='text-end'>{timeFormatter(item?.avg_session_time)}</td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-5'>
          <WidgetDepartmentalChart data={deviceChart} deviceData={deviceData?.data} />
        </div>
      </div>
    </>
  )
}

export default VisitorByDevice
