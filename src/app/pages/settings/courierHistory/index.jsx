import {KTCard} from '../../../../_metronic/helpers'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DataTable} from './table/DataTable'

const Report = () => {
  return (
    <>
      <KTCard>
        <DataTable />
      </KTCard>
    </>
  )
}

const CourierHistory = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <Report />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CourierHistory}
