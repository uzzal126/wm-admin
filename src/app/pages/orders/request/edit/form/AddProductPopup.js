import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import toast, {Toaster} from 'react-hot-toast'
import {STOCK_LIST} from '../../../../../constants/api.constants'
import {changeOrderRequestStatus, getQueryRequest} from '../../../../../library/api.helper'
import {findUnique} from '../../../../../modules/helper/misc'

const AddNewProductModal = ({
  setAddProductModal,
  acceptedProducts,
  setAcceptedProducts,
  roid,
  index,
}) => {
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
    attribute_id: 0,
    discount: 0,
    price: 0,
    qty: 1,
    total_price: 0,
  })

  async function fetchData(e) {
    const post = `?search=${e.target.value}`
    if (post !== '') {
      const response = await getQueryRequest(STOCK_LIST + post)
      if (response.success) {
        setProducts(response.data)
      }
    }
  }

  const updateProduct = (pro) => {
    setProducts([])
    if (pro.on_hand == 0) {
      toast.error('Insufficient product stock')
      setOption1([])
      setOption2([])
      setOption('')
      setOpt2('')
      setProduct([])
      setSelectedAttr([])
      return
    } else {
      setProduct(pro)
      handlerAttributes(pro)
    }
  }

  const handlerAttributes = (product) => {
    let attributes = []
    let option1 =
      product &&
      product?.attributes.length > 0 &&
      product?.attributes.filter((f) => f.option !== null)
    if (option1.length > 0) {
      let value = []
      value = option1.filter(
        (
          (set) => (f) =>
            !set.has(f.value) && set.add(f.value)
        )(new Set())
      )
      // // console.log('list', value)
      attributes = {
        name: option1[0].option,
        value,
      }
      setAttributes(attributes)
    }
  }

  const handerOption = (att) => {
    setOption(att.value)
    setPost({...post, qty: 1})
    // // console.log(att)
    const option2 = product?.attributes.filter((f) => f.value === att.value)
    // // console.log(option2)
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
    setOpt2(att.name)
    setPost({...post, qty: 1})
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
        setOption2([])
        setSelectedAttr(att)
        setDisable(false)
      }
    }
  }

  const handleAddProduct = async () => {
    // console.log('selectedAttr', selectedAttr)
    // console.log('product', product)
    if (selectedAttr.length > 0 || Object.keys(selectedAttr).length > 0) {
      const discount = product?.discount * post.qty
      const price = product?.pd_price * post.qty
      const attribute_id = selectedAttr.attr_id || selectedAttr.attribute_id
      const qty = post.qty
      const id = product.pd_id
      const total_price = (product?.pd_price_after_discount * post.qty).toString()
      const attributes = product.attributes
      const attribute = attributes.filter((el) => el.attribute_id == attribute_id)[0]

      const newList = [
        ...acceptedProducts,
        {
          ...attribute,
          id,
          attribute_id,
          price,
          total_price,
          discount,
          qty,
          pd_img: product?.pd_img,
          pd_title: product?.pd_title,
          idx: index,
        },
      ]
      const resp = await changeOrderRequestStatus(1, 101, roid, product.pd_id, 'accepted')
      // // console.log('product', newList)
      if (resp.success) {
        setAcceptedProducts(newList)
        setAddProductModal(false)
      }
    } else {
      toast.error('Please select verient')
    }
  }

  return (
    <>
      <Toaster />
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
                  <p key={i} className='list-group-item' onClick={() => updateProduct(pro)}>
                    {pro?.pd_title}
                  </p>
                ))}
            </ul>
          </div>
        </div>
        {product && product.length > 0 && (
          <div className='row'>
            <div className='col text-center'>
              <div className='mb-5'>
                <img src={product?.pd_img} alt={product?.pd_title} className='img-fluid rounded' />
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
                          onClick={() => {
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
                          onClick={() => {
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
                              ${option === att.value && 'active'}`}
                              onClick={() => handerOption(att)}
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
                                                            ${opt2 && opt2 === att.name && 'active'}
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
                              onClick={() => {
                                setPost({...post, qty: 1})
                                setDisable(false)
                                att.on_hand > 0 && setSelectedAttr(att)
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
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setAddProductModal(false)}>
          Close
        </Button>
        <Button variant='primary' onClick={() => handleAddProduct()}>
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
