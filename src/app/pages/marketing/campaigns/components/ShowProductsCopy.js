const ShowProducts = ({item, indx}) => {
  console.log('test item data >>', item)
  return (
    <tr>
      <td colSpan={2}>
        <div className='d-flex align-items-center gap-3'>
          <a href='#' className='symbol symbol-50px bg-secondary bg-opacity-25 rounded'>
            <img src={item.pd_img} alt='' />
          </a>
          <div className='d-flex flex-column text-muted'>
            <a href='#' className='text-dark text-hover-primary fw-bolder'>
              {item.pd_title}
            </a>
            <div className='fs-7'>{item.pd_slug}</div>
          </div>
        </div>
      </td>
      <td className=''>
        <div className='text-dark fs-7'>{indx === 0 && 'Purchase Price'}</div>
        <div className='text-muted fs-7 fw-bolder'>
          {item.currency}: {item.pd_price}
        </div>
      </td>
      <td className=''>
        <div className='text-dark fs-7'>{indx === 0 && 'Discount'}</div>
        <div className='text-muted fs-7 fw-bolder'>$: 5000</div>
      </td>
      <td className=''>
        <div className='text-dark fs-7'>{indx === 0 && 'Sale Price'}</div>
        <div className='text-muted fs-7 fw-bolder'>
          {item.currency}: {item.after_discount_pd_price}
        </div>
      </td>
      <td className=''>
        <div className='text-dark fs-7'>{indx === 0 && 'Stock'}</div>
        <div className='text-muted fs-7 fw-bolder'>{item.total_added}</div>
      </td>
      <td className=''>
        <div className='text-dark fs-7'>{indx === 0 && 'On hand'}</div>
        <div className='text-muted fs-7 fw-bolder'>
          {item.total_added - (item.committed + item.sold)}
        </div>
      </td>
    </tr>
  )
}

export default ShowProducts
