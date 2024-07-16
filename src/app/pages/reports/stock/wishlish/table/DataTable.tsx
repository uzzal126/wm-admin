import {useMemo, useState} from 'react'
import {Button} from 'react-bootstrap'
import {ColumnInstance, Row, useTable} from 'react-table'
import {KTCardBody} from '../../../../../../_metronic/helpers'
import NotFound from '../../../../../../_metronic/helpers/components/NotFound'
import {DataTableLoading} from '../../../../../modules/datatable/loading/DataTableLoading'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {TableModal} from '../core/_models'
import AttributeRow from './column/attributeRow'
import {CustomHeaderColumn} from './column/CustomHeaderColumn'
import {CustomRow} from './column/CustomRow'
import {modalColumns} from './column/_columns'

let limit = 100

const DataTable = () => {
  const response = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const [slice, setSlice] = useState(limit)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let data = response.length > 0 ? response.slice(0, slice) : []
  const dataMeno = useMemo(() => data, [data])

  const columns = useMemo(() => modalColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data: dataMeno,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle border-bottom fs-6 gy-2 gx-3 table-rounded dataTable'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start fw-bolder border border-gray-300 fs-7 text-uppercase gs-0 text-black'>
              {headers.map((column: ColumnInstance<TableModal>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 border border-gray-300' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<TableModal>, i) => (
                <>
                  {prepareRow(row)}
                  <CustomRow row={row} key={`row-${i}-${row.id}`} />
                  {row.original &&
                    row.original?.customer &&
                    typeof row.original?.customer === 'string' &&
                    JSON.parse(row.original?.customer).length > 0 &&
                    JSON.parse(row.original?.customer).map((r: any, j: any) => {
                      return (
                        <AttributeRow
                          row={r}
                          product={row.original}
                          key={`row-${i}-sub${j}-${row.id}`}
                        />
                      )
                    })}
                </>
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
        {response.length > slice && (
          <div className='text-center'>
            <Button
              variant='light-primary'
              onClick={() =>
                setSlice(slice + limit > response.length ? response.length : slice + limit)
              }
            >
              Load More
            </Button>
          </div>
        )}
      </div>
      {isLoading && <DataTableLoading />}
    </KTCardBody>
  )
}

export {DataTable}
