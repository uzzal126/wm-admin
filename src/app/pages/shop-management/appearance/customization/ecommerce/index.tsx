import {Accordion} from 'react-bootstrap'
import {Can} from '../../../../../../_metronic/redux/ability'
import {getAuth} from '../../../../../modules/auth'
import FontCustomize from '../components/fonts'
import LogoCustomize from '../components/logo'
import ThemeInfo from '../components/themeInfo'
import {useTheme} from '../context/CartContext'

type Props = {
  tid?: any
}

const EcommerceCustomization = ({tid}: Props) => {
  const auth = getAuth()
  const {themeData} = useTheme()
  // console.log('theme data', tid)
  const handleAdvanceCustomization = () => {
    // handleActiveTheme(id)
    let url = `${import.meta.env.VITE_THEME_GUEST_URL}/edit/theme/${tid}/${auth?.user?.refresh_token}`

    setTimeout(function () {
      // navigate('/shop/theme')
      window.location.href = url
    }, 300)
  }
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
        {/* {themeData?.theme_data && (
          <>
            <hr />
            <Accordion>
              <ECommerceRender
                data={{list: themeData?.theme_data, sort: 0}}
                sectionKey='theme_data'
              />
            </Accordion>
          </>
        )} */}
      </Accordion>
      <Can access='Theme Customize' group='shop'>
        <div className='my-2'>
          <h2>Advance Customization</h2>
          <button
            onClick={() => handleAdvanceCustomization()}
            className='btn btn-sm btn-primary my-2'
          >
            {
              <span className='indicator-label'>
                <i className='ms-2 text-white  fas fa-cogs' />
                Advance Customize
              </span>
            }
          </button>
        </div>
      </Can>
    </div>
  )
}

export default EcommerceCustomization
