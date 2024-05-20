import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GlobalApi from "../Services/GlobalApi";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Root, color, themes } from "@amcharts/amcharts5";
import { ColumnSeries, XYChart, CategoryAxis, ValueAxis } from "@amcharts/amcharts5/xy";
import AnimatedTheme from "@amcharts/amcharts5/themes/Animated";
import {Tooltip}  from "@amcharts/amcharts5";


import "../styles/home.css";
import "../styles/footer.css";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [genreList, setGenreList] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const response = await GlobalApi.getGenreList();
        if (response && response.results) {
          setGenreList(response.results);
        } else {
          setError('Invalid response');
        }
      } catch (error) {
        setError('Error fetching genre list');
      } finally {
        setLoading(false);
      }
    };

    fetchGenreList();
  }, []);

  useEffect(() => {
    const fetchGamesList = async () => {
      try {
        const response = await GlobalApi.getGames({ page_size: 2000 });
        if (response && response.results) {
          setGamesList(response.results);
        } else {
          setError('Invalid response');
        }
      } catch (error) {
        setError('Error fetching games');
      } finally {
        setLoading(false);
      }
    };

    fetchGamesList();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const response = await GlobalApi.searchGames(searchQuery);
          if (response && response.results) {
            setSearchResults(response.results);
          } else {
            setError('Invalid response');
          }
        } catch (error) {
          setError('Error searching for games');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

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

  // Inside the useEffect block where you create the chart
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

  
  
  
  

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const redirectToGameList = (genreId) => {
    navigate(`/gamelist/${genreId}`);
  };
  

  const redirectToCommunity = () => {
    navigate("/community");
  };

  const redirectToEvent = () => {
    window.location.href = "/event";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {searchResults.length > 0 && (
        <section className="search-results">
          <h1 className="section-title">Search Results</h1>
          <div className="slider-wrapper">
            <div className="image-list">
              {searchResults.map((item) => (
                <div className="image-item-wrapper" key={item.id}>
                  <Link to={`/games/${item.id}`}>
                    <img
                      src={item.background_image}
                      className="image-item"
                      alt={item.name}
                    />
                    <p className="item-name">{item.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
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


      <section className="genres">
        <h1 className="section-title">Genres</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {genreList.map((item) => (
              <div
                className="image-item-wrapper"
                key={item.id}
                onClick={() => redirectToGameList(item.id)}
              >
                <img
                  src={item.image_background}
                  className="image-item"
                  alt={item.name}
                />
                <p className="item-name">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="games">
        <h1 className="section-title">Games</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {gamesList.length > 0 &&
              gamesList.map((item) => (
                <div className="image-item-wrapper" key={item.id}>
                  <Link to={`/games/${item.id}`}>
                    <img
                      src={item.background_image}
                      className="image-item"
                      alt={item.name}
                    />
                    <p className="item-name">{item.name}</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <h1 className="section-title">Communities</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(7).keys()].map((index) => (
              <div
                key={index}
                className="image-item-wrapper"
                onClick={redirectToCommunity}
              >
                <img
                  src={`https://via.placeholder.com/300x550?text=Community-${index + 1}`}
                  alt={`Community-${index + 1}`}
                  className="image-item"
                />
                <p className="item-name">Community {index + 1} Name</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <h1 className="section-title">Events</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(11).keys()].map((index) => (
              <div
                key={index}
                className="image-item-wrapper"
                onClick={redirectToEvent}
              >
                <img
                  src={`https://via.placeholder.com/200x300?text=Event-${index + 1}`}
                  alt={`Event-${index + 1}`}
                  className="image-item"
                />
                <p className="item-name">Date {index + 1} Event</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

