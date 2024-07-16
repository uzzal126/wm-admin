import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useLoginMutation} from '../../../../_metronic/redux/slices/auth'
import {setupAxios, useAuth} from '../../../modules/auth'
import {deleteLocal, getLocal} from '../../../modules/helper/misc'

const OnboardSuccess = () => {
  const [data, setData] = useState<any>({})
  const {saveAuth, setCurrentUser} = useAuth()
  const [login] = useLoginMutation()

  useEffect(() => {
    const payment = getLocal('payment')
    setData(payment)
  }, [])

  const userLogin = async () => {
    try {
      const values = {
        email: data?.admin_user,
        password: data?.admin_user_pass,
      }
      const auth: any = await login(values).unwrap()
      // if(auth)
      if (auth.status_code === 200 && auth.success) {
        if (auth && auth.user.access_token) {
          const d = new Date()
          d.setSeconds(auth.user.expire_in)

          saveAuth({...auth, expired: d.getTime()})
          setCurrentUser(auth)
          setupAxios(axios, auth.user.access_token)
          deleteLocal('payment')
          window.location.href = '/dashboard'
        }
      } else {
        throw new Error(auth?.message)
      }
    } catch (error: any) {
      saveAuth(undefined)
    }
  }

  return (
    <div className='card h-100'>
      <div className='card-header'>
        <div className='card-title d-flex flex-column align-items-center justify-content-center w-100'>
          <h2 className='text-success'>Store Created Successfully</h2>
          <p>Welcome to our WebManza</p>
        </div>
      </div>
      <div className='card-body'>
        <div>
          <div style={{maxWidth: 450, margin: '0 auto'}}>
            <div className='row border rounded text-start align-items-center'>
              <div className='col bg-light py-2'>Site URL:</div>
              <div className='col-8'>
                {data?.site_url && (
                  <a target={'_blank'} href={data?.site_url}>
                    {data?.site_url}
                  </a>
                )}
              </div>
            </div>
            <div className='row border rounded text-start align-items-center mt-1'>
              <div className='col bg-light py-2'>Admin URL:</div>
              <div className='col-8'>
                {data?.admin_url && (
                  <Link to={'#'} onClick={userLogin}>
                    {data?.admin_url}
                  </Link>
                )}
              </div>
            </div>
            <div className='row border rounded text-start align-items-center mt-1'>
              <div className='col bg-light py-2'>Username:</div>
              <div className='col-8'>
                <span>{data?.admin_user}</span>
              </div>
            </div>
            <div className='row border rounded text-start align-items-center mt-1'>
              <div className='col bg-light py-2'>Password:</div>
              <div className='col-8'>
                <span>{data?.admin_user_pass}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-center mt-10 gap-4'>
          <button className='btn btn-success' onClick={userLogin}>
            Login Admin
          </button>
          <a target={'_blank'} href={data?.site_url} className='btn btn-light-info'>
            Visit SIte
          </a>
        </div>
      </div>
    </div>
  )
}

export default OnboardSuccess
