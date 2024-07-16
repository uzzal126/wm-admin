import moment from 'moment'
import {Fragment, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {BackLink, PageTitle} from '../../../../../_metronic/layout/core'
import DateRangeMaker from '../../../../../_metronic/partials/content/forms/dateRangePicker'
import {MapWidget} from '../../../../../_metronic/partials/widgets/mixed/MapWidget'
import {useCountryWiseQuery} from '../../../../../_metronic/redux/slices/visitor'
import {DecreaseGraph, IncreaseGraph} from '../helper'

const PageBack: Array<BackLink> = [
  {
    title: 'Back',
    path: '/reports/analytics/visitors',
  },
]

const CountryWiseReport = ({hideTitle = false}) => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const route = useSearchParams()

  const [page, setPage] = useState(15)

  const [date, setDate] = useState<any>({
    start_date: route[0].get('start_date') || moment(new Date()).format('yyyy-MM-DD'),
    end_date: route[0].get('end_date') || moment(new Date()).format('yyyy-MM-DD'),
    selected: {
      label: 'Today',
      custom: false,
    },
  })

  const {data: countryData} = useCountryWiseQuery(
    `?start_date=${date.start_date}&end_date=${date.end_date}`
  )

  let visitor =
    countryData?.data && countryData.data.length > 0
      ? countryData.data.reduce(
          (sum: number, item: any) => sum + parseInt(item.total_unique_user),
          0
        )
      : 0

  return (
    <>
      {!hideTitle && <PageTitle backLink={PageBack}>Country Wise Report</PageTitle>}
      <KTCard>
        <div className='card-header'>
          <div className='card-title flex-column'>
            <h3 className='fw-bolder mb-1'>Country Wise Report</h3>
          </div>
          <div className='card-toolbar'>
            <DateRangeMaker onChange={(e: any) => setDate(e)} hideTitle />
          </div>
        </div>
      </KTCard>
      <div className='row'>
        <div className='col-lg-5'>
          <KTCard>
            <div className='card-header'>
              <div className='card-title'>
                <h4>
                  Visitors
                  <br />
                  <span className='text-muted'>Total Visitor: {visitor}</span>
                </h4>
              </div>
            </div>
            <KTCardBody>
              <div className='m-0'>
                {countryData?.data &&
                  countryData?.data.length > 0 &&
                  countryData?.data?.slice(0, page)?.map((item: any, i: any) => (
                    <Fragment key={i}>
                      <div className='d-flex flex-stack'>
                        <img
                          src={`/media/flags/${item.country_code}.svg`}
                          className='me-4 w-25px'
                          style={{borderRadius: 4}}
                          alt=''
                        />

                        <div className='d-flex flex-stack flex-row-fluid d-grid gap-2'>
                          <div className='me-5'>
                            <span className='text-gray-800 fw-bold text-hover-primary fs-6'>
                              {item.country}
                            </span>

                            <span className='text-gray-400 fw-semibold fs-7 d-block text-start ps-0'>
                              Unique Visitors
                            </span>
                          </div>

                          <div className='d-flex align-items-center'>
                            <span className='text-gray-800 fw-bold fs-6 me-3 d-block'>
                              {item.total_unique_user}
                            </span>

                            <div className='m-0'>
                              {item.unique_user_change_percentage < 1 ? (
                                <DecreaseGraph
                                  number={Math.abs(item.unique_user_change_percentage) + '%'}
                                />
                              ) : (
                                <IncreaseGraph
                                  number={Math.abs(item.unique_user_change_percentage) + '%'}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {i < countryData?.data?.length - 1 && (
                        <div className='separator separator-dashed my-3'></div>
                      )}
                    </Fragment>
                  ))}
                {countryData?.data.length > page && (
                  <div className='text-center'>
                    <button
                      className='btn btn-sm btn-light-primary'
                      onClick={() =>
                        setPage(
                          countryData?.data.length < page + 20
                            ? countryData?.data.length
                            : page + 20
                        )
                      }
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </KTCardBody>
          </KTCard>
        </div>
        <div className='col-lg-7'>
          <MapWidget
            title='Country Wise'
            date={countryData?.data && countryData?.data.length > 0 ? countryData?.data : []}
          />
        </div>
      </div>
    </>
  )
}

export default CountryWiseReport
