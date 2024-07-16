import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {Can} from '../../../redux/ability'
import {useLayout} from '../../core'

const PageToolbar = ({children, breadcrumbs, onChange}) => {
  const {classes} = useLayout()
  let navigate = useNavigate()

  const onClickHandler = (e, item) => {
    e.preventDefault()

    if (item?.modal !== undefined && item?.modal) {
      if (onChange !== undefined) {
        if (item.path === null || item.path === 'null') {
          onChange(item)
        }
      }
    } else {
      return navigate(item.path)
    }
    // onChange  && () ? onChange(item) : null
  }

  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-lg-flex flex-stack')}
      >
        <div
          id='kt_toolbar_title'
          data-kt-swapper='false'
          data-kt-swapper-mode='prepend'
          data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
          className={clsx('page-title d-flex')}
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <>
              <ul className='breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1'>
                {breadcrumbs.map((item, index) =>
                  item.access ? (
                    <Can access={item.access} group={item.group} key={`${item.path}${index}`}>
                      <li className='breadcrumb-item'>
                        <Link
                          className={`px-3 btn btn-sm ${
                            item.isActive ? item.activeClasses : item.classes
                          }`}
                          to={item.path !== null ? item.path : ''}
                          onClick={(e) => onClickHandler(e, item)}
                        >
                          <i className={item.icon}></i>
                          {item.title}
                        </Link>
                      </li>
                    </Can>
                  ) : (
                    <li className='breadcrumb-item' key={`${item.path}${index}`}>
                      <Link
                        className={`px-3 btn btn-sm ${
                          item.isActive ? item.activeClasses : item.classes
                        }`}
                        to={item.path !== null ? item.path : ''}
                        onClick={(e) => onClickHandler(e, item)}
                      >
                        <i className={item.icon}></i>
                        {item.title}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </div>
        <div className='d-flex align-items-center py-1'>{children}</div>
      </div>
      {/* end::Container */}
    </div>
  )
}

export default PageToolbar
