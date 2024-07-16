import { FC } from 'react'
import { CustomerList } from './report'
import { ReviewsReport } from './review'
type Props = {
  slug: string
}

const CustomerReport: FC<Props> = ({ slug }) => {
  return (
    <>
      {slug.includes('statistics/reviews') && <ReviewsReport />}
      {slug.includes('statistics/customer') && <CustomerList />}
    </>
  )
}

export default CustomerReport
