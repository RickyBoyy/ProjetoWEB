import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Root, color, themes } from "@amcharts/amcharts5";
import { ColumnSeries, XYChart, CategoryAxis, ValueAxis } from "@amcharts/amcharts5/xy";
import AnimatedTheme from "@amcharts/amcharts5/themes/Animated";
import {Tooltip}  from "@amcharts/amcharts5";

import "../styles/home.css";

const Statistics = () => {
    useEffect(() => {
        if (!loading && document.getElementById('chartdiv') && document.getElementById('chartdiv2')) {
          setLoadingCharts(false);
        }
      }, [loading]);
      useEffect(() => {
        if (!loading && document.getElementById('chartdiv') && document.getElementById('chartdiv3')) {
          setLoadingCharts(false);
        }
      }, [loading]);

      useEffect(() => {
        if (!loading) {
          // Initialize amCharts
          let root = am5.Root.new("chartdiv");
      
          // Set themes
          root.setThemes([am5themes_Animated.new(root)]);
      
          // Create the chart
          let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
              panX: true,
              panY: true,
              wheelX: "panX",
              wheelY: "zoomX",
              pinchZoomX: true,
              paddingLeft: 0,
              paddingRight: 1,
            })
          );
      
          // Create cursor
          let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
          cursor.lineY.set("visible", false);
      
          // Create X axis renderer
          let xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            minorGridEnabled: true,
          });
          // Customize X axis labels
          xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15,
            fill: am5.color("#FFFFFF"), // Set the color of the labels to white
          });
          // Set grid template
          xRenderer.grid.template.setAll({
            location: 1,
          });
      
          // Create X axis
          let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
              maxDeviation: 0.3,
              categoryField: "country",
              renderer: xRenderer,
              tooltip: am5.Tooltip.new(root, {}),
            })
          );
      
          // Create Y axis renderer
          let yRenderer = am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1,
          });
      
          // Customize Y axis labels
         
          yRenderer.labels.template.setAll({
            fill: am5.color("#FFFFFF"), // Set the color of the labels to white
          });
    
          // Create Y axis
          let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
              maxDeviation: 0.3,
              renderer: yRenderer,
            })
          );
      
          // Create series
          let series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
              name: "Series 1",
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: "value",
              sequencedInterpolation: true,
              categoryXField: "country",
              tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}",
              }),
            })
          );
      
          // Customize series columns
          series.columns.template.setAll({
            cornerRadiusTL: 5,
            cornerRadiusTR: 5,
            strokeOpacity: 0,
          });
      
          // Set color of series columns
          series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
          });
      
          // Set stroke color of series columns
          series.columns.template.adapters.add("stroke", function (stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
          });
      
          // Sample data
          let data = [
            { country: "USA", value: 2025 },
            { country: "China", value: 1882 },
            { country: "Japan", value: 1809 },
            { country: "Germany", value: 1322 },
            { country: "UK", value: 1122 },
            { country: "France", value: 1114 },
            { country: "India", value: 984 },
            { country: "Spain", value: 711 },
            { country: "Netherlands", value: 665 },
            { country: "South Korea", value: 443 },
            { country: "Canada", value: 441 },
          ];
      
          // Set data
          xAxis.data.setAll(data);
          series.data.setAll(data);
      
          // Appear animation
          series.appear(1000);
          chart.appear(1000, 100);
      
          return () => {
            root.dispose();
          };
        }
      }, [loading]);
    
      useEffect(() => {
        if (!loadingCharts) {
          let root = am5.Root.new("chartdiv2");
      
          root.setThemes([am5themes_Animated.new(root)]);
      
          let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
              endAngle: 270
            })
          );
      
          let series = chart.series.push(
            am5percent.PieSeries.new(root, {
              valueField: "value",
              categoryField: "category",
              endAngle: 270
            })
          );
      
          series.states.create("hidden", {
            endAngle: -90
          });
      
          series.data.setAll([
            { category: "Lithuania", value: 501.9 },
            { category: "Czechia", value: 301.9 },
            { category: "Ireland", value: 201.1 },
            { category: "Germany", value: 165.8 },
            { category: "Australia", value: 139.9 },
            { category: "Austria", value: 128.3 },
            { category: "UK", value: 99 }
          ]);
      
          // Disable labels
          series.labels.template.disabled = true;
      
          series.appear(1000, 100);
      
          return () => {
            root.dispose();
          };
        }
      }, [loadingCharts]);
      
      
    
      useEffect(() => {
        if (!loading) {
          let root = Root.new("chartdiv3");
    
          root.setThemes([AnimatedTheme.new(root)]);
    
          let chart = root.container.children.push(
            XYChart.new(root, {
              panX: true,
              panY: true,
              wheelX: "panX",
              wheelY: "zoomX",
              pinchZoomX: true,
              paddingLeft: 0,
              paddingRight: 1,
            })
          );
    
          // Create X axis renderer
          let xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            minorGridEnabled: true,
          });
          // Customize X axis labels
          xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15,
            fill: am5.color("#FFFFFF"), // Set the color of the labels to white
          });
          // Set grid template
          xRenderer.grid.template.setAll({
            location: 1,
          });
    
          // Create X axis
          let xAxis = chart.xAxes.push(
            CategoryAxis.new(root, {
              maxDeviation: 0.3,
              renderer: xRenderer,
              tooltip: Tooltip.new(root, {}),
            })
          );
    
          // Create Y axis renderer
          let yRenderer = am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1,
          });
    
          // Customize Y axis labels
          yRenderer.labels.template.setAll({
            fill: am5.color("#FFFFFF"), // Set the color of the labels to white
          });
    
          // Create Y axis
          let yAxis = chart.yAxes.push(
            ValueAxis.new(root, {
              maxDeviation: 0.3,
              renderer: yRenderer,
            })
          );
    
          // Other chart setup...
    
          // Create series for histogram
          let series = chart.series.push(
            ColumnSeries.new(root, {
              name: "Series 1",
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: "count", // Assuming your data has a "count" field
              categoryXField: "category",
              tooltip: Tooltip.new(root, {
                labelText: "{valueY}",
              }),
            })
          );
    
          // Sample data for histogram
          let data = [
            { category: "0" },
            { category: "1", count: 25 },
            { category: "2", count: 81 },
            { category: "3", count: 73 },
            { category: "4", count: 40 },
            { category: "5", count: 20 },
            { category: "6", count: 7 },
            { category: "7", count: 5 },
            { category: "8", count: 2 },
            { category: "9", count: 2 },
            { category: "10", count: 1 },
            { category: "11" },
          ];
    
          // Set data
          xAxis.data.setAll(data);
          series.data.setAll(data);
    
          // Appear animation
          series.appear(1000);
          chart.appear(1000, 100);
    
          return () => {
            root.dispose();
          };
        }
      }, [loading]);
    
    
   return(
    <div>
   <div className="graphics">
  <div className="chart-container">
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  </div>
  <div className="chart-container">
    <div id="chartdiv2" style={{ width: "100%", height: "500px" }}></div>
  </div>
  <div className="chart-container">
    <div id="chartdiv3" style={{ width: "100%", height: "500px" }}></div>
  </div>
</div>


  

    </div>
   )
}