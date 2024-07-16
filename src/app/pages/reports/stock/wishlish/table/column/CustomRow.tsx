import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'
import {TableModal} from '../../core/_models'

type Props = {
  row: Row<TableModal>
}

const CustomRow: FC<Props> = ({row}) => (
  <tr {...row.getRowProps()} className='fw-bold text-black bg-light'>
    {row.cells.map((cell, i) => {
      let countRow =
        typeof cell.row.original.customer === 'string'
          ? JSON.parse(cell.row.original.customer).length + 1
          : 1

      return i <= 2 ? (
        <td
          colSpan={i === 2 ? 3 : 1}
          rowSpan={i < 2 ? countRow : 1}
          {...cell.getCellProps()}
          className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
        >
          {cell.render('Cell')}
        </td>
      ) : null
    })}
  </tr>
)

export {CustomRow}
