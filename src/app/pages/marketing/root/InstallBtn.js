import SVG from 'react-inlinesvg'
import { Can } from '../../../../_metronic/redux/ability'
const InstallBtn = ({item, handleOnInstall}) => {
  return (
    <Can access={item.route} group='marketing'>
      <div className='col mb-6'>
        <div className='rounded-2 d-flex align-items-center min-h-150px w-100 shadow bg-white justify-content-center flex-column'>
          <span className='svg-icon svg-icon-5x'>
            <SVG src={item.icon} />
          </span>
          <span className='fs-4 text-uppercase mt-0'>{item.title}</span>
          {item?.production_mode === 1 ? (
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

export default InstallBtn
