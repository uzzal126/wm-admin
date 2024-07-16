import {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import {useTheme} from '../../context/CartContext'

const ThemeInfo = () => {
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
      <Form.Group className='mb-3' controlId='title'>
        <Form.Label>Site Title</Form.Label>
        <Form.Control
          type='text'
          value={post?.site_title || ''}
          onChange={(e) => setPost({...post, site_title: e.target.value})}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='business_name'>
        <Form.Label>Business Name</Form.Label>
        <Form.Control
          type='text'
          value={post?.business_name || ''}
          onChange={(e) => setPost({...post, business_name: e.target.value})}
        />
      </Form.Group>
      <button className='btn btn-dark btn-sm' onClick={onSubmit}>
        Update
      </button>
    </div>
  )
}

export default ThemeInfo
