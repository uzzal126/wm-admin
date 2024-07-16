/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'


const PieChart = ({ title, date, summary, className, chartData, chartCategory }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartData, chartCategory))
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef])

  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark">{title}</span>
          <span className="text-gray-400 fw-bold">{date}</span>
        </h3>
        <div className="card-toolbar">
          <div className="fw-bolder fs-3 text-warning">{summary}</div>
        </div>
      </div>
      {/* begin::Body */}
      <div className='card-body p-0 d-flex justify-content-between flex-column overflow-hidden'>
        {/* begin::Chart */}
        <div ref={chartRef} className='mixed-widget-10-chart'></div>
        {/* end::Chart */}
      </div>
    </div>
  )
}

const chartOptions = (chartData, chartCategory) => {
  
  return {
    // series: chartData,
    series: [44, 55, 13, 43, 22, 35, 25, 15],
    chart: {
      fontFamily: 'inherit',
      type: 'pie',
    },
    labels: ['Dhaka', 'Barisal', 'Khulna', 'Chittagong', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Sylhet']
  }
}

export { PieChart }
