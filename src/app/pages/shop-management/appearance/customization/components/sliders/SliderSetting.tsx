import {
  Accordion
} from 'react-bootstrap'
import CropperComponents from '../../../../../../modules/components/cropper/CropperComponents'


const SliderSetting = ({ data, handlerOnChange, }: { data: any, handlerOnChange: any, }) => {

  const handleEdit = (index: number, value: any, key: any, onBlur?: any) => {
    const newList = [...data?.list]
    newList[index] = {
      ...newList[index],
      [key]: value,
    }
    let postData = {
      ...data,
      list: newList,
    }
    handlerOnChange(postData, onBlur)
  }

  const handleNewSlider = () => {
    let newList = [...data?.list]

    const list = {
      isEdited: true,
      banner_url: 'https://dummyimage.com/1920x550/969496/ffffff.jpg',
      mobile_banner_url: 'https://dummyimage.com/1200x730/969496/ffffff.jpg',
      redirect_url: '#',
    }

    newList.push(list)

    const newData = {
      ...data,
      list: newList,
    }

    handlerOnChange(newData)
  }


  return (
    <div className='configure px-1 mt-2'>
      <Accordion defaultActiveKey='0'>
        {data?.list &&
          data?.list.length > 0 &&
          data?.list.map((item: any, i: any) => (
            <Accordion.Item eventKey={i} key={i}>
              <Accordion.Header>Slide {i + 1}</Accordion.Header>
              <Accordion.Body>
                <div className='d-flex justify-content-between'>

                  <div className='form-group d-flex flex-column'>
                    <label>Desktop Banner (1920px x 550px) *</label>
                    <CropperComponents
                      src={item.banner_url ? item.banner_url : ''}
                      onCroped={(url: any) => handleEdit(i, url[0], 'banner_url')}
                      width={1920}
                      height={550}
                      className={'w-100 h-100px'}
                      full
                    />
                  </div>
                  <div className='form-group d-flex flex-column'>
                    <label>Mobile Banner (1200px x 730px) *</label>
                    <CropperComponents
                      src={item.mobile_banner_url ? item.mobile_banner_url : ''}
                      onCroped={(url: any) => handleEdit(i, url[0], 'mobile_banner_url')}
                      width={1200}
                      height={730}
                      className={'w-100 h-100px'}
                      full
                    />
                  </div>
                  {/* <UrlPicker
                    onChange={(e) => {
                      handleEdit(i, e, 'redirect_url')
                      handleEdit(i, e.title, 'btn_text')
                    }}
                  /> */}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
      <div className='action d-flex justify-content-between align-items-center mt-3'>
        <button
          className='btn btn-sm btn-primary btn-outline rounded'
          onClick={() => handleNewSlider()}
        >
          <i className='fas fa-plus'></i> Another
        </button>
      </div>
    </div>
  )
}

export default SliderSetting
