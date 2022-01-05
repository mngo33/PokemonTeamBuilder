import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge, Card, Col, ProgressBar, Row } from "react-bootstrap";

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

function PokemonInfo() {
  const { pokemonIndex } = useParams();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [types, setTypes] = useState([]);
  const [description, setDescription] = useState("");
  const [stats, setStats] = useState({
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    specialAttack: "",
    specialDefense: "",
  });
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [eggGroup, setEggGroup] = useState("");
  const [abilities, setAbilities] = useState("");
  const [genderRatioMale, setGenderRatioMale] = useState("");
  const [genderRatioFemale, setGenderRatioFemale] = useState("");
  const [evs, setEvs] = useState("");
  const [catchRate, setCatchRate] = useState("");

  const getPokemonInfo = async () => {
    //URLs
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const image = pokemonRes.data.sprites.front_default;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
      }
    });

    // convert decimeters to feet, hectogram to kilogram - + 0.0001 )* 100 ) / 100 for rounding
    const height =
      Math.round((pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100;
    const weight =
      Math.round((pokemonRes.data.weight * 0.1 + 0.0001) * 100) / 100;

    const types = pokemonRes.data.types.map((type) => type.type.name);

    const abilities = pokemonRes.data.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    const evs = pokemonRes.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        } else {
          return false;
        }
      })
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name}`
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    //Get Pokemon Description
    await axios.get(pokemonSpeciesUrl).then((res) => {
      let description = "";
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      const eggGroups = res.data["egg_groups"]
        .map((group) => {
          return group.name
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      setDescription(description);
      setGenderRatioFemale(genderRatioFemale);
      setGenderRatioMale(genderRatioMale);
      setCatchRate(catchRate);
      setEggGroup(eggGroups);
    });

    setName(name);
    setImage(image);
    setId(pokemonIndex);
    setHeight(height);
    setWeight(weight);
    setTypes(types);
    setStats({
      hp,
      attack,
      defense,
      speed,
      specialAttack,
      specialDefense,
    });
    setEvs(evs);
    setAbilities(abilities);
  };

  useEffect(() => {
    getPokemonInfo();
  }, []);

  return (
    <Col>
      <Card>
        <Card.Header>
          <Row>
            <Col sm={5}>
              <h5>{pokemonIndex}</h5>
            </Col>
            <Col sm={7}>
              <div className="float-right">
                {types.map((type) => (
                  <Badge
                    key={type}
                    pill
                    className="mr-1 p-2"
                    bg={TYPE_COLOURS[type]}
                    color="white"
                    style={{
                      backgroundColor: `${TYPE_COLOURS[type]}`,
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
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center">
            <Col md={3}>
              <Card.Img
                variant="top"
                src={image}
                className="rounded mx-auto mt-2"
              />
            </Col>
            <Col md={9}>
              <h4 className="mx-auto">
                {name
                  .toLowerCase()
                  .split("-")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </h4>
              <Row className="align-items-center">
                <Col md={3}>HP</Col>
                <Col md={9}>
                  <ProgressBar
                    variant="danger"
                    striped
                    now={stats.hp}
                    label={`${stats.hp}`}
                  ></ProgressBar>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={3}>Attack</Col>
                <Col md={9}>
                  <ProgressBar
                    variant="danger"
                    striped
                    now={stats.attack}
                    label={`${stats.attack}`}
                  ></ProgressBar>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={3}>Defense</Col>
                <Col md={9}>
                  <ProgressBar
                    variant="danger"
                    striped
                    now={stats.defense}
                    label={`${stats.defense}`}
                  ></ProgressBar>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={3}>Special Attack</Col>
                <Col md={9}>
                  <ProgressBar
                    variant="danger"
                    striped
                    now={stats.specialAttack}
                    label={`${stats.specialAttack}`}
                  ></ProgressBar>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={3}>Special Defense</Col>
                <Col md={9}>
                  <ProgressBar
                    variant="danger"
                    striped
                    now={stats.specialDefense}
                    label={`${stats.specialDefense}`}
                  ></ProgressBar>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={3}>Speed</Col>
                <Col md={9}>
                  <ProgressBar
                    variant="danger"
                    striped
                    now={stats.speed}
                    label={`${stats.speed}`}
                  ></ProgressBar>
                </Col>
              </Row>
            </Col>
            <Row className="mt-3">
              <Col>
                <p className="pt-3 pl-3 pr-3">{description}</p>
              </Col>
            </Row>
          </Row>
        </Card.Body>
        <hr />
        <Card.Body>
          <Card.Title className="text-center">Details</Card.Title>
          <Row>
            <Col md={6}>
              <Row>
                <Col md={4}>
                  <h6 className="float-right">Height:</h6>
                </Col>
                <Col md={8}>
                  <h6 className="float-left">{height} feet</h6>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <h6 className="float-right">Weight:</h6>
                </Col>
                <Col md={8}>
                  <h6 className="float-left">{weight} kilograms</h6>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <h6 className="float-right">Abilities:</h6>
                </Col>
                <Col md={8}>
                  <h6 className="float-left">{abilities}</h6>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <h6 className="float-right">Gender Ratio:</h6>
                </Col>
                <Col md={8}>
                  <ProgressBar>
                    <ProgressBar
                      striped
                      now={genderRatioFemale}
                      variant="danger"
                      label={`${genderRatioFemale}%`}
                    />
                    <ProgressBar
                      striped
                      now={genderRatioMale}
                      variant="info"
                      label={`${genderRatioMale}%`}
                    />
                  </ProgressBar>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={4}>
                  <h6 className="float-right">Catch Rate:</h6>
                </Col>
                <Col md={8}>
                  <h6 className="float-left">{catchRate}%</h6>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <h6 className="float-right">Egg Groups:</h6>
                </Col>
                <Col md={8}>
                  <h6 className="float-left">{eggGroup}</h6>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <h6 className="float-right">EVs:</h6>
                </Col>
                <Col md={8}>
                  <h6 className="float-left">{evs}</h6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted">
          Data from{" "}
          <a target="_blank" href="https://pokeapi.co/">
            PokeAPI.co
          </a>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default PokemonInfo;
