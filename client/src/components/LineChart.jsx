import React, { Component } from 'react'  
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
    "market2": 87,  
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
        //dateAxis.renderer.grid.template.location = 0;  
        //dateAxis.renderer.minGridDistance = 30;  
  
        let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());  
        valueAxis1.title.text = "Sales";   
  
        // Create series  
        let series1 = chart.series.push(new am4charts.ColumnSeries());  
        series1.dataFields.valueY = "sales1";  
        series1.dataFields.dateX = "date";  
        series1.yAxis = valueAxis1;  
        series1.name = "Target Sales";  
        series1.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";  
        series1.fill = chart.colors.getIndex(0);  
        series1.strokeWidth = 0;  
        series1.clustered = false;  
        series1.columns.template.width = am4core.percent(40);  

  
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
                <div id="SalesChart" style={{ width: "90%", height: "400px" }}></div>  
            </div>  
        )  
    }  
}  