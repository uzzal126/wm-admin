import {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import {useTheme} from '../../context/CartContext'

const FontCustomize = () => {
  const {themeData, onSave} = useTheme()
  const [post, setPost] = useState<any>({})

  useEffect(() => {
    setPost(themeData?.store_info)
  }, [themeData?.store_info])

  const onSubmit = () => {
    if (post && Object.keys(post).length > 0) {
      onSave('store_info', post, 'static')
    }
  }

  return (
    <div>
      <Form.Group className='mb-3' controlId='site_font'>
        <Form.Label>Site Font</Form.Label>
        <>
          <select
            className='form-select'
            aria-label='font selection'
            defaultValue={'poppins'}
            onChange={(e) => setPost({...post, site_font: e.target.value})}
          >
            <option disabled>Select fonts</option>
            <option value='poppins' selected>
              Poppins
            </option>
            <option value='roboto'>Roboto</option>
            <option value='tinos'>Tinos</option>
            <option value='jost'>Jost</option>
            <option value='lato'>Lato</option>
            <option value='playfair'>Playfair</option>
            <option value='montserrat'>Montserrat</option>
            <option value='inter'>Inter</option>
          </select>
        </>
        <Form.Label>Heading Font</Form.Label>
        <>
          <select
            className='form-select'
            aria-label='font selection'
            defaultValue={'poppins'}
            onChange={(e) => setPost({...post, header_font: e.target.value})}
          >
            <option disabled>Select heading fonts</option>
            <option value='Poppins' selected>
              Poppins
            </option>
            <option value='Roboto'>Roboto</option>
            <option value='Tinos'>Tinos</option>
            <option value='Jost'>Jost</option>
            <option value='Lato'>Lato</option>
            <option value='Playfair_Display'>Playfair</option>
            <option value='Montserrat'>Montserrat</option>
            <option value='Inter'>Inter</option>
          </select>
        </>
      </Form.Group>
      <button className='btn btn-dark btn-sm' onClick={onSubmit}>
        Update
      </button>
    </div>
  )
}

export default FontCustomize
