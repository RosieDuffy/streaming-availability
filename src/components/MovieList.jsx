import { useState } from "react";

import Modal from "./Modal";

const MovieList = ({ data, country }) => {
  const [modal, setModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const movieDivs = data.map((movie) => (
    <div
      className="movieItem"
      onClick={() => setCurrentMovie(movie)}
      key={movie.imdbID}
    >
      <div className="movieImage">
        <img src={movie.Poster} alt={movie.Title} />
      </div>

      <div className="movieDetails">
        <div className="info">
          <h5>{movie.Year}</h5>
        </div>

        <h3>{movie.Title}</h3>
      </div>
    </div>
  ));

    return (
      <div className="movieContainer">
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          movie={currentMovie}
          country={country}
        />
        <div className="movies" onClick={() => setModal(true)}>
          {movieDivs.map((movie) => movie)}

          {console.log(currentMovie)}
        </div>
      </div>
    );

};

export default MovieList;
