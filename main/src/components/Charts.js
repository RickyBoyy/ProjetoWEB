import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "../styles/home.css";

const Charts = () => {
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [averagePrice, setAveragePrice] = useState(0);
  const [highestPriceGame, setHighestPriceGame] = useState(null);
  const [lowestPriceGame, setLowestPriceGame] = useState(null);

  useEffect(() => {
    // Fetch game data from backend
    const fetchGameData = async () => {
      try {
        const response = await fetch("http://localhost:4000/games");
        const result = await response.json();
        setGameData(result);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch community data from backend
    const fetchCommunityData = async () => {
      try {
        const response = await fetch("http://localhost:4000/communities");
        const result = await response.json();
        setCommunityData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGameData();
    fetchCommunityData();
  }, []);

  useEffect(() => {
    if (!loading && gameData.length > 0) {
      const genres = {};
      const prices = [];

      gameData.forEach(game => {
        if (genres[game.game_genre]) {
          genres[game.game_genre] += 1;
        } else {
          genres[game.game_genre] = 1;
        }
        prices.push(game.game_price);
      });

      const genreData = Object.keys(genres).map(genre => ({
        genre: genre,
        count: genres[genre],
        percentage: (genres[genre] / gameData.length) * 100,
      }));

      // Agrupamento dos preços em intervalos (bins)
      const priceBins = [];
      const binSize = 10; // Tamanho do intervalo
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      for (let i = minPrice; i <= maxPrice; i += binSize) {
        priceBins.push({ range: `${i}-${i + binSize - 1}`, count: 0 });
      }

      prices.forEach(price => {
        const binIndex = Math.floor((price - minPrice) / binSize);
        if (priceBins[binIndex]) {
          priceBins[binIndex].count += 1;
        }
      });

      // Calculate statistics
      const average = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);
      const highestPrice = Math.max(...prices);
      const lowestPrice = Math.min(...prices);
      const highestPriceGame = gameData.find(game => game.game_price === highestPrice);
      const lowestPriceGame = gameData.find(game => game.game_price === lowestPrice);

      setAveragePrice(average);
      setHighestPriceGame(highestPriceGame);
      setLowestPriceGame(lowestPriceGame);

      // Initialize the first chart (Percentage of games by genre)
      let root1 = am5.Root.new("chartdiv");
      root1.setThemes([am5themes_Animated.new(root1)]);
      let chart1 = root1.container.children.push(
        am5xy.XYChart.new(root1, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0,
          paddingRight: 1,
        })
      );

      let cursor1 = chart1.set("cursor", am5xy.XYCursor.new(root1, {}));
      cursor1.lineY.set("visible", false);

      let xRenderer1 = am5xy.AxisRendererX.new(root1, {
        minGridDistance: 30,
        minorGridEnabled: true,
      });
      xRenderer1.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
        fill: am5.color("#FFFFFF"),
      });
      xRenderer1.grid.template.setAll({
        location: 1,
      });

      let xAxis1 = chart1.xAxes.push(
        am5xy.CategoryAxis.new(root1, {
          maxDeviation: 0.3,
          categoryField: "genre",
          renderer: xRenderer1,
          tooltip: am5.Tooltip.new(root1, {}),
        })
      );

      let yRenderer1 = am5xy.AxisRendererY.new(root1, {
        strokeOpacity: 0.1,
      });
      yRenderer1.labels.template.setAll({
        fill: am5.color("#FFFFFF"),
      });

      let yAxis1 = chart1.yAxes.push(
        am5xy.ValueAxis.new(root1, {
          maxDeviation: 0.3,
          renderer: yRenderer1,
        })
      );

      let series1 = chart1.series.push(
        am5xy.ColumnSeries.new(root1, {
          name: "Series 1",
          xAxis: xAxis1,
          yAxis: yAxis1,
          valueYField: "percentage",
          sequencedInterpolation: true,
          categoryXField: "genre",
          tooltip: am5.Tooltip.new(root1, {
            labelText: "{valueY}%",
          }),
        })
      );

      series1.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
      });

      series1.columns.template.adapters.add("fill", function (fill, target) {
        return chart1.get("colors").getIndex(series1.columns.indexOf(target));
      });

      series1.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart1.get("colors").getIndex(series1.columns.indexOf(target));
      });

      xAxis1.data.setAll(genreData);
      series1.data.setAll(genreData);

      series1.appear(1000);
      chart1.appear(1000, 100);

      // Initialize the second chart (Circular: Number of users per community)
      let root2 = am5.Root.new("chartdiv2");
      root2.setThemes([am5themes_Animated.new(root2)]);

      let chart2 = root2.container.children.push(
        am5percent.PieChart.new(root2, {
          endAngle: 270,
        })
      );

      let series2 = chart2.series.push(
        am5percent.PieSeries.new(root2, {
          valueField: "community_count",
          categoryField: "community_name",
          endAngle: 270,
        })
      );

      series2.states.create("hidden", {
        endAngle: -90,
      });

      series2.data.setAll(communityData);

      series2.labels.template.set("visible", false);

      series2.appear(1000, 100);

      // Initialize the third chart (Histogram: game prices)
      let root3 = am5.Root.new("chartdiv3");
      root3.setThemes([am5themes_Animated.new(root3)]);

      let chart3 = root3.container.children.push(
        am5xy.XYChart.new(root3, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0,
          paddingRight: 1,
        })
      );

      let xRenderer3 = am5xy.AxisRendererX.new(root3, {
        minGridDistance: 30,
        minorGridEnabled: true,
      });
      xRenderer3.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
        fill: am5.color("#FFFFFF"),
      });
      xRenderer3.grid.template.setAll({
        location: 1,
      });

      let xAxis3 = chart3.xAxes.push(
        am5xy.CategoryAxis.new(root3, {
          maxDeviation: 0.3,
          categoryField: "range",
          renderer: xRenderer3,
          tooltip: am5.Tooltip.new(root3, {}),
        })
      );

      let yRenderer3 = am5xy.AxisRendererY.new(root3, {
        strokeOpacity: 0.1,
      });
      yRenderer3.labels.template.setAll({
        fill: am5.color("#FFFFFF"),
      });

      let yAxis3 = chart3.yAxes.push(
        am5xy.ValueAxis.new(root3, {
          maxDeviation: 0.3,
          renderer: yRenderer3,
        })
      );

      let series3 = chart3.series.push(
        am5xy.ColumnSeries.new(root3, {
          name: "Series 1",
          xAxis: xAxis3,
          yAxis: yAxis3,
          valueYField: "count",
          categoryXField: "range",
          tooltip: am5.Tooltip.new(root3, {
            labelText: "{valueY}",
          }),
        })
      );

      series3.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
      });

      series3.columns.template.adapters.add("fill", function (fill, target) {
        return chart3.get("colors").getIndex(series3.columns.indexOf(target));
      });

      series3.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart3.get("colors").getIndex(series3.columns.indexOf(target));
      });

      xAxis3.data.setAll(priceBins);
      series3.data.setAll(priceBins);

      series3.appear(1000);
      chart3.appear(1000, 100);

      return () => {
        root1.dispose();
        root2.dispose();
        root3.dispose();
      };
    }
  }, [loading, gameData, communityData]);

  return (
    <div>
      <h1 className="graphics-main-title">Graphics</h1>
      <div className="statistics-container">
        <h2 className="statistics">Average value of games: R${averagePrice}</h2>
        <h2 className="statistics">Most expensive game: {highestPriceGame ? highestPriceGame.game_name : ""} - R${highestPriceGame ? highestPriceGame.game_price : ""}</h2>
        <h2 className="statistics">Cheapest game:{lowestPriceGame ? lowestPriceGame.game_name : ""} - R${lowestPriceGame ? lowestPriceGame.game_price : ""}</h2>
      </div>
      <div className="graphics">
        <div className="chart-container">
          <h1 className="graphic-title">Percentage of games by genre</h1>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
        <div className="chart-container">
          <h1 className="graphic-title">Number of users per community</h1>  
          <div id="chartdiv2" style={{ width: "100%", height: "500px" }}></div>
        </div>
        <div className="chart-container">
          <h1 className="graphic-title">Game prices</h1>
          <div id="chartdiv3" style={{ width: "100%", height: "500px" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
