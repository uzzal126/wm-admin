import {BlogDataTableFilter} from './BlogDataTableFilter'
import {DatatableSearchComponent} from './header/DatatableSearchComponent'

const TableHeader = () => {
  return (
    <>
      <DatatableSearchComponent />
      <div className='card-toolbar'>
        <BlogDataTableFilter />
      </div>
    </>
  )
}

export {TableHeader}
