/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {PageTitle} from '../../../_metronic/layout/core'
import {THEME_URL} from '../../constants/api.constants'
import {getQueryRequest} from '../../library/api.helper'
import {getAuth} from '../../modules/auth'
import DashboardContents from './components/contents'

const DashboardWrapper = () => {
  const intl = useIntl()
  const navigate = useNavigate()
  const auth = getAuth()
  const getThemeData = async () => {
    const data = await getQueryRequest(
      `${THEME_URL}?store_cat_id=${auth?.shop_info?.store_cat_id || 1}`
    )
    if (data?.success && data?.status_code === 200) {
      if (!data?.data[1]) {
        navigate('/theme-store')
        toast.info('Please install a theme', {
          position: 'top-right',
        })
      }
    }
  }

  useEffect(() => {
    getThemeData()
  }, [])

  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  return (
    <>
      <PageTitle datePicker={true}> Dashboard </PageTitle>
      <DashboardContents />
    </>
  )
}

export {DashboardWrapper}
