import Slider from '@appigram/react-rangeslider'
import '@appigram/react-rangeslider/lib/index.css'

const NoUiSliderComponent = ({start, onChange}) => {
  return (
    <div className='slider'>
      <Slider min={0} max={100} value={start} onChange={onChange} />
    </div>
  )
}

export default NoUiSliderComponent
