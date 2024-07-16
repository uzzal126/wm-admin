import {useGetRolesQuery} from '../../../../_metronic/redux/slices/auth'
import SingleRole from './components/singleRole'
import RoleHeader from './header'

const RoleManagement = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const {data: rolesData, isLoading} = useGetRolesQuery(undefined)

  if (isLoading) return <></>

  return (
    <div>
      <RoleHeader />
      <div className='row row-cols-1 row-cols-md-2 row-cols-xl-4 g-5 g-xl-6 mt-4'>
        {rolesData &&
          rolesData.roles &&
          rolesData.roles.length > 0 &&
          rolesData.roles.map((role: any, i: number) => (
            <div className='col' key={i}>
              <SingleRole role={role} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default RoleManagement
