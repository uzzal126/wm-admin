import {FC} from 'react'
import {ImageCell} from './ImageCell'

type Props = {
  row: any
  product: any
}

const AttributeRow: FC<Props> = ({row, product}) => {
  row = typeof row === 'string' ? JSON.parse(row) : row
  return (
    <tr className='border-gray-300 border-bottom-1'>
      <td>
        <ImageCell
          product={{
            ...row,
            prod_id: product.prod_id,
            sku: product.sku,
            attribute_id: product.attribute_id,
          }}
        />
      </td>
      <td>{row.quantity_sold}</td>
      <td>{row.gross_sales}</td>
      <td>{row.discount}</td>
      <td>{row.tax}</td>
      <td>{row.net_sales}</td>
    </tr>
  )
}

export default AttributeRow
