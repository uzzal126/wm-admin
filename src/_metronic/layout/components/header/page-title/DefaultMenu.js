import clsx from 'clsx'
import {Link} from '../../../../../app/modules/helper/linkHandler'

const DefaultMenu = ({toolbarBreadcrumbs}) => {
  return (
    <div
      id='kt_page_title'
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
      className={clsx('page-title d-flex')}
    >
      {toolbarBreadcrumbs && toolbarBreadcrumbs.length > 0 && (
        <>
          <ul className='breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1'>
            {toolbarBreadcrumbs.map((item, index) => (
              <li className='breadcrumb-item' key={`${item.path}${index}`}>
                <Link
                  className={`px-3 btn btn-sm ${item.isActive ? item.activeClasses : item.classes}`}
                  to={item.path}
                >
                  {item.title}
                  <i className={item.icon}></i>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export {DefaultMenu}
