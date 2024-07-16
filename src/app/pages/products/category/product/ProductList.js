import {useEffect} from 'react'
import {KTCard} from '../../../../../_metronic/helpers'
import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ProdutDataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'

const ProductListWrapper = ({category}) => {
  const {clearSelected} = useListView()

  useEffect(() => {
    clearSelected()
  }, [category])

  return (
    <>
      <TableHeader category={category} />
      <KTCard>
        <ProdutDataTable category={category} />
      </KTCard>
    </>
  )
}

const ProductList = ({category}) => (
  <QueryRequestProvider>
    <QueryResponseProvider category={category}>
      <ListViewProvider>
        <ProductListWrapper category={category} />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ProductList}
