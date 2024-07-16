import moment from 'moment'
import {FC, useEffect, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {usePageData} from '../../../../_metronic/layout/core'
import {Can} from '../../../../_metronic/redux/ability'
import {
  DASHBOARD_INVENTORY_SUMMARY,
  DASHBOARD_ORDER_SUMMARY,
} from '../../../constants/api.constants'
import {ParallelApiCalling, getQueryRequestParallel} from '../../../library/api.helper'
import {Link} from '../../../modules/helper/linkHandler'
import {numberWithCommas} from '../../../modules/helper/misc'

type IconProps = {
  data: any
  hideSign?: boolean
}

const IconCard: FC<IconProps> = ({data, hideSign}) => {
  return (
    <>
      <Link
        to={data.route}
        className={`card bg-${data?.color} bg-opacity-25 h-100 justify-content-center`}
      >
        <div className='card-body px-5 px-lg-8 flex-grow-0'>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-lg-50px symbol-30px me-3'>
              <div className='symbol-label bg-white'>
                <KTSVG
                  path={data?.icon}
                  className={`svg-icon-1 svg-icon-${data?.color} rotate-180`}
                />
              </div>
            </div>
            <div>
              <div className='fs-4 text-dark fw-bold'>
                {numberWithCommas(data?.body?.number, hideSign)}
              </div>
              <div className='fs-7 fw-bold text-dark'>{data?.body?.title}</div>
              <div className='fs-7 text-gray-700 '>{data?.body?.subtitle}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

const TopStatistics = () => {
  const {datePickerData} = usePageData()

  const [order, setOrder] = useState<any>({
    color: 'primary',
    icon: '/media/icons/duotune/graphs/gra012.svg',
    route: '/orders/index',
    body: {
      number: 0,
      title: 'Order Summary',
      subtitle: 'Today',
    },
  })
  const [sales, setSales] = useState<any>({
    color: 'info',
    icon: '/media/icons/duotune/graphs/gra007.svg',
    route: '/reports/finance/sales/item',
    body: {
      number: 0,
      title: 'Sales Summary',
      subtitle: 'Today',
    },
  })
  const [profit, setProfit] = useState<any>({
    color: 'warning',
    icon: '/media/icons/duotune/finance/fin008.svg',
    route: '/reports/finance/profit-loss',
    body: {
      number: 0,
      title: 'Gross Profit',
      subtitle: 'Today',
    },
  })
  const [inventory, setInventory] = useState<any>({
    color: 'danger',
    icon: '/media/icons/duotune/general/gen032.svg',
    route: '/reports/inventory/summary',
    body: {
      number: 0,
      title: 'Inventory',
      subtitle: 'Stock Value',
    },
  })

  useEffect(() => {
    getData()
  }, [datePickerData])

  const getData = async () => {
    const summary_url = `${DASHBOARD_ORDER_SUMMARY}?subtitle=${
      datePickerData?.selected?.label || 'Today'
    }&start_date=${datePickerData.start_date || moment(new Date()).format('yyyy-MM-DD')}&end_date=${
      datePickerData.end_date || moment(new Date()).format('yyyy-MM-DD')
    }`
    const res: any = await ParallelApiCalling([
      getQueryRequestParallel(summary_url),
      getQueryRequestParallel(DASHBOARD_INVENTORY_SUMMARY),
    ])

    const summaryResponse = res[0]?.data || {}
    const inventoryResponse = res[1]?.data || {}

    if (summaryResponse?.success && summaryResponse.status_code === 200) {
      setOrder({
        ...order,
        body: {
          ...order.body,
          number: summaryResponse?.data['order-summary']?.number || 0,
          subtitle:
            Object.keys(datePickerData).length > 0
              ? datePickerData?.selected?.label ||
                `${moment(datePickerData.start_date).format('MMM DD, YY')} - ${moment(
                  datePickerData.end_date
                ).format('MMM DD, YY')}`
              : 'Today',
        },
      })
      setSales({
        ...sales,
        body: {
          ...sales.body,
          number: summaryResponse?.data['sales-summary']?.number || 0,
          subtitle:
            Object.keys(datePickerData).length > 0
              ? datePickerData?.selected?.label ||
                `${moment(datePickerData.start_date).format('MMM DD, YY')} - ${moment(
                  datePickerData.end_date
                ).format('MMM DD, YY')}`
              : 'Today',
        },
      })
      setProfit({
        ...profit,
        body: {
          ...profit.body,
          number: summaryResponse?.data['profit-summary']?.number || 0,
          subtitle:
            Object.keys(datePickerData).length > 0
              ? datePickerData?.selected?.label ||
                `${moment(datePickerData.start_date).format('MMM DD, YY')} - ${moment(
                  datePickerData.end_date
                ).format('MMM DD, YY')}`
              : 'Today',
        },
      })
    }

    if (inventoryResponse?.success && inventoryResponse?.status_code === 200) {
      setInventory({
        ...inventory,
        body: {
          ...inventory.body,
          number: inventoryResponse?.data['inventory-summary']?.number || 0,
        },
      })
    }
  }

  return (
    <div className='row g-5 mb-5 row-cols-2 row-cols-lg-4 h-lg-100'>
      <Can access='Order Summery' group='dashboard'>
        <div className='col h-100'>
          <IconCard data={order} hideSign={true} />
        </div>
      </Can>
      <Can access='Sales Summary' group='dashboard'>
        <div className='col h-100'>
          <IconCard data={sales} />
        </div>
      </Can>
      <Can access='Gross Profits' group='dashboard'>
        <div className='col h-100'>
          <IconCard data={profit} />
        </div>
      </Can>
      <Can access='Inventory' group='dashboard'>
        <div className='col h-100'>
          <IconCard data={inventory} />
        </div>
      </Can>
    </div>
  )
}

export default TopStatistics
