import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {THEME_CAT_URL, THEME_INTALL_URL, THEME_URL} from '../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../library/api.helper'
import {getAuth} from '../../../../modules/auth'
import LoaderComponent from '../../../../modules/components/loader/LoaderComponent'
import {ErrorMessagesInPage} from '../../../../modules/errors/ErrorMessage'
// import {getThemes} from '../../services/request'
import {Collapse} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import {useNavigate} from 'react-router-dom'
import {KTCard} from '../../../../../_metronic/helpers'
import All from './all'
import ThemeFilter from './ThemeFilter'
import ThemeFilterInstalled from './ThemeFilterInstalled'
import ThemeFilterWithPricing from './ThemeFilterWithPricing'

const AllThemes = () => {
  const navigate = useNavigate()
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const auth = getAuth()

  const [data, setData] = useState([])
  const [catData, setCatData] = useState(null)
  const [error, setError] = useState('')
  const [installCount, setInstallCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)

  const [selected, setSelected] = useState({
    id: auth?.shop_info?.store_cat_id === 20 ? 20 : 2121,
    slug: 'all',
    label: 'All',
    totalTheme:
      auth?.shop_info?.store_cat_id !== 20
        ? catData?.data?.filter((item) => item?.store_cat_id !== 20)?.length
        : catData?.total,
  })
  const [themeType, setThemeType] = useState('')
  const [open, setOpen] = useState(true)
  const [installationStatus, setInstallationStatus] = useState(null)

  const [screenSize, setScreenSize] = useState({
    width: window.screen.width,
    height: window.screen.height,
  })

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenSize({
        width: window.screen.width,
        height: window.screen.height,
      })
    }

    if (screenSize.width < 992) {
      setOpen(false)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const handleCatSelect = (cat) => {
    setSelected(cat)
    setInstallationStatus(null)
  }

  const handleThemeType = (selectValue) => {
    setThemeType(selectValue)
  }

  const themeTypeFilterResetHandler = () => {
    setThemeType('')
  }

  const themeFilterResetHandler = () => {
    setSelected({
      id: auth?.shop_info?.store_cat_id === 20 ? 20 : 2121,
      slug: 'all',
      label: 'All',
      totalTheme:
        auth?.shop_info?.store_cat_id !== 20
          ? catData?.data?.filter((item) => item?.store_cat_id !== 20)?.length
          : catData.total,
    })
  }

  const handleStatusSelect = (stat) => {
    setInstallationStatus(stat)
    setThemeType('')
    themeFilterResetHandler()
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    if (selected?.id === 2121) {
      getData()
    } else if (selected?.id !== 2121) {
      getData(selected?.id)
    }
    getCatData()
  }, [selected.id, themeType, installationStatus])

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

  const getCatData = async () => {
    const catData = await getQueryRequest(`${THEME_CAT_URL}`)
    if (catData.success && catData.status_code === 200) {
      setCatData([
        {
          id: 2121,
          slug: 'all',
          label: 'All',
          totalTheme:
            auth?.shop_info?.store_cat_id !== 20
              ? catData?.data?.filter((item) => item?.store_cat_id !== 20)?.length
              : catData.total,
        },
        ...catData.data?.map((item) => {
          return {
            id: item?.store_category_id,
            slug: item?.business_type,
            label: item?.display_name,
            totalTheme: item?.total_theme,
          }
        }),
      ])
    }
  }

  const getData = async (id = null) => {
    setLoading(true)
    const data = await getQueryRequest(`${THEME_URL}${id ? `?store_cat_id=${id}` : ''}`)
    if (data.success && data.status_code === 200) {
      if (data.data[0] && data.data[1]) {
        if (auth?.shop_info?.store_cat_id !== 20) {
          setData([
            ...data.data[0]?.filter((item) => item?.store_cat_id !== 20),
            ...data.data[1]?.filter((item) => item?.store_cat_id !== 20),
          ])
        } else {
          setData([...data.data[0], ...data.data[1]])
        }
        if (!id) {
          setInstallCount(data.data[1]?.length)
        }
      } else if (data.data[1] && !data.data[0]) {
        if (auth?.shop_info?.store_cat_id !== 20) {
          setData([...data.data[1]])?.filter((item) => item?.store_cat_id !== 20)
        } else {
          setData([...data.data[1]])
        }
      } else if (!data.data[1] && data.data[0]) {
        if (auth?.shop_info?.store_cat_id !== 20) {
          setData([...data.data[0]])?.filter((item) => item?.store_cat_id !== 20)
        } else {
          setData([...data.data[0]])
        }
      }
    } else {
      setError(data.message)
    }
    setLoading(false)
  }

  // if (loading) return <LoaderComponent />
  if (error) {
    return (
      <ErrorMessagesInPage
        errors={error}
        btn={{
          text: 'Theme Store',
          url: '/theme-store',
          isRefresh: true,
        }}
      />
    )
  }
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

      {data && (
        <div className='row'>
          <div className='col-lg-3'>
            <div className='d-block d-lg-none'>
              <button
                className='d-flex justify-content-between w-100 bg-white rounded-3 px-5 py-5 border-0 mb-5'
                onClick={() => setOpen(!open)}
                aria-controls='example-collapse-text'
                aria-expanded={open}
              >
                <span className='fw-bold fs-6'>Filter</span>
                <span className='icon'>
                  <SVG src='/media/icons/duotune/general/gen031.svg' />
                </span>
              </button>
            </div>
            <Collapse in={open}>
              <div className='theme-filter-wrapper' id='example-collapse-text'>
                <ThemeFilterInstalled
                  installCount={installCount}
                  onSelect={handleStatusSelect}
                  selected={installationStatus}
                />
                <ThemeFilterWithPricing
                  onSelect={handleThemeType}
                  selected={themeType}
                  freeCount={
                    auth?.shop_info?.store_cat_id !== 20
                      ? data?.filter((f) => f?.payment_type === 'FREE' && f.store_cat_id !== 20)
                          ?.length
                      : data?.filter((f) => f?.payment_type === 'FREE')?.length
                  }
                  paidCount={
                    auth?.shop_info?.store_cat_id !== 20
                      ? data?.filter((f) => f?.payment_type === 'PAID' && f.store_cat_id !== 20)
                          ?.length
                      : data?.filter((f) => f?.payment_type === 'PAID')?.length
                  }
                />
                <ThemeFilter
                  catData={
                    auth?.shop_info?.store_cat_id === 20
                      ? catData?.filter((cat) => cat.id === 20)
                      : catData?.filter((cat) => cat.id !== 20)
                  }
                  selected={selected}
                  onSelect={handleCatSelect}
                />
              </div>
            </Collapse>
          </div>
          <div className='col-lg-9'>
            <KTCard className=''>
              {loading && (
                <div className='py-5'>
                  <LoaderComponent />
                </div>
              )}
              {!loading && !installationStatus && (
                <All
                  btnLoading={btnLoading}
                  themeChange={(id) => handleThemeCustomization(id)}
                  installTheme={(id) => handleInstallTheme(id)}
                  catLabel={selected.label}
                  data={themeType ? data?.filter((f) => f?.payment_type === themeType) : data}
                  themeType={themeType}
                  themeTypeFilterResetHandler={themeTypeFilterResetHandler}
                  themeFilterResetHandler={themeFilterResetHandler}
                  installationStatus={installationStatus}
                  installationStatusHandler={() => setInstallationStatus('')}
                />
              )}
              {!loading && installationStatus === '1' && (
                <All
                  btnLoading={btnLoading}
                  themeChange={(id) => handleThemeCustomization(id)}
                  installTheme={(id) => handleInstallTheme(id)}
                  data={data?.filter((f) => f?.installation_status === 1)}
                  themeType={themeType}
                  themeTypeFilterResetHandler={themeTypeFilterResetHandler}
                  themeFilterResetHandler={themeFilterResetHandler}
                  installationStatus={installationStatus}
                  installationStatusHandler={() => setInstallationStatus('')}
                />
              )}
            </KTCard>
          </div>
        </div>
      )}
    </>
  )
}

export default AllThemes
