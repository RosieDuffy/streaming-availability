import { useState } from "react";

import Modal from "./Modal";

const MovieList = ({ data, country }) => {
  const [modal, setModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const moviesWithPoster = data.filter((movie) => movie.Poster !== "N/A");

  const movieDivs = moviesWithPoster.map((movie) => (
    <div
      className="movieItem"
      onClick={() => setCurrentMovie(movie)}
      key={movie.imdbID}
    >
      <div className="movieImage">
        <img src={movie.Poster} alt={movie.Title} />
      </div>

      <div className="movieDetails">
        <h3>{movie.Title}</h3>
        <h5>{movie.Year}</h5>
      </div>
    </div>
  ));

  return (
    <div className="movieContainer  slide-in-bottom">
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
