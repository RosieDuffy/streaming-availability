import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import Select from "react-select";

import options from "../options";
import MainTitle from "./MainTitle";

const Search = ({ changeMovieQuery, changeCountryQuery }) => {
  const [transformForm, setTransformForm] = useState("translateY(30vh)");
  const [formSubmitted, setFormSubmitted] = useState(false);
  // reference to the users input in the search form
  const movieSearch = useRef();
  const countrySearch = useRef();
  // let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    changeMovieQuery(movieSearch.current.value);
    changeCountryQuery(countrySearch.current.value);
    setTransformForm("translateY(0)");
    setFormSubmitted(true);
    // //inserts users search into the url and redirects to results
    // let path = `/search/${userInput.current.value}`;
    // navigate(path);
  };

  return (
    <>
      {!formSubmitted ? (
        <>
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
          <MainTitle />
        </>
      ) : null}
      <form
        className="searchContainer"
        onSubmit={handleSubmit}
        style={{ transform: transformForm, transition: "transform .8s" }}
      >
        <input
          ref={movieSearch}
          type="text"
          name="search"
          id="searchMovie"
          placeholder="Search for movies..."
          required
        />

        <select id="country" ref={countrySearch} defaultValue="" required>
          <option value="" disabled>
            Select a country
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </>
  );
};

Search.propTypes = {
  changeQuery: PropTypes.func,
};

export default Search;
