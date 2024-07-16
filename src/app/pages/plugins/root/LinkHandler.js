import SVG from 'react-inlinesvg'
import {Can} from '../../../../_metronic/redux/ability'
import {Link} from '../../../modules/helper/linkHandler'

const LinkHandler = ({item}) => {
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
              {item?.details?.description.slice(0, 80) ||
                'Enhance success! Understand, track, and optimize ads effortlessly for superior results.'}
            </p>
            <Link to={item.route} state={item} className='plugin-install-btn plugin-settings-btn'>
              <span className='icon'>
                <SVG src='/media/icons/settings.svg' />
              </span>
              Settings
            </Link>
          </div>
          <div className='shape'>
            <SVG src='/media/plugins/plugin-shape.svg' />
          </div>
        </Link>
      </div>
    </Can>
  )
}

export default LinkHandler
