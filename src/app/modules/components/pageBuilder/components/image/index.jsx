import {useEffect} from 'react'
const defaultImage = '/media/products/dummy-product.jpg'

const ImageComp = ({data}) => {
  useEffect(() => {
    console.log('img url', data?.content)
  }, [data?.toString()])
  return (
    <div className={`d-flex flex-column align-items-${data?.setting?.position}`}>
      {data?.setting?.style !== 'inline' && <h2>{data?.content?.title}</h2>}
      {data?.setting?.style === 'inline' && (
        <div
          className='px-2 py-2 d-flex align-items-center flex-column text-center'
          style={{
            background: 'rgba(37, 41, 41, 0.6)',
            borderRadius: '10px',
            width: data?.setting?.width ? data?.setting?.width * 0.6 : '60%',
            position: 'absolute',
            marginTop: data?.setting?.width ? data?.setting?.width * 0.5 : '50%',
          }}
        >
          <h3 style={{color: 'white', marginTop: 5}}>{data?.content?.title}</h3>
        </div>
      )}
      <a href={data?.content?.link || '#'}>
        <img
          alt=''
          src={data?.content?.url || defaultImage}
          className='img-fluid'
          width={data?.setting?.fullWidth ? `100%` : data?.setting?.width || 400}
          height={data?.setting?.height || 'auto'}
          style={{
            boxShadow: data?.setting?.shadow ? '3px 11px 19px 0px rgba(107,98,98,0.85)' : null,
            border: data?.setting?.border ? '2px solid black' : null,
          }}
        />
      </a>
      <h5 className='py-5'>{data?.content?.caption}</h5>
    </div>
  )
}

export default ImageComp
