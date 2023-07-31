import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../assets/logo.svg";
import { ReactSVG } from "react-svg";
const Header = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);
  return (
    <div id="header">
      <h1>
        <ReactSVG src={logo} />
      </h1>
      <h3>Date:{date}</h3>
    </div>
  );
};

export default Header;
