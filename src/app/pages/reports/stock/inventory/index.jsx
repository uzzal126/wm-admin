import {useParams} from 'react-router-dom'
import {KTCard} from '../../../../../_metronic/helpers'
import {numberWithCommas} from '../../../../modules/helper/misc'
import {reportMenus} from '../../helper/navbar'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider, useQueryResponseSummary} from './core/QueryResponseProvider'
import {DataTable} from './table/DataTable'
import {DatatableToolbar} from './table/toolber/DatatableToolbar'

const Report = () => {
  const data = useQueryResponseSummary()

  let params = useParams()
  let menu = reportMenus && reportMenus.length > 0 && reportMenus[1]
  let menuItem = menu.children.filter((f) => f.route === params['*'])

  return (
    <>
      <KTCard>
        <div className='card-header mt-5 min-h-40px'>
          <div className='card-title flex-column'>
            <h3 className='fw-bolder mb-1'>
              {menuItem && menuItem.length > 0 && menuItem[0].label}
            </h3>
            <div className='d-flex flex-column gap-3'>
              <div className='fs-7 rounded shadow-sm border px-2 py-1'>
                <strong className='text-muted d-inline-block min-w-175px'>Total Added :</strong>
                <span className='text-end min-w-80px d-inline-block'>
                  {numberWithCommas(data?.total_added || 0, true)}
                </span>
              </div>
              <div className='fs-7 rounded shadow-sm border px-2 py-1'>
                <strong className='text-muted d-inline-block min-w-175px'>Total Committed :</strong>
                <span className='text-end min-w-80px d-inline-block'>
                  {numberWithCommas(data?.committed || 0, true)}
                </span>
              </div>
              <div className='fs-7 rounded fw-bold shadow-sm border px-2 py-1'>
                <strong className=' d-inline-block text-muted min-w-175px'>Total Sold :</strong>
                <span className='text-end min-w-80px d-inline-block'>
                  {numberWithCommas(data?.sold || 0, true)}
                </span>
              </div>
              <div className='fs-7 rounded shadow-sm border px-2 py-1'>
                <strong className='text-muted d-inline-block min-w-175px'>Total Available :</strong>
                <span className='text-end min-w-80px d-inline-block'>
                  {numberWithCommas(data?.in_stock || 0, true)}
                </span>
              </div>

              <div className='fs-7 rounded shadow-sm border px-2 py-1'>
                <strong className='text-muted d-inline-block min-w-175px'>
                  Inventory Stock Value :
                </strong>
                <span className='text-end min-w-80px d-inline-block'>
                  {numberWithCommas(data?.inventory || 0)}
                </span>
              </div>
            </div>
          </div>
          <div className='card-toolbar align-items-baseline'>
            <DatatableToolbar />
          </div>
        </div>
        <DataTable />
      </KTCard>
    </>
  )
}

const InventoryReport = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <Report />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {InventoryReport}
