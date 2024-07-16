import React, {FC} from 'react'
import {Link} from '../../../../../modules/helper/linkHandler'
import {dateUnixReadable} from '../../../../../modules/helper/misc'

type Props = {
  data: any
}

const TableRender: FC<Props> = ({data}) => {
  return (
    <div>
      <div className='table-responsive'>
        <table className='table align-middle table-row-dashed fs-6 gy-1 dataTable no-footer'>
          <thead>
            <tr className='text-start fw-bolder fs-7 text-uppercase gs-0'>
              <th>Order ID</th>
              <th>Variants</th>
              <th>Unit Sold</th>
              <th>Cost Price (৳)</th>
              <th>Sale Price (৳)</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item: any, i: number) => (
                <tr key={i}>
                  <td>
                    <Link to={`/orders/edit/${item.id}/${item.invoice_id}`}>{item.invoice_id}</Link>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-circle symbol-30px overflow-hidden me-3'>
                        <div className='symbol-label'>
                          <img
                            src={item?.thumbnail?.src || item?.thumbnail_url}
                            alt={''}
                            className='w-100'
                          />
                        </div>
                      </div>
                      <div className='d-flex gap-4'>
                        {item.option && item.option !== 'null' ? (
                          <div className='d-flex flex-column'>
                            {item.option === 'Variant' ? item.name : item.option}
                            <span className='fw-bold text-gray-400'>
                              {item.value !== 'Default' ? item.value : ''}
                            </span>
                          </div>
                        ) : null}
                        {item.option2 && item.option2 !== 'null' ? (
                          <div className='d-flex flex-column'>
                            {item.option2}
                            <span className='fw-bold text-gray-400'>{item.value2}</span>
                          </div>
                        ) : null}
                        {item.option3 && item.option3 !== 'null' ? (
                          <div className='d-flex flex-column'>
                            {item.option3}
                            <span className='fw-bold text-gray-400'>{item.value3}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td>{item.product_qty}</td>
                  <td>{item.cost_price}</td>
                  <td>{item.selling_price}</td>
                  <td>{dateUnixReadable(item.order_date)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableRender
