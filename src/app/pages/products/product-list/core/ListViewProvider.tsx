import {FC, createContext, useContext, useMemo, useState} from 'react'
import {
  ID,
  ProductListViewContextProps,
  calculateIsAllDataSelected,
  calculatedGroupingIsDisabled,
  groupingOnSelect,
  groupingOnSelectAll,
  productInitialListView,
} from '../../../../../_metronic/helpers'
import {useQueryResponse, useQueryResponseData} from './QueryResponseProvider'

const ListViewContext = createContext<ProductListViewContextProps>(productInitialListView)

const ListViewProvider: FC = ({children}: any) => {
  const [selected, setSelected] = useState<Array<ID>>(productInitialListView.selected)
  const [selectedAttribute, setSelectedAttribute] = useState<any>(
    productInitialListView.selectedAttribute
  )
  const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(productInitialListView.itemIdForUpdate)
  const {isLoading} = useQueryResponse()
  const data = useQueryResponseData()
  const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
  const isAllSelected = useMemo(
    () =>
      calculateIsAllDataSelected(
        data.filter((e: any) => e?.product_status !== 'Deleted'),
        selected
      ),
    [data, selected]
  )

  return (
    <ListViewContext.Provider
      value={{
        selected,
        selectedAttribute,
        setSelectedAttribute,
        itemIdForUpdate,
        setItemIdForUpdate,
        disabled,
        isAllSelected,
        onSelect: (id: ID) => {
          groupingOnSelect(id, selected, setSelected)
        },
        onSelectAll: () => {
          groupingOnSelectAll(
            isAllSelected,
            setSelected,
            data.filter((e: any) => e?.product_status !== 'Deleted')
          )
        },
        clearSelected: () => {
          setSelected([])
        },
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
}

const useListView = () => useContext(ListViewContext)

export {ListViewProvider, useListView}
