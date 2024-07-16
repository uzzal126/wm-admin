import {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {getCategoryTree} from '../../../library/api.helper'
import CategoryPage from './components/category'

const Category = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const response = useSelector((state) => state.api.queries['getUserPermissions(undefined)'])

  const ability = (access, group) => {
    const {data} = response || {}
    const {data: userPermission} = data || []

    let groupData = []

    if (group && userPermission.length > 0) {
      groupData = userPermission.find((f) => f.group_route.includes(group))
    }

    if (groupData) {
      if (groupData?.permissions && groupData?.permissions.length > 0) {
        const permission = groupData?.permissions.find(
          (f) => f.name.includes(access) || f.route.includes(access)
        )
        if (permission) {
          return true
        }
      }
    }
    return false
  }

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const resp = await getCategoryTree()
    if (resp.status_code === 200) {
      setData(resp.tree)
    }
    setLoading(false)
  }

  const reFatch = useCallback(() => {
    setLoading(true)
    getData()
  })

  if (loading) return <h1>loading...</h1>

  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)
  return <CategoryPage data={data} reFatch={reFatch} ability={ability} />
}

const ManageCategory = () => <Category />

export {ManageCategory}
