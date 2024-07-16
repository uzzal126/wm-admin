import { FC, useMemo } from 'react'
import { useListView } from '../../core/ListViewProvider'

type Props = {
  data: any
}

const SelectionCell: FC<Props> = ({ data }) => {
  const { selected, onSelect } = useListView()
  const isSelected = useMemo(() => selected.includes(data.id), [data.id, selected])
  return (
    data.page_type === 'normal' ?
    <div className='form-check form-check-sm form-check-custom form-check-solid'>
      <input
        className='form-check-input'
        type='checkbox'
        data-kt-check={isSelected}
        data-kt-check-target='#kt_table_users .form-check-input'
        checked={isSelected}
        onChange={() => onSelect(data.id)}
      />
    </div>
    : <></>
  )
}

export { SelectionCell }
