import { FC, PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'
import {
  ID,
  ListViewContextProps,
  calculateIsAllDataSelected,
  calculatedGroupingIsDisabled,
  groupingOnSelect,
  groupingOnSelectAll,
  initialListView,
} from '../../../../../_metronic/helpers'
import { useQueryResponse, useQueryResponseData } from './QueryResponseProvider'

const ListViewContext = createContext<ListViewContextProps>(initialListView)

interface ChildrenProps {
  children: any
}

const ListViewProvider: FC<PropsWithChildren<ChildrenProps>> = ({ children }: any) => {
  const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
  const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
  const { isLoading } = useQueryResponse()
  const data = useQueryResponseData()
  const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
  const isAllSelected = useMemo(
    () =>
      calculateIsAllDataSelected(
        data.length > 0 ? data.filter((f: any) => !f.channel.includes('Website')) : [],
        selected
      ),
    [data, selected]
  )

  return (
    <ListViewContext.Provider
      value={{
        selected,
        itemIdForUpdate,
        setItemIdForUpdate,
        disabled,
        isAllSelected,
        onSelect: (id: ID) => {
          groupingOnSelect(id, selected, setSelected)
        },
        onSelectAll: () => {
          let updatedData: any = []
          if (data.length > 0) {
            data.map((item: any) => {
              if (!item.channel.includes('Website')) {
                updatedData.push({
                  ...item,
                  id: item.invoice_id,
                })
              }
            })
          }
          groupingOnSelectAll(isAllSelected, setSelected, updatedData)
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

export { ListViewProvider, useListView }

