import React from 'react'
import {Link} from '../../../modules/helper/linkHandler'
import {dateReadable} from '../../../modules/helper/misc'

const Order = ({data}) => {
  return (
    <div className='flex-lg-row-fluid'>
      <div className='card '>
        <div className='card-header border-0'>
          <div className='card-title'>
            <h2>Order Records</h2>
          </div>
        </div>
        <div className='card-body pt-0 pb-5'>
          <div className='table-responsive'>
            <table
              className='table align-middle table-row-dashed gy-5'
              id='kt_table_customers_payment'
            >
              <thead className='border-bottom border-gray-200 fs-7 fw-bolder'>
                <tr className='text-start text-muted text-uppercase gs-0'>
                  <th>Invoice No.</th>
                  <th>Amount</th>
                  <th>Payment Mathod</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className='fs-6 fw-bold text-gray-600'>
                {data && data.length > 0 ? (
                  data.map((order, i) => (
                    <tr key={i}>
                      <td>
                        <Link
                          to={'/orders/edit/' + order.id + '/' + order.invoice_id}
                          className='text-gray-600 text-hover-primary mb-1'
                        >
                          {order.invoice_id}
                        </Link>
                      </td>
                      <td>{order.total}</td>
                      <td>{order.payment_channel}</td>
                      <td>
                        <span
                          className={`badge badge-light-${
                            order.order_status_id === 1
                              ? 'warning'
                              : order.order_status_id === 7 || order.order_status_id === 10
                              ? 'danger'
                              : 'success'
                          }`}
                        >
                          {order.order_status}
                        </span>
                      </td>
                      <td>{dateReadable(order.created_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>Order Not Found</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
