const ShowProducts = ({item, indx, store_info}) => {
  return (
    <tr>
      <td colSpan={2}>
        <div className='d-flex align-items-center gap-3'>
          <a href='#' className='symbol symbol-50px bg-secondary bg-opacity-25 rounded'>
            <img src={item?.thumbnail?.src} alt={item.name} />
          </a>
          <div className='d-flex flex-column text-muted'>
            <a href='#' className='text-dark text-hover-primary fw-bolder'>
              {item.name}
            </a>
            <div className='fs-7'>{item.slug}</div>
          </div>
        </div>
      </td>
      <td className=''>
        <div className='text-dark fs-7'>{indx === 0 && 'Purchase Price'}</div>
        <div className='text-muted fs-7 fw-bolder'>
          {store_info?.currency}: {item.price.base_cost}
        </div>
      </td>
      <td className=''>
        <div className='text-dark fs-7'>{indx === 0 && 'Discount'}</div>
        <div className='text-muted fs-7 fw-bolder'>
          {store_info?.currency}: {item.discount.campaign_discount_amount}
        </div>
      </td>
      <td className=''>
        <div className='text-dark fs-7'>{indx === 0 && 'Sale Price'}</div>
        <div className='text-muted fs-7 fw-bolder'>
          {store_info?.currency}: {item.price.base_sale}
        </div>
      </td>
      <td className=''>
        <div className='text-dark fs-7'>{indx === 0 && 'Stock'}</div>
        <div className='text-muted fs-7 fw-bolder'>
          {item.inventory.avilable === null ? 0 : item.inventory.avilable}
        </div>
      </td>
      {/* <td className=''>
        <div className='text-dark fs-7'>{indx === 0 && 'On hand'}</div>
        <div className='text-muted fs-7 fw-bolder'>
          {item.total_added - (item.committed + item.sold)}
        </div>
      </td> */}
    </tr>
  )
}

export default ShowProducts
