import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {
  authApi,
  useDeleteSubsectionMutation,
  useGetAPIsQuery,
} from '../../../../../_metronic/redux/slices/auth'
import {RootState, useAppDispatch} from '../../../../../_metronic/redux/store'
import EditSubsection from '../header/editSubsection'

const SubsectionList = ({section}: {section: any}) => {
  //   const [subsections, setSubsections] = useState([])
  const {data: APIs, isLoading} = useGetAPIsQuery(undefined)
  const [sectionDelete] = useDeleteSubsectionMutation()
  const param = `?page=1&limit=9999&permission_group_id=${section?.id}`

  const appDispatch = useAppDispatch()

  const getSections: any = useSelector(
    (state: RootState) => state.api.queries[`getSubsections("${param}")`]
  )

  useEffect(() => {
    const getSectionsData = async () => {
      try {
        await appDispatch(authApi.endpoints.getSubsections.initiate(param))
      } catch (error) {
        // console.log(error)
      }
    }
    getSectionsData()
  }, [appDispatch, param, section.id])

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

  const subsections = getSections?.data
    ? getSections?.data?.permissions
      ? getSections?.data?.permissions
      : []
    : []

  return (
    <KTCardBody>
      <h3>Permissions</h3>
      <div className='table-responsive'>
        <table className='table align-middle table-row-dashed fs-6 gy-1 dataTable no-footer'>
          <thead>
            <tr className='text-start fw-bolder fs-7 text-uppercase gs-0'>
              <th>Name</th>
              <th>Slug</th>
              <th>API Routes</th>
              <th className='w-70px'>Action</th>
            </tr>
          </thead>
          <tbody>
            {subsections &&
              subsections.length > 0 &&
              subsections.map((subsection: any, i: any) => (
                <tr className='align-items-center' key={i}>
                  <td>{subsection?.name}</td>
                  <td>{subsection.route}</td>
                  <td>
                    {APIs?.api_uri_ids &&
                      APIs?.api_uri_ids
                        .filter((f: any) => subsection.api_uri_ids.includes(f.id))
                        .map((f: any) => (
                          <span className='badge badge-light-primary mx-1' key={f.id}>
                            {f.http_method}: {f.base_route}
                            {f.api_route}
                          </span>
                        ))}
                  </td>
                  <td>
                    <EditSubsection subsection={subsection} />
                    <button
                      className='btn btn-icon btn-light-danger w-25px h-25px ms-2'
                      onClick={() => deleteHandler(subsection.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </KTCardBody>
  )
}

export default SubsectionList
