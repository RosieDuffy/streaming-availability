import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Modal = ({ open, onClose, movie, country }) => {
  const [streamingServices, setStreamingServices] = useState([]);
  const [loading, setLoading] = useState(false);

  let uniqueServices = [];

  useEffect(() => {
    if (!open) return;

    setLoading(true);
    const options = {
      method: "GET",
      url: "https://streaming-availability.p.rapidapi.com/get",
      params: {
        output_language: "en",
        imdb_id: movie.imdbID,
      },
      headers: {
        "X-RapidAPI-Key": "802c7fe366mshcadfd93c93a9ef8p1b7b64jsn2f3cb2e282a7",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    };

    async function getStreamingData() {
      try {
        const response = await axios.request(options);
        setStreamingServices(response.data.result.streamingInfo[country]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getStreamingData();
  }, [open]);

  if (Array.isArray(streamingServices) && streamingServices.length > 0) {
    uniqueServices = streamingServices.reduce((acc, current) => {
      const x = acc.find((item) => item.service === current.service);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
  }

  console.log(uniqueServices);

  if (!open) return null; //if modal is not open, return null
  return (
    <div onClick={onClose} className="modal-overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal "
        key={movie.title}
      >
        <span onClick={onClose} className="closeBtn">
          &times;
        </span>
        <div className="modal-content">
          <div className="modal-img-div">
            <img className="modal-img" src={movie.Poster} alt={movie.Title} />
          </div>
          <div className="modal-info">
            <h3>
              {movie.Title} ({movie.Year})
            </h3>

            <div className="streaming-services">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {uniqueServices.length > 0 ? (
                    <>
                      <h4>Available onç:</h4>
                      <ul className="streaming-list">
                        {uniqueServices.map((service) => {
                          if (service.service === "apple") {
                            return (
                              <li key={service.service}>
                                <a href={service.link}>
                                  <img
                                    className="streaming-icon"
                                    src="./assets/AppleTV.png"
                                    alt="apple tv logo"
                                  />
                                </a>
                              </li>
                            );
                          } else if (service.service === "netflix") {
                            return (
                              <li key={service.service}>
                                <a href={service.link}>
                                  <img
                                    className="streaming-icon"
                                    src="./assets/Logonetflix.png"
                                    alt="netflix logo"
                                  />
                                </a>
                              </li>
                            );
                          } else if (service.service === "disney") {
                            return (
                              <li key={service.service}>
                                <a href={service.link}>
                                  <img
                                    className="streaming-icon"
                                    src="./assets/Disney+_logo.svg.png"
                                    alt="disney plus logo"
                                  />
                                </a>
                              </li>
                            );
                          } else if (service.service === "hulu") {
                            return (
                              <li key={service.service}>
                                <a href={service.link}>
                                  <img
                                    className="streaming-icon"
                                    src="./assets/hulu-logo-png.png"
                                    alt="hulu logo"
                                  />
                                </a>
                              </li>
                            );
                          } else if (service.service === "prime") {
                            return (
                              <li key={service.service}>
                                <a href={service.link}>
                                  <img
                                    className="streaming-icon"
                                    src="./assets/Prime_logo.png"
                                    alt="prime video logo"
                                  />
                                </a>
                              </li>
                            );
                          } else if (service.service === "paramount") {
                            return (
                              <li key={service.service}>
                                <a href={service.link}>
                                  <img
                                    className="streaming-icon"
                                    src="./assets/Paramount_Plus.svg.png"
                                    alt="paramount logo"
                                  />
                                </a>
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    </>
                  ) : (
                    <p>
                      Sorry, this title is not currently available on any
                      streaming platform
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
