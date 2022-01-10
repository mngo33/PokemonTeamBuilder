import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import PokemonList from "./components/pokemon/PokemonList";
import React, { useState, useEffect } from "react";
import CheckBox from "./components/layout/CheckBox";
import SearchBox from "./components/layout/SearchBox";
import { Col, Container, Row } from "react-bootstrap";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import PokemonInfo from "./components/pokemon/PokemonInfo";
import TeamAnalysis from "./components/other/TeamAnalysis";

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
  }

  useEffect(() => {
    const currentTeam2 = JSON.parse(localStorage.getItem("pokemon-app-team"));
    
    if (Array.isArray(currentTeam2)) {
      setTeam(currentTeam2);
    } else {
      setTeam([])
    }
    //setTeam(currentTeam2);
    //console.log(Array.isArray(currentTeam2));
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
                      <Row>
                        <Col sm={3}>
                          <h1>Team</h1>
                        </Col>
                        <Col sm={3} className="parent p-0 m-0 float-right">
                          <Link
                            className="try-right float-right"
                            to={`team-analysis`}
                          >
                            <button className="btn btn-primary">
                              Team Analysis
                            </button>
                          </Link>
                        </Col>
                        <Col sm={6} className="parent">
                          <Col className="try-right">
                            <CheckBox
                              getFilters={getGen}
                              filterType="Generation"
                              checkedBoxes={genChecked}
                            />
                          </Col>
                          <Col className="try-right">
                            <CheckBox
                              getFilters={getTypes}
                              filterType="Type"
                              checkedBoxes={typesChecked}
                            />
                          </Col>
                          <Col className="try-right">
                            <SearchBox getSearchValue={getSearchValue} />
                          </Col>
                        </Col>
                      </Row>
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
