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
      // // console.log('cell',cell)
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
        >
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export {CustomRow}
