import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {CUSTOMER_DETAILS} from '../../../constants/api.constants'
import {getQueryRequest} from '../../../library/api.helper'
import LoaderComponent from '../../../modules/components/loader/LoaderComponent'
import {ErrorMessagesInPage} from '../../../modules/errors/ErrorMessage'
import Order from './order'
import View from './view'

const CustomerView = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const {id} = useParams()
  const nagivate = useNavigate()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getData()
  }, [])

  const refatch = () => getData()

  const getData = async () => {
    setLoading(true)
    const res = await getQueryRequest(`${CUSTOMER_DETAILS}/${id}`)
    if (res.success && res.status_code) {
      setData({data: res.data, orders: res.order_list})
      setLoading(false)
    } else {
      setError(res.message)
      setLoading(false)
    }
  }

  if (loading) return <LoaderComponent />
  if (error) return <ErrorMessagesInPage errors={error} />

  if (!data && Object.keys(data).length <= 0) {
    nagivate('/customers/index')
  }

  return (
    <div className='row'>
      <div className='col-lg-3'>
        <View data={data?.data} refatch={refatch} />
      </div>
      <div className='col-lg-9'>
        <Order data={data?.orders} />
      </div>
    </div>
  )
}

export default CustomerView
