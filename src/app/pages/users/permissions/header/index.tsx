import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import CreateSection from './createSection'
import CreateSubsection from './createSubsection'

const PermissionHeader = () => {
  return (
    <>
      <KTCard>
        <KTCardBody className='p-3'>
          <div className='d-flex align-items-center justify-content-between'>
            <div className=''></div>
            <div className='d-flex gap-3'>
              <CreateSection />
              <CreateSubsection />
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default PermissionHeader
