/* eslint-disable jsx-a11y/anchor-is-valid */
import {ToastContainer} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {useThemeMode} from '../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import Onboard from './components/onboard'
import OnboardSuccess from './components/success'

const OnboardLayout = () => {
  const {mode} = useThemeMode()
  const url =
    import.meta.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/pricing'
      : 'https://webmanza.com/pricing'

  return (
    <>
      <Helmet>
        <title>Create a store with WebManza</title>
      </Helmet>
      <div
        className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
        style={{
          backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
        }}
      >
        <div className='d-flex flex-column flex-column-fluid p-10 pb-lg-20'>
          <div className='text-center mb-12'>
            <a href={url}>
              {mode === 'dark' ? (
                <img
                  alt='Logo'
                  src={toAbsoluteUrl('/media/logos/Web-Manza-Final-Logo-white.png')}
                  className='h-45px'
                />
              ) : (
                <img
                  alt='Logo'
                  src={toAbsoluteUrl('/media/logos/Web-Manza-Final-Logo.png')}
                  className='h-45px'
                />
              )}
            </a>
          </div>
          <div className='container bg-white rounded-5 shadow-sm p-5 position-relative'>
            <Outlet />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

const StoreOnboard = () => (
  <Routes>
    <Route element={<OnboardLayout />}>
      <Route path='success' element={<OnboardSuccess />} />
      <Route path='/:package' element={<Onboard />} />
      {/* <Route index element={<Onboard />} /> */}
      <Route index element={<Navigate to='/package' />} />
    </Route>
  </Routes>
)

export default StoreOnboard
