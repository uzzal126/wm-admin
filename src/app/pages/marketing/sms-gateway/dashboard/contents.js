import axios from 'axios'
import {useEffect, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import LineApexChart from '../../../../../_metronic/partials/widgets/charts/LineApexChat'
import {BASE_URL} from '../../../../constants/api.constants'
import Cards from './components/Cards'
const icCard = [
  {
    color: '#F1416C',
    icon: 'sms',
    bg: '/media/svg/shapes/wave-bg-red.svg',
    body: {
      number: '1200',
      title: 'SMS',
      subtitle: 'Last Week',
    },
    footer: {
      number: '935',
      title: 'Cost Last Week',
    },
  },
  {
    color: '#7239EA',
    icon: 'comment',
    bg: '/media/svg/shapes/wave-bg-purple.svg',
    body: {
      number: '427',
      title: 'SMS',
      subtitle: 'Last Month',
    },
    footer: {
      number: '935',
      title: 'Cost Last Month',
    },
  },
  {
    color: '#009ef7',
    icon: 'comments-dollar',
    bg: '/media/svg/shapes/wave-bg-purple.svg',
    body: {
      number: '1656',
      title: 'Balance',
      subtitle: 'Price Per SMS',
    },
    footer: {
      number: '935',
      title: 'Total TK',
    },
  },
  {
    color: '#007991',
    icon: 'comment-alt',
    bg: '/media/svg/shapes/wave-bg-dark.svg',
    body: {
      number: '123',
      title: 'Non Mask',
      subtitle: 'Sended SMS',
    },
    footer: {
      number: '9135',
      title: 'Remaining SMS',
    },
  },
  {
    color: '#198754',
    icon: 'comment-alt',
    bg: '/media/svg/shapes/wave-bg-dark.svg',
    body: {
      number: '123',
      title: 'Masking',
      subtitle: 'Sended SMS',
    },
    footer: {
      number: '9355',
      title: 'Remaining SMS',
    },
  },
]

var data = [
  {
    name: 'Openlane',
    value1: 160.2,
    value2: 26.9,
  },
  {
    name: 'Yearin',
    value1: 120.1,
    value2: 50.5,
  },
  {
    name: 'Goodsilron',
    value1: 150.7,
    value2: 12.3,
  },
  {
    name: 'Condax',
    value1: 69.4,
    value2: 74.5,
  },
  {
    name: 'Warephase',
    value1: 21.5,
    value2: 12.1,
  },
  {
    name: 'Donquadtech',
    value1: 19.7,
    value2: 10.8,
  },
  {
    name: 'Nam-zim',
    value1: 15.5,
    value2: 4.1,
  },
  {
    name: 'Y-corporation',
    value1: 14.2,
    value2: 11.3,
  },
]

const DashboardContents = () => {
  const [chart, setChart] = useState(null)

  const { data, } = useQuery({
    queryKey: [`${BASE_URL}/sms/dashboard/chart-data`],
    queryFn: () => {
      return axios
        .get(`${BASE_URL}/sms/dashboard/chart-data`)
        .then((response) => response.data)
        .then((response) => response.data)
    },
    gcTime: 0,      // same as 'cacheTime'
  });

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const totalSMS = data.reduce((acc, obj) => {
        return acc + obj?.value
      }, 0)
      setChart({
        totalSMS: totalSMS,
        data: data,
      })
    } else {
      setChart({
        totalSMS: 0,
        data: [{value: 0, date: undefined}],
      })
    }
  }, [data])

  return (
    <div className='d-flex flex-column flex-column-fluid'>
      <div className='app-content flex-column-fluid'>
        <div className='row g-5  row-cols-1 row-cols-lg-2 row-cols-xl-5'>
          <Cards />
        </div>
        <div className='row g-5 mb-5'>
          <div className='col-12'>
            <div className='card card-flush overflow-hidden h-lg-100'>
              <div className='card-header pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                  <span className='card-label fw-bold text-dark'>SMS Sent</span>
                  <span className='text-gray-400 mt-1 fw-semibold fs-6'>{`${
                    chart?.totalSMS || 0
                  } SMS`}</span>
                </h3>
              </div>
              <div className='card-body d-flex align-items-end p-0'>
                <LineApexChart data={data} title='SMS Send' yaxis='Send' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContents
