import React, { useState } from "react";

const SearchBox = ({ getSearchValue }) => {
  const handleSearchChange = (e) => {
    getSearchValue(e.target.value);
  };

  return (
    <form className="form-inline searchbox">
      <input
        className="form-control"
        placeholder="Type to Search"
        onChange={handleSearchChange}
      ></input>
    </form>
  );
};

export default SearchBox;
