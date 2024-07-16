import { useListView } from '../core/ListViewProvider'
import { DatableGrouping } from './header/DatatableGrouping'
import { DatatableSearchComponent } from './header/DatatableSearchComponent'
import {DatatableToolbar} from './toolber/DatatableToolbar'

const TableHeader = () => {
  const {selected} = useListView()
  return (
    <>
      <DatatableSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <DatableGrouping /> : <DatatableToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </>
  )
}

export {TableHeader}
