import * as am5 from '@amcharts/amcharts5'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import * as am5map from '@amcharts/amcharts5/map'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import {useEffect} from 'react'
import {getCSSVariableValue} from '../../../assets/ts/_utils'

type Props = {
  className?: string
  toolbar?: React.ReactNode
  title: string
  date?: any
}

const MapWidget = ({title, date, toolbar, className}: Props) => {
  // const chartRef = useRef(null)

  useEffect(() => {
    let mapContainer = document.getElementById('worldMapChart')
    if (mapContainer) {
      // Only create a new Root if one doesn't already exist.
      if (!mapContainer.children.length && date && date.length > 0) {
        let root = am5.Root.new(mapContainer)
        initMap(root, date)

        return () => {
          if (root && typeof root.dispose === 'function') {
            root.dispose()
          }
        }
      }
    }
  }, [date, title])

  return (
    <div className={`card ${className}`}>
      <div className='card-header'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder text-dark'>{title}</span>
          {/* <span className='text-gray-400 fw-bold'>{date}</span> */}
        </h3>
        {toolbar && <div className='card-toolbar'>{toolbar}</div>}
      </div>
      {/* begin::Body */}
      <div className='card-body py-0'>
        {/* begin::Chart */}
        <div id={'worldMapChart'} className='h-475px'></div>
        {/* end::Chart */}
      </div>
    </div>
  )
}

const initMap = (root: any, mapData: any) => {
  const primaryColor = getCSSVariableValue('--bs-gray-300')
  const blueColor = getCSSVariableValue('--bs-active-primary') || '#blue'

  const highlightCountries = mapData && mapData.map((item: any) => item.country_code)

  root.setThemes([am5themes_Animated.new(root)])
  // Create a MapChart
  const chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: 'translateX',
      panY: 'translateY',
      projection: am5map.geoMercator(),
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      hideCredits: true,
      layout: root.horizontalLayout,
    })
  )

  // Create MapPolygonSeries for all countries
  const mapPolygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ['AQ'],
    })
  )

  mapPolygonSeries.mapPolygons.template.setAll({
    tooltipText: '{name}',
    toggleKey: 'active',
    interactive: true,
    fill: am5.color(primaryColor),
  })

  mapPolygonSeries.mapPolygons.template.states.create('hover', {
    fill: am5.color(blueColor),
  })
  mapPolygonSeries.mapPolygons.template.states.create('active', {
    fill: am5.color(blueColor),
  })

  // Create MapPolygonSeries for specific countries
  const specificCountrySeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      include: highlightCountries,
    })
  )

  specificCountrySeries.mapPolygons.template.setAll({
    tooltipText: '{name}',
    toggleKey: 'active',
    interactive: true,
  })

  specificCountrySeries.mapPolygons.template.set('fill', am5.color(blueColor))
  specificCountrySeries.mapPolygons.template.states.create('hover', {
    fill: root.interfaceColors.get(blueColor),
  })
  specificCountrySeries.mapPolygons.template.states.create('active', {
    fill: root.interfaceColors.get(blueColor),
  })

  chart.chartContainer.get('background').events.on('click', () => {
    chart.goHome()
  })

  chart.appear(1000, 100)
}

export {MapWidget}
