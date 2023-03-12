import React, { useRef, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const LineChart = (props) => {
  const chartRef = useRef(null);
  const { data } = props;


  useLayoutEffect(() => {
    let root = am5.Root.new("linechartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);
    root.numberFormatter.set("numberFormat", "#a");

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        wheelZoomPositionX: 1
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        start: 0.3,
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    let xRenderer = xAxis.get("renderer");
xRenderer.grid.template.setAll({
  strokeOpacity: 0
});

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: '#a',
        renderer: am5xy.AxisRendererY.new(root, {
        }),
      })
    );
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "sales: {valueY}",
          numberFormat: "#a"
        }),
      })
    );
    series.bullets.push(function() {
      let graphics = am5.Circle.new(root, {
        strokeWidth: 2,
        radius: 1,
        stroke: series.get("stroke"),
        fill: series.get("fill"),
      });
    
      return am5.Bullet.new(root, {
        sprite: graphics
      });
    });
    series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")

    // Set data
    //let data = generateDatas(1200);
    series.data.setAll(data);


    // Add cursor
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomXY",
        xAxis: xAxis,
      })
    );

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);



    chartRef.current = chart;

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div id="linechartdiv" style={{ width: "100%", height: "300px" }}></div>
  );
};
export default LineChart;
