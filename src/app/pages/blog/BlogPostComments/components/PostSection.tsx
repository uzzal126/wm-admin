import moment from 'moment'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {GET_BLOG_POST_BY_SLUG} from '../../../../constants/api.constants'
import {getQueryRequest} from '../../../../library/api.helper'

export default function PostSection() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const {slug} = useParams()
  useEffect(() => {
    init()
  }, [slug])

  const init = async () => {
    const res = await getQueryRequest(`${GET_BLOG_POST_BY_SLUG}/${slug}`)
    setLoading(false)
    if (res?.success) {
      setData(res?.data)
    }
  }

  if (loading) return <h1>loading...</h1>
  if (!data) return <h1>An error occured!</h1>

  return (
    <div className='card mb-6 mb-xl-9'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-6'>
          <div className='d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4'>
            <img className='mw-100px mw-lg-130px' src={data?.thumbnail?.src} alt='image' />
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-1'>
                  <span className='text-gray-800 text-hover-primary fs-2 fw-bold me-3'>
                    {data?.title}
                  </span>
                  <span
                    className={`badge badge-light-${
                      data?.status_id === 1
                        ? 'success'
                        : data?.status_id === 2
                        ? 'warning'
                        : 'success'
                    } me-auto fw-bold`}
                  >
                    {data?.status_id === 1
                      ? 'Published'
                      : data?.status_id === 2
                      ? 'Scheduled'
                      : data?.status_id === 3
                      ? 'Draft'
                      : 'Inactive'}
                  </span>
                </div>
                {/* <div dangerouslySetInnerHTML={{__html: jobPost?.description}} /> */}
              </div>
              <div className='d-flex mb-4'>
                <div className='w-semibold mb-4 fs-5 text-gray-400'>
                  {`Posted by '${data?.created_by}', on: ${moment
                    .unix(data?.created_at)
                    .format('LL')}`}
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap justify-content-start'>
              <div className='d-flex flex-wrap'>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                  <div className='d-flex align-items-center'>
                    <div className='fs-4 fw-semibold'>{`${data?.comments} Comments`}</div>
                  </div>
                  {/* <div className='fw-semibold fs-6 text-gray-400'>Comments</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
