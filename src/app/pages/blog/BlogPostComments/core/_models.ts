import {ID, Response} from '../../../../../_metronic/helpers'

export type Comment = {
  id: ID
  title: string
  slug: string
  description: string
  thumbnail: {
    alt: string
    src: string
  }
  banner: {
    alt: string
    src: string
    caption: string
  }
  category: string
  seo: {
    title: string
    description: string
    keywords: string
  }
  is_active?: number
  created_by?: string
  updated_by?: string
  created_at?: string
  updated_at?: string
  status_id?: number
  comments?: number
  visitors?: number
}

export type CommentsQueryResponse = Response<Array<Comment>>
