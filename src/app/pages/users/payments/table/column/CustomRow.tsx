import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'
import {Payment} from '../../core/_models'

type Props = {
  row: Row<Payment>
}

const CustomRow: FC<Props> = ({row}) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({
            'text-end min-w-100px': cell.column.id === 'actions',
            'text-center':
              cell.column.id === 'attribures' ||
              cell.column.id === 'total_added' ||
              cell.column.id === 'committed',
          })}
        >
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export {CustomRow}
