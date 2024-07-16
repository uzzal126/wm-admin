const RenderVariant = ({product}) => {
  return (
    <div>
      {product?.option !== 'Variant' && product?.option !== null && product?.option !== 'null' && (
        <div className='fw-bold text-gray-400'>
          {product?.option}: {product?.value}
        </div>
      )}
      {product?.option2 !== null && product?.option2 !== 'null' && (
        <div className='fw-bold text-gray-400'>
          {product?.option2}: {product?.value2}
        </div>
      )}
      {product?.option3 !== null && product?.option3 !== 'null' && (
        <div className='fw-bold text-gray-400'>
          {product?.option3}: {product?.value3}
        </div>
      )}
    </div>
  )
}

export default RenderVariant
