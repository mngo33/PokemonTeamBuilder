import React, { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap"
import pokeballSprite from "../pokemon/pokeball-sprite.png";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [id, setId] = useState("");
  const [onTeam, setOnTeam] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const imageURL = props.imageURL;
    setImage(imageURL);

    const name = props.name;
    setName(name);

    const pokemon = props.pokemon;
    setPokemon(pokemon);

    const onTeam = props.onTeam;
    setOnTeam(onTeam);

    const id = props.id;
    setId(id);
  }, []);

  return (
    <div className="">
      <Col sm={12} className="p-0">
        <Col sm={11} className="p-0">
          <div
            type="button"
            className="btn poke-btn"
            onClick={() => props.handleClick(pokemon)}
          >
            {imageLoading ? (
              <img
                src={pokeballSprite}
                style={{ width: "6rem", height: "6rem" }}
                className="pokeball"
              ></img>
            ) : null}
            <img
              className="poke-card"
              src={image}
              onLoad={() => setImageLoading(false)}
            />
          </div>
        </Col>
        <Col className="p-0 try-center">
          <Link to={`./pokemon-info/${id}`}>
            <button className="btn btn-light info-btn">i</button>
          </Link>
        </Col>
      </Col>
    </div>
  );
};

export default PokemonCard;
