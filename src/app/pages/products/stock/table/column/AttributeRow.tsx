import clsx from 'clsx'
import {FC} from 'react'
import {ActionsCell} from './actionsCell'
import {UpdateStock} from './UpdateStock'

type Props = {
  row: any
  product: any
}

const AttributeRow: FC<Props> = ({row, product}) => {
  return (
    <tr>
      <td></td>
      <td>
        {row.option !== null && row.option !== 'null' ? row.option + ': ' + row.value : null}
        {row.option2 !== null && row.option2 !== 'null'
          ? ',' + row.option2 + ': ' + row.value2
          : null}
        {row.option3 !== null && row.option3 !== 'null'
          ? ',' + row.option3 + ': ' + row.value3
          : null}
      </td>
      <td>{row.total_added}</td>
      <td>{row.committed}</td>
      <td>{row.stock}</td>
      <td>
        <UpdateStock proId={product.id} attrId={row.id} />
      </td>
      <td className='text-end'>
        <ActionsCell id={product.id} attrId={row.id} />
      </td>
    </tr>
  )
}

export default AttributeRow
