import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {BackLink, PageTitle} from '../../../../_metronic/layout/core'
import {GET_PRODUCT_VARIANTS} from '../../../constants/api.constants'
import {getQueryRequest} from '../../../library/api.helper'
import LoaderComponent from '../../../modules/components/loader/LoaderComponent'
import {ErrorMessagesInPage} from '../../../modules/errors/ErrorMessage'
import RenderTable from './renderTable'
const PageBack: Array<BackLink> = [
  {
    title: 'Back',
    path: '/products/index',
  },
]

const ManageStock = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)
  const {pid} = useParams()

  const [attributes, setAttributes] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState('')

  useEffect(() => {
    getVariants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid])

  const getVariants = async () => {
    let res: any = {}
    // // console.log('up', res)
    res = await getQueryRequest(`${GET_PRODUCT_VARIANTS}/${pid}`)
    // // console.log(res)

    if (res.success && res.status_code === 200) {
      setAttributes(res.data)
      setLoading(false)
    } else {
      setLoading(false)
      setErrors(res.message)
    }
  }
  const reFetch = async () => {
    await getVariants()
  }
  const reload = async () => {
    window.location.reload()
  }
  if (loading) return <LoaderComponent />
  if (errors)
    return (
      <>
        <ErrorMessagesInPage
          errors={errors}
          btn={{url: `/products/variable/${pid}`, text: 'Generate Variant'}}
        />
      </>
    )

  return (
    <>
      {attributes.length > 0 ? (
        <>
          <PageTitle backLink={PageBack}>{attributes[0].name || 'Product Stock'}</PageTitle>
          <KTCard>
            <KTCardBody>
              <RenderTable attributes={attributes} pid={pid} reload={reload} reFetch={reFetch} />
            </KTCardBody>
          </KTCard>
        </>
      ) : (
        <KTCard>
          <KTCardBody>No Variants found</KTCardBody>
        </KTCard>
      )}
    </>
  )
}

export default ManageStock
