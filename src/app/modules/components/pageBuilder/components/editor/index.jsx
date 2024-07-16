const EditorComp = ({data}) => {
  return (
    <div className={`d-flex flex-column align-items-${data?.setting?.position}`}>
      <div dangerouslySetInnerHTML={{__html: unescape(data?.content)}}></div>
    </div>
  )
  // return <div dangerouslySetInnerHTML={{__html: data?.content}}></div>
}

export default EditorComp
