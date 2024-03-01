import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import Select from "react-select";

import options from "../options";

const Search = ({ changeMovieQuery, changeCountryQuery }) => {
  // reference to the users input in the search form
  const movieSearch = useRef();
  const countrySearch = useRef();
  // let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    changeMovieQuery(movieSearch.current.value);
    changeCountryQuery(countrySearch.current.value);

    // //inserts users search into the url and redirects to results
    // let path = `/search/${userInput.current.value}`;
    // navigate(path);
  };

  return (
    <form className="searchContainer" onSubmit={handleSubmit}>
      <input
        ref={movieSearch}
        type="search"
        name="search"
        id="searchMovie"
        placeholder="Search for movies..."
        required
      />

      <label htmlFor="country">Choose Country :</label>
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
  );
};

Search.propTypes = {
  changeQuery: PropTypes.func,
};

export default Search;
