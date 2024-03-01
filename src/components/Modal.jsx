import { Link } from "react-router-dom";
import axios from "axios";

const Modal = ({ open, onClose, movie }) => {
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
        console.log(response.data.result.streamingInfo);
      } catch (error) {
        console.error(error);
      }
    }

    getStreamingData();
    console.log("This is in the Modal thing:", movie);
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
        </div>
      </div>
    </div>
  );
};

export default Modal;
