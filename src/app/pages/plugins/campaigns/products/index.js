import {useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {PageTitle} from '../../../../../_metronic/layout/core'
import {ErrorMessagesInPage} from '../../../../modules/errors/ErrorMessage'
import BuyOneGetOne from '../bogo'
import DiscountProduct from '../discount'

const CampaignProducts = () => {
  const {group_id, id} = useParams()

  const [pageBack, setPageBack] = useState([
    {
      title: 'Back Campaign',
      path: `/plugins/campaign/${group_id}`,
    },
  ])
  let data = useLocation()

  // // console.log(data)
  return (
    <>
      <PageTitle backLink={pageBack}>
        {data.state && data.state?.name ? data.state?.name : 'Single Campaign'}
      </PageTitle>
      {group_id && group_id === 'bogo' && id !== null ? (
        <BuyOneGetOne />
      ) : group_id && group_id === 'discountable' && id !== null ? (
        <DiscountProduct camp={id} />
      ) : (
        <ErrorMessagesInPage errors='' />
      )}
    </>
  )
}

export default CampaignProducts
