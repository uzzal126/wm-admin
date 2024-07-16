import {FC} from 'react'
import {ImageCell} from './ImageCell'

type Props = {
  row: any
  product: any
}

const AttributeRow: FC<Props> = ({row, product}) => {
  return (
    <tr className='border-gray-300 border-bottom-1'>
      <td>
        <ImageCell product={{...row, sku: product.sku}} />
      </td>
      <td>{row.cost_price}</td>
      <td>{row.selling_price}</td>
      <td>{row.in_stock}</td>
      <td>{row.delivered}</td>
      <td>{row.committed}</td>
      <td>{row.returned}</td>
      <td>{row.canceled}</td>
    </tr>
  )
}

export default AttributeRow
