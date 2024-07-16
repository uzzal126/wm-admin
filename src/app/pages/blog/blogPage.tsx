import {useSelector} from 'react-redux'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {BackLink, PageTitle} from '../../../_metronic/layout/core'
import {RootState} from '../../../_metronic/redux/store'
import {ErrorMessagesInPage} from '../../modules/errors/ErrorMessage'
import {CommentsWrapper} from './BlogPostComments'
import PostAddEdit from './mutations/addEdit'
import {BlogWrapper} from './product-list'

export const PageBack: Array<BackLink> = [
  {
    title: 'Back Blogs',
    path: '/blogs/index',
  },
]

const Blogs = () => {
  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )
  const {data}: any = response || {}
  const {data: userPermission} = data || []
  let productItems =
    (userPermission && userPermission.filter((f: any) => f.group_route.includes('blogs'))) || []
  productItems = productItems.length > 0 ? productItems[0] : {}

  const productRoutes =
    Object.keys(productItems).length > 0
      ? productItems.permissions.filter((f: any) => f.route !== '')
      : []

  return (
    <Routes>
      {productRoutes.length > 0 && (
        <Route element={<Outlet />}>
          <Route
            path='index'
            element={
              <>
                <PageTitle>Blog list</PageTitle>
                <BlogWrapper />
              </>
            }
          />
          <Route
            path='add'
            element={
              <>
                <PageTitle backLink={PageBack}>Add New Blog Post</PageTitle>
                <PostAddEdit />
              </>
            }
          />
          {productRoutes.find((f: any) => f.route.includes('edit')) && (
            <Route
              path='edit/:slug'
              element={
                <>
                  <PageTitle backLink={PageBack}>Edit Blog Post</PageTitle>
                  <PostAddEdit />
                </>
              }
            />
          )}
          {productRoutes.find((f: any) => f.route.includes('edit')) && (
            <Route
              path=':slug/comments'
              element={
                <>
                  <PageTitle backLink={PageBack}>Comments</PageTitle>
                  <CommentsWrapper />
                </>
              }
            />
          )}
        </Route>
      )}
      <Route
        path='/*'
        element={
          <>
            <PageTitle backLink={PageBack}>Page not Found</PageTitle>
            <ErrorMessagesInPage errors='' />
          </>
        }
      />
      <Route index element={<Navigate to='/blogs/index' />} />
    </Routes>
  )
}

export default Blogs
