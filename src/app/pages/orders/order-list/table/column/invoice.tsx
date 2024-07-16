import {useAbility} from '../../../../../../_metronic/redux/ability'
import {Link} from '../../../../../modules/helper/linkHandler'

const Invoice = ({id, invoice_id}: {id: number; invoice_id: string}) => {
  const {ability} = useAbility()
  return (
    <>
      {ability('Order Edit', 'orders') ? (
        <Link to={`/orders/edit/${id}/${invoice_id}`}>{invoice_id}</Link>
      ) : (
        invoice_id
      )}
    </>
  )
}

export default Invoice
