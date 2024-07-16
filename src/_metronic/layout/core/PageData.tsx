/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, PropsWithChildren, createContext, useContext, useEffect, useState} from 'react'

export interface BackLink {
  title: string
  path: string
}

export interface PageDataContextModel {
  pageTitle?: any
  setPageTitle: (_title: any) => void
  pageDescription?: string
  setPageDescription: (_description: string) => void
  backLink?: Array<BackLink>
  setBackLink: (_back: Array<BackLink>) => void
  datePicker?: boolean
  setdatePicker: (_datePicker: boolean) => void
  datePickerData?: any
  setdatePickerData: (_datePickerData: any) => any
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: any) => {},
  setdatePicker: (_datePicker: boolean) => {},
  setdatePickerData: (_datePicker: any) => {},
  setPageDescription: (_description: string) => {},
  setBackLink: (_back: Array<BackLink>) => {},
})

interface ChildrenProps {
  children?: any
}

const PageDataProvider: React.FC<PropsWithChildren<ChildrenProps>> = ({children}: any) => {
  const [pageTitle, setPageTitle] = useState<any>([])
  const [pageDescription, setPageDescription] = useState<string>('')
  const [datePicker, setdatePicker] = useState<boolean>(false)
  const [datePickerData, setdatePickerData] = useState<any>({})
  const [backLink, setBackLink] = useState<Array<BackLink>>([])
  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    backLink,
    setBackLink,
    datePicker,
    setdatePicker,
    datePickerData,
    setdatePickerData,
  }
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  backLink?: Array<BackLink>
  description?: string
  datePicker?: boolean
  children?: any
}

const PageTitle: FC<Props> = ({children, description, datePicker, backLink}) => {
  const {setPageTitle, setPageDescription, setdatePicker, setBackLink} = usePageData()
  useEffect(() => {
    if (children) {
      setPageTitle(children)
    }
    return () => {
      setPageTitle([])
    }
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (datePicker) {
      setdatePicker(datePicker)
    }
    return () => {
      setdatePicker(false)
    }
  }, [datePicker])

  useEffect(() => {
    if (backLink) {
      setBackLink(backLink)
    }
    return () => {
      setBackLink([])
    }
  }, [backLink])

  return <></>
}

const PageDescription: React.FC<PropsWithChildren<ChildrenProps>> = ({children}: any) => {
  const {setPageDescription} = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return <></>
}

export {PageDataProvider, PageDescription, PageTitle, usePageData}
