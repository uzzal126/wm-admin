import {useLiveVisitorQuery} from '../../../../../_metronic/redux/slices/visitor'

const LiveVisitor = () => {
  const {data} = useLiveVisitorQuery(undefined, {
    pollingInterval: 5000,
  })
  return (
    <div className='d-flex align-items-center me-2'>
      <div className='symbol symbol-50px me-3'>
        <div className='symbol-label bg-light-info'>
          {/* <KTSVG
                        path={'/media/icons/duotune/electronics/elc007.svg'}
                        className={'svg-icon-1 svg-icon-info rotate-180'}
                    /> */}
          <img src='/media/icons/custom/wifi.gif' alt='' className={'p-2 img-fluid'} />
        </div>
      </div>
      <div>
        <div className='fs-4 text-dark fw-bold'>{data?.live_visitor || 0}</div>
        <div className='fs-7 text-muted fw-bold'>Live</div>
      </div>
    </div>
  )
}

export default LiveVisitor
