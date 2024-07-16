/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
const DataTablePagination = () => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()

  const updatePage = (page: number | null, per_page: number | null = pagination.items_per_page) => {
    if (!page || isLoading) {
      return
    }

    updateState({page, items_per_page: per_page || pagination.items_per_page})
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
        <div className='dataTables_length' id='kt_datatable_zero_configuration_length'>
          <label>
            <select
              className='form-select form-select-sm form-select-solid'
              onChange={(e: any) => updatePage(1, e.target.value)}
            >
              {/* <option value='10'>10</option> */}
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </label>
        </div>
        <div className='dataTables_info'>
          Showing {pagination.from} to{' '}
          {pagination.to > pagination.total ? pagination.total : pagination.to} of{' '}
          {pagination.total} records
        </div>
      </div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {pagination.links?.map((link: any, i: any) => (
              <li
                key={`${link.label}d-${i}`}
                className={clsx('page-item', {
                  active: pagination.page === link.page,
                  disabled: isLoading,
                  previous: link.label === '&laquo; Previous',
                  next: link.label === 'Next &raquo;',
                })}
              >
                {link.label === '...' ? (
                  <span className={`page-link `} dangerouslySetInnerHTML={{__html: link.label}} />
                ) : (
                  <a
                    className={`page-link ${
                      link.label === '&laquo; Previous' || link.label === 'Next &raquo;'
                        ? 'page-text'
                        : ''
                    }`}
                    onClick={() => updatePage(link.page)}
                    dangerouslySetInnerHTML={{__html: link.label}}
                    style={{cursor: 'pointer'}}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {DataTablePagination}
