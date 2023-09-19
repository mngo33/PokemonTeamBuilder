export const idToGen = (id) => {
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

export const typeToNum = (type) => {
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
      default:
        return 0;
    }
  };