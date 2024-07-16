import SVG from 'react-inlinesvg'
import {Can} from '../../../../_metronic/redux/ability'
import {Link} from '../../../modules/helper/linkHandler'

const LinkHandler = ({item}) => {
  return (
    <Can access={item.route} group='marketing'>
      <div className='col mb-6'>
        <Link
          to={item.route}
          state={item}
          className='position-relative btn d-flex align-items-center min-h-150px w-100 shadow bg-white bg-hover-light justify-content-center flex-column'
        >
          <div
            className='ribbon ribbon-triangle ribbon-top-start border-primary'
            style={{borderColor: 'var(--bs-success)'}}
          >
            <div
              className='ribbon-icon'
              style={{
                marginTop: '-20px',
                marginLeft: '-20px',
              }}
            >
              <i className='bi bi-check2 fs-2x text-white'></i>
            </div>
          </div>
          <span className='svg-icon svg-icon-5x'>
            <SVG src={item.icon} />
          </span>
          <span className='fs-4 text-uppercase mt-2'>{item.title}</span>
        </Link>
      </div>
    </Can>
  )
}

export default LinkHandler
