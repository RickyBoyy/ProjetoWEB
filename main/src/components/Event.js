import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/event_specific.css";

const Event = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
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
        setEvent(data);
      } catch (error) {
        setError("Error fetching event details: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                        <div className="month">jan</div>
                        <div className="month-date-devider"></div>
                        <div className="date">27</div>
                      </td>
                      <td className="title">Event Title</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-5 sec-2">
                <img
                  src={event.event_image ? `http://localhost:4000/${event.event_image}` : "https://via.placeholder.com/150x150"}
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
                          <div>{event.event_location}</div>
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
                          <div>{event.event_time}</div>
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
