import {useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {
  POST_ORDER_PRODUCT_ADD,
  POST_ORDER_PRODUCT_DELETE,
  PRODUCT_DETAILS,
} from '../../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../../library/api.helper'
import {findUnique} from '../../../../../modules/helper/misc'

const EditProduct = ({setEditProductModal, prod, refatch, order}) => {
  const [product, setProduct] = useState([])
  const [attributes, setAttributes] = useState([])
  const [option, setOption] = useState('')
  const [option1, setOption1] = useState([])
  const [option2, setOption2] = useState([])
  const [selectedAttr, setSelectedAttr] = useState([])
  const [loading, setLoading] = useState(false)
  const [disable, setDisable] = useState(true)
  const [post, setPost] = useState({
    oid: 0,
    order_shipping_fee: 0,
    order_tax: 0,
    product_id: 0,
    attribute_id: 0,
    discount: 0,
    price: 0,
    qty: 1,
    total_price: 0,
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    // console.log(prod)
    const response = await getQueryRequest(`${PRODUCT_DETAILS}/prod.product_id`)
    if (response.success) {
      setProduct(response.data)
      handlerAttributes(response.data)
    }
  }

  const handlerAttributes = (product) => {
    let attributes = []
    let option1 =
      product &&
      product?.attributes.length > 0 &&
      product?.attributes.filter((f) => f.option !== null)
    if (option1.length > 0) {
      let name = ''
      let value = []
      option1.map((p, i) => {
        name = p.option
        value[i] = p
      })
      value = value.filter((v, i, a) => a.indexOf(v) === i)
      attributes = {
        name,
        value,
      }
      setAttributes(attributes)
    }
  }

  const handerOption = (att) => {
    // // console.log(att)
    setOption(att)
    const option2 = product?.attributes.filter((f) => f.value === att)
    let option1 = option2.filter((f) => f.option2 !== null)
    if (option1.length > 0) {
      let name = ''
      let value = []
      option1.map((p, i) => {
        name = p.option2
        value[i] = {
          ...p,
          name: p.value2,
          pd_id: p.pd_id,
          attr_id: p.attribute_id,
          stock: p.on_hand,
        }
      })
      value = findUnique(value, (d) => d.name)
      let attributes = {
        name,
        value,
      }
      setOption1(attributes)
      setSelectedAttr([])
      setDisable(true)
    } else {
      setSelectedAttr(option2[0])
      setDisable(false)
    }
  }

  const handerSetOption = (att) => {
    const opt = product?.attributes.filter((f) => f.value === option && f.value2 === att.name)
    if (opt.length > 0) {
      let option3 = opt.filter((f) => f.option3 !== null)
      if (option3.length > 0) {
        let name = ''
        let value = []
        option3.map((p, i) => {
          name = p.option3
          value[i] = {
            ...p,
            name: p.value3,
            pd_id: p.pd_id,
            attr_id: p.attribute_id,
            stock: p.on_hand,
          }
        })
        value = findUnique(value, (d) => d.name)
        let attributes = {
          name,
          value,
        }
        setOption2(attributes)
        setSelectedAttr([])
        setDisable(true)
      } else {
        setSelectedAttr(att)
        setDisable(false)
      }
    }
  }

  const hanldeFormData = async () => {
    let attr_id = selectedAttr.attribute_id ? selectedAttr.attribute_id : 0
    const discount = selectedAttr?.discount * post.qty
    const price = selectedAttr?.pd_price * post.qty
    const d = {
      ...post,
      oid: order?.id,
      order_shipping_fee: order?.shipping_fee.toString(),
      order_tax: '0',
      product_id: selectedAttr.pd_id,
      attribute_id: selectedAttr.attribute_id ? selectedAttr.attribute_id : 0,
      price: price.toString(),
      discount: discount.toString(),
      total_price: (price - discount).toString(),
    }

    if (prod.attribute_id === attr_id) {
      setPost(d)
      const res = await queryRequest(POST_ORDER_PRODUCT_DELETE, d)
      if (res.success) {
        refatch(true)
        setEditProductModal(false)
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } else {
      const post = {
        oid: order?.id,
        order_shipping_fee: order?.shipping_fee.toString(),
        order_tax: '0',
        product_id: prod.product_id,
        attribute_id: prod.attribute_id,
      }
      const dld = await queryRequest(POST_ORDER_PRODUCT_DELETE, post)
      if (dld.success) {
        const res = await queryRequest(POST_ORDER_PRODUCT_ADD, d)
        if (res.success) {
          refatch(true)
          setEditProductModal(false)
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      }
    }
  }

  // // console.log(selectedAttr)

  return (
    <>
      <Modal.Body>
        {product && product.length > 0 && (
          <div className='row'>
            <div className='col text-center'>
              <div className='mb-5'>
                <img
                  src={selectedAttr?.thumbnail_url || product?.pd_img}
                  alt={product?.pd_title}
                  className='img-fluid rounded'
                />
              </div>
              <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                {product?.pd_title}
              </a>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                ID:
                {product?.pd_id}
              </span>
            </div>
            <div className='col-8'>
              <div className='row mb-0'>
                <div className='col-md-6'>
                  <label htmlFor='form-label'>Price</label>
                  <div className='input-group'>
                    <span className='input-group-text' id='basic-addon1'>
                      ৳
                    </span>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Price'
                      value={product?.pd_price}
                      readOnly
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  {selectedAttr && Object.keys(selectedAttr).length > 0 && (
                    <div className='quantity'>
                      <label htmlFor='form-label'>Quantity</label>
                      <div className='input-group'>
                        <button
                          className='btn btn-icon btn-outline btn-outline-secondary'
                          type='button'
                          onClick={(e) => {
                            setPost({...post, qty: post.qty > 0 ? post.qty - 1 : 1})
                          }}
                        >
                          <i className='bi bi-dash fs-1'></i>
                        </button>
                        <input
                          type='text'
                          className='form-control text-center'
                          placeholder='Quantity'
                          readOnly
                          min='1'
                          value={post.qty}
                          onChange={(e) => setPost({...post, qty: parseInt(e.target.value)})}
                        />
                        <button
                          className='btn btn-icon btn-outline btn-outline-secondary'
                          type='button'
                          onClick={(e) => {
                            post.qty < selectedAttr.on_hand
                              ? setPost({...post, qty: post.qty + 1})
                              : toast.error('Sorry insufficient stock')
                          }}
                        >
                          <i className='bi bi-plus fs-1'></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {product?.attributes && product?.attributes.length > 0 && (
                <div className='attributes'>
                  {attributes && (
                    <div className='clearfix mt-4'>
                      <div className='w-100'>
                        <label htmlFor='form-label text-capitalize'>{attributes?.name}</label>
                      </div>
                      <div className='btn-group'>
                        {attributes?.value &&
                          attributes?.value.length > 0 &&
                          attributes?.value.map((att, i) => (
                            <label
                              key={i}
                              className={`btn btn-outline-secondary text-muted text-hover-white text-active-white btn-outline btn-active-success
                                                             ${att.on_hand <= 0 && 'disabled'} ${
                                option === att.value && 'active'
                              }`}
                              onClick={() => att.on_hand > 0 && handerOption(att.value)}
                            >
                              {att.value}
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                  {option1 && Object.keys(option1).length > 0 && (
                    <div className='clearfix mt-4'>
                      <div className='w-100'>
                        <label htmlFor='form-label text-capitalize'>{option1?.name}</label>
                      </div>
                      <div className='btn-group'>
                        {option1?.value &&
                          option1?.value.length > 0 &&
                          option1?.value.map((att, i) => (
                            <label
                              key={i}
                              className={`btn btn-outline-secondary text-muted text-hover-white text-active-white btn-outline btn-active-info
                                                            ${att.on_hand <= 0 && 'disabled'}
                                                            ${
                                                              selectedAttr &&
                                                              selectedAttr.name === att.name &&
                                                              'active'
                                                            }
                                                            `}
                              onClick={() => att.on_hand > 0 && handerSetOption(att)}
                            >
                              {att.name}
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                  {option2 && Object.keys(option2).length > 0 && (
                    <div className='clearfix mt-4'>
                      <div className='w-100'>
                        <label htmlFor='form-label text-capitalize'>{option2?.name}</label>
                      </div>
                      <div className='btn-group'>
                        {option2?.value &&
                          option2?.value.length > 0 &&
                          option2?.value.map((att, i) => (
                            <label
                              key={i}
                              className={`btn btn-outline-secondary text-muted text-hover-white text-active-white btn-outline btn-active-primary 
                                                            ${att.on_hand <= 0 && 'disabled'}
                                                            ${
                                                              selectedAttr &&
                                                              selectedAttr.attr_id ===
                                                                att.attr_id &&
                                                              'active'
                                                            }`}
                              onClick={() => att.on_hand > 0 && setSelectedAttr(att)}
                            >
                              {att.name}
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setEditProductModal(false)}>
          Close
        </Button>
        <Button variant='primary' disabled={disable} onClick={() => hanldeFormData()}>
          <span className={`indicator-label ${loading && 'd-none'}`}>Update Product</span>
          <span className={`indicator-progress ${loading && 'd-block'}`}>
            Please wait...{' '}
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        </Button>
      </Modal.Footer>
    </>
  )
}

export default EditProduct
