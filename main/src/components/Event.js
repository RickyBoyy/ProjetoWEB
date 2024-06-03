import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import "../styles/event_specific.css";

const Event = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        console.log("Fetched event data:", data); // Debug log
        setEvent(data);

        const location = await fetchLocationName(data.event_location);
        setLocationName(location);
      } catch (error) {
        setError("Error fetching event details: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const fetchLocationName = async (location) => {
    const coords = location.match(/POINT\(([^)]+)\)/)[1].split(" ");
    const [longitude, latitude] = coords;

    const apiKey = 'AIzaSyAQM1pFqrpXSOfn8nzKmb8o3lV0Tmw6rQs';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location name");
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      return "Unknown Location";
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event data available</div>;

  const eventDate = new Date(event.event_time);
  const formattedDate = format(eventDate, "dd-MM-yyyy 'às' HH:mm");
  const month = format(eventDate, "MMM").toLowerCase();
  const day = format(eventDate, "dd");

  const eventImageURL = event.event_img ? `http://localhost:4000/${event.event_img}` : "https://via.placeholder.com/150x150";
  console.log("Event image URL:", eventImageURL); // Debug log

  return (
    <div className="page-event">
      <div className="cover">
        <div className="heading">Events</div>
      </div>
      <div className="container">
        <div className="upcoming-sec">
          <div className="heading">Upcoming Events</div>
        </div>
        <div className="upcoming-event-list">
          <div className="event-block">
            <div className="row">
              <div className="col-lg-2 sec-1">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <div className="month">{month}</div>
                        <div className="month-date-devider"></div>
                        <div className="date">{day}</div>
                      </td>
                      <td className="title">Event Title</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-5 sec-2">
                <img
                  src={eventImageURL}
                  alt="Event"
                  className="event-image"
                />
              </div>
              <div className="col-lg-5 sec-3">
                <div className="title">{event.event_name}</div>
                <div className="venue">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <i className="fa fa-map-marker"></i>
                        </td>
                        <td>
                          <div>{locationName}</div>
                          <div className="dim-color">
                            <a href="https://www.google.co.in" target="_blank" rel="noopener noreferrer">
                              Get Directions
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="time">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <i className="fa fa-clock-o"></i>
                        </td>
                        <td>
                          <div>{formattedDate}</div>
                          <div
                            data-livestamp="1517054400"
                            className="dim-color"
                          ></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="sort-story">{event.event_description}</div>
                <div className="group-of-btn">
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn book-ticket"
                  >
                    Book Your Entry Pass
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
