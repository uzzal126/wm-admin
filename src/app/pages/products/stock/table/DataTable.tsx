import {Fragment, useMemo} from 'react'
import {ColumnInstance, Row, useTable} from 'react-table'
import {KTCardBody} from '../../../../../_metronic/helpers'
import NotFound from '../../../../../_metronic/helpers/components/NotFound'
import {DataTableLoading} from '../../../../modules/datatable/loading/DataTableLoading'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {StockModal} from '../core/_models'
import AttributeRow from './column/AttributeRow'
import {CustomHeaderColumn} from './column/CustomHeaderColumn'
import {CustomRow} from './column/CustomRow'
import {productColumns} from './column/_columns'
import {DataTablePagination} from './pagination/DataTablePagination'

const DataTable = () => {
  const stocks = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => stocks, [stocks])
  const columns = useMemo(() => productColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
  // // console.log(rows)
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
              {headers.map((column: ColumnInstance<StockModal>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<StockModal>, i) => (
                <Fragment key={i}>
                  {prepareRow(row)}
                  <CustomRow row={row} key={`row-${i}-${row.id}`} />
                  {row.original &&
                    row.original?.variants &&
                    (typeof row.original?.variants === 'object' ||
                      row.original?.variants instanceof Array) &&
                    row.original?.variants.length > 0 &&
                    row.original?.variants.map((r: any, j: any) => {
                      return (
                        <AttributeRow
                          row={r}
                          product={row.original}
                          key={`row-${i}-sub${j}-${row.id}`}
                        />
                      )
                    })}
                </Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <NotFound />
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

export {DataTable}
