import React, { useState, useEffect } from "react";
import PokemonCard from "../pokemon/PokemonCard";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

function TeamAnalysis({ team }) {
  const [newTypes1, setNewTypes1] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [coverages, setCoverages] = useState([]);
  const [immunities, setImmunities] = useState([]);
  const [resistances, setResistances] = useState([]);

  useEffect(() => {
    team.forEach(getPokemonTypeInfo)
  }, []);

  const getPokemonTypeInfo = async (pokemon) => {
    const singleMonTypes = pokemon.types.map((type) => type.type.name);
    const typesInfo = Promise.all(
      singleMonTypes.map(async (type) => {
        const pokemonUrl = `https://pokeapi.co/api/v2/type/${type}/`;
        const pokemonRes = await axios.get(pokemonUrl);
        const newInfo = pokemonRes.data;
        return newInfo;
      })
    );

    const newTypes = await typesInfo;

    const updatedCoverages = [
      ...new Set(
        newTypes
          .map((type) =>
            type.damage_relations.double_damage_to.map((type) =>
              type.name
                .toLowerCase()
                .split("-")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")
            )
          )
          .flat()
      ),
    ];

    const unfilteredWeaknesses = [
      ...new Set(
        newTypes
          .map((type) =>
            type.damage_relations.double_damage_from.map((type) =>
              type.name
                .toLowerCase()
                .split("-")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")
            )
          )
          .flat()
      ),
    ];

    const unfilteredImmunities = [
      ...new Set(
        newTypes
          .map((type) =>
            type.damage_relations.no_damage_from.map((type) =>
              type.name
                .toLowerCase()
                .split("-")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")
            )
          )
          .flat()
      ),
    ];

    const unfilteredResistances = [
      ...new Set(
        newTypes
          .map((type) =>
            type.damage_relations.half_damage_from.map((type) =>
              type.name
                .toLowerCase()
                .split("-")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")
            )
          )
          .flat()
      ),
    ];

    let filteredWeaknesses = unfilteredWeaknesses.filter((x) => !unfilteredImmunities.includes(x));
    filteredWeaknesses = filteredWeaknesses.filter((x) => !unfilteredResistances.includes(x));

    let filteredResistances = unfilteredResistances.filter((x) => !unfilteredWeaknesses.includes(x));
    filteredResistances = filteredResistances.filter((x) => !unfilteredImmunities.includes(x));

    let newWeaknesses = weaknesses;
    newWeaknesses.push(...filteredWeaknesses);
    newWeaknesses = [...new Set(newWeaknesses)];
    newWeaknesses = newWeaknesses.filter(x => !resistances.includes(x));
    setWeaknesses(newWeaknesses);

    let newResistances = resistances;
    newResistances.push(...filteredResistances);
    newResistances = [...new Set(newResistances)];
    setResistances(newResistances);

    let newImmunities = immunities;
    newImmunities.push(...unfilteredImmunities);
    newImmunities = [...new Set(newImmunities)];
    setImmunities(newImmunities);

    let newCoverages = coverages;
    newCoverages.push(...updatedCoverages);
    newCoverages = [...new Set(newCoverages)];
    setCoverages(newCoverages);
    
  };

  return (
    <div>
      <Row>
        <Col>
          <h1>Team</h1>
        </Col>
      </Row>
      <Row>
        {team.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            key={pokemon.id}
            name={pokemon.name}
            imageURL={pokemon.sprites.front_default}
            onTeam={true}
            id={pokemon.id}
          />
        ))}
      </Row>
      <Row>
        <Col>
          <h1>Team</h1>
          <h5>Coverages: {coverages}</h5>
          <h5>Uncovered Weaknesses: {weaknesses.join()}</h5>
          <h5>Resistances: {resistances}</h5>
          <h5>Immunities: {immunities}</h5>
        </Col>
      </Row>
    </div>
  );
}

export default TeamAnalysis;
