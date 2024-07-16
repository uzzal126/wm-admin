import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {findUnique} from '../../../../../../../modules/helper/misc'

const ProductModal = ({product, onChange, variant = {}}) => {
  const [attributes, setAttributes] = useState([])
  const [option, setOption] = useState('')
  const [opt2, setOpt2] = useState('')
  const [option1, setOption1] = useState([])
  const [option2, setOption2] = useState([])
  const [selectedAttr, setSelectedAttr] = useState({})
  const [post, setPost] = useState({
    id: 0,
    attribute_id: 0,
    discount: '',
    price: '',
    qty: 1,
    tax: 0,
    total_price: '',
  })

  useEffect(() => {
    updateProduct(product)
  }, [product])

  // // console.log(product)

  const updateProduct = (pro) => {
    // if (pro.stock <= 0) {
    //   toast.error('Insufficient Stock')
    // } else {
    setPost({...post, qty: pro.qty})
    setOption1([])
    setOption2([])
    setOption(pro.value)
    setOpt2('')
    setSelectedAttr([])
    handlerAttributes(pro)
    // }
  }

  const handlerAttributes = (product) => {
    let attributes = []
    let option1 =
      product &&
      product?.variants &&
      product?.variants.length > 0 &&
      product?.variants.filter((f) => f.option !== null)
    if (option1 && option1.length > 0) {
      if (option1.length === 1) {
        setSelectedAttr({
          ...option1[0],
          stock: option1[0].total_added - (option1[0].sold + option1[0].committed),
        })
        // handleFormData()
        onChange &&
          onChange(product, {
            ...option1[0],
            stock: option1[0].total_added - (option1[0].sold + option1[0].committed),
            qty: post.qty,
          })
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
        setAttributes(attributes)
      }
    }
  }

  const handerOption = (att) => {
    setOption(att)
    setOpt2('')
    setPost({...post, qty: 1})
    const option2 = product?.variants && product?.variants.filter((f) => f.value === att)
    let option1 = option2.filter((f) => f.option2 !== null)
    if (option1.length > 0) {
      let name = ''
      let value = []
      option1.map((p, i) => {
        name = p.option2
        // // console.log(p)
        value[i] = {
          ...p,
          name: p.value2,
          pd_id: p.pd_id,
          attr_id: p.id,
          stock: p.total_added - (p.sold + p.committed),
        }
      })
      value = findUnique(value, (d) => d.name)
      let attributes = {
        name,
        value,
      }
      setOption1(attributes)
      setSelectedAttr([])
    } else {
      setSelectedAttr({
        ...option2[0],
        stock: option2[0].total_added - (option2[0].sold + option2[0].committed),
      })
      // handleFormData()
      onChange &&
        onChange(product, {
          ...option2[0],
          stock: option2[0].total_added - (option2[0].sold + option2[0].committed),
          qty: post.qty,
        })
    }
  }

  const handerSetOption = (attribute) => {
    let att = JSON.parse(attribute)
    setOpt2(att.name)
    setPost({...post, qty: 1})
    const opt = product?.variants.filter((f) => f.value === option && f.value2 === att.name)
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
            stock: p.total_added - (p.sold + p.committed),
          }
        })
        value = findUnique(value, (d) => d.name)
        let attributes = {
          name,
          value,
        }
        setOption2(attributes)
        setSelectedAttr([])
      } else {
        setOption2([])
        setSelectedAttr({...att, stock: att.total_added - (att.sold + att.committed)})
        // handleFormData()
        // onChange &&
        onChange(product, {
          ...att,
          stock: att.total_added - (att.sold + att.committed),
          qty: post.qty,
        })
      }
    }
  }

  const handleFinalVariant = (value) => {
    // // console.log('aaatttt', value)
    setSelectedAttr(value)
    onChange(product, {
      ...value,
      stock: value.total_added - (value.sold + value.committed),
      qty: post.qty,
    })
  }

  return (
    <>
      {/* <Modal.Body> */}
      {product && Object.keys(product).length > 0 && (
        <div className='row py-3'>
          <div className='col text-center'>
            <div className='mb-5'>
              <img
                src={selectedAttr?.thumbnail?.src || product?.thumbnail?.src}
                alt={product?.name}
                className='img-fluid rounded'
              />
            </div>
          </div>
          <div className='col-8'>
            <h5>{product?.name || ''}</h5>
            {product?.isDeletedVariant && (
              <div>
                <p className='text-danger'>
                  {product?.option} : {product.value} is not available
                </p>
                <p className='text-warning'>Choose another variant -</p>
              </div>
            )}
            {!product?.isDeletedVariant && (
              <span>
                {product?.option} : {product.value}
              </span>
            )}
            {product?.variants && product?.variants.length > 0 && (
              <div className='attributes'>
                {attributes && (
                  <div className='d-flex flex-column'>
                    <div className='w-100'>
                      <label htmlFor='form-label text-capitalize'>{attributes?.name}</label>
                    </div>
                    <div className='btn-group'>
                      {attributes?.value && attributes?.value.length > 0 ? (
                        attributes?.value.length > 4 ? (
                          <select
                            className='form-select'
                            onChange={(e) => handerOption(e.target.value)}
                          >
                            <option>Select Option</option>
                            {attributes?.value.map((att, i) => (
                              <option value={att.value}>{att.value}</option>
                            ))}
                          </select>
                        ) : (
                          attributes?.value.map((att, i) => (
                            <label
                              key={i}
                              className={`btn btn-outline-secondary text-muted text-hover-white text-active-white btn-outline btn-active-success 
                                                            ${option === att.value && 'active'}`}
                              onClick={() => handerOption(att.value)}
                            >
                              {att.value}
                            </label>
                          ))
                        )
                      ) : null}
                    </div>
                  </div>
                )}
                {option1 && Object.keys(option1).length > 0 && (
                  <div className='clearfix mt-4'>
                    <div className='w-100'>
                      <label htmlFor='form-label text-capitalize'>{option1?.name}</label>
                    </div>

                    {option1?.value && option1?.value.length > 0 ? (
                      option1?.value.length > 4 ? (
                        <select
                          className='form-select'
                          onChange={(e) => handerSetOption(e.target.value)}
                        >
                          <option>Select Option</option>
                          {option1?.value.map((att, i) => (
                            <option value={JSON.stringify(att)} disabled={att.stock <= 0}>
                              {att.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className='btn-group'>
                          {option1?.value.map((att, i) => (
                            <label
                              key={i}
                              className={`btn btn-outline-secondary text-muted text-hover-white text-active-white btn-outline btn-active-info
                                                            ${att.stock <= 0 && 'disabled'}
                                                            ${opt2 && opt2 === att.name && 'active'}
                                                            `}
                              onClick={() => att.stock > 0 && handerSetOption(JSON.stringify(att))}
                            >
                              {att.name}
                            </label>
                          ))}
                        </div>
                      )
                    ) : null}
                  </div>
                )}
                {option2 && Object.keys(option2).length > 0 && (
                  <div className='clearfix mt-4'>
                    <div className='w-100'>
                      <label htmlFor='form-label text-capitalize'>{option2?.name}</label>
                    </div>
                    <div className='btn-group'>
                      {option2?.value && option2?.value.length > 0 ? (
                        option2?.value.length > 4 ? (
                          <select
                            className='form-select'
                            onChange={(e) => handleFinalVariant(JSON.parse(e.target.value))}
                          >
                            <option>Select Option</option>
                            {option2?.value.map((att, i) => (
                              <option value={JSON.stringify(att)} disabled={att.stock <= 0}>
                                {att.name}
                              </option>
                            ))}
                          </select>
                        ) : (
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
                                att.stock > 0 && handleFinalVariant(att)
                              }}
                            >
                              {att.name}
                            </label>
                          ))
                        )
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedAttr && Object.keys(selectedAttr).length > 0 && (
              <div className='row mb-0 mt-5'>
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
                      value={selectedAttr?.price.selling_price}
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
                        disabled={post?.qty === 1}
                        onClick={(e) => {
                          setPost({...post, qty: post.qty > 1 ? post.qty - 1 : 1})
                          onChange(product, {
                            ...selectedAttr,
                            qty: post.qty > 0 ? post.qty - 1 : 1,
                          })
                        }}
                      >
                        <i className='bi bi-dash fs-1'></i>
                      </button>
                      <input
                        type='text'
                        className='form-control text-center'
                        placeholder='Quantity'
                        readOnly
                        min={1}
                        value={post.qty}
                        onChange={(e) => {
                          setPost({...post, qty: parseInt(e.target.value)})
                          onChange(product, {
                            ...selectedAttr,
                            qty: parseInt(e.target.value),
                          })
                        }}
                      />
                      <button
                        className='btn btn-icon btn-outline btn-outline-secondary'
                        type='button'
                        onClick={(e) => {
                          post.qty < selectedAttr.stock
                            ? setPost({...post, qty: post.qty + 1})
                            : toast.error('Sorry insufficient stock')
                          onChange(product, {
                            ...selectedAttr,
                            qty: post.qty < selectedAttr.stock ? post.qty + 1 : post.qty,
                          })
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
    </>
  )
}

export default ProductModal
