import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./request";
import "./Banner.css";

// clg - es6 snippets

//rsc
const Banner = () => {
  const [movie, setMovie] = useState([]);
  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      //randomly select one movie to display on banner
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);
  //   console.log(movie.backdrop_path);
  console.log(movie.overview);

  //   function truncate(str, n) {
  //     return str.length > n ? str.substr(0, n - 1) + "..." : str;
  //   }
  //   console.log(truncate("hello world", 5));

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie.backdrop_path}"
            )` /* usually add ? after movie so that it doesn't freak out when path is not found. 
                since it is new, must download by npm i -D @babel/plugin-proposal-optional-chaining customize-cra react-app-rewired 
                More info on this at https://dev.to/aumayeung/how-to-use-the-optional-chaining-operator-in-your-react-app-right-now-1ocj*/,
        backgroundPosition: "center center",
      }}
    >
      {/* the way we are going to style the banner will require the header and a div */}
      <div className="banner_contents">
        {/* <<< Background image */}
        {/* title */}
        <h1 className="banner_title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        {/* div > 2 buttons */}
        <div className="banner_buttons">
          {/*Emmet* - short cuts to create*/}
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner_description">{movie.overview}</h1>
      </div>
      <div className="banner_fadeBottom" />
    </header>
  );
};

export default Banner;
