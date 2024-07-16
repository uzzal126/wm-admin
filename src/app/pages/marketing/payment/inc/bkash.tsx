import React from 'react'
import {Form} from 'react-bootstrap'

const Bkash = ({setPost, post}: {setPost: any; post: any}) => {
  return (
    <div>
      <div className='mb-4 row align-items-center'>
        <div className='col-md-4'>
          <label htmlFor='app-key'>CHECKOUT APP KEY</label>
        </div>
        <div className='col-md-8'>
          <input
            type='text'
            id='app-key'
            required
            placeholder='CHECKOUT APP KEY'
            className='form-control'
            value={post.app_key}
            onChange={(e) => setPost({...post, app_key: e.target.value})}
          />
        </div>
      </div>
      <div className='mb-4 row align-items-center'>
        <div className='col-md-4'>
          <label htmlFor='app-secret'>CHECKOUT APP SECRET</label>
        </div>
        <div className='col-md-8'>
          <input
            type='text'
            id='app-secret'
            required
            placeholder='CHECKOUT APP SECRET'
            className='form-control'
            value={post.app_secret}
            onChange={(e) => setPost({...post, app_secret: e.target.value})}
          />
        </div>
      </div>
      <div className='mb-4 row align-items-center'>
        <div className='col-md-4'>
          <label htmlFor='app-x'>X API KEY</label>
        </div>
        <div className='col-md-8'>
          <input
            type='text'
            id='app-x'
            required
            placeholder='X API KEY'
            className='form-control'
            value={post.x_api_key}
            onChange={(e) => setPost({...post, x_api_key: e.target.value})}
          />
        </div>
      </div>
      <div className='mb-4 row align-items-center'>
        <div className='col-md-4'>
          <label htmlFor='app-code'>Merchant Short Code</label>
        </div>
        <div className='col-md-8'>
          <input
            type='text'
            id='app-code'
            required
            placeholder='Merchant Short Code'
            className='form-control'
            value={post.merchantshortcode}
            onChange={(e) => setPost({...post, merchantshortcode: e.target.value})}
          />
        </div>
      </div>
      <div className='mb-4 row align-items-center'>
        <div className='col-md-4'>
          <label htmlFor='app-username'>CHECKOUT USER NAME</label>
        </div>
        <div className='col-md-8'>
          <input
            type='text'
            id='app-username'
            required
            placeholder='CHECKOUT USER NAME'
            className='form-control'
            value={post.username}
            onChange={(e) => setPost({...post, username: e.target.value})}
          />
        </div>
      </div>
      <div className='mb-4 row align-items-center'>
        <div className='col-md-4'>
          <label htmlFor='app-password'>CHECKOUT PASSWORD</label>
        </div>
        <div className='col-md-8'>
          <input
            type='text'
            id='app-password'
            required
            placeholder='CHECKOUT PASSWORD'
            className='form-control'
            value={post.password}
            onChange={(e) => setPost({...post, password: e.target.value})}
          />
        </div>
      </div>
      <div className='mb-4 row align-items-center'>
        <div className='col-md-4'>
          <label htmlFor='sandbox-switch'>SANDBOX MODE</label>
        </div>
        <div className='col-md-8'>
          <Form.Check
            type='switch'
            id='sandbox-switch'
            label=''
            checked={!post.is_live}
            onChange={(e) => setPost({...post, is_live: !post.is_live})}
          />
        </div>
      </div>
    </div>
  )
}

export default Bkash
