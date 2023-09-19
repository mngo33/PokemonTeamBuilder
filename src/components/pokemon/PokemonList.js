import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { typeToNum, idToGen } from "../../constants";

function PokemonList({ searchValue, gen, types, getTeam }) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [team, setTeam] = useState([]);

  const getAllPokemon = async () => {
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=150";

    const response = await fetch(URL);
    const data = await response.json();

    const createPokemonObject = (result) => {
      result.forEach(async (pokemon) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await response.json();

        setAllPokemon((currentArray) => [...currentArray, data]);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    const currentTeam2 = JSON.parse(localStorage.getItem("pokemon-app-team")) || [];
    
    if (Array.isArray(currentTeam2)) {
      setTeam(currentTeam2);
    } else {
      setTeam([])
    }
  }, []);

  useEffect(() => {
    getAllPokemon();
  }, []);

  const saveToLocal = (item) => {
    localStorage.setItem("pokemon-app-team", JSON.stringify(item));
    getTeam(item);
  };

  const addToTeam = (pokemon) => {
    if (team.length < 6) {
      const newTeam = [...team, pokemon];
      setTeam(newTeam);
      saveToLocal(newTeam);
    } else {
      window.alert("Max. 6 Pokemon!");
    }
    //console.log(team);
  };

  const removeFromTeam = (pokemon) => {
    const newTeam = team.filter(
      (pokemonToRemove) => pokemonToRemove.id !== pokemon.id
    );
    setTeam(newTeam);
    saveToLocal(newTeam);
  };

  const typesToNumArray = (types) => {
    const typesToArray = types.map((a) => a.type);
    const typesToNames = typesToArray.map((a) => a.name);
    const typesToNums = typesToNames.map((a) => typeToNum(a));
    return typesToNums;
  };

  function findCommonElements(arr2) {
    return types.some((item) => arr2.includes(item));
  }

  return (
    <div>
      {Array.isArray(team) && (
      <div className="row">
        {team.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            key={pokemon.id}
            name={pokemon.name}
            imageURL={pokemon.sprites.front_default}
            handleClick={removeFromTeam}
            id={pokemon.id}
          />
        ))}
      </div>
      )}
      <div className="divider"></div>
      <h1 className="header">All Pokemon</h1>
      <hr/>

      <div className="row">
        {allPokemon
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(
            (pokemon) =>
              (Array.isArray(team) &&  !team.some((pkmn) => pkmn["id"] === pokemon.id)) &&
              pokemon.name.includes(searchValue) &&
              gen.includes(idToGen(pokemon.id)) &&
              findCommonElements(typesToNumArray(pokemon.types)) && (
                <PokemonCard
                  pokemon={pokemon}
                  key={pokemon.id}
                  name={pokemon.name}
                  imageURL={pokemon.sprites.front_default}
                  handleClick={addToTeam}
                  id={pokemon.id}
                />
              )
          )}
      </div>
    </div>
  );
}

export default PokemonList;
