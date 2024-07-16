import moment from 'moment'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {GET_JOB_POST_BY_SLUG} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {DataTableLoading} from '../../../../../modules/datatable/loading/DataTableLoading'

export default function JobDetails() {
  const {job: slug} = useParams()
  const [jobPost, setJobPost] = useState<any>({})
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [slug])

  const init = async () => {
    setLoading(true)
    const res = await getQueryRequest(`${GET_JOB_POST_BY_SLUG}/${slug}`)
    setLoading(false)
    if (res?.success) {
      setJobPost(res?.data)
    }
  }

  return isLoading ? (
    <div className='card mb-6 mb-xl-9'>
      <div className='card-body pt-9 pb-0'>
        <div className='card-header pt-7'>
          <DataTableLoading />
        </div>
      </div>
    </div>
  ) : jobPost ? (
    <div className='card mb-6 mb-xl-9'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-6'>
          <div className='d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4'>
            <img className='mw-100px mw-lg-130px' src={jobPost?.banner} alt='image' />
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-1'>
                  <span className='text-gray-800 text-hover-primary fs-2 fw-bold me-3'>
                    {jobPost?.title}
                  </span>
                  <span className='badge badge-light-success me-auto'>
                    {jobPost?.post_status_id === 1 ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className='d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400'>
                  {`${jobPost?.location} (${jobPost?.employment_status}), Gender: ${
                    jobPost?.gender
                  }, Experience: ${jobPost?.experience} year${jobPost?.experience > 1 ? 's' : ''}`}
                </div>
                {/* <div dangerouslySetInnerHTML={{__html: jobPost?.description}} /> */}
              </div>
              <div className='d-flex mb-4'>
                <div className='w-semibold mb-4 fs-5 text-gray-400'>
                  {`Posted On: ${moment.unix(jobPost?.scheduled_at).format('LL')}`}
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap justify-content-start'>
              <div className='d-flex flex-wrap'>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                  <div className='d-flex align-items-center'>
                    <div className='fs-4 fw-semibold'>
                      {moment.unix(jobPost?.deadline).format('LL')}
                    </div>
                  </div>
                  <div className='fw-semibold fs-6 text-gray-400'>Deadline</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='card mb-6 mb-xl-9'>
      <div className='card-body pt-9 pb-9'>
        <h5>No Application Found!</h5>
      </div>
    </div>
  )
}
