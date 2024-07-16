import {Fragment, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {GET_CAMPAIGN_PRODUCT, UPDATE_STATUS} from '../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../library/api.helper'
import {TooltipComponent} from '../../../../modules/helper/misc'
import ShowProducts from './ShowProducts'

const ShowTable = ({data, camp, setEdit}) => {
  const [products, setProducts] = useState([])
  const [campData, setCampData] = useState([])

  useEffect(() => {
    setCampData(data)
  }, [data])

  const hanldeStatusChange = async (cmp) => {
    swal({
      title: 'Are you sure?',
      text: `Once ${cmp.active_status === 'Active' ? 'Inactive' : 'Active'}! this '${
        cmp.name
      }' campaign`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        const post = {
          group_id: camp.id,
          camp_id: cmp.id,
          active_status: cmp.active_status === 'Active' ? 'Inactive' : 'Active',
        }
        let res = await queryRequest(`${UPDATE_STATUS}/${camp?.id}`, post, 'put')
        // console.log(res)
        if (res.success && res.status_code === 200) {
          toast.success('Status change successfully')
          setCampData(res.data)
        } else {
          toast.error(res.message)
        }
      }
    })
  }
  const handleOnProduct = async (id) => {
    let res = await getQueryRequest(`${GET_CAMPAIGN_PRODUCT}/${id}/?page=1&items_per_page=10`)

    if (res.success && res.status_code === 200) {
      setProducts({
        key: id,
        data: res.data,
      })
    } else {
      setProducts({
        key: id,
        data: [],
      })
    }
  }

  return (
    <div>
      <table className='table align-middle table-row-dashed fs-6 gy-1'>
        <thead>
          <tr className='text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0'>
            <th>ID</th>
            <th>Banner</th>
            <th>TITLE</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th className='w-150px'>Action</th>
            <th className='text-end w-80px'></th>
          </tr>
        </thead>
        <tbody className='fw-bolder text-gray-600'>
          {campData && campData.length > 0 ? (
            campData.map((cp, i) => (
              <Fragment key={'cps' + i}>
                <tr>
                  <td>
                    {cp.active_status !== 'Ended' ? (
                      <label className='form-check form-switch form-check-custom form-check-solid'>
                        <input
                          className='form-check-input h-25px w-50px'
                          type='checkbox'
                          checked={cp.active_status === 'Active' ? true : false}
                          onChange={() => hanldeStatusChange(cp)}
                        />

                        <span className='form-check-label'>{cp.active_status}</span>
                      </label>
                    ) : (
                      cp.active_status
                    )}
                  </td>
                  <td>
                    <div className='symbol'>
                      <div
                        className='symbol-label w-150px h-40px'
                        style={{backgroundImage: `url(${cp.desktop_image})`}}
                      ></div>
                    </div>
                  </td>
                  <td>{cp.name}</td>
                  <td>{cp.start_at}</td>
                  <td>{cp.end_at}</td>
                  <td>
                    <Link
                      state={cp}
                      to={`/plugins/campaign/${cp.group_slug}/products/${cp.id}`}
                      className='btn py-3 px-4 fs-7 btn-light-success'
                    >
                      <i className='fas fa-plus'></i> Item
                    </Link>
                  </td>
                  <td className='text-end'>
                    <button
                      type='button'
                      className='btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px me-2'
                      onClick={() =>
                        products.key !== cp.id ? handleOnProduct(cp.id) : setProducts([])
                      }
                    >
                      <span className='svg-icon svg-icon-3 m-0'>
                        {products.key === cp.id ? (
                          <i className='fas fa-arrow-up'></i>
                        ) : (
                          <i className='fas fa-arrow-down'></i>
                        )}
                      </span>
                    </button>
                    <TooltipComponent tooltip='Edit Campaign'>
                      <button
                        onClick={() => setEdit(cp)}
                        className='btn btn-sm btn-icon btn-light-primary w-30px h-30px'
                      >
                        <i className='fas fa-pencil-alt fs-3'></i>
                      </button>
                    </TooltipComponent>
                  </td>
                </tr>
                {products &&
                  products.key === cp.id &&
                  products.data.length > 0 &&
                  products.data.map((csp, j) => <ShowProducts key={j} indx={j} item={csp} />)}
              </Fragment>
            ))
          ) : (
            <tr>
              <td className='text-center'>No Data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ShowTable
