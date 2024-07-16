import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { KTCard } from '../../../../../_metronic/helpers'
import { THEME_ACTIVE_URL, THEME_INTALL_URL, THEME_URL } from '../../../../constants/api.constants'
import { getQueryRequest, queryRequest } from '../../../../library/api.helper'
import { getAuth } from '../../../../modules/auth'
import LoaderComponent from '../../../../modules/components/loader/LoaderComponent'
import { ErrorMessagesInPage } from '../../../../modules/errors/ErrorMessage'
// import {getThemes} from '../../services/request'
import { useNavigate } from 'react-router-dom'
import ActiveTheme from './ActiveTheme'
import All from './all'

const CurrentTheme = () => {
  const navigate = useNavigate()
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const auth = getAuth()

  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const handleActiveTheme = async (id) => {
    const res = await queryRequest(THEME_ACTIVE_URL, {
      tid: id,
    })
    if (res.success && res.status_code === 200) {
      toast('Theme activated successfully', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      getData()
    } else {
      toast.error('Theme activation failed', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleThemeCustomization = (id) => {
    setBtnLoading(true)
    handleActiveTheme(id)

    setTimeout(function () {
      setBtnLoading(false)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      navigate('/shop/theme')
      // window.location.href = url
    }, 300)
  }

  const handleAdvanceCustomization = (id) => {
    setBtnLoading(true)
    // handleActiveTheme(id)
    let url = `${import.meta.env.VITE_THEME_GUEST_URL}/edit/theme/${id}/${auth?.user?.refresh_token}`

    setTimeout(function () {
      setBtnLoading(false)
      // navigate('/shop/theme')
      window.location.href = url
    }, 300)
  }
  const handleInstallTheme = async (id) => {
    setBtnLoading(true)
    const data = await queryRequest(THEME_INTALL_URL, {
      tid: id,
    })
    if (data.success && data.status_code === 200) {
      toast.success(data.success)
      let url = `${import.meta.env.VITE_THEME_GUEST_URL}/edit/theme/${id}/${auth?.user?.refresh_token}`

      setTimeout(function () {
        setBtnLoading(false)
        window.location.href = url
      }, 3000)
    } else {
      setError(data.message)
    }
  }

  const getData = async () => {
    const data = await getQueryRequest(
      `${THEME_URL}?store_cat_id=${auth?.shop_info?.store_cat_id || 1}`
    )
    if (data?.success && data?.status_code === 200) {
      if (!data?.data[1]) {
        navigate('/theme-store')
        toast.info('Please install a theme', {
          position: 'top-right',
        })
      } else {
        setData(data.data)
      }
    } else {
      setError(data.message)
    }
    setLoading(false)
  }

  if (loading) return <LoaderComponent />
  if (error) return <ErrorMessagesInPage errors={error} />
  if (!data) return <ErrorMessagesInPage errors='Data not found' />

  return (
    <>
      {data[1] && (
        <>
          <div>
            <KTCard>
              <ActiveTheme
                btnLoading={btnLoading}
                themeChange={(id) => handleAdvanceCustomization(id)}
                installTheme={(id) => handleInstallTheme(id)}
                data={data[1] && data[1].filter((f) => f.is_active === 1)}
              />
            </KTCard>
          </div>
          {data[1] &&
            data[1].filter((f) => f.installation_status === 1) &&
            data[1].filter((f) => f.installation_status === 1).length > 0 && (
              <KTCard className='mt-5'>
                <div className='card-header' id='installed-themes'>
                  <h2 className='card-title'>Installed Themes</h2>
                </div>
                <All
                  btnLoading={btnLoading}
                  themeChange={(id) => handleThemeCustomization(id)}
                  installTheme={(id) => handleInstallTheme(id)}
                  data={data[1] && data[1].filter((f) => f.installation_status === 1)}
                />
              </KTCard>
            )}
        </>
      )}
      {/* {data[0] && (
        <KTCard className='mt-5'>
          <div className='card-header'>
            <h2 className='card-title'>Available Themes</h2>
          </div>
          <All
            btnLoading={btnLoading}
            themeChange={(id) => handleThemeCustomization(id)}
            installTheme={(id) => handleInstallTheme(id)}
            data={data[0]}
          />
        </KTCard>
      )} */}
    </>
  )
}

export default CurrentTheme
