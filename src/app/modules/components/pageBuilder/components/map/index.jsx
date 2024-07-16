const MapComponent = ({data}) => {
  const getIframeSrc = (iFrameHtml) => {
    const regex = /<iframe[^>]*src=[\"|']([^'\"]+)[\"|'][^>]*>/i
    let matchedUrl
    try {
      if ((matchedUrl = regex.exec(iFrameHtml)) !== null) {
        // The result can be accessed through the `m`-variable.
        return `${matchedUrl[1]}`
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  return (
    <div className={`d-flex flex-column align-items-${data?.setting?.position}`}>
      <h2>{data?.setting?.title}</h2>
      <iframe
        src={
          getIframeSrc(data?.content?.url) ||
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.3502570337673!2d90.40259411155178!3d23.77053867856761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76cf742decf%3A0x67c5cb97d570959b!2sRangs%20Babylonia!5e0!3m2!1sen!2sbd!4v1688384074778!5m2!1sen!2sbd'
        }
        width={data?.setting?.fullWidth ? `100%` : `${data?.setting?.width}`}
        height={data?.setting?.fullWidth ? `500px` : `${data?.setting?.height}`}
        style={{border: 0}}
        key={data?.content?.url}
        allowFullScreen={data?.setting?.fullscreen}
        title={data?.setting?.title}
        loading={data?.setting?.lazyLoading ? 'lazy' : 'eager'}
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  )
}

export default MapComponent
