import {useEffect, useState} from 'react'
import {Navigate, Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {PageTitle} from '../../../_metronic/layout/core'
import {useAbility} from '../../../_metronic/redux/ability'
import {
  GET_MARKETING_TOOLS,
  POST_INSTALL_TOOLS,
  POST_UNINSTALL_TOOLS,
} from '../../constants/api.constants'
import {useMarketingTools} from '../../hooks/useMarketingTools'
import {getQueryRequest, queryRequest} from '../../library/api.helper'
import LoaderComponent from '../../modules/components/loader/LoaderComponent'
import HorizontalTabStyle from '../../modules/components/tab/HorizontalTabStyle'
import {ErrorMessagesInPage} from '../../modules/errors/ErrorMessage'
import Campaigns from './campaigns'
import CampaignProducts from './campaigns/products'
import CourierRouter from './coorier'
import DropshipIndex from './dropship'
import PaymentGateways from './payment'
import PluginDetailsPage from './plugin-details'
import Marketing from './root'
import SMSGateway from './sms-gateway'

const PageBack = [
  {
    title: 'Back Marketing',
    path: '/plugins',
  },
]

const tabData = [
  {
    id: 101,
    label: 'One',
    slug: 'one',
    cat_id: 1,
    icon: '',
  },
  {
    id: 102,
    label: 'Two',
    slug: 'two',
    cat_id: 1,
    icon: '',
  },
  {
    id: 103,
    label: 'Three',
    slug: 'three',
    cat_id: 2,
    icon: '',
  },
  {
    id: 104,
    label: 'Four',
    slug: 'four',
    cat_id: 2,
    icon: '',
  },
]

const PluginsgPage = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 15px;'
  document.body.setAttribute('style', bodyStyles)

  const [campTools, setCampaignTools] = useState([])
  const {updateMarketingTools} = useMarketingTools()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [selected, setSelected] = useState(tabData[0]?.slug)

  const handleTabSelect = (tabSlug) => {
    setSelected(tabSlug)
  }

  const {ability} = useAbility()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await getQueryRequest(GET_MARKETING_TOOLS)
    if (res.success && res.status_code === 200) {
      setCampaignTools(res.data)
      updateMarketingTools(res.data || [])
      setLoading(false)
      setError('')
    } else {
      setLoading(false)
      setError(res.message)
    }
  }

  const refatch = (data) => {
    setCampaignTools(data)
    updateMarketingTools(data || [])
  }

  const handleOnInstall = async (e) => {
    swal({
      title: 'Are you sure?',
      text: `Do you want to install ${e.title} tools`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await queryRequest(POST_INSTALL_TOOLS, {tool_id: e.id})
        if (res.success && res.status_code === 200) {
          setCampaignTools(res.data)
          updateMarketingTools(res.data || [])
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  const uninstallTools = async (item) => {
    swal({
      title: 'Are you sure?',
      text: `Do you want to Uninstall '${item.title}' tools`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        const res = await queryRequest(POST_UNINSTALL_TOOLS, {
          tool_id: item.id,
        })

        if (res.success && res.status_code === 200) {
          refatch(res.data)
          navigate(`/plugins`)
          toast.success('Uninstall successfully')
        } else {
          toast.error(res.message)
        }
      }
    })
  }
  if (loading) return <LoaderComponent />
  if (error) return <ErrorMessagesInPage errors={error} />

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          index
          path='/'
          element={
            <>
              <PageTitle>Plugins</PageTitle>

              <div className='plugins-list-wrapper'>
                <div className='mb-5'>
                  <HorizontalTabStyle
                    tabData={tabData}
                    selected={selected}
                    onSelect={handleTabSelect}
                  />
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <Marketing
                      campTools={campTools}
                      refatch={refatch}
                      handleOnInstall={(e) => handleOnInstall(e)}
                    />
                  </div>
                </div>
              </div>
            </>
          }
        />
        {campTools &&
          campTools.length > 0 &&
          campTools.map(
            (camp, i) =>
              camp.installation_status &&
              !camp.popup &&
              ability(camp.route, 'marketing') && (
                <Route
                  key={i}
                  path={camp.route + '/*'}
                  element={
                    <>
                      <PageTitle backLink={PageBack}>
                        {camp.title}
                        <label className='form-check form-switch form-check-custom form-check-solid ms-2'>
                          <input
                            className='form-check-input h-25px w-50px'
                            type='checkbox'
                            checked={camp?.installation_status === 1 ? true : false}
                            onChange={(e) => uninstallTools(camp)}
                          />
                        </label>
                      </PageTitle>
                      {camp.route === 'sms-gateway' && <SMSGateway />}
                      {camp.route === 'courier' && (
                        <CourierRouter courier={camp} uninstallTools={uninstallTools} />
                      )}
                      {camp.route === 'payment-gateway' && <PaymentGateways />}
                    </>
                  }
                />
              )
          )}
        <Route
          path='/campaign/:group_id'
          element={
            <>
              <Campaigns />
            </>
          }
        />
        <Route
          path='/campaign/:group_id/products/:id'
          element={
            <>
              <CampaignProducts />
            </>
          }
        />
        <Route
          path='/dropship/*'
          element={
            <>
              <DropshipIndex />
            </>
          }
        />
        <Route
          path='/:id'
          element={
            <>
              <PluginDetailsPage />
            </>
          }
        />
        <Route
          path='/*'
          element={
            <>
              <PageTitle backLink={PageBack}>Page not Found</PageTitle>
              <ErrorMessagesInPage errors='' />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/plugins/index' />} />
    </Routes>
  )
}
export default PluginsgPage
