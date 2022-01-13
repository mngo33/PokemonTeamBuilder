import React, { useState } from "react";
import CheckBox from "./CheckBox";
import SearchBox from "./SearchBox";
import { ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FilterBar = ({
  getGen,
  genChecked,
  getTypes,
  typesChecked,
  getSearchValue,
}) => {
  return (
    <div>
      <Row>
        <Col sm={6}>
          <h1 className="team-header">Team</h1>
        </Col>
        <Col sm={6} className="parent p-0 m-0 float-right justify-content-end">
          <ButtonGroup>
            <Col>
              <Link className="try-right" to={`team-analysis`}>
                <button className="btn team-analysis filter-button">
                  <span className="team-analysis-text">Team Analysis</span>
                </button>
              </Link>
            </Col>

            <Col className="justify-content-end float-right">
              <CheckBox
                getFilters={getGen}
                filterType="Generation"
                checkedBoxes={genChecked}
              />
            </Col>
            <Col className="">
              <CheckBox
                getFilters={getTypes}
                filterType="Type"
                checkedBoxes={typesChecked}
              />
            </Col>
            <Col className="">
              <SearchBox getSearchValue={getSearchValue} />
            </Col>
          </ButtonGroup>
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default FilterBar;
