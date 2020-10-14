import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  // state is like short term memory, when refreshed disappears
  const [movies, setMovies] = useState([]);
  //need to populate the movies with some stuff.
  // a snippet of code that runs based on a specific condition
  useEffect(() => {
    //when row loads, you want soemthing to run. Make a request from api.
    // if we leave the brackets [], it means run once when row loads and don't run again.
    //i think if we put movies in [] it will run once when loaded
    // and then whenever movie is changed.
    async function fetchData() {
      //when making request wait for the promise to come back and then do something
      const request = await axios.get(fetchUrl);
      //'https://api/.themoviedb.org/3/ + the other requests'
      // console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);
  //if you don't include fetchUrl in [], it won't rerender when fetchUrl is changed

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>

      <div className="row_posters">
        {/*several row posters */}
        {movies.map((movie) => (
          <img
            //adding a unique key to each makes the scrolling faster.
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* container -> posters */}
    </div>
  );
};

export default Row;
