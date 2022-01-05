import React, { useState } from "react";

const NavBar = ({ getSearchValue }) => {

  const handleSearchChange = (e) => {
      getSearchValue(e.target.value);
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-light fixed-top justify-content-between">
        <a className="navbar-brand" href="#">
          Pokemon Team Builder
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
