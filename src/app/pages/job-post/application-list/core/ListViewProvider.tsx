import {FC, createContext, useContext, useMemo, useState} from 'react'
import {
  ID,
  JobListViewContextProps,
  calculateIsAllDataSelected,
  calculatedGroupingIsDisabled,
  groupingOnSelect,
  groupingOnSelectAll,
  jobInitialListView,
} from '../../../../../_metronic/helpers'
import {useQueryResponse, useQueryResponseData} from './QueryResponseProvider'

const ListViewContext = createContext<JobListViewContextProps>(jobInitialListView)

const ListViewProvider: FC = ({children}: any) => {
  const [selected, setSelected] = useState<Array<ID>>(jobInitialListView.selected)
  const [selectedAttribute, setSelectedAttribute] = useState<any>(
    jobInitialListView.selectedAttribute
  )
  const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(jobInitialListView.itemIdForUpdate)
  const {isLoading} = useQueryResponse()
  const data = useQueryResponseData()
  const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
  const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

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
          groupingOnSelectAll(isAllSelected, setSelected, data)
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
