import {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import Select from 'react-select'
import {toast} from 'react-toastify'
import {useAddSectionMutation, useGetAPIsQuery} from '../../../../../_metronic/redux/slices/auth'

const CreateSection = () => {
  const [section, setSection] = useState(false)

  const {data: APIs, isLoading} = useGetAPIsQuery(undefined)
  const [addSection] = useAddSectionMutation()

  const [post, setPost] = useState({
    section_group: 'NA',
    name: '',
    purpose: '',
    route: '',
    sub_section_ids: [],
    api_uri_ids: [],
  })

  if (isLoading) return <></>

  const APIsOptions = () => {
    let lists: any = []
    if (APIs?.api_uri_ids) {
      // eslint-disable-next-line array-callback-return
      APIs?.api_uri_ids.map((item: any) => {
        lists.push({
          ...item,
          label: `${item.http_method}:${item.base_route}${item.api_route}`,
          value: item.id,
        })
      })
    }

    return lists
  }

  const handleSubmit = async () => {
    if (post.name === '' && post.route === '') {
      toast.error('Field required')
    } else {
      try {
        const res = await addSection(post).unwrap()
        if (res.success && res.status_code === 200) {
          toast.success(res.message)
          setPost({
            section_group: 'NA',
            name: '',
            purpose: '',
            route: '',
            sub_section_ids: [],
            api_uri_ids: [],
          })
          setSection(false)
        } else {
          toast.error('Section create failed')
        }
      } catch (error) {
        // console.log(error)
        toast.error('Section create failed')
      }
    }
  }

  return (
    <>
      <button className='btn btn-sm btn-light-primary' onClick={() => setSection(!section)}>
        <i className='fas fa-plus'></i> Permission Group
      </button>
      <Modal show={section} onHide={() => setSection(!section)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Permission Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={post.name}
              onChange={(e) => setPost({...post, name: e.target.value})}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='route'>
            <Form.Label>Group Route</Form.Label>
            <Form.Control
              type='text'
              placeholder='/dashboard'
              value={post.route}
              onChange={(e) => setPost({...post, route: e.target.value})}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='route'>
            <Form.Label>API Route</Form.Label>
            <Select
              defaultValue={[]}
              isMulti
              name='api'
              options={APIsOptions()}
              onChange={(e: any) => setPost({...post, api_uri_ids: e.map((f: any) => f.value)})}
              classNamePrefix='select'
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setSection(!section)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateSection
