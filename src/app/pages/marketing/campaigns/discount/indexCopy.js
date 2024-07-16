import {useEffect, useState} from 'react'
import SelectSearch from 'react-select-search'
import 'react-select-search/style.css'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {getCatData} from '../../../../../_metronic/partials/content/forms/category/categoryQuery'
import {
  GET_CAMPAIGN_PRODUCT,
  GET_PRODUCT_LIST,
  POST_CAMPAIGN_PRODUCT,
} from '../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../library/api.helper'
import {Link} from '../../../../modules/helper/linkHandler'

const DiscountProduct = ({camp}) => {
  const [products, setProducts] = useState([])
  const [pdIds, setPdIds] = useState([])
  const [btn, setBTN] = useState('product')

  console.log('pdIds data >>', pdIds)
  console.log('products data >>', products)

  useEffect(() => {
    getData()
    // if (btn === 'product')
    //     getSearchable();
  }, [])

  const getData = async () => {
    let res = await getQueryRequest(`${GET_CAMPAIGN_PRODUCT}/${camp}/?page=1&items_per_page=10`)
    if (res.success && res.status_code === 200) {
      setProducts(res.data)
      handleOnChangeProducts(res.data)
    }
  }
  const getSearchable = async (search) => {
    const qnt = `?page=1&items_per_page=30&purpose=compaign&related_id=${camp}${
      search && '&search=' + search
    }`
    let res = await getQueryRequest(`${GET_PRODUCT_LIST}/${qnt}`)
    if (res.success && res.status_code === 200) {
      let list = []

      res.data &&
        res.data.length > 0 &&
        res.data.map((item) => {
          const option = {
            ...item,
            value: JSON.stringify({...item, type: 'product'}),
          }
          list.push(option)
        })
      // setSearchField(list)
      return list || []
    } else {
      return []
    }
  }
  const getSearchaByCategort = async (id) => {
    const qnt = `?page=1&items_per_page=1000&purpose=compaign`
    let res = await getQueryRequest(`${GET_PRODUCT_LIST}/category/${id}/${qnt}`)
    // // console.log(res)
    if (res.success && res.status_code === 200) {
      let product = [...products]
      let ids = [...pdIds]
      res.data &&
        res.data.length > 0 &&
        res.data.map((item) => {
          const idCheck = pdIds && pdIds.length > 0 && pdIds.filter((f) => f.id === item.id)
          if (idCheck.length > 0) {
            toast.error('This product already added', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          } else {
            product.push(item)
            ids.push({
              id: item.id,
              discount:
                typeof item.campaigns === 'string'
                  ? JSON.parse(item.campaigns).length > 0
                    ? JSON.parse(item.campaigns)[0].discount
                    : 0
                  : 0,
            })
          }
        })
      setPdIds(ids)
      setProducts(product)
    } else {
      toast.error('No product found or added another campaign', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const loadOptions = async (search) => {
    if (btn === 'product') {
      return await getSearchable(search)
    } else if (btn === 'category') {
      const category = await getCatData()
      if (category && category.length > 0) {
        const list = []
        category.map((item, i) => {
          list[i] = {
            ...item,
            value: JSON.stringify({...item, type: 'category'}),
          }
        })
        return list
      } else {
        return []
      }
    }
  }

  const handleOnChangeProducts = (products) => {
    if (products && products.length > 0) {
      const pdid = [...pdIds]
      products.map((item) => {
        const idCheck = pdIds && pdIds.length > 0 && pdIds.filter((f) => f.id === item.id)
        if (!idCheck || idCheck.length <= 0) {
          const newId = {
            id: item.id,
            discount:
              typeof item.campaigns === 'string'
                ? JSON.parse(item.campaigns).length > 0
                  ? JSON.parse(item.campaigns)[0].discount
                  : 0
                : 0,
          }
          pdid.push(newId)
        }
      })
      setPdIds(pdid)
    }
  }

  const handleOnChange = async (item) => {
    // // console.log(item)
    if (item !== '') {
      let parseItem = JSON.parse(item)
      // // console.log(parseItem)
      parseItem = {
        ...parseItem,
        general_discount_amount:
          parseItem.discount_type === 'Fixed'
            ? parseItem.general_discount
            : (parseItem.general_discount * parseItem.pd_price) / 100,
      }
      if (parseItem) {
        if (parseItem.type === 'product') {
          addProduct(parseItem)
        } else if (parseItem.type === 'category') {
          await getSearchaByCategort(parseItem.id)
        }
      }
    }
  }

  const addProduct = (prod) => {
    const idCheck = pdIds && pdIds.length > 0 && pdIds.filter((f) => f.id === prod.id)
    if (idCheck.length > 0) {
      toast.error('This product already added', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      let product = [...products]
      product.push(prod)
      setPdIds([
        ...pdIds,
        {
          id: prod.id,
          discount: 0,
        },
      ])
      setProducts(product)
    }
  }

  const handlerRemove = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once you remove this product!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        let ids = pdIds && pdIds.length > 0 && pdIds.filter((f) => f.id !== id)
        setPdIds(ids)
        let product = products && products.length > 0 && products.filter((f) => f.id !== id)
        // // console.log(product)
        setProducts(product)
      }
    })
  }

  const showVal = (id) => {
    const newid = pdIds.filter((f) => f.id === id)
    if (newid.length > 0) {
      return newid[0].discount
    } else {
      return ''
    }
  }
  const handleBulkDiuscounts = (val) => {
    if (pdIds && pdIds.length > 0) {
      const pdid = [...pdIds]
      pdid.map((nid, i) => {
        pdid[i] = {
          ...nid,
          discount: val,
        }
      })
      setPdIds(pdid)
    }
  }
  const handleDiuscounts = (val, checkId) => {
    if (pdIds && pdIds.length > 0) {
      const pdid = [...pdIds]
      pdid.map((nid, i) => {
        if (nid.id === checkId)
          pdid[i] = {
            ...nid,
            discount: val.toString(),
          }
      })
      setPdIds(pdid)
    }
  }

  const handleOnAssign = async () => {
    const post = {
      products: [...pdIds],
      camp_id: parseInt(camp),
    }
    let res = await queryRequest(`${POST_CAMPAIGN_PRODUCT}`, post)
    if (res.success && res.status_code === 200) {
      toast.success(res.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.error(res.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    // // console.log(post)
  }

  return (
    <>
      <div className='row'>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              <div className='row g-4 align-items-center'>
                <div className='col-auto'>
                  <div className='d-flex' data-kt-buttons='true'>
                    <button
                      onClick={() => setBTN('category')}
                      className={`btn-sm btn btn-light btn-active-primary ${
                        btn === 'category' && 'active'
                      }`}
                    >
                      Category
                    </button>
                    <div className='p-4'>OR</div>
                    <button
                      onClick={() => setBTN('product')}
                      className={`btn-sm btn btn-light btn-active-primary ${
                        btn === 'product' && 'active'
                      } `}
                    >
                      Product
                    </button>
                  </div>
                </div>
                <div className='col-lg-4' id='pdrt'>
                  {btn && (
                    <div className='d-block'>
                      <SelectSearch
                        options={[]}
                        value=''
                        search
                        getOptions={(query) => loadOptions(query)}
                        onChange={(e) => handleOnChange(e)}
                        emptyMessage='Product not found'
                        placeholder='Search your product'
                      />
                    </div>
                  )}
                </div>
                <div className='col'>
                  <div className='input-group input-group-sm'>
                    <input
                      type='text'
                      className='form-control mw-200px'
                      placeholder='Bulk Discount'
                      aria-label='Bulk Discount'
                      onChange={(e) => handleBulkDiuscounts(e.target.value)}
                    />
                    <span className='input-group-text' id='basic-addon2'>
                      ৳
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 mt-5'>
          <div className='tab-content'>
            <div id='kt_project_users_table_pane' className='tab-pane fade active show'>
              <div className='card card-flush'>
                <div className='card-body pb-0'>
                  <table className='table align-middle table-row-dashed table-row-gray-300 fs-6 gy-2'>
                    <thead>
                      <tr className='text-start fw-bolder fs-7 border-gray-800 text-uppercase gs-0'>
                        <th className='' rowSpan={2}>
                          Name
                        </th>
                        <th className='' rowSpan={2}>
                          Category
                        </th>
                        <th className='' rowSpan={2}>
                          Stock
                        </th>
                        <th className='' rowSpan={2}>
                          Saling Price
                        </th>
                        <th className='text-center' colSpan={2}>
                          Existing Discount
                        </th>
                        {/* <th className=" rowSpan={2}>Discount</th> */}
                        <th className='w-100px' rowSpan={2}>
                          Action
                        </th>
                      </tr>
                      <tr className='text-start fw-bolder fs-7 border-gray-800 text-uppercase gs-0'>
                        <th>General</th>
                        <th>Campaign</th>
                      </tr>
                    </thead>
                    <tbody className='fw-bolder'>
                      {products &&
                        products.length > 0 &&
                        products.map((prod, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <div className='d-flex align-items-center gap-3'>
                                  <Link
                                    to={`products/edit/${prod.prod_id}`}
                                    className='symbol symbol-50px bg-secondary bg-opacity-25 rounded'
                                  >
                                    <img src={prod.thumbnail.src} alt={prod.name} />
                                  </Link>
                                  <div className='d-flex flex-column text-muted'>
                                    <Link
                                      to={'products/edit/'}
                                      className='text-dark text-hover-primary fw-bolder'
                                    >
                                      {prod.pd_title || prod.name}
                                    </Link>
                                    <div
                                      className='fs-7'
                                      data-kt-docs-datatable-subtable='template_description'
                                    >
                                      SKU: {prod.sku}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className=''>
                                <div className='text-muted fs-7 fw-bolder'>
                                  {prod.categories.toString()}
                                </div>
                              </td>
                              <td className=''>
                                <div className='text-muted fs-7 fw-bolder'>{prod?.in_stock}</div>
                              </td>
                              <td className=''>
                                <div className='text-muted fs-7 fw-bolder'>
                                  {prod.price?.min === prod.price?.max
                                    ? prod.price?.min
                                    : `${prod.price?.min} - ${prod.price?.max}`}
                                </div>
                              </td>
                              <td className=''>
                                <div className='text-muted fs-7 fw-bolder'>
                                  {prod.general_discount_amount}
                                </div>
                              </td>
                              <td className='w-100px'>
                                <div className='input-group input-group-sm w-150px'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Bulk Discount'
                                    value={showVal(prod.id)}
                                    onChange={(e) => handleDiuscounts(e.target.value, prod.id)}
                                    aria-label='Bulk Discount'
                                    aria-describedby='basic-addon2'
                                  />
                                  <span className='input-group-text' id='basic-addon2'>
                                    ৳
                                  </span>
                                </div>
                              </td>
                              <td className=''>
                                <button
                                  className='btn btn-sm btn-icon btn-light-danger w-30px h-30px'
                                  onClick={() => handlerRemove(prod.id || prod.id)}
                                >
                                  <i className='la la-trash-o fs-3'></i>
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                  <div className='d-flex justify-content-end py-4'>
                    <button className='btn btn-dark' onClick={() => handleOnAssign()}>
                      UPDATE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DiscountProduct
