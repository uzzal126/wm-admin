import SVG from 'react-inlinesvg'
import { toast } from 'react-toastify'
import swal from 'sweetalert'
import { Can } from '../../../../_metronic/redux/ability'
import { POST_UNINSTALL_TOOLS } from '../../../constants/api.constants'
import { queryRequest } from '../../../library/api.helper'


const InstallBtnWithUninstall = ({item, refatch, handleOnInstall}) => {
    const handleUninstall = async () => {
        swal({
          title: 'Are you sure?',
          text: `Do you want to Uninstall '${item.title}'`,
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        }).then(async (dl) => {
          if (dl) {
            const res = await queryRequest(POST_UNINSTALL_TOOLS, {
              tool_id: item.id,
            })
    
            if (res.success && res.status_code === 200) {
              refatch(res.data)
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
          }
        })
    }
      
  return (
    <Can access={item.route} group='marketing'>
      <div className='col mb-6'>
        <div className='rounded-2 d-flex align-items-center min-h-150px w-100 shadow bg-white justify-content-center flex-column'>
          <span className='svg-icon svg-icon-5x'>
            <SVG src={item.icon} />
          </span>
          <span className='fs-4 text-uppercase mt-0'>{item.title}</span>
          {item?.production_mode === 1 ? item?.installation_status ? (
            <label
              className='cursor-pointer badge badge-info px-3 py-2 mt-2'
              style={{cursor: 'pointer'}}
              onClick={handleUninstall}
            >
              Uninstall
            </label>
          ) :(
            <label
              className='cursor-pointer badge badge-danger px-3 py-2 mt-2'
              style={{cursor: 'pointer'}}
              onClick={() => handleOnInstall(item)}
            >
              Install
            </label>
          ) : (
            <span className='badge badge-warning'>Coming Soon</span>
          )}
        </div>
      </div>
    </Can>
  )
}

export default InstallBtnWithUninstall
