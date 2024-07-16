import {Accordion} from 'react-bootstrap'
import FontCustomize from '../../components/fonts'
import LogoCustomize from '../../components/logo'
import ThemeInfo from '../../components/themeInfo'
import {useTheme} from '../../context/CartContext'
import BlogRender from '../handler/blogRender'

const Blog1 = () => {
  const {themeData} = useTheme()
  return (
    <div>
      <Accordion defaultActiveKey={'1'}>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            <span className='fs-3 fw-bold'>Theme Info</span>
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
        {themeData?.theme_data?.top_section && (
          <>
            <hr />
            <Accordion>
              <BlogRender data={themeData?.theme_data?.top_section} sectionKey='top_section' />
            </Accordion>
          </>
        )}
        {themeData?.theme_data?.left_section && (
          <>
            <hr />
            <Accordion>
              <BlogRender data={themeData?.theme_data?.left_section} sectionKey='left_section' />
            </Accordion>
          </>
        )}
        {themeData?.theme_data?.middle_section && (
          <>
            <hr />
            <Accordion>
              <BlogRender
                data={themeData?.theme_data?.middle_section}
                sectionKey='middle_section'
              />
            </Accordion>
          </>
        )}
        {themeData?.theme_data?.right_section && (
          <>
            <hr />
            <Accordion>
              <BlogRender data={themeData?.theme_data?.right_section} sectionKey='right_section' />
            </Accordion>
          </>
        )}
      </Accordion>
    </div>
  )
}

export default Blog1
