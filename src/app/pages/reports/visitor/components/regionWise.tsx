import {useState} from 'react'
import CountrySelect from '../../../../../_metronic/partials/content/forms/country'
import {useCityWiseQuery} from '../../../../../_metronic/redux/slices/visitor'
import {timeFormatter} from '../../../../modules/helper/misc'

const colors = ['danger', 'success', 'info', 'warning', 'primary']

const RegionWise = ({date}: {date: any}) => {
  const [country, setCountry] = useState<any>({code: 'BD'})
  const [page, setPage] = useState(10)

  const {data: cityData} = useCityWiseQuery(
    `?start_date=${date.start_date}&end_date=${date.end_date}&country_code=${country.code}`
  )

  return (
    <div className='mb-5'>
      <div className='card card-flush h-xl-100'>
        <div className='card-header pt-7 mb-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold text-gray-800'>Visits by City</span>
            <span className='text-gray-400 mt-1 fw-semibold fs-6'>
              {cityData && cityData?.data && cityData?.data.length} Cities
            </span>
          </h3>

          <div className='card-toolbar'>
            <div className='min-w-200px'>
              <CountrySelect onChange={(e) => setCountry(e)} code={country.code} />
            </div>
          </div>
        </div>

        <div className='card-body pt-0'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle'>
              <thead>
                <tr className='fw-bold fs-6 text-gray-800'>
                  <th>Name</th>
                  <th className='text-center'>Unique Visitors</th>
                  <th className='text-center'>Number Of Page View</th>
                  <th className='text-center'>Avg. Session</th>
                </tr>
              </thead>
              <tbody>
                {cityData &&
                  cityData?.data &&
                  cityData?.data.length > 0 &&
                  cityData?.data?.slice(0, page).map((item: any, i: number) => {
                    let clr = colors[Math.floor(Math.random() * colors.length)]
                    return (
                      <tr key={i}>
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='symbol symbol-30px me-4'>
                              <div
                                className={`symbol-label fs-2 fw-semibold bg-${clr} text-inverse-${clr}`}
                              >
                                {item.city?.slice(0, 1)}
                              </div>
                            </div>
                            <div className='me-5'>
                              <span className='text-gray-800 fw-bold text-hover-primary fs-6'>
                                {item.city}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='text-center'>{item.total_unique_user}</td>
                        <td className='text-center'>{item.page_count}</td>
                        <td className='text-center'>{timeFormatter(item.avg_page_session_time)}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            {cityData?.data.length > page && (
              <div className='text-center'>
                <button
                  className='btn btn-sm btn-light-primary'
                  onClick={() =>
                    setPage(cityData?.data.length < page + 20 ? cityData?.data.length : page + 20)
                  }
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegionWise
