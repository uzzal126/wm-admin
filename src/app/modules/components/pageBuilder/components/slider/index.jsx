import {useEffect} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
const defaultImage = '/media/products/dummy-product.jpg'

const SliderComp = ({data}) => {
  const settings = {
    className: 'center',
    dots: data?.setting?.dots || true,
    arrows: data?.setting?.arrows || true,
    infinite: data?.setting?.infinite || true,
    slidesToShow: data?.setting?.fullWidth
      ? 1
      : data?.content?.urls?.filter((f) => f !== '')?.length > 2
      ? 3
      : data?.content?.urls?.filter((f) => f !== '')?.length,
    slidesToScroll: 1,
    autoplay: data?.setting?.autoplay || true,
    speed: 1200,
    //   prevArrow: <IoMdArrowRoundBack color={"black"} />,
    //   nextArrow: <IoMdArrowRoundForward color={"black"} />,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 2.7,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  useEffect(() => {
    console.log(data?.content?.urls)
  }, [data?.content?.urls?.toString()])
  return (
    <div className={`d-flex flex-column align-items-center`}>
      <h2>{data?.content?.title}</h2>
      <div style={{width: '70vw'}}>
        <Slider {...settings}>
          {data?.content?.urls?.filter((f) => f !== '')?.length > 0 ? (
            data?.content?.urls
              ?.filter((f) => f !== '')
              .map((item) => (
                <a href={data?.content?.link || '#'} key={item}>
                  <div className={'px-2'} style={{display: 'block'}}>
                    <img
                      src={item || defaultImage}
                      alt='slider img'
                      width={data?.setting?.fullWidth ? '100%' : data?.setting?.width || '300'}
                      height={
                        data?.setting?.fullWidth || data?.setting?.autoHeight
                          ? 'auto'
                          : data?.setting?.height || 'auto'
                      }
                    />
                  </div>
                </a>
              ))
          ) : (
            <div className={'px-2'} style={{display: 'block'}}>
              <img src={defaultImage} alt='slider img' width={'300'} height={'auto'} />
            </div>
          )}
        </Slider>
      </div>
      <h5 className='py-5'>{data?.content?.caption}</h5>
    </div>
  )
}

export default SliderComp
