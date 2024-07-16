import QueryConfig from './queryConfig'

const BlogCarouselSetting = ({
  data,
  handlerOnChange,
  handlerOnSave,
}: {
  data: any
  handlerOnChange: any
  handlerOnSave: any
}) => {
  return (
    <div>
      <QueryConfig data={data} handlerOnChange={handlerOnChange} />
    </div>
  )
}

export default BlogCarouselSetting
