import Pokedex from "./Pokedex.js";

// const oddNames = [
//   "mr-mime",
//   "darmanitan-standard",
//   "deoxys-attack",
//   "deoxys-defense",
//   "deoxys-normal",
//   "wormadam-plant",
//   "mime-jr",
//   "porygon-z",
//   "giratina-altered",
//   "shaymin-land",
//   "basculin-red-striped",
//   "tornadus-incarnate",
//   "thundurus-incarnate",
//   "landorus-incarnate",
//   "keldeo-ordinary",
//   "meloetta-aria",
//   "meowstic-male",
//   "aegislash-shield",
//   "pumpkaboo-average",
//   "gourgeist-average",
//   "zygarde-50",
//   "lycanroc-midday",
//   "wishiwashi-solo",
//   "type-null",
//   "minior-red-meteor",
//   "mimikyu-disguised",
//   "jangmo-o",
//   "hakamo-o",
//   "kommo-o",
//   "tapu-koko",
//   "tapu-lele",
//   "tapu-bulu",
//   "tapu-fini",
//   "toxtricity-amped",
//   "mr-rime",
//   "eiscue-ice",
//   "indeedee-male",
//   "morpeko-full-belly",
//   "urshifu-single-strike",
//   "deoxys-speed",
//   "wormadam-sandy",
//   "wormadam-trash",
//   "shaymin-sky",
//   "giratina-origin",
//   "rotom-heat",
//   "rotom-wash",
//   "rotom-frost",
//   "rotom-fan",
//   "rotom-mow",
//   "castform-sunny",
// ];

const searchInput = document.getElementById("pokemon-search-input");
const searchPokemon = document.getElementById("pokemon-search-button");
const containerPokeballBottom = document.getElementById("info-pokeball-bottom");
const containerSuggestions = document.getElementById(
  "pokemon-search-autocomplete"
);

const pokedex = new Pokedex();

//Event Listeners
searchPokemon.addEventListener("click", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("pokemon-search-input").value;
  let trimmedSearch = searchValue.trim().toLowerCase();

  if (trimmedSearch.length !== 0) {
    pokedex.init();
    searchInput.value = "";
    getPokemon(trimmedSearch);
  }
});

searchInput.addEventListener("keyup", () => {
  let searchInputValue = searchInput.value;
  let tailoredInputValue = searchInputValue.trim().toLowerCase();

  pokedex.filterPokemons(tailoredInputValue);
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

  if (e.target.id === "info-pokeball-bottom-moves-toggle") {
    pokedex.handleDomMovesInfo(pokedex.currentPokemon[0]);
  }

  if (e.target.className === "evolution") {
    pokedex.init();
    getPokemon(e.target.id);
  }

  if (e.target.className === "auto-search-suggestion") {
    searchInput.value = e.target.innerText;
    pokedex.filteredPokemons = [];
    pokedex.emptyNode(containerSuggestions);
    searchInput.focus();
  } else {
    pokedex.emptyNode(containerSuggestions);
  }
});

//Async Code

async function getPokemon(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  if (data.status === 404) {
    pokedex.handlePokemonNotFound();
  } else {
    const response = await data.json();

    pokedex.createPokemon(response);
  }
}

async function getEvolutionData(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  if (data.status === 404) return;
  const response = await data.json();

  const evoData = [response.sprites.front_default, response.name];

  return evoData;
}

async function getEvolutions(speciesUrl) {
  const data = await fetch(speciesUrl);
  const response = await data.json();
  console.log(response);

  await handleEvolutionData(response.evolution_chain.url);
  await displayEvolutions();
}

async function getPokemonId(pokemonName) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const response = await data.json();

  return response.id;
}

async function handleEvolutionData(chainUrl) {
  const data = await fetch(chainUrl);
  const response = await data.json();

  let evolutionChain = [];
  let evoData = response.chain;

  do {
    evolutionChain.push({
      name: evoData.species.name,
      id: await getPokemonId(evoData.species.name),
    });

    evoData = evoData["evolves_to"][0];
  } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

  if (pokedex.currentPokemon[0].evolutionLine.length === 0) {
    evolutionChain.forEach((evolution) =>
      pokedex.currentPokemon[0].evolutionLine.push(evolution)
    );
  }
}

async function displayEvolutions() {
  const movesSpan = document.createElement("span");
  movesSpan.textContent = "See Moves";
  movesSpan.id = "info-pokeball-bottom-moves-toggle";
  containerPokeballBottom.appendChild(movesSpan);

  for (let i = 0; i < pokedex.currentPokemon[0].evolutionLine.length; i++) {
    let evoData = await getEvolutionData(
      `${pokedex.currentPokemon[0].evolutionLine[i].id}`
    );
    if (evoData) {
      let evoImg = document.createElement("img");
      evoImg.src = evoData[0];
      evoImg.id = evoData[1];
      evoImg.className = "evolution";
      containerPokeballBottom.appendChild(evoImg);
    }
  }
}

async function getPokemonNames(offset) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=151&offset=${offset}`
  );
  const response = await data.json();

  response.results.forEach((result) => {
    pokedex.allPokemonNames.push(result.name);
  });
  console.log(pokedex.allPokemonNames);
  pokedex.offset += 151;

  if (pokedex.offset >= 1200) return;
  setTimeout(() => {
    getPokemonNames(pokedex.offset);
  }, 2000);
}
//getPokemonNames(pokedex.offset);
