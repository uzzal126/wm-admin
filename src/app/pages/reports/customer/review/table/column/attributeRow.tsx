import {FC} from 'react'

type Props = {
  row: any
  product: any
}

const AttributeRow: FC<Props> = ({row, product}) => {
  return (
    <tr className='border-gray-300 border-bottom-1'>
      <td>{row.name}</td>
      <td>{row.msisdn}</td>
      <td>{row.email}</td>
    </tr>
  )
}

export default AttributeRow
