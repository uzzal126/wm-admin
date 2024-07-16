import { Fragment } from 'react'
import { useCountryWiseQuery } from '../../../../../_metronic/redux/slices/visitor'
import { Link } from '../../../../modules/helper/linkHandler'
import { DecreaseGraph, IncreaseGraph } from '../helper'
const CountryWise = ({ date }: { date: any }) => {

  const { data: countryData } = useCountryWiseQuery(`?start_date=${date.start_date}&end_date=${date.end_date}`)

  return (
    <div>
      <div className='card card-flush h-xl-100 mb-5'>
        <div className='card-header pt-7 mb-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold text-gray-800'>Visits by Country</span>
            <span className='text-gray-400 mt-1 fw-semibold fs-6'>
              {countryData?.data ?
                countryData?.data.length : 0} countries share 97% visits
            </span>
          </h3>
          <div className="card-toolbar">
            <Link to={`/reports/analytics/visitors/countries/?start_date=${date.start_date}&end_date=${date.end_date}`} className="btn btn-primary btn-icon">
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </div>
        </div>

        <div className='card-body pt-0'>
          <div className='m-0'>
            {countryData?.data &&
              countryData?.data.length > 0 &&
              countryData?.data?.slice(0, 6)?.map((item: any, i: any) => (
                <Fragment key={i}>
                  <div className='d-flex flex-stack'>
                    <img
                      src={`/media/flags/${item.country_code}.svg`}
                      className='me-4 w-25px'
                      style={{ borderRadius: 4 }}
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
                          {
                            item.unique_user_change_percentage < 1 ? (
                              <DecreaseGraph number={Math.abs(item.unique_user_change_percentage) + '%'} />
                            ) : (
                              <IncreaseGraph number={Math.abs(item.unique_user_change_percentage) + '%'} />
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {i < countryData?.data?.slice(0, 6).length - 1 && <div className='separator separator-dashed my-3'></div>}
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryWise
