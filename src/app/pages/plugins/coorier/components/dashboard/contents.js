import React from 'react'
import LineApexChart, {
  dataSeries,
} from '../../../../../../_metronic/partials/widgets/charts/LineApexChat'
import {IconCard} from '../../helpers/helpers'

const DashboardContents = () => {
  const icCard = [
    {
      color: '#F1416C',
      icon: 'truck-fast',
      bg: '/media/svg/shapes/wave-bg-red.svg',
      body: {
        number: '1200',
        title: 'Order',
        subtitle: 'Last Week',
      },
      footer: {
        number: '935',
        title: 'Amount Last Week',
      },
    },
    {
      color: '#7239EA',
      icon: 'dolly',
      bg: '/media/svg/shapes/wave-bg-purple.svg',
      body: {
        number: '427',
        title: 'Order',
        subtitle: 'Last Month',
      },
      footer: {
        number: '935',
        title: 'Amount Last Month',
      },
    },
    {
      color: '#009ef7',
      icon: 'money-check-dollar',
      bg: '/media/svg/shapes/wave-bg-purple.svg',
      body: {
        number: '1656',
        title: 'Balance',
        subtitle: 'Total amount',
      },
      footer: {
        number: '935',
        title: 'Unpaid amount',
      },
    },
  ]

  return (
    <div className='d-flex flex-column flex-column-fluid'>
      <div className='app-content flex-column-fluid'>
        <div className='row g-5 mb-5 row-cols-1 row-cols-lg-2 row-cols-xl-3'>
          {icCard.length > 0 &&
            icCard.map((item, i) => (
              <div className='col' key={i}>
                <IconCard data={item} />
              </div>
            ))}
        </div>
        <div className='row g-5 mb-5'>
          <div className='col-xl-12'>
            <div className='card card-flush overflow-hidden h-lg-100'>
              <div className='card-header pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                  <span className='card-label fw-bold text-dark'>Order send at courier</span>
                  <span className='text-gray-400 mt-1 fw-semibold fs-6'>1,46 order today</span>
                </h3>
              </div>
              <div className='card-body d-flex align-items-end p-0'>
                <LineApexChart data={dataSeries} title='Order' yaxis='Order' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContents
