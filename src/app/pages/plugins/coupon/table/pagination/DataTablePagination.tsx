/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
const DataTablePagination = () => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()
  const updatePage = (page: number | null) => {
    if (!page || isLoading || pagination.page === page) {
      return
    }

    updateState({page, items_per_page: pagination.items_per_page || 10})
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
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
