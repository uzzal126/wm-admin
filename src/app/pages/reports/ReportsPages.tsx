import { Navigate, Route, Routes } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { useAbility } from '../../../_metronic/redux/ability'
import { ErrorMessagesInPage } from '../../modules/errors/ErrorMessage'
import SalesItemView from './finance/SalesByItem/itemview'
import { reportMenus } from './helper/navbar'
import ReportLayout from './reportLayout'
import CountryWiseReport from './visitor/country'

const ReportPages = () => {
  const { ability, navigate } = useAbility()

  return (
    <Routes>
      <Route>
        {reportMenus &&
          reportMenus.length > 0 &&
          reportMenus.map(
            (item) =>
              item.children &&
              item.children.length > 0 &&
              item.children.map(
                (child, i) =>
                  ability(child.route, 'reports') && (
                    <Route
                      key={i}
                      path={child.route}
                      element={
                        <>
                          <PageTitle>
                            {item.label} / <span className='text-primary ms-2'> {child.label}</span>
                          </PageTitle>
                          <ReportLayout />
                        </>
                      }
                    />
                  )
              )
          )}
        <Route
          path='/finance/sales/item/:prod_id'
          element={
            <>
              <SalesItemView />
            </>
          }
        />
        <Route
          path='/finance/sales/item/:prod_id/:variant'
          element={
            <>
              <SalesItemView />
            </>
          }
        />
        <Route
          path='/analytics/visitors/countries'
          element={
            <>
              <CountryWiseReport />
            </>
          }
        />
        <Route
          path='/analytics/visitors/countries/:params'
          element={
            <>
              <CountryWiseReport />
            </>
          }
        />
        <Route
          path='/*'
          element={
            <>
              <PageTitle>Page not Found</PageTitle>
              <ErrorMessagesInPage errors='' />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to={navigate('reports')} />} />
    </Routes>
  )
}

export default ReportPages
