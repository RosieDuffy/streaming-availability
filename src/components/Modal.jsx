import { Link } from "react-router-dom";
import axios from "axios";

const Modal = ({ open, onClose, movie, country }) => {

  let streamingServices = [];

  if (open) {
    const options = {
      method: "GET",
      // url: "https://streaming-availability.p.rapidapi.com/get",
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
        streamingServices =
          response.data.result.streamingInfo[country] || [];
        console.log(streamingServices);
        
      } catch (error) {
        console.error(error);
      }
    }
    
    getStreamingData();
    
    
  }

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
          <img src={movie.Poster} alt={movie.Title} />
          <h3>{movie.Title}</h3>
          <h4>{movie.year}</h4>
          <div className="streaming-services">
            <h4>Available on:</h4>
            <ul>
              {streamingServices.map((service) => (
                service.service === 'apple' && (
                  <li key={service.service}>
                    <a href={service.link} target="_blank" rel="noreferrer">
                      <img className="link-icon" src="../assets/9306003_apple_tv_icon.svg" alt={service.service} />
                    </a>
                  </li>
                ),
                service.service === 'prime' && (
                  <li key={service.service}>
                    <a href={service.link} target="_blank" rel="noreferrer">
                      <img className="link-icon" src="../assets/7564181_amazon_prime_logo_brand_icon.svg" alt={service.service} />
                    </a>
                  </li>
                ),
                service.service === 'disney' && (
                  <li key={service.service}>
                    <a href={service.link} target="_blank" rel="noreferrer">
                      <img className="link-icon" src="../assets/Disney+_logo.svg.png" alt={service.service} />
                    </a>
                  </li>
                ),
                service.service === 'netflix' && (
                  <li key={service.service}>
                    <a href={service.link} target="_blank" rel="noreferrer">
                      <img className="link-icon" src="../assets/7124274_netflix_logo_icon.svg" alt={service.service} />
                    </a>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
