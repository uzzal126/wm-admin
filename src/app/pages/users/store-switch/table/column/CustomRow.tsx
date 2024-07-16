import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'
import {useAuth} from '../../../../../modules/auth'
import {TableModal} from '../../core/_models'

type Props = {
  row: Row<TableModal>
}

const CustomRow: FC<Props> = ({row}) => {
  const {auth} = useAuth()

  return (
    <tr
      {...row.getRowProps()}
      className={row.original.sid === auth?.user?.sid ? 'bg-light-success shadow' : ''}
      style={{
        fontWeight: row.original.sid === auth?.user?.sid ? '600' : '400',
      }}
    >
      {row.cells.map((cell) => {
        return (
          <td
            {...cell.getCellProps()}
            className={clsx({'text-center ps-0': cell.column.id === 'actions'})}
          >
            {cell.render('Cell')}
          </td>
        )
      })}
    </tr>
  )
}

export {CustomRow}
