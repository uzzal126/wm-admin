import axios from 'axios'
import {FC, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {MenuComponent} from '../../../../_metronic/assets/ts/components'
import {PRODUCT_STOCK_HISTORY, PRODUCT_STOCK_UPDATE} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'
import {dateUnixReadable} from '../../../modules/helper/misc'
import DeletedVariants from './deletedVariants'
// import {StockAlert} from './StockAlert'
import {UpdateStock} from './UpdateStock'
type Props = {
  attributes: any
  pid: any
  reFetch: any
  reload: any
}

const RenderTable: FC<Props> = ({attributes, pid, reFetch, reload}) => {
  const [show, setShow] = useState(false)
  const [qty, setQty] = useState(0)
  const [historyData, setHistory] = useState<any>([])
  const [selectedVariant, setSelectedVariant] = useState<any>(0)

  const handleClose = () => setShow(false)
  const handleShow = async (id: any, att: any) => {
    const prop = {
      prod_id: id,
      attribute_id: att.id || 0,
    }
    const data = await queryRequest(PRODUCT_STOCK_HISTORY, prop)
    if (data.success && data.status_code === 200) {
      setSelectedVariant(att)
      setHistory(data.data)
      setShow(true)
    }
  }
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const updateBulkStock = async () => {
    const post: any = []
    if (attributes && attributes.length > 0) {
      attributes.map((item: any) => {
        const available = item.total_added - item.committed + item.sold
        const checkQty = available + qty
        post.push({
          prod_id: pid,
          attribute_id: item.id,
          qty: checkQty <= 0 ? -available : qty,
        })
      })
    }
    await updateBulk(post)
    reFetch()
    setQty(0)
  }

  const updateBulk = async (post: any) => {
    const requests = post.map((item: any) =>
      axios({
        method: 'post',
        url: `${PRODUCT_STOCK_UPDATE}`,
        data: {
          ...item,
        },
      })
    )
    // // console.log(requests)
    // return
    try {
      await axios.all(requests).then((e) => {
        return e
      })
    } catch (err: any) {
      console.log(err?.response?.data?.message)
      toast.error(err?.response?.data?.message || 'Sorry! An error occured.')
    }
  }

  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <DeletedVariants pid={pid} />
        <div className='d-flex ms-auto mw-200px'>
          <div className='w-100'>
            <input
              type='number'
              className='form-control form-control-sm min-w-70px'
              value={qty || ''}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>
          <div className='flex-auto'>
            <button
              className='btn btn-icon btn-secondary btn-sm'
              onClick={updateBulkStock}
              disabled={qty === 0}
            >
              <span className='indicator-label'>
                <i className='fas fa-plus'></i>
              </span>
              <span className='indicator-progress'>
                <span className='spinner-border spinner-border-sm align-middle'></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table align-middle table-row-dashed fs-6 gy-1 dataTable no-footer'>
          <thead>
            <tr className='text-start fw-bolder fs-7 text-uppercase gs-0'>
              <th className='text-center'>Variants</th>
              <th className='text-center'>Price (৳)</th>
              {/* <th className='text-center'>Total Added</th> */}
              <th className='text-center'>Unit Sold</th>
              <th className='text-center'>COMMITTED</th>
              <th className='text-center'>Returned</th>
              <th className='text-end'>In Stock</th>
              <th className='text-center w-175px'>ADD STOCK</th>
            </tr>
          </thead>
          <tbody>
            {attributes &&
              attributes.length > 0 &&
              attributes.map((at: any, i: any) => (
                <tr key={i}>
                  <td className='text-start'>
                    <div className='d-flex align-items-center ps-lg-8'>
                      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                        <div className='symbol-label'>
                          <img src={at?.thumbnail.src} alt={''} className='w-100' />
                        </div>
                      </div>
                      <div className='d-flex gap-4'>
                        {at.option && at.option !== 'null' ? (
                          <div className='d-flex flex-column'>
                            {at.option === 'Variant' ? at.name : at.option}
                            <span className='fw-bold text-gray-400'>
                              {at.value !== 'Default' ? at.value : ''}
                            </span>
                          </div>
                        ) : null}
                        {at.option2 && at.option2 !== 'null' ? (
                          <div className='d-flex flex-column'>
                            {at.option2}
                            <span className='fw-bold text-gray-400'>{at.value2}</span>
                          </div>
                        ) : null}
                        {at.option3 && at.option3 !== 'null' ? (
                          <div className='d-flex flex-column'>
                            {at.option3}
                            <span className='fw-bold text-gray-400'>{at.value3}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className='text-center'>{at.price.selling_price}</td>
                  {/* <td className='text-center'>{at.total_added}</td> */}
                  <td className='text-center'>{at.sold}</td>
                  <td className='text-center'>{at.committed}</td>
                  <td className='text-center'>{at.returned}</td>
                  <td className='text-end '>
                    <div className='d-flex align-items-center justify-content-end'>
                      {at.total_added - (at.sold + at.committed) === 0 ? (
                        <>
                          <span className='badge badge-light-danger me-2'>stock out</span>
                          <span className='fw-bold text-danger'>
                            {at.total_added - (at.sold + at.committed)}
                          </span>
                        </>
                      ) : at.low_stock_threshold >= at.total_added - (at.sold + at.committed) ? (
                        <>
                          <span className='badge badge-light-warning me-2'>low stock</span>
                          <span className='fw-bold text-warning'>
                            {at.total_added - (at.sold + at.committed)}
                          </span>
                        </>
                      ) : (
                        at.total_added - (at.sold + at.committed)
                      )}
                    </div>
                  </td>
                  {/* <td>
                  <button
                    disabled={false}
                    type='button'
                    className='btn-action rounded fw-bold bg-transparent border-transparent mx-3 min-w-25px'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                  >
                    Set Low Stock
                  </button>
                  <div
                    className='menu menu-sub text-start menu-sub-dropdown w-175px p-2'
                    data-kt-menu='true'
                  >
                    <StockAlert proId={pid} variant={at} reFetch={reFetch} />
                  </div>
                </td> */}
                  <td className='w-200px'>
                    <div className='d-flex w-200px'>
                      <UpdateStock proId={pid} variant={at} reFetch={reFetch} />
                      <div>
                        <button
                          className='btn btn-primary btn-sm btn-icon ms-2'
                          onClick={() => handleShow(pid, at)}
                        >
                          <i className='fas fa-eye'></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className=' w-100'>
              <div className='d-flex flex-column align-items-center justify-content-center'>
                <div className='me-3'>Stock Adjustments History</div>
                {selectedVariant.option && selectedVariant.option !== 'null' ? (
                  <div className='d-flex text-primary'>
                    {selectedVariant.option === 'Variant'
                      ? selectedVariant.name
                      : selectedVariant.option + ' : '}
                    <span className='fw-bold ms-2 '>
                      {selectedVariant.value !== 'Default' ? selectedVariant.value : ''}
                    </span>
                  </div>
                ) : null}
                {selectedVariant.option1 && selectedVariant.option1 !== 'null' ? (
                  <div className='d-flex text-primary'>
                    {selectedVariant.option1}
                    <span className='fw-bold ms-2 '>{selectedVariant.value1}</span>
                  </div>
                ) : null}
                {selectedVariant.option2 && selectedVariant.option2 !== 'null' ? (
                  <div className='d-flex text-primary'>
                    {selectedVariant.option2}
                    <span className='fw-bold ms-2 '>{selectedVariant.value3}</span>
                  </div>
                ) : null}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='table-responsive'>
              <table className='table align-middle table-row-dashed fs-6 gy-3'>
                <thead className='table-inf'>
                  <tr className='text-start fw-bolder fs-7 text-uppercase gs-0'>
                    <th className='ps-2'>Date</th>
                    {/* <th>Description</th> */}
                    <th className='text-center'>Quantity</th>
                    <th>User Name</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.length > 0 &&
                    historyData.map((item: any, i: number) => (
                      <tr key={`hi-${i}`} className='text-gray-600'>
                        <td className='ps-2'>{dateUnixReadable(item?.updated_at)}</td>
                        <td className='text-center'>{item?.qty}</td>
                        <td>{item?.created_by}</td>
                      </tr>
                    ))}
                </tbody>
                <tfoot className='table-primary'>
                  <tr>
                    <td className='ps-2 rounded-start'>Total Added</td>
                    <td className='text-center'>{selectedVariant.total_added}</td>
                    <td className='rounded-end'></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default RenderTable
