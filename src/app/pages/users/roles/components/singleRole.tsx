import React, {useEffect} from 'react'
import {Dropdown} from 'react-bootstrap'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {MenuComponent} from '../../../../../_metronic/assets/ts/components'
import {useAbility} from '../../../../../_metronic/redux/ability'
import {useDeleteRoleMutation, useGetRoleQuery} from '../../../../../_metronic/redux/slices/auth'
import {Link} from '../../../../modules/helper/linkHandler'

const CustomToggle = React.forwardRef(({children, onClick}: any) => (
  <button
    className='btn-action rounded fw-bold bg-transparent border-transparent min-w-25px'
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
  </button>
))

const SingleRole = ({role}: {role: any}) => {
  const {data: rolePermission, isLoading} = useGetRoleQuery(role?.id)

  const [deleteRole] = useDeleteRoleMutation()
  const {ability} = useAbility()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteHandler = (id: number) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: ['Cancel', 'Confirm'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteRole(id).unwrap()
        if (res.success && res.status_code) {
          toast.success(res?.message || 'Your section has been deleted!')
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  if (isLoading) return <></>

  return (
    <div className='card card-flush h-md-100'>
      <div className='card-header'>
        <div className='card-title'>
          <Link to={`/users/roles/${role?.id}`}>
            <h2>{role.name}</h2>
          </Link>
        </div>
        {/* <Can access='Permissions List' group='users'> */}
        {(role?.owner !== 'super_admin' || ability('Permissions List', 'users')) && (
          <div className='card-toolbar'>
            <Dropdown drop='down' align={{xl: 'end'}}>
              <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
                <i className='fas fa-ellipsis-vertical text-black' />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className='d-flex w-100 flex-column'>
                  <Link
                    to={`/users/roles/edit/${role?.id}`}
                    className='text-start btn btn-sm btn-light mb-2'
                  >
                    <span className='text-primary'>
                      <i className='fas fa-pencil-alt fs-3 text-primary'></i> Edit
                    </span>
                  </Link>
                  <button
                    className='text-start btn btn-sm btn-light'
                    onClick={() => deleteHandler(role?.id)}
                  >
                    <span className='text-danger'>
                      <i className='la la-trash-o fs-3 text-danger'></i> Delete
                    </span>
                  </button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {/* </Can> */}
      </div>
      <div className='card-body pt-1'>
        <div className='fw-bold text-gray-600 mb-5'>
          Total permissions: {rolePermission?.permissions ? rolePermission?.permissions.length : 0}
        </div>

        <div className='d-flex flex-column text-gray-600'>
          {rolePermission?.permissions &&
            rolePermission?.permissions.length > 0 &&
            rolePermission?.permissions.slice(0, 5).map((permission: any, i: any) => (
              <div className='d-flex align-items-center py-2' key={i}>
                <span className='bullet bg-primary me-3' /> {permission.name}
              </div>
            ))}
          {rolePermission?.permissions && rolePermission?.permissions.length > 5 && (
            <Link to={`/users/roles/${role?.id}`}>
              <div className='d-flex align-items-center py-2'>
                <span className='bullet bg-primary me-3' />{' '}
                <em>and {rolePermission?.permissions.length - 5} more...</em>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleRole
