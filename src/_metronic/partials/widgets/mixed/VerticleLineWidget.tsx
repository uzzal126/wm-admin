/* eslint-disable jsx-a11y/anchor-is-valid */
import ApexCharts from 'apexcharts'
import { useEffect, useRef } from 'react'
import { kFormatter } from '../../../../app/modules/helper/misc'
import { getCSSVariableValue } from '../../../assets/ts/_utils'

type Props = {
    className?: string
    toolbar?: React.ReactNode
    title: string
    chartHeight?: string
    chartData: [number]
    chartCategory: [string]
}

const VerticalLineWidget = ({
    title,
    toolbar,
    className,
    chartData,
    chartCategory,
}: Props) => {
    const chartRef = useRef(null)
    // // console.log(chartData)
    useEffect(() => {
        if (!chartRef.current) {
            return
        }

        const chart = new ApexCharts(
            chartRef.current,
            chartOptions(chartData, chartCategory)
        )
        if (chart) {
            chart.render()
        }

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartRef, chartData, chartCategory])

    return (
        <div className={`card ${className}`}>
            <div className='card-header'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder text-dark'>{title}</span>
                </h3>
                {
                    toolbar &&
                    <div className='card-toolbar'>
                        {toolbar}
                    </div>
                }
            </div>
            {/* begin::Body */}
            <div className='card-body py-0'>
                {/* begin::Chart */}
                <div ref={chartRef} className='mixed-widget-10-chart'></div>
                {/* end::Chart */}
            </div>
        </div>
    )
}

const chartOptions = (chartData: [number], chartCategory: [string]) => {
    const primaryColor = getCSSVariableValue('--bs-gray-800');
    const borderColor = getCSSVariableValue('--bs-gray-200');

    return {
        series: [{
            name: "Sessions",
            data: chartData || [12.478, 7.546, 6.083, 5.041, 4.42]
        }],
        chart: {
            fontFamily: "inherit",
            type: "bar",
            height: 350,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                horizontal: true,
                distributed: true,
                barHeight: 50,
                dataLabels: {
                    position: "bottom"
                }
            }
        },
        dataLabels: {
            enabled: true,
            textAnchor: "start",
            offsetX: 0,
            formatter: function (e: any) {
                return kFormatter(e) // e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            style: {
                fontSize: "14px",
                fontWeight: "600",
                align: "left"
            }
        },
        legend: {
            show: false
        },
        colors: ["#3E97FF", "#F1416C", "#50CD89", "#FFC700", "#7239EA"],
        xaxis: {
            categories: chartCategory || ["USA", "India", "Canada", "Brasil", "France"],
            labels: {
                formatter: function (e: any) {
                    return kFormatter(e)
                },
                style: {
                    colors: primaryColor,
                    fontSize: "14px",
                    fontWeight: "600",
                    align: "left"
                }
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            labels: {
                formatter: function (e: number) {
                    return e.toString()
                },
                style: {
                    colors: primaryColor,
                    fontSize: "14px",
                    fontWeight: "600"
                },
                offsetY: 2,
                align: "left"
            }
        },
        grid: {
            borderColor: borderColor,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            },
            strokeDashArray: 4
        },
        tooltip: {
            style: {
                fontSize: "12px"
            },
            y: {
                formatter: function (e: any) {
                    return kFormatter(e)
                }
            },

        }
    }
}


export { VerticalLineWidget }

