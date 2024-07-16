import {FC, useMemo} from 'react'
import {ID} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {Product} from '../../core/_models'

type Props = {
  id: ID
  product: Product
}

const SelectionCell: FC<Props> = ({id, product}) => {
  const {selected, onSelect} = useListView()
  const isSelected = useMemo(() => selected.includes(id), [id, selected])
  return (
    <div className='form-check form-check-sm form-check-custom form-check-solid'>
      <input
        className='form-check-input'
        type='checkbox'
        data-kt-check={isSelected}
        data-kt-check-target='#kt_table_users .form-check-input'
        checked={isSelected}
        onChange={() => {
          if (product?.product_status !== 'Deleted') {
            onSelect(id)
          }
        }}
      />
    </div>
  )
}

export {SelectionCell}
