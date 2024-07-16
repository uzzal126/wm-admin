import {FC, Fragment, useEffect, useState} from 'react'
import {GET_PRODUCT_VARIANTS} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {UpdateStock} from './UpdateStock'

type Props = {
  pid: any
}

const RenderAttribute: FC<Props> = ({pid}) => {
  const [attributes, setAttributes] = useState([])

  useEffect(() => {
    getVariants(pid)
  }, [pid])

  const getVariants = async (id: string) => {
    const res: any = await getQueryRequest(`${GET_PRODUCT_VARIANTS}/${id}`)
    if (res.success && res.status_code === 200) {
      setAttributes(res.data)
    }
  }

  // // console.log(attributes)

  return (
    <Fragment>
      {attributes &&
        attributes.length > 0 &&
        attributes.map((at: any, i: any) => (
          <tr key={i}>
            <td></td>
            <td colSpan={2} className='text-start'>
              <div className='d-flex align-items-center ps-lg-8'>
                <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                  <div className='symbol-label'>
                    <img src={at?.thumbnail.src} alt={''} className='w-100' />
                  </div>
                </div>
                <div className='d-flex gap-4'>
                  {at.option && at.option !== 'null' ? (
                    <div className='d-flex flex-column'>
                      {at.option}
                      <span className='fw-bold text-gray-400'>{at.value}</span>
                    </div>
                  ) : null}
                  {at.option1 && at.option1 !== 'null' ? (
                    <div className='d-flex flex-column'>
                      {at.option1}
                      <span className='fw-bold text-gray-400'>{at.value1}</span>
                    </div>
                  ) : null}
                  {at.option2 && at.option2 !== 'null' ? (
                    <div className='d-flex flex-column'>
                      {at.option2}
                      <span className='fw-bold text-gray-400'>{at.value3}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </td>
            <td className='text-center'>{at.price.selling_price}</td>
            <td className='text-center'>
              <p className='text-muted mb-1'>Total Stock</p>
              {at.total_added}
            </td>
            <td className='text-center'>
              <p className='text-muted mb-1'>Committed</p>
              {at.committed}
            </td>
            <td className='text-center'>
              <p className='text-muted mb-1'>Sold</p>
              {at.sold}
            </td>
            <td colSpan={3}>
              <UpdateStock proId={pid} attrId={at.id} />
            </td>
            {/* <td>VIEW</td> */}
          </tr>
        ))}
    </Fragment>
  )
}

export {RenderAttribute}
