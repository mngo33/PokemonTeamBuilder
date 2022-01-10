import React, { useState, useEffect } from "react";
import PokemonCard from "../pokemon/PokemonCard";
import { Badge, Card, Col, ProgressBar, Row } from "react-bootstrap";
import axios from "axios";

const TYPE_COLOURS = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function TeamAnalysis({ team }) {
  const [newTypes1, setNewTypes1] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [coverages, setCoverages] = useState([]);
  const [immunities, setImmunities] = useState([]);
  const [resistances, setResistances] = useState([]);

  useEffect(() => {
    team.forEach(getPokemonTypeInfo);
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

    let filteredWeaknesses = unfilteredWeaknesses.filter(
      (x) => !unfilteredImmunities.includes(x)
    );
    filteredWeaknesses = filteredWeaknesses.filter(
      (x) => !unfilteredResistances.includes(x)
    );

    let filteredResistances = unfilteredResistances.filter(
      (x) => !unfilteredWeaknesses.includes(x)
    );
    filteredResistances = filteredResistances.filter(
      (x) => !unfilteredImmunities.includes(x)
    );

    let newCoverages = coverages;
    newCoverages.push(...updatedCoverages);
    newCoverages = [...new Set(newCoverages)];
    setCoverages(newCoverages);

    let newWeaknesses = weaknesses;
    newWeaknesses.push(...filteredWeaknesses);
    newWeaknesses = [...new Set(newWeaknesses)];
    newWeaknesses = newWeaknesses.filter((x) => !coverages.includes(x));
    setWeaknesses(newWeaknesses);

    let newResistances = resistances;
    newResistances.push(...filteredResistances);
    newResistances = [...new Set(newResistances)];
    setResistances(newResistances);

    let newImmunities = immunities;
    newImmunities.push(...unfilteredImmunities);
    newImmunities = [...new Set(newImmunities)];
    setImmunities(newImmunities);
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
          <h5>
            Coverages:{" "}
            {coverages.map((type) => (
              <Badge
                key={type}
                pill
                className="mr-1 p-2"
                bg={TYPE_COLOURS[type.toLowerCase()]}
                color="white"
                style={{
                  backgroundColor: `${TYPE_COLOURS[type.toLowerCase()]}`,
                  color: "white",
                }}
              >
                {type
                  .toLowerCase()
                  .split("-")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </Badge>
            ))}
          </h5>
          <h5>
            Uncovered Weaknesses:{" "}
            {weaknesses.map((type) => (
              <Badge
                key={type}
                pill
                className="mr-1 p-2"
                bg={TYPE_COLOURS[type.toLowerCase()]}
                color="white"
                style={{
                  backgroundColor: `${TYPE_COLOURS[type.toLowerCase()]}`,
                  color: "white",
                }}
              >
                {type
                  .toLowerCase()
                  .split("-")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </Badge>
            ))}
          </h5>
          <h5>
            Resistances:{" "}
            {resistances.map((type) => (
              <Badge
                key={type}
                pill
                className="mr-1 p-2"
                bg={TYPE_COLOURS[type.toLowerCase()]}
                color="white"
                style={{
                  backgroundColor: `${TYPE_COLOURS[type.toLowerCase()]}`,
                  color: "white",
                }}
              >
                {type
                  .toLowerCase()
                  .split("-")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </Badge>
            ))}
          </h5>
          <h5>
            Immunities:{" "}
            {immunities.map((type) => (
              <Badge
                key={type}
                pill
                className="mr-1 p-2"
                bg={TYPE_COLOURS[type.toLowerCase()]}
                color="white"
                style={{
                  backgroundColor: `${TYPE_COLOURS[type.toLowerCase()]}`,
                  color: "white",
                }}
              >
                {type
                  .toLowerCase()
                  .split("-")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </Badge>
            ))}
          </h5>
        </Col>
      </Row>
    </div>
  );
}

export default TeamAnalysis;
