import {ListGroup} from 'react-bootstrap'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {
  useDeleteSectionMutation,
  useGetSectionsQuery,
} from '../../../../../_metronic/redux/slices/auth'
import EditSection from '../header/editSection'

const SectionList = ({section: selectedSection, setSection}: {section: any; setSection: any}) => {
  const {data, isLoading} = useGetSectionsQuery(undefined)
  const [sectionDelete] = useDeleteSectionMutation()

  const deleteHandler = (id: number) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this section!',
      icon: 'warning',
      buttons: ['Cancel', 'Confirm'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await sectionDelete(id).unwrap()
        if (res.success && res.status_code) {
          toast.success(res?.message || 'Your section has been deleted!')
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  if (isLoading) return <></>
  return (
    <KTCardBody>
      <ListGroup variant='flush'>
        {data &&
          data?.permission_groups &&
          data?.permission_groups.length > 0 &&
          data?.permission_groups.map((section: any, i: any) => (
            <ListGroup.Item
              className='cursor-pointer rounded'
              key={i}
              onClick={() => setSection(section)}
              active={section?.id === selectedSection?.id}
            >
              <div className='d-flex align-items-center justify-content-between'>
                <span>{section.name}</span>
                <div className='d-flex gap-2'>
                  <EditSection data={section} />
                  <button
                    className='btn btn-icon btn-light-danger w-30px h-30px'
                    onClick={() => deleteHandler(section.id)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </KTCardBody>
  )
}

export default SectionList
