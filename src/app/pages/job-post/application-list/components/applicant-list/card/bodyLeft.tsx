import clsx from 'clsx'
import moment from 'moment'
import {Fragment} from 'react'
import {useQueryRequest} from '../../../core/QueryRequestProvider'
import {useQueryResponsePagination} from '../../../core/QueryResponseProvider'

export default function BodyLeft({data, isLoading, selected, setSelected}: any) {
  const pagination = useQueryResponsePagination()
  const {updateState} = useQueryRequest()

  const updatePage = (page: number | null, per_page: number | null = pagination.items_per_page) => {
    if (!page || isLoading) {
      return
    }

    updateState({page, items_per_page: per_page || pagination.items_per_page})
  }

  const getBadgeColor = (status: any) => {
    switch (status) {
      case 'Approved':
        return 'success'
      case 'Rejected':
        return 'danger'
      case 'Pending':
        return 'warning'

      default:
        return 'primary'
    }
  }

  return (
    <div className='card-body pt-5'>
      <div>
        {isLoading ? (
          <span>loading...</span>
        ) : data?.length === 0 ? (
          <span>No Application Found!</span>
        ) : (
          data.map((item: any, indx: any) => (
            <Fragment key={indx}>
              <div
                className='d-flex flex-stack'
                key={indx}
                style={{
                  borderLeft: indx === selected ? '3px solid #009ef7' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setSelected(indx)}
              >
                <div className='d-flex align-items-center me-3' style={{marginLeft: '10px'}}>
                  <img
                    src='https://api.admin.webmanza.com/assets/logos/blank.png'
                    className='me-4 w-30px'
                    alt=''
                  />
                  <div className='flex-grow-1'>
                    <a href='#' className='text-gray-800 text-hover-primary fs-5 fw-bold lh-0'>
                      {item?.name}
                    </a>
                    <span className='text-gray-400 fw-semibold d-block fs-6'>{item?.email}</span>
                    <span className='text-gray-400 fw-semibold d-block fs-6'>{item?.address}</span>
                    <h6>{`Applied: ${moment.unix(item?.created_at).format('ll')}`}</h6>
                  </div>
                </div>
                <div className='card-toolbar'>
                  <span
                    className={`badge badge-light-${getBadgeColor(
                      item?.application_status
                    )} fw-bold me-auto px-4 py-3`}
                  >
                    {item?.application_status}
                  </span>
                </div>
              </div>
              <div className='separator separator-dashed my-3' />
            </Fragment>
          ))
        )}
      </div>
      <div className='row'>
        <div className='col-sm-12 col-md-12 d-flex align-items-center justify-content-center justify-content-md-end'>
          <div id='kt_table_users_paginate'>
            <ul className='pagination'>
              {pagination.links?.map((link: any) => (
                <li
                  key={link.label}
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
    </div>
  )
}
