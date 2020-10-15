import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  // state is like short term memory, when refreshed disappears
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
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

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      //movieTrailer if name is passed it will try to find the trailer for it
      movieTrailer(movie?.name || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=XtMThy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search);
          // console.log(urlParams.get("v"));
          const getParams = urlParams.get("v");
          console.log(getParams);
          // setTrailerUrl(urlParams.get("v"));
          // console.log(trailerUrl);
        })
        .catch((error) => console.log(error));
    }
    // console.log(trailerUrl);
  };
  // console.log(trailerUrl);
  // console.log(movie.overview);
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
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* container -> posters */}
      {/* takes the video id and some options */}
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
