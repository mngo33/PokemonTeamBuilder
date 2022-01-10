import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

function PokemonList({ searchValue, gen, types, getTeam }) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [team, setTeam] = useState([]);

  const getAllPokemon = async () => {
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=50";

    const response = await fetch(URL);
    const data = await response.json();

    function createPokemonObject(result) {
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
    const currentTeam2 = JSON.parse(localStorage.getItem("pokemon-app-team"));
    
    if (Array.isArray(currentTeam2)) {
      setTeam(currentTeam2);
    } else {
      setTeam([])
    }
    //setTeam(currentTeam2);
    //console.log(Array.isArray(currentTeam2));
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
    }
  };

  const removeFromTeam = (pokemon) => {
    const newTeam = team.filter(
      (pokemonToRemove) => pokemonToRemove.id !== pokemon.id
    );
    setTeam(newTeam);
    saveToLocal(newTeam);
  };

  const idToGen = (id) => {
    if (id < 152) {
      return 1;
    } else if (id < 252) {
      return 2;
    } else if (id < 387) {
      return 3;
    } else if (id < 494) {
      return 4;
    } else if (id < 650) {
      return 5;
    } else if (id < 721) {
      return 6;
    } else {
      return 7;
    }
  };

  const typeToNum = (type) => {
    switch (type) {
      case "normal":
        return 1;
      case "fire":
        return 2;
      case "water":
        return 3;
      case "grass":
        return 4;
      case "electric":
        return 5;
      case "ice":
        return 6;
      case "fighting":
        return 7;
      case "poison":
        return 8;
      case "ground":
        return 9;
      case "flying":
        return 10;
      case "psychic":
        return 11;
      case "bug":
        return 12;
      case "rock":
        return 13;
      case "ghost":
        return 14;
      case "dark":
        return 15;
      case "dragon":
        return 16;
      case "steel":
        return 17;
      case "fairy":
        return 18;
    }
  };

  const typesToNumArray = (types) => {
    const typesToArray = types.map((a) => a.type);
    const typesToNames = typesToArray.map((a) => a.name);
    const typesToNums = typesToNames.map((a) => typeToNum(a));
    return typesToNums;
  };

  function findCommonElements3(arr2) {
    return types.some((item) => arr2.includes(item));
  }

  return (
    <div>
      {console.log(Array.isArray(team))}
      {Array.isArray(team) && (
      <div className="row">
        {team.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            key={pokemon.id}
            name={pokemon.name}
            imageURL={pokemon.sprites.front_default}
            handleClick={removeFromTeam}
            onTeam={true}
            id={pokemon.id}
          />
        ))}
      </div>
      )}
      <div className="divider"></div>
      <h1 className="header">All Pokemon</h1>
      <div className="row">
        {allPokemon
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(
            (pokemon) =>
              (Array.isArray(team) &&  !team.some((pkmn) => pkmn["id"] == pokemon.id)) &&
              pokemon.name.includes(searchValue) &&
              gen.includes(idToGen(pokemon.id)) &&
              findCommonElements3(typesToNumArray(pokemon.types)) && (
                <PokemonCard
                  pokemon={pokemon}
                  key={pokemon.id}
                  name={pokemon.name}
                  imageURL={pokemon.sprites.front_default}
                  handleClick={addToTeam}
                  onTeam={true}
                  id={pokemon.id}
                />
              )
          )}
      </div>
    </div>
  );
}

export default PokemonList;
