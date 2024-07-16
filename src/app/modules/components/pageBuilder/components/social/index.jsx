import {SocialIcon} from 'react-social-icons'
const SocialComp = ({data}) => {
  return (
    <div className={`d-flex flex-column align-items-${data?.setting?.position}`}>
      <h2>{data?.setting?.title}</h2>
      <div className='d-flex flex-column flex-xl-row flex-lg-row py-2'>
        <div className='px-2 py-2'>
          <SocialIcon url={data?.content?.urls?.link1 || 'https://twitter.com/jaketrent'} />
        </div>

        {data?.content?.urls?.link2 && (
          <div className='px-2 py-2'>
            <SocialIcon url={data?.content?.urls?.link2 || 'https://twitter.com/jaketrent'} />
          </div>
        )}
        {data?.content?.urls?.link3 && (
          <div className='px-2 py-2'>
            <SocialIcon url={data?.content?.urls?.link3 || 'https://twitter.com/jaketrent'} />
          </div>
        )}
        {data?.content?.urls?.link4 && (
          <div className='px-2 py-2'>
            <SocialIcon url={data?.content?.urls?.link4 || 'https://twitter.com/jaketrent'} />
          </div>
        )}
        {data?.content?.urls?.link5 && (
          <div className='px-2 py-2'>
            <SocialIcon url={data?.content?.urls?.link5 || 'https://twitter.com/jaketrent'} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialComp
