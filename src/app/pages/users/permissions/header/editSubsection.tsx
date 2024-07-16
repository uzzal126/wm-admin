import {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import Select from 'react-select'
import {toast} from 'react-toastify'
import {
  useEditSubsectionMutation,
  useGetAPIsQuery,
  useGetSectionsQuery,
} from '../../../../../_metronic/redux/slices/auth'

const EditSubsection = ({subsection}: {subsection: any}) => {
  const [section, setSection] = useState(false)
  const {data: APIs, isLoading} = useGetAPIsQuery(undefined)
  const {data: sectionsData, isLoading: sectionLoading} = useGetSectionsQuery(undefined)

  const [editSubsection] = useEditSubsectionMutation()

  const [post, setPost] = useState({
    id: subsection?.id,
    name: subsection?.name,
    purpose: subsection?.purpose,
    route: subsection?.route,
    permission_group_id: subsection?.permission_group_id,
    api_uri_ids: subsection?.api_uri_ids,
  })

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
  const sectionsOptions = () => {
    let lists: any = []
    if (sectionsData.permission_groups) {
      // eslint-disable-next-line array-callback-return
      sectionsData?.permission_groups.map((item: any) => {
        lists.push({
          ...item,
          label: item.name,
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
        const newPost = {
          id: subsection.id,
          data: {_method: 'PUT', ...post},
        }
        const res = await editSubsection(newPost).unwrap()
        if (res.success && res.status_code === 200) {
          toast.success(res.message)
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

  if (isLoading || sectionLoading) return <></>

  return (
    <>
      <button
        className='btn btn-icon btn-light-info w-25px h-25px'
        onClick={() => setSection(!section)}
      >
        <i className='fas fa-pencil'></i>
      </button>
      <Modal show={section} onHide={() => setSection(!section)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Subsection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Subsection Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={post.name}
              onChange={(e) => setPost({...post, name: e.target.value})}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='route'>
            <Form.Label>Subsection Route</Form.Label>
            <Form.Control
              type='text'
              placeholder='/dashboard'
              value={post.route}
              onChange={(e) => setPost({...post, route: e.target.value})}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='route'>
            <Form.Label>Choose Section</Form.Label>
            <Select
              defaultValue={sectionsOptions().filter(
                (f: any) => subsection?.permission_group_id === f.id
              )}
              name='section'
              options={sectionsOptions()}
              onChange={(e: any) => setPost({...post, permission_group_id: e.id})}
              classNamePrefix='select'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='route'>
            <Form.Label>API Route</Form.Label>
            <Select
              defaultValue={APIsOptions().filter((f: any) =>
                subsection?.api_uri_ids.includes(f.id)
              )}
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditSubsection
