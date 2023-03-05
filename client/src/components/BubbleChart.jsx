import React, { useRef, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const BubbleChart = (props) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let root = am5.Root.new("bublechartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelY: "zoomXY",
      pinchZoomX:true,
      pinchZoomY:true
    }));
    
    chart.get("colors").set("step", 2);

    // Define data
    let data = [{
      "y": 10,
      "x": 14,
      "value": 59,
      "y2": -5,
      "x2": -3,
      "value2": 44
    }, {
      "y": 5,
      "x": 3,
      "value": 50,
      "y2": -15,
      "x2": -8,
      "value2": 12
    }, {
      "y": -10,
      "x": 8,
      "value": 19,
      "y2": -4,
      "x2": 6,
      "value2": 35
    }, {
      "y": -6,
      "x": 5,
      "value": 65,
      "y2": -5,
      "x2": -6,
      "value2": 168
    }, {
      "y": 15,
      "x": -4,
      "value": 92,
      "y2": -10,
      "x2": -8,
      "value2": 102
    }, {
      "y": 13,
      "x": 1,
      "value": 8,
      "y2": -2,
      "x2": 0,
      "value2": 41
    }, {
      "y": 1,
      "x": 6,
      "value": 35,
      "y2": 0,
      "x2": -3,
      "value2": 16
    }]
    

    // Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
  tooltip: am5.Tooltip.new(root, {})
}));

let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

    // Create series
      var series0 = chart.series.push(
        am5xy.LineSeries.new(root, {
          calculateAggregates: true,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "y",
          valueXField: "x",
          valueField: "value",
          tooltip: am5.Tooltip.new(root, {
            labelText: "x: {valueX}, y: {valueY}, value: {value}"
          })
        })
        
      );

      // Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
let circleTemplate = am5.Template.new({});
series0.bullets.push(function() {
  let graphics = am5.Circle.new(root, {
    fill: series0.get("fill"),
  }, circleTemplate);
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});
// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series0.set("heatRules", [{
  target: circleTemplate,
  min: 3,
  max: 35,
  dataField: "value",
  key: "radius"
}]);

series0.strokes.template.set("strokeOpacity", 0);


          // Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  snapToSeries: [series0]
}));

series0.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);
chart.appear(1000, 100);
    chartRef.current = chart;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="bublechartdiv" style={{ width: "100%", height: "300px" }}></div>;
}
export default BubbleChart;
