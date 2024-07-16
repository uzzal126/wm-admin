import {Modal} from 'react-bootstrap'

type Props = {
  show: boolean
  setShow: any
  productList: any
  setProductList: any
  allProducts: any
  refetch: any
  currentLeastAmount: any
  setLeastProductCost: any
  setErrors: any
}

function ProductListModal({
  show,
  setShow,
  productList = [],
  setProductList,
  allProducts = [],
  refetch = () => null,
  currentLeastAmount = 0,
  setLeastProductCost = () => null,
  setErrors = () => null,
}: Props) {
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
        refetch()
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Products</Modal.Title>
      </Modal.Header>
      <Modal.Body className='shadow-sm'>
        {allProducts
          .filter((f: any) => productList.includes(f.id?.toString()))
          ?.map((item: any, indx: number) => (
            <tr key={indx}>
              <td className='w-100'>
                <div className='d-flex align-items-center'>
                  <div className='me-5 position-relative'>
                    <div className='symbol symbol-60px symbol-circle'>
                      <img alt='Pic' src={item.thumbnail?.src} />
                    </div>
                  </div>
                  <div className='d-flex flex-column justify-content-center'>
                    <span
                      className='fs-6 text-gray-800 text-hover-primary'
                      style={{cursor: 'pointer'}}
                    >
                      {item.name}
                    </span>
                    <div className='fw-bold text-gray-400'>SKU: {item.sku}</div>
                  </div>
                </div>
                <div></div>
              </td>
              <td>
                {item.price?.min === item.price?.max
                  ? item.price?.min
                  : `${item.price?.min} - ${item.price?.max}`}
              </td>
              <td>
                <button
                  className='btn btn-sm btn-icon btn-light-danger w-30px h-30px mx-2'
                  data-bs-custom-class='cs-tooltip'
                  data-kt-users-table-filter='delete_row'
                  onClick={() => {
                    let myArr = [...productList]
                    const index = myArr.findIndex((f: any) => parseInt(f) === parseInt(item.id))
                    myArr.splice(index, 1)
                    setProductList(myArr)
                    if (productList && productList?.length > 0) {
                      let leastPriceArray: any =
                        allProducts &&
                        allProducts?.length > 0 &&
                        allProducts
                          .filter((f: any) => myArr.includes(f.id?.toString()))
                          ?.map((item: any) => item?.price?.min)
                      let leastPrice = Math.min(...leastPriceArray)
                      setLeastProductCost(leastPrice)
                      if (leastPrice > parseInt(currentLeastAmount)) {
                        setErrors({})
                      }
                    }
                  }}
                  data-bs-toggle='tooltip'
                  data-bs-dimiss='click'
                  title='Delete product'
                >
                  <i className='la la-trash-o fs-3'></i>
                </button>
              </td>
            </tr>
          ))}
      </Modal.Body>
    </Modal>
  )
}

export default ProductListModal
