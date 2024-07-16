import AboutMeForm from './AboutMeForm'

const AboutMeSetting = ({
  data,
  handlerOnChange,
}: {
  data: any
  handlerOnChange: any
}) => {
  const handleFieldEdit = (value: any, key: any) => {
    const post = {
      ...data,
      [key]: value,
    }
    if (key === 'image') {
      handlerOnChange(post)
    } else {
      handlerOnChange(post, true)
    }
  }
  const handleOnBlur = (value: any) => {
    const post = {
      ...value,
    }
    handlerOnChange(post)
  }

  return (
    <div>
      <div className='py-2'>
        <AboutMeForm handleFieldEdit={handleFieldEdit} data={data} onBlur={handleOnBlur} />
      </div>
    </div>
  )
}

export default AboutMeSetting
