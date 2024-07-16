import React, {useMemo} from 'react'
import {ColumnInstance, Row, useTable} from 'react-table'
import {KTCardBody} from '../../../../../_metronic/helpers'
import NotFound from '../../../../../_metronic/helpers/components/NotFound'
import {DataTableLoading} from '../../../../modules/datatable/loading/DataTableLoading'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {Product} from '../core/_models'
import {CustomHeaderColumn} from './column/CustomHeaderColumn'
import {CustomRow} from './column/CustomRow'
import {productColumns} from './column/_columns'
import BulkAction from './header/bulkAction'
import {DataTablePagination} from './pagination/DataTablePagination'

const ProdutDataTable = () => {
  const prodcuts = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => prodcuts, [prodcuts])
  const columns = useMemo(() => productColumns, [])
  const {selected} = useListView()

  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      {selected.length > 0 && <BulkAction />}
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-1 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Product>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Product>, i) => (
                <React.Fragment key={i}>
                  <>
                    {prepareRow(row)}
                    <CustomRow row={row} key={`row-${i}-${row.id}`} />
                  </>
                </React.Fragment>
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

export {ProdutDataTable}
