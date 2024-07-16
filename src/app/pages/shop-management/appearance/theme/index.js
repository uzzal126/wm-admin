import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { KTCard } from '../../../../../_metronic/helpers'
import { THEME_INTALL_URL, THEME_URL } from '../../../../constants/api.constants'
import { getQueryRequest, queryRequest } from '../../../../library/api.helper'
import { getAuth } from '../../../../modules/auth'
import LoaderComponent from '../../../../modules/components/loader/LoaderComponent'
import { ErrorMessagesInPage } from '../../../../modules/errors/ErrorMessage'
// import {getThemes} from '../../services/request'
import { useNavigate } from 'react-router-dom'
import All from './all'

const ThemePage = () => {
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

  const handleThemeCustomization = (id) => {
    setBtnLoading(true)

    setTimeout(function () {
      setBtnLoading(false)
      navigate('/shop/theme')
      // window.location.href = url
    }, 300)
  }
  const handleInstallTheme = async (id) => {
    setBtnLoading(true)
    const data = await queryRequest(THEME_INTALL_URL, {
      tid: id,
    })
    if (data.success && data.status_code === 200) {
      toast.success(data.success)

      setTimeout(function () {
        setBtnLoading(false)
        navigate('/shop/theme')
      }, 3000)
    } else {
      setError(data.message)
    }
  }

  const getData = async () => {
    const data = await getQueryRequest(
      `${THEME_URL}?store_cat_id=${auth?.shop_info?.store_cat_id || 1}`
    )
    if (data.success && data.status_code === 200) {
      setData(data.data)
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
      {/* {data[1] && (
        <>
          <KTCard>
            <ActiveTheme
              btnLoading={btnLoading}
              themeChange={(id) => handleThemeCustomization(id)}
              installTheme={(id) => handleInstallTheme(id)}
              data={data[1] && data[1].filter((f) => f.is_active === 1)}
            />
          </KTCard>
          {data[1] &&
            data[1].filter((f) => f.installation_status === 1) &&
            data[1].filter((f) => f.installation_status === 1).length > 0 && (
              <KTCard className='mt-5'>
                <div className='card-header'>
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
      )} */}
      {data[0] && (
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
      )}
    </>
  )
}

export default ThemePage
