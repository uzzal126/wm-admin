import {FC} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {Link} from '../../../modules/helper/linkHandler'

type IconProps = {
  data: any
  hideSign?: boolean
}

const IconCard: FC<IconProps> = ({data, hideSign}) => {
  return (
    <>
      <Link
        to={data.route}
        className={`card bg-${data?.color} bg-opacity-25 h-100 justify-content-center`}
      >
        <div className='card-body px-5 px-lg-8 flex-grow-0'>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-lg-50px symbol-30px me-3'>
              <div className='symbol-label bg-white'>
                <KTSVG
                  path={data?.icon}
                  className={`svg-icon-1 svg-icon-${data?.color} rotate-180`}
                />
              </div>
            </div>
            <div>
              <div className='fs-4 text-dark fw-bold'>{data?.body?.title}</div>
              <div className='fs-7 text-gray-700 '>{data?.body?.subtitle}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

const data = [
  {
    id: 1,
    color: 'primary',
    icon: '/media/icons/custom/blog.svg',
    route: '/blogs/add',
    body: {
      title: 'Write Blog',
      subtitle: 'Start writing a blog',
    },
  },
  {
    id: 2,
    color: 'info',
    icon: '/media/icons/custom/content-writing.svg',
    route: '/blogs/index',
    body: {
      title: 'My Blogs',
      subtitle: 'See your blogs',
    },
  },
  {
    id: 3,
    color: 'success',
    icon: '/media/icons/custom/popup-icon.svg',
    route: '/shop/theme',
    body: {
      title: 'Blog Design',
      subtitle: 'Change your blog design',
    },
  },
  {
    id: 4,
    color: 'warning',
    icon: '/media/icons/custom/store-icon.svg',
    route: '/theme-store',
    body: {
      title: 'Theme Store',
      subtitle: 'Explore themes for your blog',
    },
  },
]

const BlogQuickComponents = () => {
  return (
    <div className='row g-5 mb-5 row-cols-2 row-cols-lg-4 h-lg-100'>
      {data?.map((item: any) => (
        <div className='col h-100' key={item?.id}>
          <IconCard data={item} hideSign={true} />
        </div>
      ))}
    </div>
  )
}

export default BlogQuickComponents
