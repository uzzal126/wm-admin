import React, { Component } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

class RadialChart extends Component {
    componentDidMount() {
        let root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5radar.RadarChart.new(root, {
                panY: false,
                layout: root.verticalLayout,
                panX: false,
                wheelX: "panX",
                wheelY: "zoomX",
                innerRadius: am5.percent(40),
                radius: am5.percent(70),
                arrangeTooltips: false
            }));

        var cursor = chart.set(
            "cursor",
            am5radar.RadarCursor.new(root, {
                behavior: "zoomX",
            })
        );

        cursor.lineY.set("visible", false);

        var xRenderer = am5radar.AxisRendererCircular.new(root, {
            minGridDistance: 30,
        });

        xRenderer.labels.template.setAll({
            textType: "radial",
            radius: 10,
            paddingTop: 0,
            paddingBottom: 0,
            centerY: am5.p50,
            fontWeight: "400",
            fontSize: 11,
            fill: "#0095e8",
        });

        xRenderer.grid.template.setAll({
            location: 0.5,
            strokeDasharray: [2, 2],
            stroke: "#999"
        });

        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0,
                categoryField: "name",
                renderer: xRenderer,
            })
        );

        var yRenderer = am5radar.AxisRendererRadial.new(root, {
            minGridDistance: 30,
        });

        yRenderer.labels.template.setAll({
            fontWeight: "500",
            fontSize: 12,
            fill: "#555",
        });

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: yRenderer,
            })
        );

        yRenderer.grid.template.setAll({
            strokeDasharray: [2, 2],
            stroke: "#999"
        });

        var series1 = chart.series.push(
            am5radar.RadarLineSeries.new(root, {
                name: "Today",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value1",
                categoryXField: "name",
                fill: am5.color("#0095e8"),
            })
        );

        series1.strokes.template.setAll({
            strokeOpacity: 0,
        });

        series1.fills.template.setAll({
            visible: true,
            fill: am5.color("#5014d0"),
            fillOpacity: 0.5,
        });

        var series2 = chart.series.push(
            am5radar.RadarLineSeries.new(root, {
                name: "Last Week",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value2",
                categoryXField: "name",
                stacked: true,
                tooltip: am5.Tooltip.new(root, {
                    labelText: "Today: {value1}\n Last Week: {value2}",
                }),
                fill: am5.color("#5014d0"),
            })
        );

        series2.strokes.template.setAll({
            strokeOpacity: 0,
        });

        series2.fills.template.setAll({
            visible: true,
            fill: am5.color("#333"),
            fillOpacity: 0.5,
        });

        var legend = chart.radarContainer.children.push(
            am5.Legend.new(root, {
                width: 150,
                centerX: am5.p50,
                centerY: am5.p50
            })
        );
        legend.data.setAll([series1, series2]);

        legend.labels.template.setAll({
            fontWeight: "600",
            fontSize: 13,
            fill: am5.color("#333"),
        });


        // Create Y-axis
        series1.data.setAll(this.props.data);
        series2.data.setAll(this.props.data);
        xAxis.data.setAll(this.props.data);

        series1.appear(1000);
        series2.appear(1000);
        chart.appear(1000, 100);

        this.root = root;
    }

    componentWillUnmount() {
        if (this.root) {
            this.root.dispose();
        }
    }

    render() {
        return <div id="chartdiv" className="w-100 h-300px"></div>;
    }
}

export default RadialChart;
