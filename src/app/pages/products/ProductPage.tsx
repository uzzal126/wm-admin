import {useSelector} from 'react-redux'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {BackLink, PageTitle} from '../../../_metronic/layout/core'
import {RootState} from '../../../_metronic/redux/store'
import {ErrorMessagesInPage} from '../../modules/errors/ErrorMessage'
import {ManageCategory} from './category/ManageCategory'
import ManageStock from './manageStock'
import {AddNewProduct} from './mutations/add-product/AddProduct'
import {EditProduct} from './mutations/edit/EditProduct'
import {ManageVariant} from './mutations/varient/ManageVarient'
import {ProductListWrapper} from './product-list/ProductListWrapper'

export const PageBack: Array<BackLink> = [
  {
    title: 'Back Products',
    path: '/products/index',
  },
]

const ProductPage = () => {
  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )
  const {data}: any = response || {}
  const {data: userPermission} = data || []
  let productItems =
    (userPermission && userPermission.filter((f: any) => f.group_route.includes('products'))) || []
  productItems = productItems.length > 0 ? productItems[0] : {}

  const productRoutes =
    Object.keys(productItems).length > 0
      ? productItems.permissions.filter((f: any) => f.route !== '')
      : []

  return (
    <Routes>
      {productRoutes.length > 0 && (
        <Route element={<Outlet />}>
          {productRoutes.find((f: any) => f.route.includes('index')) && (
            <Route
              path='index'
              element={
                <>
                  <PageTitle>Product list</PageTitle>
                  <ProductListWrapper />
                </>
              }
            />
          )}
          {productRoutes.find((f: any) => f.route.includes('add')) && (
            <Route
              path='add'
              element={
                <>
                  <PageTitle backLink={PageBack}>Add New Product</PageTitle>
                  <AddNewProduct />
                </>
              }
            />
          )}
          {productRoutes.find((f: any) => f.route.includes('edit')) && (
            <Route
              path='edit/:id'
              element={
                <>
                  <PageTitle backLink={PageBack}>Edit Product</PageTitle>
                  <EditProduct />
                </>
              }
            />
          )}
          {productRoutes.find((f: any) => f.route.includes('stock')) && (
            <Route
              path='stock/:pid'
              element={
                <>
                  <ManageStock />
                </>
              }
            />
          )}
          {productRoutes.find((f: any) => f.route.includes('category')) && (
            <Route
              path='category'
              element={
                <>
                  <PageTitle backLink={PageBack}>Categories</PageTitle>
                  <ManageCategory />
                </>
              }
            />
          )}
          {productRoutes.find((f: any) => f.route.includes('variable')) && (
            <Route
              path='variable/:id'
              element={
                <>
                  <PageTitle backLink={PageBack}>Manage Variant</PageTitle>
                  <ManageVariant />
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
      <Route index element={<Navigate to='/products/index' />} />
    </Routes>
  )
}

export default ProductPage
