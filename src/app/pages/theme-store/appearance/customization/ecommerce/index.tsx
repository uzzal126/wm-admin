import {Accordion} from 'react-bootstrap'
import ECommerceRender from '../blogs/handler/ecommerceRender'
import FontCustomize from '../components/fonts'
import LogoCustomize from '../components/logo'
import ThemeInfo from '../components/themeInfo'
import {useTheme} from '../context/CartContext'

const EcommerceCustomization = () => {
  const {themeData} = useTheme()
  return (
    <div>
      <Accordion defaultActiveKey={'1'}>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            <span className='fs-3 fw-bold'>Site Info</span>
          </Accordion.Header>
          <Accordion.Body>
            <ThemeInfo />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>
            <span className='fs-3 fw-bold'>Logo</span>
          </Accordion.Header>
          <Accordion.Body>
            <LogoCustomize />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='3'>
          <Accordion.Header>
            <span className='fs-3 fw-bold'>Font</span>
          </Accordion.Header>
          <Accordion.Body>
            <FontCustomize />
          </Accordion.Body>
        </Accordion.Item>
        {themeData?.theme_data && (
          <>
            <hr />
            <Accordion>
              <ECommerceRender
                data={{list: themeData?.theme_data, sort: 0}}
                sectionKey='theme_data'
              />
            </Accordion>
          </>
        )}
      </Accordion>
    </div>
  )
}

export default EcommerceCustomization
