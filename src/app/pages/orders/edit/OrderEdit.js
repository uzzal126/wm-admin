import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {ORDER_DETAILS} from '../../../constants/api.constants'
import {getQueryRequest} from '../../../library/api.helper'
import LoaderComponent from '../../../modules/components/loader/LoaderComponent'
import {ErrorMessagesInPage} from '../../../modules/errors/ErrorMessage'
import FormHandler from './FormHandler'

const OrderEdit = () => {
  const {id, invoice} = useParams()
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [id, invoice])

  async function fetchData() {
    setLoading(true)
    const response = await getQueryRequest(`${ORDER_DETAILS}/${id}/${invoice}`)
    if (response.success && response.status_code === 200) {
      if (response.data) {
        setData(response.data)
      } else {
        setError(response.message)
      }
      setLoading(false)
    } else {
      setLoading(false)
      setError(response.message)
    }
  }

  const refatch = (e) => e && fetchData()

  if (loading) return <LoaderComponent />
  if (error) return <ErrorMessagesInPage errors={error} />

  return <FormHandler response={data} setData={setData} refatch={(e) => refatch(e)} />
}

export default OrderEdit
