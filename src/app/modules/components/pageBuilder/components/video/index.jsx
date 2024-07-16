import {useEffect} from 'react'
import ReactPlayer from 'react-player'
const VideoComp = ({data}) => {
  useEffect(() => {
    console.log('video data', data)
  }, [data?.toString()])
  return (
    <div className={`d-flex flex-column align-items-${data?.setting?.position}`}>
      <h2>{data?.setting?.title}</h2>
      <ReactPlayer
        url={data?.content?.url || 'https://www.youtube.com/watch?v=Zz44glD2Fzs'}
        className='img-fluid'
        key={data?.content?.url}
        muted={data?.setting?.muted}
        width={
          data?.setting?.fullWidth
            ? `100%`
            : data?.setting?.width
            ? `${data?.setting?.width}px`
            : '600px'
        }
        height={
          data?.setting?.fullWidth
            ? `60vh`
            : data?.setting?.height
            ? `${data?.setting?.height}px`
            : '360px'
        }
        loop={data?.setting?.loop}
      />
    </div>
  )
}

export default VideoComp
