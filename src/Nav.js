import React, { useState, useEffect } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  //need to add a scroll listener. When scrolled down do something
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTMhs2POzNyaRde2rb4y5gi70ybneFMjEBYLA&usqp=CAU"
        alt="netflix logo"
      />

      <img
        className="nav_avatar"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSg9hw1GT1sfMlxFVuoVl6LYfUzK_CSnW8CEA&usqp=CAU"
        alt="avatar"
      />
    </div>
  );
}

export default Nav;
