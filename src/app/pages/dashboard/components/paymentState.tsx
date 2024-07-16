/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTSVG} from '../../../../_metronic/helpers'
import {getCSSVariableValue} from '../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

type Props = {
  className: string
  chartHeight: string
  chartColor: string
}

const PaymentStatics: React.FC<Props> = ({className, chartHeight, chartColor}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartHeight, chartColor))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 py-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Payment Overview</span>

          <span className='text-muted fw-semibold fs-7'>Recent payment statistics</span>
        </h3>
      </div>

      <div className='card-body p-0 d-flex flex-column'>
        <div className='card-p pt-5 bg-body flex-grow-1'>
          <div className='row g-0'>
            <div className='col mr-8'>
              <div className='fs-7 text-muted fw-semibold'>Total Delivery Payment</div>

              <div className='d-flex align-items-center'>
                <div className='fs-4 fw-bold'>$650</div>
                <KTSVG
                  path='/media/icons/duotune/arrows/arr066.svg'
                  className='svg-icon-5 svg-icon-success ms-1'
                />
              </div>
            </div>

            <div className='col'>
              <div className='fs-7 text-muted fw-semibold'>Payment Collected</div>

              <div className='fs-4 fw-bold'>$233,600</div>
            </div>
          </div>

          <div className='row g-0 mt-8'>
            <div className='col mr-8'>
              <div className='fs-7 text-muted fw-semibold'>Payment Processing</div>

              <div className='fs-4 fw-bold'>$29,004</div>
            </div>

            <div className='col'>
              <div className='fs-7 text-muted fw-semibold'>Paid Amount</div>

              <div className='d-flex align-items-center'>
                <div className='fs-4 fw-bold'>$1,480,00</div>
                <KTSVG
                  path='/media/icons/duotune/arrows/arr065.svg'
                  className='svg-icon-5 svg-icon-danger ms-1'
                />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={chartRef}
          className='mixed-widget-3-chart card-rounded-bottom'
          data-kt-chart-color={chartColor}
          style={{height: chartHeight}}
        ></div>
      </div>
    </div>
  )
}

const chartOptions = (chartHeight: string, chartColor: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-800')
  const strokeColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-' + chartColor)
  const lightColor = getCSSVariableValue('--bs-light-' + chartColor)

  return {
    series: [
      {
        name: 'Total Delivery Payment',
        data: [30, 25, 45, 0, 55, 55],
      },
      {
        name: 'Payment Collected',
        data: [30, 45, 0, 0, 0, 0],
      },
      {
        name: 'Payment Processing',
        data: [30, 25, 0, 30, 55, 0],
      },
      {
        name: 'Paid Amount',
        data: [30, 0, 35, 30, 0, 0],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousands'
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  }
}

export {PaymentStatics}
