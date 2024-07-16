function NotFound({placeholder = 'No matching records found'}) {
  return (
    <div
      className='d-flex text-center w-100 align-content-center justify-content-center my-5'
      style={{fontSize: 15}}
    >
      <span className='mx-2'>
        <i className='fa fa-circle-info' style={{fontSize: 16}} />
      </span>
      {placeholder}
    </div>
  )
}

export default NotFound
