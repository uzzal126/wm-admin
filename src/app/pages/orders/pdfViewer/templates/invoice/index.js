import {betterParse, dateUnixReadable} from '../../../../../modules/helper/misc'
import RenderVariant from '../../../edit/form/components/renderVariant'

const InvoiceDefault = ({data, merchant}) => {
  let logo = merchant?.logo || {}
  const customer =
    data?.shipping_address && data?.shipping_address !== null
      ? betterParse(data?.shipping_address)
      : []

  return (
    <div className='print-area'>
      <div className='row d-flex justify-content-center mb-2'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-header d-block py-5 min-h-auto'>
              <div className='print-header'>
                <div className='row'>
                  <div className='col'>
                    <img alt='Logo' src={logo?.light_logo || ''} width='200' />
                  </div>

                  <div className='col-4 company text-start'>
                    <div className='fw-bolder fs-6 text-gray-800'>
                      {merchant.business_name || merchant.site_title}
                    </div>
                    <div className='fw-bold fs-7 text-gray-600'>
                      {merchant?.msisdn || ''},<br />
                      {merchant?.email || ''},
                      <br />
                      {merchant?.office_address || ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-body print-body style-1 px-10 d-flex justify-content-between flex-column'>
              <div className='m-0'>
                <div className='fw-bolder fs-3 text-gray-800 mb-2'>Invoice #{data?.invoice_id}</div>
                <div className='row g-5 mb-8'>
                  <div className='col-sm-6'>
                    <div className='fw-bold fs-7 text-gray-600 mb-1'>
                      Received on: {dateUnixReadable(data?.created_at)}
                    </div>
                  </div>
                </div>
                <div className='row g-5 mb-12'>
                  <div className='col-4'>
                    <div className='fw-bold fs-7 text-gray-600 mb-1'>Billing To:</div>
                    <div className='fw-bolder fs-6 text-gray-800'>
                      {customer?.name || data?.customer_name}
                    </div>
                    <div className='fw-bolder fs-6 text-gray-600'>
                      {customer?.msisdn || data?.msisdn}
                    </div>
                    <div className='fw-bold fs-7 text-gray-600'>
                      {`${customer && customer?.street_address}${customer && ', ' + data?.area}${
                        customer && ', ' + data?.zone
                      }${customer && ', ' + data?.city}.`}
                    </div>
                  </div>
                  <div className='col-4'></div>
                  <div className='col-4 text-start'>
                    <div className='fw-bold fs-7 text-gray-600 mb-1'>Shipping To:</div>
                    <div className='fw-bolder fs-6 text-gray-800'>
                      {customer?.name || data?.customer_name}
                    </div>
                    <div className='fw-bolder fs-6 text-gray-600'>
                      {customer?.msisdn || data?.msisdn}
                    </div>
                    <div className='fw-bold fs-7 text-gray-600'>
                      {`${customer && customer?.street_address}${customer && ', ' + data?.area}${
                        customer && ', ' + data?.zone
                      }${customer && ', ' + data?.city}.`}
                    </div>
                  </div>
                </div>
                <div className=' w-100'>
                  <div className='table-responsive border-bottom mb-9 w-100'>
                    <table className='table mb-3 gy-1 gx-3 table-bordered table-striped w-100'>
                      <thead>
                        <tr className='border-bottom fs-6 fw-bolder text-muted'>
                          <th style={{width: '60%'}} className=' pb-2'>
                            Product
                          </th>
                          <th className=' text-end pb-2'>Quantity</th>
                          <th className=' text-end pb-2'>Discount</th>
                          <th className='w-100px text-end pb-2'>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.products &&
                          data?.products.length > 0 &&
                          data?.products.map((item, i) => (
                            <tr className='fw-bolder text-gray-700' key={i}>
                              <td className='d-flex align-items-center'>
                                <div className='d-flex align-items-center'>
                                  <div className='me-5 position-relative'>
                                    <div className='symbol symbol-50px symbol-circle'>
                                      <img alt={item?.name} src={betterParse(item.thumbnail).src} />
                                    </div>
                                  </div>
                                  <div className='d-flex flex-column justify-content-center'>
                                    <span className='fs-6 text-gray-800 text-hover-primary'>
                                      {item.name}
                                    </span>
                                    <RenderVariant product={item} />
                                  </div>
                                </div>
                              </td>
                              <td className='pt-6 text-end'>
                                ৳ {item.selling_rate ? item.selling_rate : 0}
                                <span className='mx-2'>X</span>
                                {item.qty || 1}
                              </td>
                              <td className='pt-6 text-end'>{item.discount}</td>
                              <td className='pt-6 text-dark fw-boldest text-end'>
                                ৳ {item.selling_rate * item.qty - item.discount}
                              </td>
                            </tr>
                          ))}
                        <tr className='text-gray-700 fs-5'>
                          <td colSpan='3' className='text-end'>
                            Subtotal:
                          </td>
                          <td className='text-dark text-end'>
                            ৳ {data?.subtotal + data?.extra_discount}
                          </td>
                        </tr>
                        <tr className='text-gray-700 fs-5'>
                          <td colSpan='3' className='text-end'>
                            Shipping:
                          </td>
                          <td className='text-dark text-end'>৳ {data?.shipping_fee}</td>
                        </tr>
                        <tr className='text-gray-700 fs-5'>
                          <td colSpan='3' className='text-end'>
                            Discount:
                          </td>
                          <td className='text-dark text-end'>
                            - ৳ {data?.extra_discount + data?.promo_discount + data?.discount}
                          </td>
                        </tr>
                        <tr className='fw-bolder text-gray-700 fs-5'>
                          <td colSpan='3' className='text-end'>
                            Total:
                          </td>
                          <td className='text-dark fw-boldest text-end'>৳ {data?.total}</td>
                        </tr>
                        <tr className='fw-bolder text-gray-700 fs-5'>
                          <td colSpan='3' className='text-end'>
                            Total Paid:
                          </td>
                          <td className='fw-boldest text-end text-success'>
                            ৳ {data?.paid_amount}
                          </td>
                        </tr>
                        <tr className='fw-bolder text-gray-700 fs-5'>
                          <td colSpan='3' className='text-end'>
                            Total Due:
                          </td>
                          <td className='text-danger fw-boldest text-end'>
                            ৳ {data?.total - data?.paid_amount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='mt-3'>
                <div className='clearfix text-center'>
                  <h2 className='m-0 fs-4 py-5 text-gray-600'>THANK YOU FOR YOUR ORDER</h2>
                </div>
                {/* <div className='text-muted'>
                  <strong>Terms & Conditions</strong>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis molestiae
                    et eius esse quasi iure ab vitae unde. Voluptatem itaque ab distinctio
                    laboriosam placeat adipisci iste, inventore praesentium explicabo accusamus.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDefault
