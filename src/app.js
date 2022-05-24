import Pokedex from "./Pokedex.js";

const searchPokemon = document.getElementById("pokemon-search-button");
const containerPokeballBottom = document.getElementById("info-pokeball-bottom");

const pokedex = new Pokedex();

//Event Listeners
searchPokemon.addEventListener("click", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("pokemon-search-input").value;
  pokedex.init();
  getPokemon(searchValue);
});

//Event Delegation

document.addEventListener("click", (e) => {
  if (e.target.id === "info-pokeball-top-shiny-toggle") {
    pokedex.handleShinyToggle(pokedex.currentPokemon);
  }

  if (e.target.id === "info-pokeball-bottom-evo-toggle") {
    pokedex.emptyNode(containerPokeballBottom);
    getEvolutions(pokedex.currentPokemon[0].speciesUrl);
  }
});

//Async Code
async function getPokemon(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const response = await data.json();

  pokedex.createPokemon(response);
}

async function getEvolutionInfo(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const response = await data.json();

  const evoData = [response.sprites.front_default, response.name];
  return evoData;
}

async function getEvolutions(speciesUrl) {
  const data = await fetch(speciesUrl);
  const response = await data.json();

  await getAndDisplayEvo(response.evolution_chain.url);
}

async function getAndDisplayEvo(evoChainUrl) {
  const data = await fetch(evoChainUrl);
  const response = await data.json();

  let evolutionChain = [];
  let evoData = response.chain;

  do {
    evolutionChain.push(evoData.species.name);

    evoData = evoData["evolves_to"][0];
  } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

  evolutionChain.forEach((evolution) =>
    pokedex.currentPokemon[0].evolutionLine.push(evolution)
  );

  for (let i = 0; i < pokedex.currentPokemon[0].evolutionLine.length; i++) {
    let evoData = await getEvolutionInfo(
      `${pokedex.currentPokemon[0].evolutionLine[i]}`
    );
    let evoImg = document.createElement("img");
    evoImg.src = evoData[0];
    evoImg.id = evoData[1];
    evoImg.className = "evolution";
    containerPokeballBottom.appendChild(evoImg);
  }
}
