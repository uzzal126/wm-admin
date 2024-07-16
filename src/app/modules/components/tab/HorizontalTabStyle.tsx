import {Nav, Tab} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'

type Props = {
  tabData: any[]
  selected: any
  onSelect: any
  defaultKey?: any
}

export const HorizontalTabStyle = ({tabData, selected, onSelect}: Props) => {
  return (
    <Tab.Container id='horizontal-tabs-example' defaultActiveKey={`tab-${selected}`}>
      <KTCard className=''>
        <KTCardBody className='py-5'>
          <Nav
            variant='pills'
            className='nav nav-tabs nav-line-tabs border-0'
            activeKey={`tab-${selected}`}
            defaultActiveKey={`tab-${selected}`}
          >
            {tabData?.map((tab) => (
              <Nav.Item key={tab.id} className='my-1'>
                <Nav.Link
                  className='text-active-primary d-flex align-items-center'
                  eventKey={`tab-${tab.id}`}
                  onSelect={() => onSelect(tab.id)}
                  onClick={() => onSelect(tab.id)}
                >
                  {tab.icon && (
                    <div className='icon me-3'>
                      <SVG src={tab.icon} />
                    </div>
                  )}
                  {tab.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </KTCardBody>
      </KTCard>

      {/* <Tab.Content>
                <Tab.Pane eventKey='tab-one'>
                    <p>tab one</p>
                </Tab.Pane>
                <Tab.Pane eventKey='tab-two'>
                    <p>tab two</p>
                </Tab.Pane>
                <Tab.Pane eventKey='tab-three'>
                    <p>tab three</p>
                </Tab.Pane>
                <Tab.Pane eventKey='tab-four'>
                    <p>tab Four</p>
                </Tab.Pane>
            </Tab.Content> */}
    </Tab.Container>
  )
}

export default HorizontalTabStyle
