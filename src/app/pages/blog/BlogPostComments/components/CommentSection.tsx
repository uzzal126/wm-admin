import {useMemo} from 'react'
import {DataTableLoading} from '../../../../modules/datatable/loading/DataTableLoading'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import CommentBox from './CommentBox'
import NoCommentsFound from './NoCommentsFound'

const dummyResp = {
  success: true,
  status_code: 200,
  data: [
    {
      id: 19,
      post_id: 37,
      parent_comment_id: 0,
      customer_id: 0,
      commenter_name: 'Test',
      commenter_email: 'test@gmail.com',
      comment_text: 'Informative',
      emoji: '',
      image_url: '',
      created_at: 1696312897,
      updated_at: 1696312897,
      children: [
        {
          id: 20,
          post_id: 37,
          parent_comment_id: 19,
          customer_id: 0,
          commenter_name: 'Test2',
          commenter_email: 'test2@gmail.com',
          comment_text: 'really?',
          emoji: '',
          image_url: '',
          created_at: 1696326015,
          updated_at: 1696326015,
          children: [
            {
              id: 25,
              post_id: 37,
              parent_comment_id: 20,
              customer_id: 0,
              commenter_name: 'Test',
              commenter_email: 'test2@gmail.com',
              comment_text: 'sdfasd',
              emoji: '',
              image_url: '',
              created_at: 1696404126,
              updated_at: 1696404126,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 23,
      post_id: 37,
      parent_comment_id: 0,
      customer_id: 0,
      commenter_name: 'Tripto MMBD',
      commenter_email: 'tripto@mmbd.com',
      comment_text: 'Very Good Post',
      emoji: null,
      image_url: 'undefined',
      created_at: 1696398067,
      updated_at: 1696398067,
      children: [],
    },
    {
      id: 24,
      post_id: 37,
      parent_comment_id: 0,
      customer_id: 0,
      commenter_name: 'TriptoAfsin',
      commenter_email: 'afsintripto@gmail.com',
      comment_text: 'Very good from incognito',
      emoji: null,
      image_url: 'undefined',
      created_at: 1696398111,
      updated_at: 1696398111,
      children: [],
    },
  ],
}
export default function CommentSection() {
  const comments = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => comments, [comments])

  if (isLoading) return <DataTableLoading />

  if (!Array.isArray(data) || (Array.isArray(data) && data?.length === 0))
    return <NoCommentsFound />

  return data.map((item: any, indx: any) => (
    <div className='ms-5 ms-lg-10' key={indx}>
      <CommentBox comment={item} />
      {item?.children?.length > 0 &&
        item.children.map((child1: any, indx: any) => (
          <div className='ms-5 ms-lg-10' key={indx}>
            <CommentBox comment={child1} />
            {child1.children.length > 0 &&
              child1.children.map((child2: any, indx: any) => (
                <div className='ms-5 ms-lg-10' key={indx}>
                  <CommentBox comment={child2} />
                </div>
              ))}
          </div>
        ))}
    </div>
  ))
}
