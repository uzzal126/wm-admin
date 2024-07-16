import React from 'react'
import {useSelector} from 'react-redux'
import {RootState} from './store'

type CanProps = {
  children: React.ReactNode
  access: string
  group: string
}

export const useAbility = () => {
  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )

  const {data}: any = response || {}
  const {data: userPermission} = data || []

  let groupData: any = []

  const ability = (access: string, group: string) => {
    if (group && userPermission && userPermission.length > 0) {
      groupData = userPermission.find((f: any) => f?.group_route?.includes(group))
    }

    if (groupData) {
      if (groupData?.permissions && groupData?.permissions.length > 0) {
        const permission = groupData?.permissions.find(
          (f: any) => f.name.includes(access) || f.route.includes(access)
        )
        if (permission) {
          return true
        }
      }
    }
    return false
  }
  const navigate = (group: string) => {
    if (group && userPermission && userPermission.length > 0) {
      groupData = userPermission.find((f: any) => f.group_route.includes(group))
    }

    if (groupData) {
      if (groupData?.permissions && groupData?.permissions.length > 0) {
        return `/${group}/${groupData?.permissions[0].route}`
      }
    }
    return '/access-denied'
  }

  return {ability, navigate}
}

export const Can = ({children, access, group}: CanProps) => {
  if (access === 'false' || group === 'false') { return children; }

  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )

  const {data}: any = response || {}
  const {data: userPermission} = data || []

  let groupData: any = []

  if (group && userPermission && userPermission.length > 0) {
    groupData = userPermission.find((f: any) => f.group_route.includes(group))
  }

  if (groupData) {
    if (groupData?.permissions && groupData?.permissions.length > 0) {
      const permission = groupData?.permissions.find(
        (f: any) => f.name.includes(access) || f.route.includes(access)
      )
      if (permission) {
        return <>{children}</>
      }
    }
  }

  return <></>
}

//  default Can;
