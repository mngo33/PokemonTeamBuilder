import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import PokemonList from "./components/pokemon/PokemonList";
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import PokemonInfo from "./components/pokemon/PokemonInfo";
import TeamAnalysis from "./components/other/TeamAnalysis";
import FilterBar from "./components/layout/FilterBar";

function App() {
  const typesChecked = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];
  const genChecked = [1, 2, 3, 4, 5, 6, 7];

  const [searchValue, setSearchValue] = useState("");
  const [gen, setGen] = useState(genChecked);
  const [types, setTypes] = useState(typesChecked);
  const [team, setTeam] = useState([]);

  const getSearchValue = (childData) => {
    setSearchValue(childData);
  };

  const getGen = (childData) => {
    setGen(childData);
  };

  const getTypes = (childData) => {
    setTypes(childData);
  };

  const getTeam = (childData) => {
    setTeam(childData);
  };

  useEffect(() => {
    const currentTeam2 =
      JSON.parse(localStorage.getItem("pokemon-app-team")) || [];

    if (Array.isArray(currentTeam2)) {
      setTeam(currentTeam2);
    } else {
      setTeam([]);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar getSearchValue={getSearchValue} />

        <div className="container">
          <div className="row">
            <div className="col">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <div>
                      <FilterBar
                        getGen={getGen}
                        genChecked={genChecked}
                        getTypes={getTypes}
                        typesChecked={typesChecked}
                        getSearchValue={getSearchValue}
                      />
                      <PokemonList
                        searchValue={searchValue}
                        gen={gen}
                        types={types}
                        getTeam={getTeam}
                      ></PokemonList>
                    </div>
                  }
                ></Route>
                <Route
                  exact
                  path="/pokemon-info/:pokemonIndex"
                  element={<PokemonInfo />}
                ></Route>
                <Route
                  exact
                  path="/team-analysis/pokemon-info/:pokemonIndex"
                  element={<PokemonInfo />}
                ></Route>
                <Route
                  exact
                  path="/team-analysis"
                  element={<TeamAnalysis team={team} />}
                ></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
