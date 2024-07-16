import {FC} from 'react'

type Props = {
  attachments?: any
}

const AttachmentCell: FC<Props> = ({attachments}) => {
  // fw-semibold text-gray-600 fs-6 (for light font)
  let list = []

  try {
    list = attachments ? JSON.parse(attachments) : []
  } catch (err) {
    list = []
  }

  return (
    <div>
      {list.length > 0 ? (
        list.map((item: any, indx: any) => (
          <div>
            <a href={item?.url} className='' target='_blank'>
              {indx + 1} : {item?.filename || `Attachement ${indx + 1}`}
            </a>
          </div>
        ))
      ) : (
        <span className=''>N/A</span>
      )}
    </div>
  )
}

export {AttachmentCell}
