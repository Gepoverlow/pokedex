const searchPokemon = document.getElementById("pokemon-search-button");
const containerInfo = document.getElementById("container-info");

const containerPokeballTop = document.getElementById("info-pokeball-top");

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
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
];

const colors = [
  "#A8A878", //normal
  "#F08030", //fire
  "#6890F0", //water
  "#78C850", //grass
  "#F8D030", //electric
  "#98D8D8", //ice
  "#C03028", //fighting
  "#A040A0", //poison
  "#E0C068", //ground
  "#A890F0", //flying
  "#F85888", //psychic
  "#A8B820", //bug
  "#B8A038", //rock
  "#705898", //ghost
  "#705848", //dark
  "#7038F8", //dragon
  "#B8B8D0", //steel
  "#F0B6BC", //fairy
];

const lightColors = [
  "#C3C3A2", //light normal
  "#f0A067", //light fire
  "#68B0F0", //light water
  "#97C87E", //light grass
  "#F7DB69", //light electric
  "#BCDEDE", //light ice
  "#C2615C", //light fighting
  "#A464A4", //light poison
  "#E2CB8E", //light ground
  "#C4B4F4", //light flying
  "#F97fA4", //light psychic
  "#B3BB67", //light bug
  "#B9AA6B", //light rock
  "#827499", //light ghost
  "#77695F", //light dark
  "#9166F9", //light dragon
  "#CFCFD5", //light steel
  "#F1CACE", //light fairy
];

//Event Listeners
searchPokemon.addEventListener("click", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("pokemon-search-input").value;
  getPokemon(searchValue);
});

//Functionality
async function getPokemon(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const response = await data.json();

  createPokemon(response);
}

function processPokemon(response) {
  const tailoredPokemon = {
    id: response.id,
    name: response.name,
    sprite: response.sprites.front_default,
    moves: handleMoves(response),
    types: handleTypes(response),
  };
  return tailoredPokemon;
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
  return types;
}

function handleBackground(typing) {
  let gradientBg;

  if (typing.length === 2) {
    let indexOne = types.indexOf(typing[0]);
    let primaryColor = colors[indexOne];

    let indexTwo = types.indexOf(typing[1]);
    let secondaryColor = colors[indexTwo];

    gradientBg = `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`;
  } else {
    let indexOne = types.indexOf(typing[0]);
    let primaryColor = colors[indexOne];

    let secondaryColor = lightColors[indexOne];
    gradientBg = `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`;
  }

  containerInfo.style.backgroundImage = gradientBg;
}

function createPokemon(response) {
  const pokemon = processPokemon(response);

  handleBackground(pokemon.types);
  handleDomMainInfo(pokemon);
}

function emptyNode(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function handleDomMainInfo(pokemon) {
  emptyNode(containerPokeballTop);
  const basicInfoContainer = document.createElement("div");
  const pokemonName = document.createElement("h1");
  const pokemonSprite = document.createElement("img");
  const pokemonType = document.createElement("h3");

  pokemonName.textContent = pokemon.name;
  pokemonSprite.src = pokemon.sprite;
  pokemonType.textContent =
    pokemon.types.length > 1
      ? `${pokemon.types[0]} / ${pokemon.types[1]}`
      : `${pokemon.types[0]}`;

  basicInfoContainer.id = "info-pokeball-top-basic";
  pokemonName.id = "info-pokeball-top-basic-name";
  pokemonSprite.id = "info-pokeball-top-basic-img";
  pokemonType.id = "info-pokeball-top-basic-type";

  basicInfoContainer.appendChild(pokemonName);
  basicInfoContainer.appendChild(pokemonSprite);
  basicInfoContainer.appendChild(pokemonType);

  containerPokeballTop.appendChild(basicInfoContainer);
}

// {
//   /* <div id="info-pokeball-top-basic">
//               <h1 id="info-pokeball-top-basic-name">Charizard</h1>
//               <img
//                 id="info-pokeball-top-basic-img"
//                 src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
//                 alt=""
//               />
//               <h3 id="info-pokeball-top-basic-type">Flying / Fire</h3>
//             </div> */
// }
