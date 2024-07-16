import {Accordion} from 'react-bootstrap'
import {camelToSnake, enumFormatter} from '../../../../../../modules/helper/misc'
import AboutMeSetting from '../../components/aboutme'
import BlogSetting from '../../components/blog'
import BlogCategoriesSetting from '../../components/blog/postCategories'
import RecentBlogSetting from '../../components/blog/recentPost'
import SliderSetting from '../../components/sliders/SliderSetting'
import {useTheme} from '../../context/CartContext'

const BlogContentHandler = ({
  data,
  sectionKey,
  parseKey,
  section,
}: {
  data: any
  sectionKey: string
  parseKey: string
  section: string
}) => {
  console.log('🚀 ~ file: blogRender.tsx:9 ~ BlogContentHandler ~ sectionKey:', sectionKey)
  const {onStateUpdate, onSave} = useTheme()
  const handlerOnChange = (value: any, onBlur?: boolean) => {
    let postData = {
      ...data,
      list: {
        ...data.list,
        [sectionKey]: value,
      },
    }
    if (onBlur === undefined) {
      onSave(section, postData, 'theme')
    } else {
      onStateUpdate(section, postData, 'theme')
    }
  }

  return (
    <>
      {parseKey.includes('slider') && (
        <Accordion.Item eventKey={sectionKey}>
          <Accordion.Header>
            <span className='fs-3 fw-bold text-capitalize'>
              {enumFormatter(camelToSnake(parseKey))}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <SliderSetting data={data?.list[sectionKey]} handlerOnChange={handlerOnChange} />
          </Accordion.Body>
        </Accordion.Item>
      )}
      {parseKey === 'blog' && (
        <Accordion.Item eventKey={sectionKey}>
          <Accordion.Header>
            <span className='fs-3 fw-bold text-capitalize'>
              {enumFormatter(camelToSnake(parseKey))}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <BlogSetting data={data?.list[sectionKey]} handlerOnChange={handlerOnChange} />
          </Accordion.Body>
        </Accordion.Item>
      )}
      {parseKey.includes('blogCategory') && (
        <Accordion.Item eventKey={sectionKey}>
          <Accordion.Header>
            <span className='fs-3 fw-bold text-capitalize'>
              {enumFormatter(camelToSnake(parseKey))}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <BlogCategoriesSetting
              data={data?.list[sectionKey]}
              handlerOnChange={handlerOnChange}
            />
          </Accordion.Body>
        </Accordion.Item>
      )}
      {parseKey.includes('recentPost') && (
        <Accordion.Item eventKey={sectionKey}>
          <Accordion.Header>
            <span className='fs-3 fw-bold text-capitalize'>
              {enumFormatter(camelToSnake(parseKey))}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <RecentBlogSetting data={data?.list[sectionKey]} handlerOnChange={handlerOnChange} />
          </Accordion.Body>
        </Accordion.Item>
      )}
      {parseKey.includes('aboutMe') && (
        <Accordion.Item eventKey={sectionKey}>
          <Accordion.Header>
            <span className='fs-3 fw-bold text-capitalize'>
              {enumFormatter(camelToSnake(parseKey))}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <AboutMeSetting data={data?.list[sectionKey]} handlerOnChange={handlerOnChange} />
          </Accordion.Body>
        </Accordion.Item>
      )}
    </>
  )
}

const BlogRender = ({data, sectionKey}: {data: any; sectionKey: string}) => {
  return (
    <div>
      {data?.list &&
        Object.keys(data?.list).length > 0 &&
        Object.keys(data?.list).map((key, i) => {
          let parseKeyArray = key.split('_')
          let parseKey = parseKeyArray.length > 0 && parseKeyArray[0] !== '' ? parseKeyArray[0] : ''
          return (
            <BlogContentHandler
              key={i}
              data={data}
              section={sectionKey}
              sectionKey={key}
              parseKey={parseKey}
            />
          )
        })}
    </div>
  )
}

export default BlogRender
