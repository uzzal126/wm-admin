import './loader.scss'

const LoaderComponent = () => {
  return (
    <div className='d-flex align-items-center justify-content-center h-50 flex-column'>
      <span className='loader ms-auto me-auto'></span>
      Loading...
    </div>
  )
}

export default LoaderComponent
