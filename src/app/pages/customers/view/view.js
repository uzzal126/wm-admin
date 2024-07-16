import axios from 'axios'
import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {BASE_URL} from '../../../constants/api.constants'
import AddressModal from './modals/addressModal'
import InfoModal from './modals/infoModal'

const View = ({data, refatch}) => {
  const [infoModal, setInfoModal] = useState(false)
  const [addressModal, setAddressModal] = useState(false)
  const [address, setAddress] = useState([])

  const deleteCustomerAddress = async (id) => {
    try {
      const {data: res} = await axios.delete(`${BASE_URL}/customer/address/${data?.id}/${id}`)

      if (res?.success) {
        toast.success('Successfully deleted address!')
        refatch()
      } else {
        toast.error(res?.message || 'Sorry! An error occured.')
      }
    } catch (error) {
      toast.error('Sorrry! An error occured.')
    }
  }

  return (
    <>
      <div className='flex-column flex-lg-row-auto w-100 mb-10'>
        <div className='card mb-5'>
          <div className='card-body pt-7 position-relative'>
            <button
              onClick={() => setInfoModal(true)}
              className='btn btn-sm btn-icon btn-light-primary w-25px h-25px position-absolute top-0 end-0 me-4 mt-4'
            >
              <i className='fas fa-pencil-alt fs-4'></i>
            </button>
            <div className='d-flex flex-center flex-column mb-5 '>
              <div className='symbol symbol-100px symbol-circle mb-7'>
                <img src={data?.profile || '/media/avatars/300-1.jpg'} alt='ssgsag' />
              </div>
              <div className='fs-3 text-gray-800 text-hover-primary fw-bolder mb-1'>
                {data?.name}
              </div>
            </div>
            <div className='separator separator-dashed my-3'></div>
            <div id='kt_customer_view_details' className='collapse show'>
              <div className='fs-6'>
                <div className='fw-bolder mt-5'>Account ID</div>
                <div className='text-gray-600'>ID-{data?.id}</div>
                <div className='fw-bolder mt-5'>Primary Mobile</div>
                <div className='text-gray-600'>
                  <span className='text-gray-600 text-hover-primary'>{data?.msisdn}</span>
                </div>
                {data?.email && (
                  <>
                    <div className='fw-bolder mt-5'>Primary Email</div>
                    <div className='text-gray-600'>
                      <span className='text-gray-600 text-hover-primary'>{data?.email}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='card mb-5'>
          <div className='card-body position-relative'>
            <div>
              <div className='fw-bolder mb-3 d-flex justify-content-between align-items-center'>
                <h4 className='mb-0'>Address Book</h4>
                <button
                  onClick={() => setAddressModal(true)}
                  className='btn btn-sm btn-light-success'
                >
                  <i className='fas fa-plus fs-4'></i> Add
                </button>
              </div>
              {data?.address &&
                data?.address.length > 0 &&
                data?.address.map((add, i) => (
                  <div
                    className='text-gray-600 position-relative shadow-sm p-3 mb-3 rounded'
                    key={i}
                  >
                    <div className='position-absolute top-0 end-0'>
                      <button
                        onClick={() => {
                          setAddressModal(true)
                          setAddress(add)
                        }}
                        className='btn btn-sm btn-icon btn-light-primary w-25px h-25px'
                      >
                        <i className='fas fa-pencil-alt fs-4'></i>
                      </button>
                      <button
                        className='btn btn-sm btn-icon btn-light-danger w-25px h-25px'
                        onClick={() => {
                          deleteCustomerAddress(add?.id)
                        }}
                      >
                        <i className='la la-trash-o fs-3'></i>
                      </button>
                    </div>
                    <span
                      className={`badge badge-${
                        add.address_type === 'Home' ? 'success' : 'info'
                      } me-2`}
                    >
                      {add.address_type}{' '}
                    </span>
                    {add.name}
                    <br /> {add.msisdn},
                    <br /> {add.street_address},
                    <br />
                    {add.area}, {add.zone},
                    <br />
                    {add.city}, {add.region}
                    {/* <div className='separator separator-dashed border-dark my-3'></div> */}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Modal show={infoModal} onHide={() => setInfoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <InfoModal setInfoModal={setInfoModal} refatch={refatch} data={data} />
      </Modal>
      <Modal
        show={addressModal}
        size='lg'
        onHide={() => {
          setAddressModal(false)
          setAddress([])
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{address && address.length > 0 ? 'Edit' : 'Add'} Address</Modal.Title>
        </Modal.Header>
        <AddressModal
          refatch={refatch}
          setAddressModal={setAddressModal}
          setAddress={setAddress}
          data={data}
          address={address}
        />
      </Modal>
    </>
  )
}

export default View
