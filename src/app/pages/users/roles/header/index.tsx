import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {Link} from '../../../../modules/helper/linkHandler'

const RoleHeader = () => {
  return (
    <>
      <KTCard>
        <KTCardBody className='p-3'>
          <div className='d-flex align-items-center justify-content-between'>
            <div className=''></div>
            <div className='d-flex gap-3'>
              <Link to='/users/roles/add' className='btn btn-sm btn-light-primary'>
                <i className='fas fa-plus'></i> Role
              </Link>
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default RoleHeader
