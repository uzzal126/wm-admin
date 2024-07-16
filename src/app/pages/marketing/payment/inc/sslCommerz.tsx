import React from 'react'
import {Form} from 'react-bootstrap'

const SslCommerz = ({setPost, post}: {setPost: any; post: any}) => {
  return (
    <div>
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
          <label htmlFor='sandbox-switch'>LIVE MODE</label>
        </div>
        <div className='col-md-8'>
          <Form.Check
            type='switch'
            id='sandbox-switch'
            label=''
            checked={post.is_live === 1}
            onChange={(e) => setPost({...post, is_live: post.is_live === 1 ? 0 : 1})}
          />
        </div>
      </div>
    </div>
  )
}

export default SslCommerz
