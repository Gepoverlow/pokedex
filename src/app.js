const searchPokemon = document.getElementById("pokemon-search-button");

const types = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psyshic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
];

const colors = [
  "#A8A878", //
  "#F08030", //
  "#6890F0", //
  "#78C850", //
  "#F8D030", //
  "#98D8D8", //
  "#C03028", //
  "#A040A0", //
  "#E0C068", //
  "#A890F0", //
  "#F85888", //
  "#A8B820", //
  "#B8A038", //
  "#705898", //
  "#705848", //
  "#7038F8", //
  "#B8B8D0", //
  "#F0B6BC", //
];

const lightColors = [
  "#C3C3A2", //
  "#f0A067", //
  "#68B0F0", //
  "#97C87E", //
  "#F7DB69", //
  "#BCDEDE", //
  "#C2615C", //
  "#A464A4", //
  "#E2CB8E", //
  "#C4B4F4", //
  "#F97fA4", //
  "#B3BB67", //
  "#B9AA6B", //
  "#827499", //
  "#77695F", //
  "#9166F9", //
  "#CFCFD5", //
  "#F1CACE", //
];

async function getPokemon(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const response = await data.json();

  console.log(response);
  processPokemon(response);
}

function processPokemon(response) {
  const tailoredPokemon = {
    id: response.id,
    name: response.name,
    sprite: response.sprites.front_default,
    moves: handleMoves(response),
    types: handleTypes(response),
  };
  console.log(tailoredPokemon);
}

function handleMoves(response) {
  const moves = [];

  if (response.moves.length === 1) {
    moves.push(response.moves[0].move.name);
  } else {
    for (let i = 0; i < 4; i++) {
      moves.push(response.moves[i].move.name);
    }
  }
  return moves;
}

function handleTypes(response) {
  const types = [];
  for (let i = 0; i < response.types.length; i++) {
    types.push(response.types[i].type.name);
  }
  console.log(types);
  return types;
}

function handleBackground(typing) {
  let gradientBg;

  if (types.length > 1) {
    let indexOne = types.indexOf(typing[0]);
    let primaryColor = colors[indexOne];

    let indexTwo = types.indexOf(typing[1]);
    let secondaryColor = colors[indexTwo];

    gradientBg = `linear-gradient(to right, ${primaryColor}, ${secondaryColor};`;
  } else {
    let indexOne = types.indexOf(typing[0]);
    let primaryColor = colors[indexOne];

    let secondaryColor = colors[indexTwo];
    gradientBg = `linear-gradient(to right, ${primaryColor}, ${secondaryColor};`;
  }

  console.log(gradientBg);
}

function createPokemon() {}

searchPokemon.addEventListener("click", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("pokemon-search-input").value;
  getPokemon(searchValue);
});

handleBackground(["normal", "fairy"]);

//  "#F08030", "#6890F0",
