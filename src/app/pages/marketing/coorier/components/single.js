import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {PageTitle} from '../../../../../_metronic/layout/core'
import {GET_COURIER_PARTNER, POST_COURIER_DEACTIVATE} from '../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../library/api.helper'
import LoaderComponent from '../../../../modules/components/loader/LoaderComponent'
import {ErrorMessagesInPage} from '../../../../modules/errors/ErrorMessage'
import CourierDashboard from './dashboard'
import CourierStores from './store'
// import CourierSettings from './settings'
const PageBack = [
  {
    title: 'Back Courier',
    path: '/marketing/courier',
  },
]

const SingleCourier = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  const navigate = useNavigate()

  const {id, page} = useParams()

  const [loading, setLoading] = useState(true)
  const [courier, setCourier] = useState({})

  useEffect(() => {
    getCourier(id)
  }, [id])

  const getCourier = async (id) => {
    let res = await getQueryRequest(GET_COURIER_PARTNER)
    if (res.success && res.status_code === 200) {
      let cour = res.data.filter((f) => f.id === parseInt(id))
      if (cour && cour.length > 0) {
        setCourier(cour[0])
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  if (!id || id === '' || id === undefined || id === 'undefined')
    return <ErrorMessagesInPage errors={'Something wrong please check again'} />
  if (loading) return <LoaderComponent />
  if (Object.keys(courier).length <= 0)
    return <ErrorMessagesInPage errors={'Partner not find! please check again'} />

  const uninstallTools = (courier) => {
    swal({
      title: 'Are you sure?',
      text: `Do you want to Uninstall`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        const res = await queryRequest(POST_COURIER_DEACTIVATE, {
          courier_partner_id: courier.id,
        })

        if (res.success && res.status_code === 200) {
          toast.success('Uninstall successfully')
          navigate(`/marketing/courier`)
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  return (
    <>
      <PageTitle backLink={PageBack}>
        {courier.name}
        <label className='form-check form-switch form-check-custom form-check-solid ms-2'>
          <input
            className='form-check-input h-25px w-50px'
            type='checkbox'
            checked={courier?.is_active}
            onChange={(e) => uninstallTools(courier)}
          />
        </label>
      </PageTitle>
      {page && page === 'pickup' ? (
        <CourierStores courier={courier} />
      ) : (
        <CourierDashboard courier={courier} />
      )}
    </>
  )
}

export default SingleCourier
