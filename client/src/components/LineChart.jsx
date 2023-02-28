/* import React, { Component } from 'react'  
import * as am4core from "@amcharts/amcharts4/core";  
import * as am4charts from "@amcharts/amcharts4/charts";  
import am4themes_animated from "@amcharts/amcharts4/themes/animated";  

const SalesData = [{  
    "date": "2013-01-16",  
    "market1": 71,  
    "market2": 75,  
    "sales1": 5,  
    "sales2": 8  
}, {  
    "date": "2013-01-17",  
    "market1": 74,  
    "market2": 78,  
    "sales1": 4,  
    "sales2": 6  
}, {  
    "date": "2013-01-18",  
    "market1": 78,  
    "market2": 88,  
    "sales1": 5,  
    "sales2": 2  
}, {  
    "date": "2013-01-19",  
    "market1": 85,  
    "market2": 89,  
    "sales1": 8,  
    "sales2": 9  
}, {  
    "date": "2013-01-20",  
    "market1": 82,  
    "market2": 89,  
    "sales1": 9,  
    "sales2": 6  
}, {  
    "date": "2013-01-21",  
    "market1": 83,  
    "market2": 85,  
    "sales1": 3,  
    "sales2": 5  
}, {  
    "date": "2013-01-22",  
    "market1": 88,  
    "market2": 92,  
    "sales1": 5,  
    "sales2": 7  
}, {  
    "date": "2013-01-23",  
    "market1": 85,  
    "market2": 90,  
    "sales1": 7,  
    "sales2": 6  
}, {  
    "date": "2013-01-24",  
    "market1": 85,  
    "market2": 91,  
    "sales1": 9,  
    "sales2": 5  
}, {  
    "date": "2013-01-25",  
    "market1": 80,  
    "market2": 84,  
    "sales1": 5,  
    "sales2": 8  
}, {  
    "date": "2013-01-26",  
    "market1": 87,  
    "market2": 92,  
    "sales1": 4,  
    "sales2": 8  
}, {  
    "date": "2013-01-27",  
    "market1": 84,  
    "market2": 87,  
    "sales1": 3,  
    "sales2": 4  
}, {  
    "date": "2013-01-28",  
    "market1": 83,  
    "market2": 88,  
    "sales1": 5,  
    "sales2": 7  
}, {  
    "date": "2013-01-29",  
    "market1": 84,  
    "sales1": 5,  
    "sales2": 8  
}, {  
    "date": "2013-01-30",  
    "market1": 81,  
    "market2": 85,  
    "sales1": 4,  
    "sales2": 7  
}]  


  
export default class LineChart extends Component {  
  
    componentDidMount() {  
  
        am4core.useTheme(am4themes_animated);  
  
        let chart = am4core.create("SalesChart", am4charts.XYChart);  
  
        // Add data  
        chart.data = SalesData;  
  
        // Create axes  
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis()); 
        dateAxis.renderer.grid.template.strokeWidth = 0.2 
        //dateAxis.renderer.grid.template.location = 0;  
        //dateAxis.renderer.minGridDistance = 30;  
  
        let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());  
        valueAxis1.title.text = "Sales";
        valueAxis1.renderer.grid.template.strokeWidth = 0.2
  
        // Create series  
        let series1 = chart.series.push(new am4charts.LineSeries());  
        series1.dataFields.valueY = "sales1";  
        series1.dataFields.dateX = "date";  
        series1.yAxis = valueAxis1;  
        series1.name = "Target Sales";  
        series1.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";  

  
        // Add cursor  
        chart.cursor = new am4charts.XYCursor();  
  
        // Add legend  
        //chart.legend = new am4charts.Legend();  
        //chart.legend.position = "top";  
  
        // Add scrollbar  
        chart.scrollbarX = new am4charts.XYChartScrollbar();  
        chart.scrollbarX.series.push(series1);  
        chart.scrollbarX.parent = chart.bottomAxesContainer;  
  
        this.chart = chart;  
    }  
  
    componentWillUnmount() {  
        if (this.chart) {  
            this.chart.dispose();  
        }  
    }  
    render() {  
        return (  
            <div>  
                <div id="SalesChart" style={{ width: "90%", height: "300px" }}></div>  
            </div>  
        )  
    }  
}   */





import React, { useRef, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


function App(props) {

    const chartRef = useRef(null);


  useLayoutEffect(() => {
    
    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
    layout: root.verticalLayout,
    maxTooltipDistance: 0
      }) 
    );

    // Define data
    const SalesData = [{  
        date: new Date(2021, 0, 1).getTime(), 
        "market1": 71,  
        "market2": 75,  
        "sales1": 5,  
        "sales2": 8  
    }, {  
        date: new Date(2021, 0, 2).getTime(),
        "market1": 74,  
        "market2": 78,  
        "sales1": 4,  
        "sales2": 6  
    }, {  
        date: new Date(2021, 0, 3).getTime(),
        "market1": 78,  
        "market2": 88,  
        "sales1": 5,  
        "sales2": 2  
    }, {  
        date: new Date(2021, 0, 4).getTime(),
        "market1": 85,  
        "market2": 89,  
        "sales1": 8,  
        "sales2": 9  
    }, {  
        date: new Date(2021, 0, 5).getTime(),
        "market1": 82,  
        "market2": 89,  
        "sales1": 9,  
        "sales2": 6  
    }, {  
        date: new Date(2021, 0, 6).getTime(),
        "market1": 83,  
        "market2": 85,  
        "sales1": 3,  
        "sales2": 5  
    }, {  
        date: new Date(2021, 0, 7).getTime(),
        "market1": 88,  
        "market2": 92,  
        "sales1": 5,  
        "sales2": 7  
    }, {  
        date: new Date(2021, 0, 8).getTime(),
        "market1": 85,  
        "market2": 90,  
        "sales1": 7,  
        "sales2": 6  
    }, {  
        date: new Date(2021, 0, 9).getTime(),
        "market1": 85,  
        "market2": 91,  
        "sales1": 9,  
        "sales2": 5  
    }, {  
        date: new Date(2021, 0, 10).getTime(),
        "market1": 80,  
        "market2": 84,  
        "sales1": 5,  
        "sales2": 8  
    }, {  
        date: new Date(2021, 0, 11).getTime(),
        "market1": 87,  
        "market2": 92,  
        "sales1": 4,  
        "sales2": 8  
    }, {  
        date: new Date(2021, 0, 12).getTime(),
        "market1": 84,  
        "market2": 87,  
        "sales1": 3,  
        "sales2": 4  
    }, {  
        date: new Date(2021, 0, 13).getTime(),
        "market1": 83,  
        "market2": 88,  
        "sales1": 5,  
        "sales2": 7  
    }, {  
        date: new Date(2021, 0, 14).getTime(),
        "market1": 84,  
        "sales1": 5,  
        "sales2": 8  
    }, {  
        date: new Date(2021, 0, 15).getTime(),
        "market1": 81,  
        "market2": 85,  
        "sales1": 4,  
        "sales2": 7  
    }]  
    

    // Create Y-axis
var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      extraTooltipPrecision: 1,
      renderer: am5xy.AxisRendererY.new(root, {
      })
    })
  );
  let yRenderer = yAxis.get("renderer");
yRenderer.grid.template.setAll({
  strokeWidth: 0.3
});

    // Create X-Axis
let xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      baseInterval: { timeUnit: "day", count: 1 },
      renderer: am5xy.AxisRendererX.new(root, {
      })
    })
  );
  let xRenderer = xAxis.get("renderer");
  xRenderer.grid.template.setAll({
    strokeWidth: 0.3
  });
  
  xAxis.get("dateFormats")["day"] = "MM/dd";
  xAxis.get("periodChangeDateFormats")["day"] = "MMM";

    // Create series
function createSeries(name, field) {
    var series = chart.series.push( 
      am5xy.LineSeries.new(root, { 
        name: name,
        xAxis: xAxis, 
        yAxis: yAxis, 
        valueYField: field, 
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {}),
        connect: false
      }) 
    );
    
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill")
        })
      });
    });
    
    series.strokes.template.set("strokeWidth", 2);
    
    series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
    series.data.setAll(SalesData);
  }
  
  createSeries("Sales", "sales1");
  
  // Add cursor
  chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  }));
  
  xAxis.set("tooltip", am5.Tooltip.new(root, {
    themeTags: ["axis"]
  }));
  
  yAxis.set("tooltip", am5.Tooltip.new(root, {
    themeTags: ["axis"]
  }));

    chartRef.current = chart;

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
  );
}
export default App;