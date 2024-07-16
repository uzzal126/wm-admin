import {KTCard, KTCardBody} from '../../../../_metronic/helpers'

import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'
import {DatatableFilter} from './table/toolbar/DataTableFilter'

const StoreList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 10px;'
  document.body.setAttribute('style', bodyStyles)

  return (
    <div className='container mb-10'>
      <KTCard>
        <div className='card-header'>
          <TableHeader />
          <div className='card-title'>
            <DatatableFilter />
          </div>
        </div>
        <KTCardBody>
          <DataTable />
        </KTCardBody>
      </KTCard>
    </div>
  )
}

const StoreSwitch = () => {
  return (
    <QueryRequestProvider>
      <QueryResponseProvider>
        <ListViewProvider>
          <StoreList />
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export default StoreSwitch
