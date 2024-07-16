import {useParams} from 'react-router-dom'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {BackLink, PageTitle} from '../../../../_metronic/layout/core'
import {useGetRoleByIdQuery} from '../../../../_metronic/redux/slices/auth'
import {ErrorMessagesInPage} from '../../../modules/errors/ErrorMessage'

const PageBack: Array<BackLink> = [
  {
    title: 'Back Roles',
    path: '/users/roles',
  },
]

const RoleView = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const {id} = useParams()
  const {data: roleRes, isLoading, isError, error} = useGetRoleByIdQuery(id)

  if (isLoading) return <></>

  if (isError) {
    const {data}: any = error
    return (
      <>
        <PageTitle backLink={PageBack}>
          <span className='text-capitalize'>Role</span>
        </PageTitle>
        <ErrorMessagesInPage errors={data && data?.message} />
      </>
    )
  }

  const {role} = roleRes
  return (
    <>
      <PageTitle backLink={PageBack}>
        <span className='text-capitalize'>{role?.name}</span>
      </PageTitle>
      <KTCard>
        <KTCardBody>
          <div className='row'>
            <div className='col-lg-4'>
              <h3>{role?.name}</h3>
              <h5 className='text-muted fst-italic'>{role?.slug}</h5>
              <p>{role?.description}</p>
            </div>
            <div className='col-lg-8'>
              <h3>Permissions</h3>
              <div className=''>
                {role?.permissions &&
                  role?.permissions.length > 0 &&
                  role?.permissions.map((permission: any, i: any) => (
                    <div className='badge badge-light-info m-2' key={i}>
                      {permission?.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default RoleView
