import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

// Main App components import section //

import MovieList from "./components/MovieList";
import Search from "./components/Search";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieQuery, setMovieQuery] = useState("");
  const [countryQuery, setCountryQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const API_KEY = "5a11fc22";
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movieQuery}&type=movie`;

  useEffect(() => {
    if (!movieQuery && !countryQuery) return;
    // set loading state while data is being fetched
    setLoading(true);

    // activeFetch to track latest data fetch
    let activeFetch = true;

    // fetch data from the API
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.Search);
        if (activeFetch) {
          const searchData = res.data.Search || [];
          setMovies(searchData.sort((a, b) => b.Year - a.Year));
          // set loading state to false as the data has now been fetched
          console.log(countryQuery);
          setLoading(false);
          setFirstLoad(false);
        }
      })
      .catch((error) => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });
      return () => {
        activeFetch = false;
      };
  }, [movieQuery,countryQuery]);

  // handleQueryChange function to set the query parameter
  const handleMovieQueryChange = (searchText) => {
    setMovieQuery(searchText);
  };

  const handleCountryQueryChange = (searchCountry) => {
    setCountryQuery(searchCountry);
  };

  return (
    <div className="container">
      <Search
        changeMovieQuery={handleMovieQueryChange}
        changeCountryQuery={handleCountryQueryChange}
      />
  {!loading ? (
        !firstLoad ? (
          movies.length > 0 ? (
            <MovieList data={movies} country={countryQuery}/>
          ) : (
            <div className="photo-container">
              <h2>Results for: "{movieQuery}"</h2>
              <h3>Sorry, there were no results for your search. Please try again</h3>
            </div>
          )
        ) : null
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default App;