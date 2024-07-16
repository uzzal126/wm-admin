import {Row} from 'react-bootstrap'

const Invoice1 = () => {
  return (
    <div className='print-area mb-1'>
      <div className='m-3'>
        <div className='row d-flex justify-content-center mb-2'>
          <div className='col-md-8'>
            <div className='card '>
              <div className='card-header d-block py-5 min-h-auto'>
                <div className='print-header'>
                  <Row>
                    <div className='col-8'>
                      <div className='d-flex align-items-center'>
                        <div className='me-5'>
                          <img
                            src='/media/logos/Web-Manza-Final-Logo.png'
                            className='rounded'
                            width={200}
                            alt=''
                          />
                        </div>

                        <div className='d-flex justify-content-start flex-column'>
                          <p className='text-gray-800 fw-bold text-hover-primary mb-1 fs-6'>
                            Company Name
                          </p>
                          <span className='text-gray-400 fw-semibold d-block fs-7'>Website</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className='text-start'>
                        <div className='fw-bolder fs-3 text-gray-800 mb-2'>
                          Invoice # 1264654sdfsdf
                        </div>
                        <div className='fw-bold fs-7 text-gray-600 mb-1'>
                          Received on: 24/01/23 13:19:25
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
              <div className='card-body pb-2 print-body px-10 d-flex justify-content-between flex-column'>
                <div className='mt-3'>
                  {/* END */}
                  <div className='row g-5 mb-10'>
                    <div className='col-4'>
                      <div className='fw-bold fs-7 text-gray-600 mb-1'>Billing To:</div>
                      <div className='fw-bolder fs-6 text-gray-800'>zulhas</div>
                      <div className='fw-bolder fs-6 text-gray-600'>01711080755</div>
                      <div className='fw-bold fs-7 text-gray-600'>
                        rtdsysydsysy, Tejgaon I/A, Dhaka, Dhaka.
                      </div>
                    </div>
                    <div className='col-4'></div>
                    <div className='col-4 text-start'>
                      <div className='fw-bold fs-7 text-gray-600 mb-1'>Shipping To:</div>
                      <div className='fw-bolder fs-6 text-gray-800'>zulhas</div>
                      <div className='fw-bolder fs-6 text-gray-600'>01711080755</div>
                      <div className='fw-bold fs-7 text-gray-600'>
                        rtdsysydsysy, Tejgaon I/A, Dhaka, Dhaka.
                      </div>
                    </div>
                  </div>
                  {/* END */}
                  <div className='flex-grow-1'>
                    <div className='table-responsive border-bottom mb-9'>
                      <table className='table mb-3 gy-1 table-bordered table-striped'>
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
                          <tr className='fw-bolder text-gray-700'>
                            <td className='d-flex align-items-center'>
                              <div className='d-flex align-items-center'>
                                <div className='me-5 position-relative'>
                                  <div className='symbol symbol-50px symbol-circle'>
                                    <img
                                      alt='Sundarban Khalisha Honey'
                                      src='https://sg-api.admin.webmanza.com/e7ae52a7-2cd6-11ed-9717-00155d212c06/uploads/2_1673255937413-04custom-kids-prayer-rug-electronic-wholesvariants-2jpg.jpeg'
                                    />
                                  </div>
                                </div>
                                <div className='d-flex flex-column justify-content-center'>
                                  <span className='fs-6 text-gray-800 text-hover-primary'>
                                    Sundarban Khalisha Honey
                                  </span>
                                  <div>
                                    <div className='fw-bold text-gray-400'>Color: Black</div>
                                    <div className='fw-bold text-gray-400'>Size: Medium</div>
                                    <div className='fw-bold text-gray-400'>Ram: 2 GB</div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='pt-6 text-end'>
                              ৳ 600<span className='mx-2'>X</span>1
                            </td>
                            <td className='pt-6 text-end'>0</td>
                            <td className='pt-6 text-dark fw-boldest text-end'>600</td>
                          </tr>
                          <tr className='text-gray-700 fs-5'>
                            <td colSpan={3} className='text-end'>
                              Subtotal:
                            </td>
                            <td className='text-dark text-end'>৳ 600</td>
                          </tr>
                          <tr className='text-gray-700 fs-5'>
                            <td colSpan={3} className='text-end'>
                              Shipping:
                            </td>
                            <td className='text-dark text-end'>৳ 80</td>
                          </tr>
                          <tr className='text-gray-700 fs-5'>
                            <td colSpan={3} className='text-end'>
                              Discount:
                            </td>
                            <td className='text-dark text-end'>- ৳ 0</td>
                          </tr>
                          <tr className='fw-bolder text-gray-700 fs-5'>
                            <td colSpan={3} className='text-end'>
                              Total:
                            </td>
                            <td className='text-dark fw-boldest text-end'>৳ 680</td>
                          </tr>
                          <tr className='fw-bolder text-gray-700 fs-5'>
                            <td colSpan={3} className='text-end'>
                              Total Paid:
                            </td>
                            <td className='fw-boldest text-end text-success'>৳ 0</td>
                          </tr>
                          <tr className='fw-bolder text-gray-700 fs-5'>
                            <td colSpan={3} className='text-end'>
                              Total Due:
                            </td>
                            <td className='text-danger fw-boldest text-end'>৳ 680</td>
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
                  <div className='text-muted'>
                    <strong>Terms & Conditions</strong>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis
                      molestiae et eius esse quasi iure ab vitae unde. Voluptatem itaque ab
                      distinctio laboriosam placeat adipisci iste, inventore praesentium explicabo
                      accusamus.
                    </p>
                  </div>
                </div>
              </div>
              <div className='card-footer border-0 pt-0'>
                <div className='d-flex justify-content-between align-items-center gap-3'>
                  <p className='mb-0'>info@webmanza.com</p>
                  <p className='mb-0'>01750882708</p>
                  <p className='mb-0'>merchant address</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice1
