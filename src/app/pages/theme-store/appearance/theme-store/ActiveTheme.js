import {Can} from '../../../../../_metronic/redux/ability'
import {betterParse} from '../../../../modules/helper/misc'
import BasicCustomization from '../customization'

const ActiveTheme = ({data, themeChange, btnLoading}) => {
  let features = []
  let screen_shot = []
  if (data && data.length > 0) {
    data = data[0]
    features = betterParse(data?.feature_list)
    screen_shot = betterParse(data?.screen_shot)
  }

  return (
    data &&
    Object.keys(data).length > 0 && (
      <>
        <div className='card-header'>
          <div className='card-title'>
            Active Theme <i className='ms-2 text-success fs-2x fas fa-check-circle'></i>
          </div>
          <div className='card-toolbar'>
            <div className='theme-action'>
              <div className='d-flex'>
                <a href={data.live_link || ''} className='btn btn-sm btn-info me-4'>
                  Live Demo
                </a>
                <Can access='Theme Customize' group='shop'>
                  <button
                    onClick={() => themeChange(data?.tid)}
                    className='btn btn-sm btn-primary'
                    disabled={btnLoading ? true : false}
                  >
                    {!btnLoading && <span className='indicator-label'>Advance Customize</span>}
                    {btnLoading && (
                      <span className='indicator-progress d-block'>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </Can>
              </div>
            </div>
          </div>
        </div>
        <div className='card-body'>
          <div className='row g-8 flex-row-reverse'>
            <div className='col-lg-6 '>
              {/* END */}
              <BasicCustomization data={data} />
            </div>
            <div className='col-lg-6'>
              <div className='row'>
                <div className='col'>
                  <div
                    className='theme scroll-window custom-430 p-2 shadow rounded-3'
                    style={{height: '450px', maxWidth: '430px'}}
                  >
                    <div className='theme-img p-0'>
                      <img src={screen_shot?.desktop_view} alt='' className='img-fluid' />
                    </div>
                  </div>
                  <div className='theme-ac-text ms-8 mt-3'>
                    <h2 className='fs-4'>{data?.tittle}</h2>
                    <p className='fs-6'>Price: {data?.payment_type}</p>
                    <h3>{features?.tittle}</h3>
                    <ul className='list-group-flush ps-0 row row-cols-1 row-cols-lg-2 text-capitalize'>
                      {features &&
                        Object.keys(features?.data).length > 0 &&
                        Object.keys(features?.data).map((item, i) => (
                          <li className='list-group-item' key={i}>
                            <i className='fas fa-check me-3 text-success'></i>{' '}
                            {features?.data[item]}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default ActiveTheme
