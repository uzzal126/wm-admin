import * as am5 from '@amcharts/amcharts5'
// import { PieChart, PieSeries } from '@amcharts/amcharts5/charts';
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import {useEffect, useState} from 'react'
import {getCSSVariableValue} from '../../../assets/ts/_utils'

type DataValue = {
  category: string
  value: string | number
}

type Props = {
  className?: string
  toolbar?: React.ReactNode
  title?: string
  data?: DataValue[] | undefined
  deviceData?: []
}

function sumTotalSessionTimes(sessionArray: any) {
  let totalHours = 0
  let totalMinutes = 0
  let totalSeconds = 0

  if (!sessionArray) return '0'

  sessionArray.forEach((session: any) => {
    const [hours, minutes, seconds] =
      session && session?.total_session_time
        ? session.total_session_time.split(':')
        : ['0', '0', '0']
    totalHours += parseInt(hours, 10)
    totalMinutes += parseInt(minutes, 10)
    totalSeconds += parseInt(seconds, 10)
  })

  // Handle any overflow from seconds or minutes
  totalMinutes += Math.floor(totalSeconds / 60)
  totalSeconds %= 60

  totalHours += Math.floor(totalMinutes / 60)
  totalMinutes %= 60

  return `${totalHours.toString().padStart(2, '0')}:${totalMinutes
    .toString()
    .padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`
}

const WidgetDepartmentalChart = ({title, data, toolbar, className, deviceData}: Props) => {
  const [totalSession, setTotalSession] = useState<any>('0')
  const [totalSessionTime, setTotalSessionTime] = useState<any>('00:00:00')

  useEffect(() => {
    let container = document.getElementById('dipChart')
    if (container) {
      // Only create a new Root if one doesn't already exist.
      if (container) {
        let root = am5.Root.new(container)
        initMap(root, data || [])

        return () => {
          if (root && typeof root.dispose === 'function') {
            root.dispose()
          }
        }
      }
    }
  }, [data, title])

  useEffect(() => {
    const _totalSessionTime = sumTotalSessionTimes(deviceData)
    const _totalSession = Array.isArray(deviceData)
      ? deviceData.reduce((total, cur: any) => {
          return total + Number(cur?.total_session || 0)
        }, 0)
      : 0
    setTotalSession(_totalSession)
    setTotalSessionTime(_totalSessionTime)
  }, [deviceData])

  return (
    <div className={`card ${className || ''}`}>
      {title && (
        <div className='card-header'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder text-dark'>{title}</span>
          </h3>
          {toolbar && <div className='card-toolbar'>{toolbar}</div>}
        </div>
      )}
      <div className='card-body pb-0'>
        <div className='d-flex flex-wrap d-grid gap-5 '>
          <div className='border-end-dashed border-end border-gray-300 pe-xxl-7 me-xxl-5'>
            <div className='d-flex mb-2'>
              <span className='fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2'>{totalSession}</span>
            </div>
            <span className='fs-6 fw-semibold text-gray-400' style={{paddingRight: '20px'}}>
              Total Session
            </span>
          </div>
          <div className='m-0'>
            <div className='d-flex align-items-center mb-2'>
              <span className='fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2'>
                {totalSessionTime}
              </span>
              {/* <span className='badge badge-light-success fs-base'>
                <i className='ki-duotone ki-arrow-up fs-5 text-success ms-n1'>
                  <span className='path1' />
                  <span className='path2' />
                </i>
                4.5%
              </span> */}
            </div>
            <span className='fs-6 fw-semibold text-gray-400'>Total Session Time</span>
          </div>
        </div>
        <div id={'dipChart'} className='h-250px'></div>
      </div>
    </div>
  )
}

const initMap = (root: any, data: DataValue[]) => {
  root.setThemes([am5themes_Animated.new(root)])

  const chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      startAngle: 180,
      endAngle: 360,
      layout: root.verticalLayout,
      innerRadius: am5.percent(50),
    })
  )

  let pieSeries = chart.series.push(
    am5percent.PieSeries.new(root, {
      startAngle: 180,
      endAngle: 360,
      valueField: 'value',
      categoryField: 'category',
      alignLabels: false,
    })
  )

  pieSeries.labels.template.setAll({
    fontWeight: '400',
    fontSize: 13,
    fill: am5.color(getCSSVariableValue('--bs-gray-500')),
  })

  pieSeries.states.create('hidden', {
    startAngle: 180,
    endAngle: 180,
  })

  pieSeries.slices.template.setAll({
    cornerRadius: 5,
  })

  pieSeries.ticks.template.setAll({
    forceHidden: true,
  })

  pieSeries.data.setAll(data)

  chart.appear(1000, 100)
}

export {WidgetDepartmentalChart}
