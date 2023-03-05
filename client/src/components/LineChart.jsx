import React, { useRef, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const LineChart = (props) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let root = am5.Root.new("linechartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0,
      })
    );

    // Define data
    const SalesData = [
      {
        date: new Date(2021, 0, 1).getTime(),
        market1: 71,
        market2: 75,
        sales1: 5,
        sales2: 8,
      },
      {
        date: new Date(2021, 0, 2).getTime(),
        market1: 74,
        market2: 78,
        sales1: 5,
        sales2: 6,
      },
      {
        date: new Date(2021, 0, 3).getTime(),
        market1: 78,
        market2: 88,
        sales1: 5,
        sales2: 2,
      },
      {
        date: new Date(2021, 0, 4).getTime(),
        market1: 85,
        market2: 89,
        sales1: 5,
        sales2: 9,
      },
      {
        date: new Date(2021, 0, 5).getTime(),
        market1: 82,
        market2: 89,
        sales1: 5,
        sales2: 6,
      },
      {
        date: new Date(2021, 0, 6).getTime(),
        market1: 83,
        market2: 85,
        sales1: 5,
        sales2: 5,
      },
      {
        date: new Date(2021, 0, 7).getTime(),
        market1: 88,
        market2: 92,
        sales1: 5,
        sales2: 7,
      },
      {
        date: new Date(2021, 0, 8).getTime(),
        market1: 85,
        market2: 90,
        sales1: 5,
        sales2: 6,
      },
      {
        date: new Date(2021, 0, 9).getTime(),
        market1: 85,
        market2: 91,
        sales1: 5,
        sales2: 5,
      },
      {
        date: new Date(2021, 0, 10).getTime(),
        market1: 80,
        market2: 84,
        sales1: 5,
        sales2: 8,
      },
      {
        date: new Date(2021, 0, 11).getTime(),
        market1: 87,
        market2: 92,
        sales1: 5,
        sales2: 8,
      },
      {
        date: new Date(2021, 0, 12).getTime(),
        market1: 84,
        market2: 87,
        sales1: 5,
        sales2: 4,
      },
      {
        date: new Date(2021, 0, 13).getTime(),
        market1: 83,
        market2: 88,
        sales1: 5,
        sales2: 7,
      },
      {
        date: new Date(2021, 0, 14).getTime(),
        market1: 84,
        sales1: 5,
        sales2: 8,
      },
      {
        date: new Date(2021, 0, 15).getTime(),
        market1: 81,
        market2: 85,
        sales1: 5,
        sales2: 7,
      },
    ];

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    let yRenderer = yAxis.get("renderer");
    yRenderer.grid.template.setAll({
      strokeWidth: 0.5,
    });

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );
    let xRenderer = xAxis.get("renderer");
    xRenderer.grid.template.setAll({
      strokeWidth: 0.5,
    });

    xAxis.get("dateFormats")["day"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["day"] = "MMM";

    // Create series
    function createSeries(name, field, dashArray) {
      var series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
          connect: false,
          fill: field === "sales2" ? "#03293C" : "#808B90",
          stroke: field === "sales2" ? "#03293C" : "#808B90",
        })
        
      );

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: field === "sales2" ? 5 : 1,
            fill: series.get("fill"),
          }),
        });
      });

      series.strokes.template.set("strokeWidth", 2);
      if(dashArray){
        series.strokes.template.set("strokeDasharray",  [10,5]);
      }

      series
        .get("tooltip")
        .label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
      series.data.setAll(SalesData);
    }

    createSeries("Sales", "sales1", [10,5]);
    createSeries("Sales", "sales2");

    // Add cursor
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomXY",
        xAxis: xAxis,
      })
    );

    xAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    yAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    chartRef.current = chart;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="linechartdiv" style={{ width: "100%", height: "300px" }}></div>;
}
export default LineChart;
