import {Button} from 'react-bootstrap'
import CropperComponents from '../../../../../../modules/components/cropper/CropperComponents'

type SocialType = {
  url: string
  icon: string
}

type fieldType = {
  image?: string
  title?: string
  details?: string
  subtitle?: string
  socials?: SocialType[]
}

type Props = {
  data: fieldType | any
  handleFieldEdit: any
  onBlur: any
}

const AboutMeForm = ({data, handleFieldEdit, onBlur}: Props) => {
  const handleDeleteSocial = (index: number) => {
    const newSocial: SocialType[] = data?.socials
      ? data?.socials?.filter((_: any, i: number) => i !== index)
      : []
    handleFieldEdit(newSocial, 'socials')
    let newData = {
      ...data,
      socials: newSocial,
    }
    onBlur(newData)
  }

  const handleAddSocial = () => {
    const item = {
      url: '',
      icon: 'FaFacebook',
    }
    const oldSocial: SocialType[] = data?.socials ? [...data.socials] : []
    oldSocial.push(item)
    handleFieldEdit(oldSocial, 'socials')
  }

  const handleEditSocial = (index: number, value: any, field: any) => {
    const newList: SocialType[] = data?.socials ? [...data.socials] : []
    newList[index] = {
      ...newList[index],
      [field]: value,
    }
    handleFieldEdit(newList, 'socials')
  }
  return (
    <>
      {data && (
        <>
          <div className='row'>
            <div className='px-2 col form-group pb-0 border-0 text-center'>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CropperComponents
                  src={data?.image ? data?.image : '/images/dummy_pic.png'}
                  onCroped={(url: any) => handleFieldEdit(url[0], 'image')}
                  width={500}
                  height={500}
                  className={''}
                  full={false}
                />
                <label>(500px x 500px)*</label>
              </div>
            </div>
          </div>
          <div className='form-group pb-0'>
            <label>Title</label>
            <input
              type='text'
              className='form-control'
              placeholder='Mr. Jhon'
              defaultValue={data?.title || ''}
              onChange={(e) => handleFieldEdit(e.target.value, 'title')}
              onBlur={(e) => onBlur({...data, title: e.target.value})}
            />
          </div>
          <div className='form-group pb-0'>
            <label>Subtitle</label>
            <input
              type='text'
              className='form-control'
              placeholder='Sample subtitle'
              defaultValue={data?.subtitle || ''}
              onChange={(e) => handleFieldEdit(e.target.value, 'subtitle')}
              onBlur={() => onBlur(data)}
            />
          </div>
          <div className='form-group pb-0'>
            <label>Details</label>
            <textarea
              className='form-control'
              defaultValue={data?.details}
              placeholder='option1, option2, option3'
              onChange={(e) => handleFieldEdit(e.target.value, 'details')}
              onBlur={() => onBlur(data)}
            />
          </div>
          <div className='form-group pb-0'>
            <label>Social Links</label>
            {data?.socials?.length > 0 ? (
              data?.socials?.map((social: any, i: number) => (
                <div className='d-flex align-items-center position-relative mb-2' key={i}>
                  <div className=''>
                    {/* <IconPicker
                      containerStyles={{left: 0}}
                      buttonStyles={{width: 40, height: 40, lineHeight: 0}}
                      value={social?.icon || 'FaFacebook'}
                      onChange={(v: any) => handleEditSocial(i, v, 'icon')}
                      onBlur={() => onBlur(data)}
                    /> */}
                  </div>
                  <div className='pb-0 flex-grow-1'>
                    <input
                      type='text'
                      className='form-control'
                      value={social.url || ''}
                      placeholder='https://'
                      onChange={(e) => handleEditSocial(i, e.target.value, 'url')}
                      onBlur={() => onBlur(data)}
                    />
                  </div>
                  <div className='ms-2 d-flex'>
                    <Button variant='outline-primary' size='sm' onClick={() => handleAddSocial()}>
                      <i className='fas fa-plus' />
                    </Button>
                    <Button
                      variant='outline-danger'
                      size='sm'
                      onClick={() => handleDeleteSocial(i)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className='d-flex'>
                <Button variant='outline-primary' onClick={() => handleAddSocial()}>
                  <i className='fas fa-plus' /> Add Social
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default AboutMeForm
