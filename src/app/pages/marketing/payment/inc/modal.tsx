import React, {useEffect, useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import Bkash from './bkash'
import {queryRequest} from '../../../../library/api.helper'
import {GET_CHANNEL_CONFIGURE, POST_PAYMENT_CONFIGURE} from '../../../../constants/api.constants'
import {toast} from 'react-toastify'
import SslCommerz from './sslCommerz'

type Props = {
  item: any
  setShow: any
  show: boolean
}

type PostType = {
  payment_partner_id: number
  username: string
  password: string
  app_key: string
  app_secret: string
  x_api_key: string
  merchantshortcode: string
  is_live: number
  redirect_url: string
}

const ConfigModal = ({setShow, show, item}: Props) => {
  const [validated, setValidated] = useState(false)
  const [post, setPost] = useState<PostType>({
    payment_partner_id: item.id,
    username: '',
    password: '',
    app_key: '',
    app_secret: '',
    x_api_key: '',
    merchantshortcode: '',
    is_live: 0,
    redirect_url: 'https://webmanza.com/payment',
  })

  useEffect(() => {
    getConfig(item.id)
  }, [item.id])

  const getConfig = async (id: number) => {
    const res = await queryRequest(GET_CHANNEL_CONFIGURE, {
      payment_partner_id: id,
    })
    if (res.success && res.status_code === 200) {
      setPost({
        app_key: res.data.app_key,
        app_secret: res.data.app_secret,
        payment_partner_id: res.data.payment_partner_id,
        username: res.data.username,
        password: res.data.password,
        is_live: res.data.is_live === 1 ? 0 : 1,
        merchantshortcode: res.data.marchant_short_code,
        redirect_url: res.data.redirect_url || 'https://webmanza.com/payment',
        x_api_key: res.data.x_api_key,
      })
    }
  }

  const handleConfigureAdd = async (event: any) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    } else {
      setValidated(false)

      if (item.id === 1) {
        const res = await queryRequest(POST_PAYMENT_CONFIGURE, post)
        if (res.success && res.status_code === 200) {
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      } else if (item.id === 2) {
        const res = await queryRequest(POST_PAYMENT_CONFIGURE, {
          payment_partner_id: item.id,
          username: post.username,
          password: post.password,
          is_live: post.is_live,
          redirect_url: post.redirect_url,
        })
        if (res.success && res.status_code === 200) {
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      }
    }
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleConfigureAdd}>
        <Modal.Header closeButton>
          <Modal.Title>{item?.name} Credential</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {item?.name === 'bKash' && <Bkash post={post} setPost={setPost} />}
          {item?.name === 'SSLCOMMERZ' && <SslCommerz post={post} setPost={setPost} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(!show)}>
            Close
          </Button>
          <Button variant='primary' type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </>
  )
}

export default ConfigModal
