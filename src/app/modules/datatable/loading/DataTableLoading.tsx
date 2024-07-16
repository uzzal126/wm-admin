import {Spinner} from 'react-bootstrap'

const DataTableLoading = () => {
  const styles = {
    borderRadius: '0.475rem',
    boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
    backgroundColor: '#fff',
    color: '#7e8299',
    fontWeight: '500',
    margin: '0',
    width: 'auto',
    padding: '1rem 2rem',
    top: 'calc(50% - 2rem)',
    left: 'calc(50% - 4rem)',
  }

  return (
    <div
      style={{...styles, position: 'absolute', textAlign: 'center'}}
      className='d-flex flex-row align-items-center'
    >
      <Spinner className='mx-2' variant='primary' />
      <span> Processing...</span>
    </div>
  )
}

export {DataTableLoading}
