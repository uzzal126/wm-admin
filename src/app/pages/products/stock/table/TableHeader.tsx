import {useListView} from '../core/ListViewProvider'
import {DatatableSearchComponent} from './header/DatatableSearchComponent'

const TableHeader = () => {
  const {selected} = useListView()
  return (
    <>
      <DatatableSearchComponent />
    </>
  )
}

export {TableHeader}
