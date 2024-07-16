import BlogCustomize from './blogs'
import ThemeProvider from './context/CartContext'
import EcommerceCustomization from './ecommerce'

const BasicCustomization = ({data}: {data: any}) => {
  // console.log('customization data', data)
  return (
    <ThemeProvider data={data}>
      <div className='p-4'>
        <h2>Basic Customization</h2>
        {data?.store_cat_id === 20 ? <BlogCustomize /> : <EcommerceCustomization tid={data?.tid} />}
      </div>
    </ThemeProvider>
  )
}

export default BasicCustomization
