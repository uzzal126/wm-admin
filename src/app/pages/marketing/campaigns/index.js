import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {PageTitle} from '../../../../_metronic/layout/core'
import {GET_CAMPAIGN, GET_CAMPAIGN_GROUP} from '../../../constants/api.constants'
import {getQueryRequest} from '../../../library/api.helper'
import AddNewCapaign from './AddNewCapaign'
import EditNewCapaign from './EditNewCapaign'

import ExpressDelivery from './express'
import CampaignRoot from './root'

const PageBack = [
  {
    title: 'Back Marketing',
    path: '/marketing',
  },
]

const Campaigns = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const {group_id} = useParams()
  const navigate = useNavigate()

  const [active, setActive] = useState('')
  const [campaignBtn, setCampaignBtn] = useState([])
  const [data, setData] = useState([])
  const [edit, setEdit] = useState({})

  useEffect(() => {
    getData()
  }, [])
  // // console.log("edit", edit)
  const getData = async () => {
    const res = await getQueryRequest(GET_CAMPAIGN_GROUP)
    if (res.success && res.status_code === 200) {
      setCampaignBtn(res.data)

      if (group_id && group_id !== null) {
        res.data.length > 0 &&
          res.data.map((cm) => {
            if (cm.slug === group_id) {
              getCampaignData(cm)
            }
          })
      }
    }
  }

  const getCampaignData = async (cap) => {
    setActive(cap)
    navigate(`/marketing/campaign/${cap.slug}`)
    let res = await getQueryRequest(`${GET_CAMPAIGN}?group_id=${cap.id}`)
    if (res.success && res.status_code === 200) {
      setData(res.data)
    } else {
      setData([])
    }
  }

  return (
    <>
      {group_id && group_id !== null && <PageTitle backLink={PageBack}>{active.title}</PageTitle>}
      <div className='row row-cols-2 row-cols-xl-4 '>
        {campaignBtn &&
          campaignBtn.length > 0 &&
          campaignBtn.map((cap, i) => (
            <div className='col-12 mb-6' key={i}>
              <button
                onClick={() => getCampaignData(cap)}
                disabled={cap?.publish_status === 'Comming Soon'}
                className={`btn d-flex align-items-center min-h-150px w-100 shadow btn-light btn-active-success justify-content-center flex-column ${
                  active.slug === cap.slug && 'active'
                }`}
              >
                {cap?.publish_status === 'Comming Soon' && (
                  <span className='badge badge-info' style={{marginLeft: 'auto'}}>
                    Coming Soon
                  </span>
                )}
                <span className='svg-icon-5x'>
                  <img src={cap.icon} width='64' alt='' />
                </span>
                <span className='fs-4 text-uppercase mt-2'>{cap.title}</span>
              </button>
            </div>
          ))}
      </div>
      {active && active.slug && Object.keys(edit).length <= 0 && (
        <AddNewCapaign cmp={active} setData={(e) => setData(e)} />
      )}
      {edit && Object.keys(edit).length > 0 && edit?.id !== 0 && (
        <EditNewCapaign edit={edit} setEdit={setEdit} cmp={active} setData={(e) => setData(e)} />
      )}
      <div className='mt-5'>
        {active && active.slug === 'express-delivery' && (
          <ExpressDelivery camp={active} data={data} />
        )}
        {active && active.slug !== 'express-delivery' && (
          <CampaignRoot setEdit={setEdit} camp={active} data={data} />
        )}
      </div>
    </>
  )
}

export default Campaigns
