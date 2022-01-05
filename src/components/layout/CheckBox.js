import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const generations = [
  {
    id: 1,
    name: "Generation I",
  },
  {
    id: 2,
    name: "Generation II",
  },
  {
    id: 3,
    name: "Generation III",
  },
  {
    id: 4,
    name: "Generation IV",
  },
  {
    id: 5,
    name: "Generation V",
  },
  {
    id: 6,
    name: "Generation VI",
  },
];

const types = [
  {
    id: 1,
    name: "Normal",
  },
  {
    id: 2,
    name: "Fire",
  },
  {
    id: 3,
    name: "Water",
  },
  {
    id: 4,
    name: "Grass",
  },
  {
    id: 5,
    name: "Electric",
  },
  {
    id: 6,
    name: "Ice",
  },
  {
    id: 7,
    name: "Fighting",
  },
  {
    id: 8,
    name: "Poison",
  },
  {
    id: 9,
    name: "Ground",
  },
  {
    id: 10,
    name: "Flying",
  },
  {
    id: 11,
    name: "Psychic",
  },
  {
    id: 12,
    name: "Bug",
  },
  {
    id: 13,
    name: "Rock",
  },
  {
    id: 14,
    name: "Ghost",
  },
  {
    id: 15,
    name: "Dark",
  },
  {
    id: 16,
    name: "Dragon",
  },
  {
    id: 17,
    name: "Steel",
  },
  {
    id: 18,
    name: "Fairy",
  },
];

let allChecked = true;

function CheckBox({ getFilters, filterType, checkedBoxes }) {
  let category = [];

  const [checked, setChecked] = useState(checkedBoxes);

  if (filterType === "Generation") {
    category = generations;
  } else {
    category = types;
  }

  const handleToggle = (element) => {
    const currentIndex = checked.indexOf(element);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(element);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    getFilters(newChecked);
  };

  const handleAllChecked = () => {
    let newChecked = checked;

    if (allChecked) {
      newChecked = [];
      allChecked = false;
    } else {
      newChecked = checkedBoxes;
      allChecked = true;
    }

    setChecked(newChecked);
    getFilters(newChecked);
  };

  return (
    <div>
      <Dropdown >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {filterType}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Form>
            <Form.Check
              type="checkbox"
              id="check-all"
              label="Select All"
              onChange={() => handleAllChecked()}
              checked={allChecked}
              className="mb-3"
            />
            {category.map((element) => (
              <div key={element.id} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={element.id}
                  label={element.name}
                  onChange={() => handleToggle(element.id)}
                  checked={checked.indexOf(element.id) === -1 ? false : true}
                />
              </div>
            ))}
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default CheckBox;
