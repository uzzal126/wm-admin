import {DatatableSearchComponent} from './header/DatatableSearchComponent'
import {DatatableToolbar} from './toolber/DatatableToolbar'

const TableHeader = () => {
  return (
    <>
      <DatatableSearchComponent />
      <div className='card-toolbar'>
        <DatatableToolbar />
      </div>
    </>
  )
}

export {TableHeader}
