import moment from 'moment'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Select from 'react-select'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {BASE_URL} from '../../../../../../constants/api.constants'
import {queryRequest} from '../../../../../../library/api.helper'
import {DataTableLoading} from '../../../../../../modules/datatable/loading/DataTableLoading'
import {betterParse, formatPrice} from '../../../../../../modules/helper/misc'
import {application_status} from '../../../../helper/constants'
import {useQueryResponse} from '../../../core/QueryResponseProvider'

export default function CardRight({application, isLoading}: any) {
  const {job} = useParams()
  const {refetch} = useQueryResponse()
  const [status, setStatus] = useState(application?.application_status)

  useEffect(() => {
    setStatus(application?.application_status)
  }, [application])

  const handleStatusChange = async (value: any) => {
    swal({
      title: 'Are you sure?',
      text: 'You can change the status any time!',
      icon: 'warning',
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await queryRequest(
          `${BASE_URL}/appearance/job/${job}/application/${application?.id}`,
          {
            application_status: value,
          },
          'PUT'
        )

        if (res?.success) {
          swal('Application status has been changed!', {
            icon: 'success',
          })
          setStatus(value)
          refetch()
        } else {
          toast.error(res?.message)
        }
      }
    })
  }

  const getAttachment = () => {
    let attch
    try {
      attch = betterParse(application?.attachment)
    } catch (err) {
      attch = [{}]
    } finally {
      return attch
    }
  }
  const attachment = getAttachment()
  return isLoading ? (
    <div className='card-header pt-7'>
      <DataTableLoading />
    </div>
  ) : application ? (
    <div
      id='kt_account_settings_profile_details'
      className='collapse show'
      data-select2-id='select2-data-kt_account_settings_profile_details'
    >
      <div className='card-header pt-7'>
        <div className='card-title'>
          <h2>{`${application?.name}'s Application`}</h2>
        </div>

        <div className='card-toolbar'>
          <div className='fs-5 fw-bold' style={{marginRight: '5px'}}>
            Change Status:
          </div>
          <Select
            name='application-status'
            options={application_status}
            value={application_status.filter((e) => e.value === status)[0]}
            onChange={(e: any) => handleStatusChange(e?.value)}
          />
        </div>
      </div>

      <div className='card-body pt-5'>
        <div className='d-flex gap-7 align-items-center'>
          <div className='symbol symbol-circle symbol-100px'>
            <img src='https://api.admin.webmanza.com/assets/logos/blank.png' alt='image' />
          </div>
          <div className='d-flex flex-column gap-2'>
            <h3 className='mb-0'>{application?.name}</h3>
            <div className='d-flex align-items-center gap-2'>
              <i className='ki-duotone ki-sms fs-2'>
                <span className='path1' />
                <span className='path2' />
              </i>
              <span className='text-muted text-hover-primary'>{application?.email}</span>
            </div>
            <div className='d-flex align-items-center gap-2'>
              <i className='ki-duotone ki-phone fs-2'>
                <span className='path1' />
                <span className='path2' />
              </i>
              <span className='text-muted text-hover-primary'>
                {application?.msisdn || '8801XXXXXXXXX'}
              </span>
            </div>
          </div>
          {/*end::Contact details*/}
        </div>

        <div className='tab-content'>
          <div className='tab-pane fade show active' id='kt_contact_view_general' role='tabpanel'>
            <div className='d-flex flex-column gap-5 mt-7'>
              <div className='d-flex flex-column gap-1'>
                <div className='fw-bold text-muted'>Address</div>
                <div className='fw-bold fs-5'>{application?.address}</div>
              </div>

              <div className='d-flex flex-column gap-1'>
                <div className='fw-bold text-muted'>Date of Birth</div>
                <div className='fw-bold fs-5'>{moment(application?.dob).format('LL')}</div>
              </div>

              <div className='d-flex flex-column gap-1'>
                <div className='fw-bold text-muted'>Experience</div>
                <div className='fw-bold fs-5'>
                  {`${application?.experience || 'Experience Unknown'} years`}
                </div>
              </div>

              <div className='d-flex flex-column gap-1'>
                <div className='fw-bold text-muted'>Expected Salary</div>
                <div className='fw-bold fs-5'>
                  {`${
                    formatPrice(application?.expected_salary) || 'Expected Salaray is Unknown'
                  } BDT`}
                </div>
              </div>

              <div className='d-flex flex-column gap-1'>
                <div className='fw-bold text-muted'>Attachment</div>
                {/* <div className='fw-bold fs-5'>
                  <a href='#'>{application?.attachment || 'attachment Unknown'}</a>
                </div> */}
                {attachment &&
                  attachment?.length > 0 &&
                  attachment?.map((item: any) => (
                    <a
                      href={item?.src || '#'}
                      className='text-gray-800 text-hover-primary d-flex flex-column'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div className='symbol symbol-60px mb-5'>
                        <img
                          src={`/media/svg/files/${
                            item?.type?.includes('doc')
                              ? 'doc'
                              : item?.type?.includes('pdf')
                              ? 'pdf'
                              : 'upload'
                          }.svg`}
                          className='theme-light-show'
                          alt=''
                        />
                        <img
                          src={`/media/svg/files/${
                            item?.type?.includes('doc')
                              ? 'doc'
                              : item?.type?.includes('pdf')
                              ? 'pdf'
                              : 'upload'
                          }.svg`}
                          className='theme-dark-show'
                          alt=''
                        />
                      </div>
                      <div className='fs-8 fw-bold mb-2'>{`Download CV in .${item?.type} format`}</div>
                    </a>
                  ))}
                {/* <a
                  href={attachment?.src || '#'}
                  className='text-gray-800 text-hover-primary d-flex flex-column'
                  target='_blank'
                  rel='noreferrer'
                >
                  <div className='symbol symbol-60px mb-5'>
                    <img
                      src={`/media/svg/files/${
                        attachment?.type?.includes('doc')
                          ? 'doc'
                          : attachment?.type?.includes('pdf')
                          ? 'pdf'
                          : 'upload'
                      }.svg`}
                      className='theme-light-show'
                      alt=''
                    />
                    <img
                      src={`/media/svg/files/${
                        attachment?.type?.includes('doc')
                          ? 'doc'
                          : attachment?.type?.includes('pdf')
                          ? 'pdf'
                          : 'upload'
                      }.svg`}
                      className='theme-dark-show'
                      alt=''
                    />
                  </div>
                  <div className='fs-8 fw-bold mb-2'>{`Download CV in .${attachment?.type} format`}</div>
                </a> */}
              </div>
              {application?.extra_note && (
                <div className='d-flex flex-column gap-1'>
                  <div className='fw-bold text-muted'>Notes</div>
                  <p>{application?.extra_note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='d-flex flex-column flex-center'>
      <img src='/media/illustrations/sketchy-1/5.png' className='mw-400px' />
      <div className='fs-1 fw-bolder text-dark mb-4'>No applications found.</div>
    </div>
  )
}
