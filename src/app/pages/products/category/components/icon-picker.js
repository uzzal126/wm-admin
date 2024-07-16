import {useEffect, useState} from 'react'
import {Dropdown} from 'react-bootstrap'
import {CATEGORY_ICONS} from '../../../../constants/api.constants'
import {getQueryRequest} from '../../../../library/api.helper'
import CropperComponents from '../../../../modules/components/cropper/CropperComponents'
import './imagePicker.css'

const defaultImage = '/media/products/dummy-product.jpg'

const IconPicker = ({date, icon, setIcon, onPick}) => {
  const [icons, setIcons] = useState([])
  const [filterIcons, setFilterIcons] = useState([])
  const [loading, setLoading] = useState(true)
  const [dropActive, setDropActive] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const resp = await getQueryRequest(CATEGORY_ICONS)
    if (resp.success || resp.status_code === 200) {
      setIcons(resp.fileInfos)
      setFilterIcons(resp.fileInfos)
      setLoading(false)
    }
  }

  const filterList = (e) => {
    let {value} = e.target
    var updatedList = icons
    updatedList = updatedList.filter((item) =>
      Object.keys(item).some((key) => item[key].search(value) !== -1)
    )
    setFilterIcons(updatedList)
  }

  if (loading) return <h1>loading...</h1>

  return (
    <div className='formline' data-upload='1'>
      <div className='choose-wrapper align-items-center'>
        <div className='test-emoji'>
          <img
            className='mini_thumbnail img-fluid'
            alt=''
            src={icon && icon.length >= 5 ? icon : 'https://fakeimg.pl/60x50/'}
          />
          <span className='fs-7'>{icon ? icon.name : 'No Icon'}</span>
        </div>
        <div className='emoji-panel '>
          <Dropdown>
            <Dropdown.Toggle
              //   onClick={() => setDropActive(true)}
              size='sm'
              variant='info'
              id='dropdown-basic'
            >
              Icon
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className={` active `}>
                <div className='intercom-emoji-picker'>
                  <div className='intercom-composer-popover-header'>
                    <input
                      className='intercom-composer-popover-input form-control bg-transparent mt-2'
                      placeholder='Search'
                      onChange={(e) => filterList(e)}
                    />
                  </div>
                  <div className='intercom-composer-popover-body-container'>
                    <div className='intercom-composer-popover-body'>
                      <div className='intercom-emoji-picker-groups'>
                        <div className='intercom-emoji-picker-group'>
                          <div className='d-flex justify-content-between align-items-center'>
                            <div className='intercom-emoji-picker-group-title'> Choose Icon </div>
                            <CropperComponents
                              className='w-50px h-50px'
                              onCroped={(url) => {
                                onPick(url[0])
                                // setFormData({...formData, icon_path: url[0]})
                                setIcon({name: url[0], url: url[0]})
                              }}
                              width={48}
                              height={48}
                              src={defaultImage}
                            />
                          </div>
                          {filterIcons.length > 0
                            ? filterIcons.map((d, i) => (
                                <span
                                  key={i}
                                  className='intercom-emoji-picker-emoji'
                                  title={d.title}
                                  onClick={() => {
                                    setIcon(d)
                                    setDropActive(false)
                                    onPick(d.url)
                                    // setFormData({...formData, icon_path: d.url})
                                  }}
                                >
                                  <img alt='' className='mini_thumbnail img-fluid' src={d.url} />
                                  <span>{d.title}</span>
                                </span>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default IconPicker
