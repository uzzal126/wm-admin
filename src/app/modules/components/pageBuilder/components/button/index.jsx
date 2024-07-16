const ButtonComponent = ({data}) => {
  /* let btnClassMap = {
    rounded: 'rounded-pill',
    'semi-rounded': 'rounded-5',
  } */
  /* useEffect(() => {
    console.log('btn data', data)
  }, [data?.toString()]) */
  return (
    <div className={`d-flex flex-column align-items-${data?.setting?.position}`}>
      <a href={data?.content?.url || '#'} alt={data?.content?.title || 'sample button'}>
        <button
          style={{
            color: data?.setting?.textColor || 'white',
            width: data?.setting?.width || 200,
            height: data?.setting?.height || 60,
            fontSize: data?.setting?.fontSize || 16,
            padding: data?.setting?.padding || 2,
            background: data?.setting?.bg || '#7952B3',
            border: 'none',
            fontWeight: data?.setting?.bold ? '600' : '400',
            fontStyle: data?.setting?.italic ? 'italic' : 'normal',
            boxShadow: data?.setting?.shadow ? '3px 11px 19px 0px rgba(107,98,98,0.85)' : null,
          }}
          className={`${data?.setting?.roundedBtn ? 'rounded-pill' : 'rounded-3'}`}
        >
          {data?.content?.title || 'sample button'}
        </button>
      </a>
    </div>
  )
}

export default ButtonComponent
