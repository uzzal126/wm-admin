import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import { Alert } from 'react-bootstrap'
import { getAuth } from '../../modules/auth'
import { dateDiffInDays, packageValid } from '../../modules/helper/expire'
import { Link } from 'react-router-dom'



const ExpireAlert = () => {
  const auth = getAuth()
  let days = dateDiffInDays(new Date(), new Date(auth?.shop_info?.expire_time))

  return days <= 7 ? (
    <div className=''>
      <Alert variant='danger'>
        <div className='d-flex justify-content-between align-items-center text-dark flex-column flex-lg-row'>
          <div>
            <Alert.Heading>Hello, {auth?.user?.name || ''}</Alert.Heading>
            {packageValid(auth?.shop_info?.expire_time) ? (
              <p className='mb-0'>
                Your subscription will be expired soon! Please renew your package.
              </p>
            ) : (
              <p className='mb-0'>Your subscription has been expired! Please renew your package.</p>
            )}
          </div>
          <div>
            {packageValid(auth?.shop_info?.expire_time) && (
              <FlipClockCountdown
                to={auth?.shop_info?.expire_time}
                labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                labelStyle={{
                  fontSize: 10,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  color: 'black',
                }}
                digitBlockStyle={{ width: 30, height: 30, fontSize: 24 }}
                dividerStyle={{ color: 'black', height: 1 }}
                separatorStyle={{ color: 'red', size: '6px' }}
                duration={0.5}
              >
                Finished
              </FlipClockCountdown>
            )}
          </div>
          <div>
            <Link to="/profile/renew" className='btn btn-info'>Pay Now</Link>
          </div>
        </div>
      </Alert>
    </div>

  ) : <></>
}

export default ExpireAlert
