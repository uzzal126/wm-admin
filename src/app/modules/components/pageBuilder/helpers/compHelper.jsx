import AccordionComp from '../components/accordion'
import ButtonComponent from '../components/button'

import EditorComp from '../components/editor'
import FormComp from '../components/form'
import ImageComp from '../components/image'
import MapComponent from '../components/map'
import SliderComp from '../components/slider'
import SocialComp from '../components/social'
import VideoComp from '../components/video'

const CompHelper = ({data}) => {
  return (
    <div>
      {data?.type === 'editor' && <EditorComp data={data?.body} />}
      {data?.type === 'image' && <ImageComp data={data?.body} />}
      {data?.type === 'video' && <VideoComp data={data?.body} />}
      {data?.type === 'button' && <ButtonComponent data={data?.body} />}
      {data?.type === 'map' && <MapComponent data={data?.body} />}
      {data?.type === 'form' && <FormComp data={data?.body} />}
      {data?.type === 'slider' && <SliderComp data={data?.body} />}
      {data?.type === 'accordion' && <AccordionComp data={data?.body} />}
      {data?.type === 'social' && <SocialComp data={data?.body} />}
    </div>
  )
}

export default CompHelper
