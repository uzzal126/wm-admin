import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import swal from 'sweetalert'
import {
    GET_PRODUCT_LIST,
    GET_PRODUCT_VARIANTS,
    POST_ORDER_PRODUCT_ADD,
} from '../../../../../constants/api.constants'
import { getQueryRequest, queryRequest } from '../../../../../library/api.helper'
import { findUnique } from '../../../../../modules/helper/misc'

const AddNewProductModal = ({setAddProductModal, order, refatch}) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [attributes, setAttributes] = useState([])
  const [option, setOption] = useState('')
  const [opt2, setOpt2] = useState('')
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
    id: 0,
    discount: 0,
    price: 0,
    qty: 1,
    total_price: 0,
  })

  async function fetchData(e) {
    const post = `?page=1&items_per_page=10&search=${e.target.value}`
    if (post !== '') {
      const response = await getQueryRequest(GET_PRODUCT_LIST + post)
      if (response.success) {
        setProducts(response.data)
      }
    }
  }

  const updateProduct = async (pro) => {
    if (pro.variant_count <= 0) {
      toast.error('No Variant Found')
    } else {
      // console.log(pro)
      const response = await getQueryRequest(`${GET_PRODUCT_VARIANTS}/${pro.prod_id}`)
      if (response.success && response.status_code === 200) {
        if (response.data.length > 0) {
          if (response.data.length > 1) {
            let variants = []
            response.data.map((item) => {
              variants.push({...item, stock: item.total_added - (item.committed + item.sold)})
            })
            let product = {...pro, variants: variants}
            setProducts([])
            setOption1([])
            setOption2([])
            setOption('')
            setOpt2('')
            setSelectedAttr([])
            setProduct(product)
            handlerAttributes(product)
          }
        }
      }
    }
  }

  const handlerAttributes = (product) => {
    let attributes = []
    let option1 =
      product && product?.variants.length > 0 && product?.variants.filter((f) => f.option !== null)
    if (option1.length > 0) {
      if (option1.length === 1) {
        setSelectedAttr(option1[0])
        setDisable(false)
      } else {
        let value = []
        value = option1.filter(
          (
            (set) => (f) =>
              !set.has(f.value) && set.add(f.value)
          )(new Set())
        )
        attributes = {
          name: option1[0].option,
          value,
        }
        // console.log(attributes)
        setAttributes(attributes)
      }
    }
  }

  const handlerOption = (att) => {
    setOption(att.value)
    setOpt2('')
    setPost({...post, qty: 1})
    const option2 = product?.variants.filter((f) => f.value === att.value)
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
          attr_id: p.id,
          stock: p.stock,
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
    setOpt2(att.name)
    setPost({...post, qty: 1})
    const opt = product?.variants.filter((f) => f.value === option && f.value2 === att.name)
    // // console.log('opt', opt)
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
            attr_id: p.id,
            stock: p.stock,
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
        setOption2([])
        setSelectedAttr(att)
        setDisable(false)
      }
    }
  }

  const hanldeFormData = async () => {
    const discount = selectedAttr?.discount * post.qty
    const price = selectedAttr?.pd_price * post.qty
    const d = {
      ...post,
      oid: order?.id,
      order_shipping_fee: order?.shipping_fee.toString(),
      order_tax: '0',
      product_id: selectedAttr.pd_id,
      id: selectedAttr.attr_id || selectedAttr.id || 0,
      price: price.toString(),
      discount: discount.toString(),
      total_price: (price - discount).toString(),
    }
    setPost(d)
    // // console.log(d)
    const res = await queryRequest(POST_ORDER_PRODUCT_ADD, d)
    if (res.success) {
      refatch(true)
      setAddProductModal(false)
      toast.success('Product added successfully')
    } else {
      swal(res.message)
    }
  }
  // // console.log(product)
  // // console.log('selectedAttr', selectedAttr)
  return (
    <>
      <Modal.Body>
        <div className='mb-5 position-relative'>
          <input
            type='text'
            className='form-control'
            name=''
            placeholder='Search Products'
            onChange={(e) => fetchData(e)}
          />
          <div
            className={`position-absolute w-100 bg-white z-index-3 star-0 ${
              products.length <= 0 && 'd-none'
            } `}
          >
            <ul className='list-group rounded-0'>
              {products &&
                products.length > 0 &&
                products.map((pro, i) => (
                  <div
                    key={i}
                    onClick={() => updateProduct(pro)}
                    className='px-2 my-1 d-flex align-items-center'
                  >
                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                      <div className='symbol-label'>
                        <img
                          src={(pro?.thumbnail && pro?.thumbnail.src) || ''}
                          alt={pro?.name}
                          className='w-100'
                        />
                      </div>
                    </div>
                    <div className='d-flex flex-column'>
                      {pro?.name}
                      <span className='fw-bold text-gray-400'>SKU: {pro?.sku}</span>
                    </div>
                  </div>
                ))}
            </ul>
          </div>
        </div>
        {product && Object.keys(product).length > 0 && (
          <div className='row'>
            <div className='col text-center'>
              <div className='mb-5'>
                <img
                  src={selectedAttr?.thumbnail?.src || product?.thumbnail.src}
                  alt={product?.name}
                  className='img-fluid rounded'
                />
              </div>
              <p className='text-dark fw-bolder text-hover-primary fs-6 mb-0'>{product?.name}</p>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                SKU:
                {product?.sku}
              </span>
            </div>
            <div className='col-8'>
              {product?.variants && product?.variants.length > 0 && (
                <div className='attributes mb-2'>
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
                                                            ${option === att.value && 'active'}`}
                              onClick={() => handlerOption(att)}
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
                                                            ${att.stock <= 0 && 'disabled'}
                                                            ${opt2 && opt2 === att.name && 'active'}
                                                            `}
                              onClick={() => att.stock > 0 && handerSetOption(att)}
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
                                                            ${att.stock <= 0 && 'disabled'}
                                                            ${
                                                              selectedAttr &&
                                                              selectedAttr.attr_id ===
                                                                att.attr_id &&
                                                              'active'
                                                            }`}
                              onClick={() => {
                                setPost({...post, qty: 1})
                                setDisable(false)
                                att.stock > 0 && setSelectedAttr(att)
                              }}
                            >
                              {att.name}
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {selectedAttr && Object.keys(selectedAttr).length > 0 && (
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
                        value={selectedAttr?.price?.selling_price}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
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
                            post.qty < selectedAttr.stock
                              ? setPost({...post, qty: post.qty + 1})
                              : toast.error('Sorry insufficient stock')
                          }}
                        >
                          <i className='bi bi-plus fs-1'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setAddProductModal(false)}>
          Close
        </Button>
        <Button variant='primary' disabled={disable} onClick={() => hanldeFormData()}>
          <span className={`indicator-label ${loading && 'd-none'}`}>Add Product</span>
          <span className={`indicator-progress ${loading && 'd-block'}`}>
            Please wait...{' '}
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        </Button>
      </Modal.Footer>
    </>
  )
}

export default AddNewProductModal
