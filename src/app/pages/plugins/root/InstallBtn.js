import SVG from 'react-inlinesvg'
import {Can} from '../../../../_metronic/redux/ability'
import {Link} from '../../../modules/helper/linkHandler'

const InstallBtn = ({item, handleOnInstall}) => {
  return (
    <Can access={item.route} group='marketing'>
      <div className='col mb-6'>
        <Link to={`/plugins/${item.id}`} className='plugin-card'>
          <div className='plugin-card--icon'>
            <SVG src={item.icon} />
          </div>
          <div className='plugin-card--content'>
            <h4 className='title'>{item.title}</h4>
            <p className='desc'>
              Enhance success! Understand, track, and optimize ads effortlessly for superior
              results.
            </p>
            {item?.production_mode === 1 ? (
              <button
                className='plugin-install-btn'
                style={{cursor: 'pointer'}}
                onClick={(e) => {
                  e.preventDefault()
                  handleOnInstall(item)
                }}
              >
                Install Plugin
              </button>
            ) : (
              <span className='badge badge-warning'>Coming Soon</span>
            )}
          </div>
          <div className='shape'>
            <SVG src='/media/plugins/plugin-shape.svg' />
          </div>
        </Link>
      </div>
    </Can>
  )
}

export default InstallBtn
