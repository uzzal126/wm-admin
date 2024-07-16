import moment from 'moment'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {usePageData} from '../../../../_metronic/layout/core'
import DateRangeMaker from '../../../../_metronic/partials/content/forms/dateRangePicker'
import {Can} from '../../../../_metronic/redux/ability'
import {useAuth} from '../../../modules/auth'
import RegionWise from '../../reports/visitor/components/regionWise'
import CountryWiseReport from '../../reports/visitor/country'
import VisitorByDevice from '../../reports/visitor/device'
import VisitorByPage from '../../reports/visitor/page'
import BlogQuickComponents from './BlogQuickComponents'
import LowStock from './lowStock'
import NotSale from './notSale'
import OrderGraph from './orderGraph'
import StatusGraph from './statusGraph'
import TopSale from './topSale'
import TopStatistics from './topStatistics'
import VisitorInfo from './visitor'

const DashboardContents = () => {
  const {setdatePickerData} = usePageData()
  const {auth} = useAuth()
  const {data} = useSelector((state) => state.api.queries['getUserPermissions(undefined)'])
  const [date, setDate] = useState({
    start_date: moment(new Date()).format('yyyy-MM-DD'),
    end_date: moment(new Date()).format('yyyy-MM-DD'),
    selected: {
      label: 'Today',
      custom: false,
    },
  })
  const {data: userPermission} = data || []
  const findDashboard =
    userPermission &&
    userPermission.length > 0 &&
    userPermission.find((f) => f.group_route.includes('dashboard'))
  const isStatics =
    findDashboard &&
    findDashboard?.permissions &&
    findDashboard?.permissions.length > 0 &&
    findDashboard?.permissions.find(
      (f) =>
        f.name.includes('Order Summery') ||
        f.name.includes('Sales Summary') ||
        f.name.includes('Inventory') ||
        f.name.includes('Gross Profits')
    )

  return (
    <>
      <div className='1d-block d-lg-none p-3 bg-white mb-3'>
        <div className='position-relative' id='date-range-ref'>
          <DateRangeMaker hideTitle={true} onChange={(e) => setdatePickerData(e)} />
        </div>
      </div>
      <div className='d-flex flex-column flex-column-fluid'>
        <div className='app-content flex-column-fluid'>
          <div className='row mb-5'>
            {isStatics && auth?.shop_info?.store_cat_id !== 20 && (
              <div className='col-lg-8'>
                <TopStatistics />
              </div>
            )}
            {auth?.shop_info?.store_cat_id === 20 && (
              <div className='col-lg-12 mt-3 mb-3'>
                <BlogQuickComponents />
              </div>
            )}
            <Can access='Visitor Report' group='dashboard'>
              <div className={isStatics ? 'col-lg-4' : 'col-lg-12'}>
                <VisitorInfo isStatics={isStatics} />
              </div>
            </Can>
          </div>
          <div className='row g-5 mb-5'>
            <Can access='Order History' group='dashboard'>
              <div className='col-lg-8'>
                <OrderGraph />
              </div>
            </Can>
            <Can access='Order by Status' group='dashboard'>
              <div className='col-lg-4'>
                <StatusGraph />
              </div>
            </Can>
          </div>
          <div className='row g-5 mb-5'>
            <div className='col-lg-12'>
              <div className='row row-cols-1 row-cols-lg-3'>
                <Can access='Top Selling Product' group='dashboard'>
                  <div className='col'>
                    <TopSale />
                  </div>
                </Can>
                <Can access='Not Selling Product' group='dashboard'>
                  <div className='col'>
                    <NotSale />
                  </div>
                </Can>
                <Can access='Low Stock' group='dashboard'>
                  <div className='col'>
                    <LowStock />
                  </div>
                </Can>
              </div>
              <div className='my-5 row'>
                <Can access='Visitor Report' group='dashboard'>
                  <div className={'col-lg-6'}>
                    <div className='my-2'>
                      <VisitorByPage hideTitle />
                    </div>
                  </div>
                  <div className={'col-lg-6'}>
                    <div className='my-2'>
                      <RegionWise date={date} />
                    </div>
                  </div>
                </Can>
              </div>
              <div className='row my-2'>
                <div className='my-2'>
                  <CountryWiseReport hideTitle />
                </div>
                <div className='my-2'>
                  <VisitorByDevice hideTitle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardContents
