import {useQuery} from '@tanstack/react-query'
import {BASE_URL} from '../../../../../constants/api.constants'
import {getBalanceReportSummary} from '../core/_requests'
import Card from './Card'

const cards = [
  {
    id: 1,
    title: 'Approved',
    type: 'Non-Masking',
    backgroundColor: 'rgb(232, 255, 243)',
  },
  {
    id: 2,
    title: 'Approved',
    type: 'Masking',
    backgroundColor: 'rgb(232, 255, 243)',
  },
  {
    id: 3,
    title: 'Pending',
    type: 'Non-Masking',
    backgroundColor: 'rgb(255, 248, 221)',
  },
  {
    id: 4,
    title: 'Pending',
    type: 'Masking',
    backgroundColor: 'rgb(255, 248, 221)',
  },
  {
    id: 5,
    title: 'Canceled',
    type: 'Non-Masking',
    backgroundColor: 'rgb(255, 245, 248)',
  },
  {
    id: 6,
    title: 'Canceled',
    type: 'Masking',
    backgroundColor: 'rgb(255, 245, 248)',
  },
]

export default function ReportSummaryCard() {
  const { isLoading, data: report, } = useQuery({
    queryKey: [`${BASE_URL}/sms/balance-report-summary`],
    queryFn: () => getBalanceReportSummary(),
    gcTime: 0,      // same as 'cacheTime'
  });

  return (
    <div className='card mb-8'>
      <div className='card-body p-4'>
        <div className='row g-5 g-xl-8'>
          {cards.map((item, indx) => (
            <Card
              title={item?.title}
              type={item?.type}
              data={report}
              backgroundColor={item?.backgroundColor}
              key={indx}
              loading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
