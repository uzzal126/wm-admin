/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'


const DonutChart = ({ prefix, chartData, chartLabel, total }) => {
    const chartRef = useRef(null)

    useEffect(() => {
        if (!chartRef.current) {
            return
        }

        const chart = new ApexCharts(chartRef.current, chartOptions(chartData, chartLabel, prefix, total))
        if (chart) {
            chart.render()
        }

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [chartRef, chartData, chartLabel])

    return (
        <div className='d-block mw-475px'>
            <div ref={chartRef} className='mixed-widget-10-chart'></div>
        </div>
    )
}

const chartOptions = (chartData, chartLabel, prefix = '', total) => {
    
    return {
        series: chartData,
        chart: {
            fontFamily: 'inherit',
            type: 'donut',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                return total ?  `${prefix} ${total}` : w.globals.seriesTotals.reduce((a, b) => {
                                    return (a + b)
                                }, 0)
                            }
                        }
                    }
                },
                offsetY: 20,
            },
            stroke: {
                colors: undefined
            }
        },
        title: {
            style: {
                fontSize: '18px'
            }
        },
        labels: chartLabel,
        legend: {
            position: 'left',
            // offsetY: 80,
            formatter: function (seriesName, opts) {
                return [seriesName, " - " + prefix, opts.w.globals.series[opts.seriesIndex]]
            }
        }
    }
}

export { DonutChart }
