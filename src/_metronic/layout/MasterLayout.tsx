import { useEffect, useState } from 'react'
import { Outlet, useLocation, } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RenderNotifications from '../../app/pages/notifications'
import { MenuComponent } from '../assets/ts/components'
import { Content } from './components/Content'
import { Footer } from './components/Footer'
import FullScreen from './components/FullScreen'
import { ScrollTop } from './components/ScrollTop'
import { AsideDefault } from './components/aside/new/AsideDefault'
import { HeaderWrapper } from './components/header/HeaderWrapper'
import { PageDataProvider } from './core'

const MasterLayout = () => {
  const location = useLocation()
  const [isFullscreen, setFullScreen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <FullScreen isEnter={isFullscreen} onChange={setFullScreen}>
        <div className={`${isFullscreen ? 'bg-light' : ''}`}>
          <div className='page d-flex flex-row flex-column-fluid'>
            <AsideDefault />
            <div
              className='wrapper d-flex flex-column flex-row-fluid'
              id='kt_wrapper'
              style={{ height: isFullscreen ? '100vh' : 'auto', overflow: 'auto' }}
            >
              <HeaderWrapper
                isFullscreen={isFullscreen}
                setFullScreen={setFullScreen}
              />

              <div
                id='kt_content'
                className='content d-flex flex-column flex-column-fluid pt-4 pb-0'
              >
                <div className='post d-flex flex-column-fluid' id='kt_post'>
                  <Content>
                    <RenderNotifications />
                    <Outlet />
                  </Content>
                </div>
              </div>
              <Footer />
            </div>
          </div>

          {/* begin:: Modals */}
          {/* <Main />
          
          {/* end:: Modals */}
          <ToastContainer />
          <ScrollTop />
        </div>
      </FullScreen>
    </PageDataProvider>
  )
}

export { MasterLayout }

