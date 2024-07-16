import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../_metronic/helpers'
import {useAuth} from '../../modules/auth'
import InfoModal from './modals/infoModal'

const ProfileView = () => {
  const {currentUser} = useAuth()
  const [infoModal, setInfoModal] = useState(false)

  return (
    <div className='row'>
      <div className='flex-column col-lg-4 mb-10'>
        <div className='card mb-5 mb-xl-8'>
          <div className='card-body pt-15 position-relative'>
            <button
              onClick={() => setInfoModal(true)}
              className='btn btn-sm btn-icon btn-light-primary w-25px h-25px position-absolute top-0 end-0 me-4 mt-4'
            >
              <i className='fas fa-pencil-alt fs-4'></i>
            </button>
            <div className='d-flex flex-center flex-column mb-5'>
              <div className='symbol symbol-100px symbol-circle mb-7'>
                <img src={currentUser?.user.avatar || '/media/avatars/300-1.jpg'} alt='sdfsdf' />
              </div>
              <p className='fs-3 text-gray-800 text-hover-primary fw-bolder mb-1'>
                {currentUser?.user.name}
              </p>
              <div className='fs-5 fw-bold text-muted mb-6'>
                {currentUser?.shop_info.business_name}
              </div>
            </div>

            <div className='separator separator-dashed mb-3'></div>
            <div id='kt_customer_view_details' className='collapse show'>
              <div className='py-5 fs-6'>
                <div className='badge badge-light-info d-inline'>Premium user</div>
                <div className='fw-bolder mt-5'>Account ID</div>
                <div className='text-gray-600'>ID-{currentUser?.user.sid}</div>
                <div className='fw-bolder mt-5'>Primary Email</div>
                <div className='text-gray-600'>
                  <span className='text-gray-600 text-hover-primary'>
                    {currentUser?.user.email}
                  </span>
                </div>
                <div className='fw-bolder mt-5'>Primary Mobile</div>
                <div className='text-gray-600'>
                  <span className='text-gray-600 text-hover-primary'>
                    {currentUser?.user.msisdn}
                  </span>
                </div>
                <div className='fw-bolder mt-5'>Address</div>
                <div className='text-gray-600'>{currentUser?.user.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-lg-8'>
        <div className='show-details'>
          <div className='card mb-6 mb-xl-9'>
            <div className='card-header border-0'>
              <div className='card-title'>
                <h2>Earnings</h2>
              </div>
            </div>
            <div className='card-body py-0'>
              <div className='fs-5 fw-bold text-gray-500 mb-4'>
                Last 30 day earnings calculated. Apart from arranging the order of topics.
              </div>
              <div className='d-flex flex-wrap flex-stack mb-5'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-dashed border-gray-300 w-150px rounded my-3 p-4 me-6'>
                    <span className='fs-1 fw-bolder text-gray-800 lh-1'>
                      <span
                        data-kt-countup='true'
                        data-kt-countup-value='6,840'
                        data-kt-countup-prefix='$'
                      >
                        0
                      </span>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-2 svg-icon-success'
                      />
                    </span>
                    <span className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>Net Earnings</span>
                  </div>
                  <div className='border border-dashed border-gray-300 w-125px rounded my-3 p-4 me-6'>
                    <span className='fs-1 fw-bolder text-gray-800 lh-1'>
                      <span className='' data-kt-countup='true' data-kt-countup-value='16'>
                        0
                      </span>
                      %
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr065.svg'
                        className='svg-icon-2 svg-icon-danger'
                      />
                    </span>
                    <span className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>Change</span>
                  </div>
                </div>
                <a href='#' className='btn btn-sm btn-light-primary flex-shrink-0'>
                  Withdraw Earnings
                </a>
              </div>
            </div>
          </div>
          <div className='card mb-6 mb-xl-9'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>Statement</h2>
              </div>
              <div className='card-toolbar'>
                <ul
                  className='nav nav-stretch fs-5 fw-bold nav-line-tabs nav-line-tabs-2x border-transparent'
                  role='tablist'
                >
                  <li className='nav-item' role='presentation'>
                    <a
                      className='nav-link text-active-primary active'
                      data-bs-toggle='tab'
                      role='tab'
                      href='#kt_customer_view_statement_1'
                    >
                      This Year
                    </a>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <a
                      className='nav-link text-active-primary ms-3'
                      data-bs-toggle='tab'
                      role='tab'
                      href='#kt_customer_view_statement_2'
                    >
                      2020
                    </a>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <a
                      className='nav-link text-active-primary ms-3'
                      data-bs-toggle='tab'
                      role='tab'
                      href='#kt_customer_view_statement_3'
                    >
                      2019
                    </a>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <a
                      className='nav-link text-active-primary ms-3'
                      data-bs-toggle='tab'
                      role='tab'
                      href='#kt_customer_view_statement_4'
                    >
                      2018
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='card-body pb-5'>
              <div id='kt_customer_view_statement_tab_content' className='tab-content'>
                <div
                  id='kt_customer_view_statement_1'
                  className='py-0 tab-pane fade show active'
                  role='tabpanel'
                >
                  <table
                    id='kt_customer_view_statement_table_1'
                    className='table align-middle table-row-dashed fs-6 text-gray-600 fw-bold gy-4'
                  >
                    <thead className='border-bottom border-gray-200'>
                      <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        <th className='w-125px'>Date</th>
                        <th className='w-100px'>Order ID</th>
                        <th className='w-300px'>Details</th>
                        <th className='w-100px'>Amount</th>
                        <th className='w-100px text-end pe-7'>Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Nov 01, 2021</td>
                        <td>
                          <a href='#' className='text-gray-600 text-hover-primary'>
                            102445788
                          </a>
                        </td>
                        <td>Darknight transparency 36 Icons Pack</td>
                        <td className='text-success'>$38.00</td>
                        <td className='text-end'>
                          <button className='btn btn-sm btn-light btn-active-light-primary'>
                            Download
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Oct 24, 2021</td>
                        <td>
                          <a href='#' className='text-gray-600 text-hover-primary'>
                            423445721
                          </a>
                        </td>
                        <td>Seller Fee</td>
                        <td className='text-danger'>$-2.60</td>
                        <td className='text-end'>
                          <button className='btn btn-sm btn-light btn-active-light-primary'>
                            Download
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={infoModal} onHide={() => setInfoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <InfoModal setInfoModal={setInfoModal} data={currentUser} />
      </Modal>
    </div>
  )
}

export default ProfileView
