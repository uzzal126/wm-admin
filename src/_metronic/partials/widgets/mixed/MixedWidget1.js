import React, {Component} from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5map from '@amcharts/amcharts5/map'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {stateData, usaData} from '../statistics/data/sample'
import am5geodata_usaLow from '@amcharts/amcharts5-geodata/usaLow'

function aggregateData(list) {
  var maleTotal = 0
  var femaleTotal = 0

  for (var i = 0; i < list.length; i++) {
    var row = list[i]
    maleTotal += row.male
    femaleTotal += row.female
  }

  for (var i = 0; i < list.length; i++) {
    var row = list[i]
    row.malePercent = (-1 * Math.round((row.male / maleTotal) * 10000)) / 100
    row.femalePercent = Math.round((row.female / femaleTotal) * 10000) / 100
  }

  return list
}

class MixedChart extends Component {
  componentDidMount() {
    let root = am5.Root.new('chartdiv')

    let usData = aggregateData(usaData)

    root.setThemes([am5themes_Animated.new(root)])

    var container = root.container.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        width: am5.p100,
        height: am5.p100,
      })
    )

    // Set up formats
    root.numberFormatter.setAll({
      numberFormat: '#.##as',
    })

    // ===========================================================
    // XY chart
    // ===========================================================

    // Create chart
    var chart = container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        layout: root.verticalLayout,
        width: am5.percent(60),
      })
    )

    // Create axes
    var yAxis1 = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'age',
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    )

    yAxis1.get('renderer').labels.template.setAll({
      paddingTop: 0,
      fontWeight: '400',
      fontSize: 11,
      fill: am5.color('#eeee'),
    })

    yAxis1.get('renderer').grid.template.setAll({
      stroke: am5.color('#ccc'),
      strokeWidth: 1,
      strokeOpacity: 1,
      strokeDasharray: [3],
    })

    yAxis1.data.setAll(usData)

    var yAxis2 = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'age',
        renderer: am5xy.AxisRendererY.new(root, {
          opposite: true,
        }),
      })
    )

    yAxis2.get('renderer').grid.template.setAll({
      stroke: am5.color('#ccc'),
      strokeWidth: 1,
      strokeOpacity: 1,
      strokeDasharray: [3],
    })

    yAxis2.get('renderer').labels.template.setAll({
      paddingTop: 0,
      fontWeight: '400',
      fontSize: 11,
      fill: am5.color('#eeee'),
    })

    yAxis2.data.setAll(usData)

    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: -10,
        max: 10,
        numberFormat: "#.s'%'",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 40,
        }),
      })
    )

    xAxis.get('renderer').labels.template.setAll({
      paddingTop: 20,
      fontWeight: '400',
      fontSize: 11,
      fill: am5.color('#eeee'),
    })

    xAxis.get('renderer').grid.template.setAll({
      disabled: true,
      strokeOpacity: 0,
    })

    // Create series
    var maleSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Mobile',
        xAxis: xAxis,
        yAxis: yAxis1,
        valueXField: 'malePercent',
        categoryYField: 'age',
        fill: am5.color('#f00'),
        clustered: false,
      })
    )

    maleSeries.columns.template.setAll({
      tooltipText: "Mobile {categoryY}: {male} ({malePercent.formatNumber('#.0s')}%)",
      tooltipX: am5.p100,
      cornerRadiusBR: 4,
      cornerRadiusTR: 4,
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
    })

    maleSeries.data.setAll(usData)

    var femaleSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Mobile',
        xAxis: xAxis,
        yAxis: yAxis1,
        valueXField: 'femalePercent',
        categoryYField: 'age',
        fill: am5.color(getCSSVariableValue('--bs-primary')),
        clustered: false,
      })
    )

    femaleSeries.columns.template.setAll({
      tooltipText: "Desktop {categoryY}: {female} ({femalePercent.formatNumber('#.0s')}%)",
      tooltipX: am5.p100,
      cornerRadiusBR: 4,
      cornerRadiusTR: 4,
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
    })

    femaleSeries.data.setAll(usData)

    // Add labels
    chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: 'Mobile',
        fontSize: 13,
        fontWeight: '500',
        y: 5,
        x: 5,
        //centerX: am5.p50,
        fill: maleSeries.get('fill'),
      })
    )

    chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: 'Desktop',
        fontSize: 13,
        fontWeight: '500',
        y: 5,
        x: am5.p100,
        centerX: am5.p100,
        dx: -5,
        fill: femaleSeries.get('fill'),
      })
    )

    // ===========================================================
    // Map chart
    // ===========================================================

    // Create chart
    var map = container.children.push(
      am5map.MapChart.new(root, {
        panX: 'none',
        panY: 'none',
        wheelY: 'none',
        projection: am5map.geoAlbersUsa(),
        width: am5.percent(40),
      })
    )

    chart.getTooltip().set('autoTextColor', false)

    // Title
    var title = map.children.push(
      am5.Label.new(root, {
        text: 'United States',
        fontSize: 14,
        fontWeight: '500',
        fill: am5.color(getCSSVariableValue('--bs-gray-800')),
        y: 20,
        x: am5.p50,
        centerX: am5.p50,
      })
    )

    // Create polygon series
    var polygonSeries = map.series.push(
      am5map.MapPolygonSeries.new(root, {
        fill: am5.color('#ccc'),
        geoJSON: am5geodata_usaLow,
      })
    )

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
    })

    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color('#f00'),
    })

    polygonSeries.mapPolygons.template.states.create('active', {
      fill: am5.color('#f00'),
    })

    var activePolygon
    polygonSeries.mapPolygons.template.events.on('click', function (ev) {
      if (activePolygon) {
        activePolygon.set('active', false)
      }
      activePolygon = ev.target
      activePolygon.set('active', true)
      var state = ev.target.dataItem.dataContext.id.split('-').pop()
      var data = aggregateData(stateData[state])

      for (var i = 0; i < data.length; i++) {
        maleSeries.data.setIndex(i, data[i])
        femaleSeries.data.setIndex(i, data[i])
      }

      title.set('text', ev.target.dataItem.dataContext.name)
    })

    this.root = root
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.dispose()
    }
  }

  render() {
    return <div id='chartdiv' className='w-100 h-300px'></div>
  }
}

export default MixedChart
