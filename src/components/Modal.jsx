import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Modal = ({ open, onClose, movie, country }) => {
  const [streamingServices, setStreamingServices] = useState([]);
  

  useEffect(() => {
    if (open) {
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
        }
      }
  
      
      getStreamingData();
      
  }
}, [movie]);

  // const uniqueServices = streamingServices.filter((service, index, self) =>
  //   index ===
  //   self.findIndex((t) => t.service === service.service && t.link === service.link)
  // );

  if (!open) return null; //if modal is not open, return null
  return (
    <div onClick={onClose} className="modal-overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal"
        key={movie.title}
      >
        <span onClick={onClose} className="closeBtn">
          &times;
        </span>
        <div className="modal-content">
          <div className="modal-pic">
            <img src={movie.Poster} alt={movie.Title} />
          </div>
          <div className="modal-info">
            <h3>{movie.Title} ({movie.Year})</h3>
            <h4></h4>
            <div className="streaming-services">
              <h4>Available on:</h4>
              
                {streamingServices.length > 0 ? (
                  <ul>
                  {streamingServices.map((service) => (
                    <li key={service}>
                      <a href={service.link}>{service.service}</a>
                    </li>
                  ))}
                  </ul>
                ) : (
                  <li>Not available</li>
                )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
