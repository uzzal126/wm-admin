import {useState} from 'react'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import SectionList from './components/sectionList'
import SubsectionList from './components/subsectionList'
import PermissionHeader from './header'

const PermissionsPage = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const [section, setSection] = useState<any>({})

  return (
    <div>
      <PermissionHeader />
      <div className='row mt-4'>
        <div className='col-lg-4'>
          <KTCard>
            <div className='card-header'>
              <div className='card-title'>Permission Groups</div>
            </div>
            <SectionList section={section} setSection={setSection} />
          </KTCard>
        </div>
        <div className='col-lg-8'>
          {section && Object.keys(section).length > 0 && (
            <>
              <KTCard className='mb-3'>
                <KTCardBody>
                  <h2>{section.name}</h2>
                  <p className='mb-0'>{section.route}</p>
                </KTCardBody>
              </KTCard>
              <KTCard>
                <SubsectionList section={section} />
              </KTCard>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PermissionsPage
