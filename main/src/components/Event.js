import React from "react";
import "../styles/event_specific.css";

const Event = () => {
  return (
    <div class="page-event">
      <div class="cover">
        <div class="heading">events</div>
      </div>
      <div class="container">
        <div class="upcoming-sec">
          <div class="heading">Upcoming Events</div>
        </div>
        <div class="upcoming-event-list">
          <div class="event-block">
            <div class="row">
              <div class="col-lg-2 sec-1">
                <table>
                  <tr>
                    <td>
                      <div class="month">jan</div>
                      <div class="month-date-devider"></div>
                      <div class="date">27</div>
                    </td>
                    <td class="title">Event Title</td>
                  </tr>
                </table>
              </div>
              <div class="col-lg-5 sec-2">
                <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
              </div>
              <div class="col-lg-5 sec-3">
                <div class="title">Event Title</div>
                <div class="venue">
                  <table>
                    <tr>
                      <td>
                        <i class="fa fa-map-marker"></i>
                      </td>
                      <td>
                        <div>Location</div>
                        <div class="dim-color">
                          <a href="https://www.google.co.in" target="blank">
                            Get Directions
                          </a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="time">
                  <table>
                    <tr>
                      <td>
                        <i class="fa fa-clock-o"></i>
                      </td>
                      <td>
                        <div>Date and Time</div>
                        <div
                          data-livestamp="1517054400"
                          class="dim-color"
                        ></div>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="sort-story">Small description</div>
                <div class="group-of-btn">
                  <a
                    href="https://www.google.com"
                    target="blank"
                    class="btn book-ticket"
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
