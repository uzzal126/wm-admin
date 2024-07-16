import {useEffect, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {BASE_URL} from '../../../../../constants/api.constants'
import {getBalanceReportSummary} from '../core/_requests'
import Card from './Card'

const cards = [
  {
    id: 1,
    title: 'Total Sent',
    backgroundColor: '#f1faff',
    textColor: 'primary',
    borderColor: 'rgb(0, 158, 247)',
  },
  {
    id: 2,
    title: 'Delivered',
    backgroundColor: 'rgb(232, 255, 243)',
    borderColor: 'rgb(80, 205, 137)',
    textColor: 'success',
  },
  {
    id: 5,
    title: 'Processing',
    backgroundColor: 'rgb(248, 245, 255)',
    borderColor: 'rgb(114, 57, 234)',
    textColor: 'info',
  },
  {
    id: 3,
    title: 'Submitted',
    backgroundColor: 'rgb(255, 248, 221)',
    borderColor: 'rgb(255, 199, 0)',
    textColor: 'warning',
  },
  {
    id: 4,
    title: 'Canceled',
    backgroundColor: 'rgb(255, 245, 248)',
    borderColor: 'rgb(241, 65, 108)',
    textColor: 'danger',
  },
  {
    id: 6,
    title: 'Failed',
    backgroundColor: 'rgb(249, 249, 249)',
    borderColor: 'rgb(24, 28, 50)',
    textColor: 'dark',
  },
]

export default function ReportSummaryCard() {

  const { isLoading, data: report, } = useQuery({
    queryKey: [`${BASE_URL}/sms/report/redeem/summary`],
    queryFn: () => getBalanceReportSummary(),
    gcTime: 0,      // same as 'cacheTime'
    placeholderData: previousData => previousData,   // identity function with the same behaviour as 'keepPreviousData'
    refetchOnWindowFocus: false,
  });

  const [total, setTotal] = useState(0)
  const [totalSent, setTotalSent] = useState(0)

  useEffect(() => {
    if (Array.isArray(report) && report.length > 0) {
      const totalSMS = report.reduce((acc, obj) => {
        return acc + obj?.number_of_sms
      }, 0)

      const totalSentSMS = report.reduce((acc, obj) => {
        return ['Delivered', 'Partially Delivered', 'Failed'].includes(obj?.status)
          ? acc + obj?.number_of_sms
          : acc + 0
      }, 0)

      setTotal(totalSMS)
      setTotalSent(totalSentSMS)
    } else {
      setTotal(0)
      setTotalSent(0)
    }
  }, [report])

  return (
    <div className='card '>
      <div className='card-body p-4'>
        <div className='row g-5 g-xl-8'>
          {cards.map((item, indx) => (
            <Card
              title={item?.title}
              total={total}
              data={
                item?.title === 'Total Sent'
                  ? {number_of_sms: totalSent}
                  : Array.isArray(report) && report.length > 0
                  ? report.filter((e) => e?.status === item?.title)[0]
                  : undefined
              }
              textColor={item?.textColor}
              borderColor={item?.borderColor}
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
