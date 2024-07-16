import {useEffect, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {BASE_URL} from '../../../../../constants/api.constants'
import {getBalanceReportSummary} from '../../report/core/_requests'
import Card from './Card'

const cards = [
  {
    id: 1,
    title: 'Total Sent',
    backgroundColor: '#f1faff',
    textColor: 'primary',
    borderColor: 'rgb(0, 158, 247)',
    icon: '/media/icons/duotune/maps/map006.svg',
  },
  {
    id: 2,
    title: 'Delivered',
    backgroundColor: 'rgb(232, 255, 243)',
    borderColor: 'rgb(80, 205, 137)',
    textColor: 'success',
    icon: '/media/icons/duotune/graphs/gra001.svg',
  },
  {
    id: 5,
    title: 'Processing',
    backgroundColor: 'rgb(248, 245, 255)',
    borderColor: 'rgb(114, 57, 234)',
    textColor: 'info',
    icon: '/media/icons/duotune/abstract/abs048.svg',
  },
  {
    id: 3,
    title: 'Submitted',
    backgroundColor: 'rgb(255, 248, 221)',
    borderColor: 'rgb(255, 199, 0)',
    textColor: 'warning',
    icon: '/media/icons/duotune/maps/map005.svg',
  },
  {
    id: 4,
    title: 'Canceled',
    backgroundColor: 'rgb(255, 245, 248)',
    borderColor: 'rgb(241, 65, 108)',
    textColor: 'danger',
    icon: '/media/icons/duotune/abstract/abs033.svg',
  },
  {
    id: 6,
    title: 'Failed',
    backgroundColor: 'rgb(249, 249, 249)',
    borderColor: 'rgb(24, 28, 50)',
    textColor: 'dark',
    icon: '/media/icons/duotune/abstract/abs027.svg',
  },
]

export default function Cards() {
  const [totalSent, setTotalSent] = useState(0)

  const { isLoading, data: report, } = useQuery({
    queryKey: [`${BASE_URL}/sms/dashboard/report/summary`],
    queryFn: () => getBalanceReportSummary(),
    gcTime: 0,      // same as 'cacheTime'
  });

  useEffect(() => {
    if (Array.isArray(report) && report.length > 0) {
      const totalSentSMS = report.reduce((acc, obj) => {
        return ['Delivered', 'Partially Delivered', 'Failed'].includes(obj?.status)
          ? acc + Number(obj?.number_of_sms)
          : acc + 0
      }, 0)

      setTotalSent(totalSentSMS)
    } else {
      setTotalSent(0)
    }
  }, [report])

  return cards.map((item, indx) => (
    <Card
      title={item?.title}
      data={
        item?.title === 'Total Sent'
          ? {number_of_sms: totalSent}
          : Array.isArray(report) && report.length > 0
          ? report.filter((e) => e?.status === item?.title)[0]
          : undefined
      }
      key={indx}
      loading={isLoading}
      icon={item?.icon}
      textColor={item?.textColor}
    />
  ))
}
