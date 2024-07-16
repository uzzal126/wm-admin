import {kFormatter} from '../../../../modules/helper/misc'

export const breadcrumbs = (active) => {
  return [
    {
      title: 'Dashboard',
      path: '/plugins/sms-gateway/index',
      activeClasses: 'btn-info',
      classes: 'btn-light-dark',
      icon: '',
      isActive: active === 'dash' ? true : false,
    },
    {
      title: 'Send SMS',
      path: '/plugins/sms-gateway/sender',
      activeClasses: 'btn-info',
      classes: 'btn-light-dark',
      icon: '',
      isActive: active === 'sender' ? true : false,
    },
    {
      title: 'Report',
      path: '/plugins/sms-gateway/report',
      activeClasses: 'btn-info',
      classes: 'btn-light-dark',
      icon: '',
      isActive: active === 'report' ? true : false,
    },
    {
      title: 'Balance',
      path: '/plugins/sms-gateway/balance',
      activeClasses: 'btn-info',
      classes: 'btn-light-dark',
      icon: '',
      isActive: active === 'balance' ? true : false,
    },
    {
      title: 'SMS Settings',
      path: '/plugins/sms-gateway/settings',
      activeClasses: 'btn-info',
      classes: 'btn-light-dark',
      icon: '',
      isActive: active === 'setting' ? true : false,
    },
  ]
}

export const IconCard = ({data}) => {
  return (
    <div
      className='card card-flush bgi-no-repeat bgi-size-cover bgi-position-x-end bgi-position-y-bottom h-xl-100'
      style={{backgroundColor: data?.color, backgroundImage: `url(${data?.bg})`}}
    >
      <div className='card-header pt-5 mb-1'>
        <div
          className='d-flex flex-center rounded-circle h-80px w-80px'
          style={{border: ' 1px dashed rgba(255, 255, 255, 0.4)', backgroundColor: data?.color}}
        >
          <i className={`fas fa-${data?.icon} text-white fs-2qx lh-0`}></i>
        </div>
      </div>
      <div className='card-body py-2 pt-0 d-flex align-items-end'>
        <div className='d-block d-xxl-flex align-items-center'>
          <span className='fs-4hx text-white fw-bold me-0 me-xxl-6'>
            {kFormatter(data?.body?.number)}
          </span>
          <div className='fw-bold fs-6 text-white'>
            <span className='d-block'>{data?.body?.title}</span>
            <span className=''>{data?.body?.subtitle}</span>
          </div>
        </div>
      </div>
      <div
        className='card-footer py-2'
        style={{borderTop: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(0, 0, 0, 0.15)'}}
      >
        <div className='fw-bold text-white py-2'>
          <span className='fs-1 d-block'>{data?.footer?.number}</span>
          <span className='opacity-50'>{data?.footer?.title}</span>
        </div>
      </div>
    </div>
  )
}
