import {Button} from 'react-bootstrap'
import {Link} from '../../../../../modules/helper/linkHandler'

const StatusButton = ({
  setFieldValue,
  values,
  errors,
  isUserLoading,
  isSubmitting,
  isValid,
  touched,
}) => {
  return (
    <div className='d-flex align-items-center justify-content-end mb-4 gap-2'>
      <Link to='/orders/index' className='btn btn-light btn-sm'>
        Cancel
      </Link>
      <Button
        variant='dark'
        type='submit'
        size='sm'
        disabled={isUserLoading || isSubmitting /*|| !isValid || !touched*/}
        onClick={() => setFieldValue('order_status', 2)}
      >
        {isUserLoading ? (
          <span className='indicator-progress d-block'>
            Please wait...
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        ) : (
          <span className='indicator-label'>Save as Draft</span>
        )}
      </Button>
      {values?.courier_enable ? (
        <Button
          variant='primary'
          type='submit'
          size='sm'
          disabled={isUserLoading || isSubmitting /*|| !isValid || !touched*/}
          onClick={() => setFieldValue('order_status', 4)}
        >
          {isUserLoading ? (
            <span className='indicator-progress d-block'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          ) : (
            <span className='indicator-label'>Send To Courier</span>
          )}
        </Button>
      ) : null}
      <Button
        variant='info'
        type='submit'
        size='sm'
        disabled={isUserLoading || isSubmitting /*|| !isValid || !touched*/}
        onClick={() => setFieldValue('order_status', 5)}
      >
        {isUserLoading ? (
          <span className='indicator-progress d-block'>
            Please wait...
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        ) : (
          <span className='indicator-label'>Delivery In Progress</span>
        )}
      </Button>
    </div>
  )
}

export default StatusButton
