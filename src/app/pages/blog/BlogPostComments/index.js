import {KTCard} from '../../../../_metronic/helpers'
import CommentSection from './components/CommentSection'
import PostSection from './components/PostSection'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'

const profileBreadCrumbs = [
  {
    title: 'Add Blog Post',
    path: '/blogs/add',
    activeClasses: '',
    classes: 'btn-light-primary',
    icon: 'fas fa-plus',
    modal: false,
    isActive: false,
    access: null,
    group: 'products',
  },
]

const BlogPostComments = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  return (
    <>
      {/* <PageToolbar breadcrumbs={profileBreadCrumbs} onChange={() => {}}></PageToolbar> */}
      <PostSection />
      <KTCard>
        <div className='p-6  rounded-3'>
          <CommentSection />
        </div>
      </KTCard>
    </>
  )
}

const CommentsWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <BlogPostComments />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CommentsWrapper}
