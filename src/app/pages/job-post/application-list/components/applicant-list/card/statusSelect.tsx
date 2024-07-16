import {application_status} from '../../../../helper/constants'

export default function StatusSelect({callBack, className, selectedStatus}: any) {
  return (
    <select
      data-kt-select2='true'
      data-placeholder='Change Status'
      data-allow-clear='true'
      data-kt-user-table-filter='status'
      data-hide-search='true'
      className={`form-select fw-bolder ${className ? className : ''}`}
      onChange={(event) =>
        callBack(application_status.filter((e) => e.value === event.target.value)[0]?.value)
      }
    >
      <option value='' selected={!selectedStatus}>
        Select Status
      </option>
      {application_status?.map((item, indx) => (
        <option value={item.title} key={indx} selected={selectedStatus === item?.value}>
          {item.title}
        </option>
      ))}
    </select>
  )
}
