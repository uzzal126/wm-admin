import CropperComponents from '../../../../../../modules/components/cropper/CropperComponents'
import {useTheme} from '../../context/CartContext'

const LogoCustomize = () => {
  const {themeData, onSave} = useTheme()

  const handleFieldEdit = (value: string, key: string) => {
    const post = {
      key: 'logo',
      data: {
        ...themeData?.logo,
        [key]: value,
      },
    }

    onSave(post.key, post.data, 'static')
  }
  return (
    <div className='d-flex justify-content-between'>
      <div className='d-flex flex-column'>
        <label className='flex-grow-1 mb-2'>Light Logo (220px x 56px recommended) *</label>
        <div>
          <CropperComponents
            src={themeData?.logo?.light_logo || ''}
            onCroped={(url: any) => handleFieldEdit(url[0], 'light_logo')}
            width={null}
            height={null}
            className={'w-100px h-100px'}
            full={false}
          />
        </div>
      </div>
      <div className='d-flex flex-column'>
        <label className='flex-grow-1 mb-2'>Dark Logo (220px x 56px recommended) *</label>
        <div>
          <CropperComponents
            src={themeData?.logo?.dark_logo || ''}
            onCroped={(url: any) => handleFieldEdit(url[0], 'dark_logo')}
            width={null}
            height={null}
            className={'w-100px h-100px'}
            full={false}
          />
        </div>
      </div>
      <div className='d-flex flex-column'>
        <label className='d-block mb-2'>Favicon (48px x 48px) *</label>
        <div>
          <CropperComponents
            src={themeData?.logo?.fav_logo || ''}
            onCroped={(url: any) => handleFieldEdit(url[0], 'fav_logo')}
            width={48}
            height={48}
            className={'w-60px h-60px'}
            full={false}
          />
        </div>
      </div>
    </div>
  )
}

export default LogoCustomize
