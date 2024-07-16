import {useMemo} from 'react'
import {ColumnInstance, Row, useTable} from 'react-table'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {DataTableLoading} from '../../../../modules/datatable/loading/DataTableLoading'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {STP} from '../core/_models'
import {CustomHeaderColumn} from './column/CustomHeaderColumn'
import {CustomRow} from './column/CustomRow'
import {productColumns} from './column/_columns'
import {DataTablePagination} from './pagination/DataTablePagination'

const ProdutDataTable = () => {
  const stpRes = useQueryResponseData()
  let stpList: any = stpRes || []
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => stpList, [stpList])
  const columns = useMemo(() => productColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-1 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<STP>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<STP>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DataTablePagination />
      {isLoading && <DataTableLoading />}
    </KTCardBody>
  )
}

export {ProdutDataTable}
