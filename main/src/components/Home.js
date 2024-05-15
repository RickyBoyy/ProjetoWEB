import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";
import "../styles/footer.css";
import Calendar from "react-calendar";
import GlobalApi from "../Services/GlobalApi";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [genreList, setGenreList] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GlobalApi.getGenreList();
        if (response && response.results) {
          setGenreList(response.results);
        } else {
          setError("Invalid response");
        }
      } catch (error) {
        setError("Error fetching genre list");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GlobalApi.getGames({ page_size: 2000 });
        console.log('Response:', response);

        console.log("Response:", response); // Log the response object
        if (response && response.results) {
          setGamesList(response.results);
        } else {
          setError("Invalid response");
        }
      } catch (error) {
 
        console.error('Fetch error:', error);
        setError('Error fetching games');

        console.error("Fetch error:", error); // Log the error object
        setError("Error fetching games");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const redirectToGameList = (genreId) => {
    navigate(`/gamelist/${genreId}`);
  };

  const redirectToCommunity = () => {
    navigate("/community");
  };
  const redirectTCommunities = () => {
    navigate("/communities");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const redirectToEvent = () => {
    window.location.href = "/event";
  };

  return (
    <div>
      {/* Genre Section */}
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

      {/* Games Section */}
      <section className="games">
        <h1 className="section-title">Games</h1>
        <div className="slider-wrapper">
          <div className="image-list">

            {gamesList.length > 0 && gamesList.map((item) => (
              <Link to={`/games/${item.id}`} key={item.id} className="image-item-wrapper">
                <img
                  src={item.background_image}
                  className="image-item"
                  alt={item.name}
                />
                <p className="item-name">{item.name}</p>
              </Link>
            ))}

            {gamesList.length > 0 &&
              gamesList.map((item) => (
                <div className="image-item-wrapper" key={item.id}>
                  <img
                    src={item.background_image}
                    className="image-item"
                    alt={item.name}
                  />
                  <p className="item-name">{item.name}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Communities Section */}
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
                  src={`https://via.placeholder.com/300x550?text=Community-${
                    index + 1
                  }`}
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
                  alt={`Community-${index + 1}`}
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
