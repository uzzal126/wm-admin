import {useParams} from 'react-router-dom'
import {KTCard} from '../../../../../_metronic/helpers'
import {reportMenus} from '../../helper/navbar'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider, useQueryRequest} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DataTable} from './table/DataTable'
import {DatatableToolbar} from './table/toolber/DatatableToolbar'

const Report = () => {
  let params = useParams()
  const {state} = useQueryRequest()
  let menu = reportMenus && reportMenus.length > 0 && reportMenus[0]
  let menuItem = menu.children.filter((f) => f.route === params['*'])

  return (
    <>
      <KTCard>
        <div className='card-header mt-5 min-h-40px'>
          <div className='card-title flex-column'>
            <h3 className='fw-bolder mb-1'>
              {menuItem && menuItem.length > 0 && menuItem[0].label} (
              {state.filter && state.filter.label ? state.filter.label : 'Today'})
            </h3>
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

const SalesByPerson = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <Report />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {SalesByPerson}
