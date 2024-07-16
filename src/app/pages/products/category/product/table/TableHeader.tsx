import {useListView} from '../core/ListViewProvider'
import {DatableGrouping} from './header/DatatableGrouping.js'
import {DatatableToolbar} from './toolber/DatatableToolbar.js'

const TableHeader = ({category}: any) => {
  const {selected} = useListView()
  return (
    <div className='d-flex flex-stack flex-wrap mb-5'>
      {/* <DatatableSearchComponent /> */}
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? (
          <DatableGrouping category={category} />
        ) : (
          <DatatableToolbar category={category} />
        )}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {TableHeader}
