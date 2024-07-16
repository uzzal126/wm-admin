import {ID, Response} from '../../../../../../_metronic/helpers'

export type Template = {
  id?: ID
  title?: string
  slug?: string
  name?: string
  text?: string
  created_by?: string
  updated_by?: string
  created_at?: string
  updated_at?: string
}

export type SMS = {
  id?: ID
  group?: any
  mobile?: []
  type?: string
  content?: string
  send_now?: boolean
  scheduled_at?: any
}

export type TemplatesQueryResponse = Response<Array<Template>>
