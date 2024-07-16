import {ID, Response} from '../../../../../_metronic/helpers'

export type Job = {
  id: ID
  title?: string
  jobType?: string
  slug?: string
  description?: string
  location?: string
  salary?: string | number
  employment_status?: number | string
  number_of_applicants?: number
  status_id?: number
  image?: any
  gender?: string
  vacancy?: number
  age?: number | string
  date?: string
  deadline?: string | number
  experience?: number
  thumbnail: string
  banner: string
  category: string
  seo: string
  is_active?: number
  created_by?: string
  updated_by?: string
  created_at?: string
  updated_at?: string
}

export type JobsQueryResponse = Response<Array<Job>>
