/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Pokedex.js":
/*!************************!*\
  !*** ./src/Pokedex.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pokemon */ "./src/Pokemon.js");


const containerInfo = document.getElementById("container-info");
const containerPokeballTop = document.getElementById("info-pokeball-top");
const containerPokeballBottom = document.getElementById("info-pokeball-bottom");
const containerPokeballId = document.getElementById("info-pokeball-id");

const autoComplete = document.getElementById("pokemon-search-autocomplete");

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

class Pokedex {
  constructor() {
    this.allPokemonNames = [];
    this.filteredPokemons = [];
    this.offset = 0;
  }

  init() {
    this.currentPokemon = [];
  }

  createPokemon(response) {
    this.pokemon = new _Pokemon__WEBPACK_IMPORTED_MODULE_0__["default"](response);
    this.currentPokemon.push(this.pokemon);

    this.handleBackground(this.pokemon.types);
    this.handleDomMainInfo(this.pokemon);
    this.handleDomMovesInfo(this.pokemon);
    this.handleDomIdInfo(this.pokemon);
  }

  handleBackground(typing) {
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

  emptyNode(parent) {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  }

  handleDomMainInfo(pokemon) {
    this.emptyNode(containerPokeballTop);
    const basicInfoContainer = document.createElement("div");
    const pokemonName = document.createElement("h1");
    const pokemonSprite = document.createElement("img");
    const pokemonType = document.createElement("h3");

    const shinySpan = document.createElement("span");

    pokemonName.textContent = pokemon.name;
    pokemonSprite.src = pokemon.sprite;
    pokemonType.textContent =
      pokemon.types.length > 1
        ? `${pokemon.types[0]} / ${pokemon.types[1]}`
        : `${pokemon.types[0]}`;
    shinySpan.textContent = "Toggle Shiny";

    basicInfoContainer.id = "info-pokeball-top-basic";
    pokemonName.id = "info-pokeball-top-basic-name";
    pokemonSprite.id = "info-pokeball-top-basic-img";
    pokemonType.id = "info-pokeball-top-basic-type";
    shinySpan.id = "info-pokeball-top-shiny-toggle";

    basicInfoContainer.appendChild(pokemonName);
    basicInfoContainer.appendChild(pokemonSprite);
    basicInfoContainer.appendChild(pokemonType);

    containerPokeballTop.appendChild(shinySpan);
    containerPokeballTop.appendChild(basicInfoContainer);
  }

  handleDomMovesInfo(pokemon) {
    this.emptyNode(containerPokeballBottom);
    const movesInfoContainer = document.createElement("div");
    const movesTitle = document.createElement("h3");
    const movesList = document.createElement("ul");

    const evoSpan = document.createElement("span");

    for (let i = 0; i < pokemon.moves.length; i++) {
      const movesListItem = document.createElement("li");
      movesListItem.textContent = pokemon.moves[i];
      movesList.appendChild(movesListItem);
    }

    movesTitle.textContent = "Moves:";
    evoSpan.textContent = "See Evo";

    movesInfoContainer.id = "info-pokeball-bottom-moves";
    movesTitle.id = "info-pokeball-bottom-moves-title";
    movesList.id = "info-pokeball-bottom-moves-list";
    evoSpan.id = "info-pokeball-bottom-evo-toggle";

    movesInfoContainer.appendChild(movesTitle);
    movesInfoContainer.appendChild(movesList);

    containerPokeballBottom.appendChild(evoSpan);
    containerPokeballBottom.appendChild(movesInfoContainer);
  }

  handleDomIdInfo(pokemon) {
    containerPokeballId.textContent = pokemon.id;
  }

  handleShinyToggle(currentPokemon) {
    if (currentPokemon[0].isShiny === false) {
      document.getElementById("info-pokeball-top-basic-img").src =
        this.pokemon.shinySprite;
      currentPokemon[0].isShiny = true;
    } else {
      document.getElementById("info-pokeball-top-basic-img").src =
        this.pokemon.sprite;
      currentPokemon[0].isShiny = false;
    }
  }

  handlePokemonNotFound() {
    this.emptyNode(containerPokeballTop);
    this.emptyNode(containerPokeballId);
    this.emptyNode(containerPokeballBottom);
    const errorMessage = document.createElement("h2");
    errorMessage.textContent = "Pokemon not found :`(";
    containerPokeballTop.appendChild(errorMessage);
  }

  filterPokemons(input) {
    this.filteredPokemons = this.allPokemonNames.filter((name) =>
      name.includes(input)
    );
    if (input) {
      this.displayFilteredPokemons(this.filteredPokemons);
    } else {
      this.emptyNode(autoComplete);
    }
  }

  displayFilteredPokemons(filteredArray) {
    this.emptyNode(autoComplete);

    for (let i = 0; i < filteredArray.length; i++) {
      const li = document.createElement("li");
      li.textContent = filteredArray[i];
      li.className = "auto-search-suggestion";
      autoComplete.appendChild(li);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pokedex);


/***/ }),

/***/ "./src/Pokemon.js":
/*!************************!*\
  !*** ./src/Pokemon.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Pokemon {
  constructor(response) {
    this.id = this.handleIdFormatting(response.id);
    this.name = this.handleCapitalizedName(response.name);
    this.speciesUrl = response.species.url;
    this.sprite = response.sprites.front_default;
    this.shinySprite = response.sprites.front_shiny;
    this.moves = this.handleMoves(response);
    this.types = this.handleTypes(response);
    this.isShiny = false;
    this.evolutionLine = [];
    this.isFavorite = false;
  }

  handleMoves(response) {
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

  handleTypes(response) {
    const types = [];
    for (let i = 0; i < response.types.length; i++) {
      types.push(response.types[i].type.name);
    }
    return types;
  }

  handleCapitalizedName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  handleIdFormatting(id) {
    if (id > 0 && id < 10) {
      return `#00${id}`;
    } else if (id >= 10 && id < 100) {
      return `#0${id}`;
    } else {
      return `#${id}`;
    }
  }

  handleFavorite() {
    if (!this.isFavorite) {
      this.isFavorite = true;
    } else if (this.isFavorite) {
      this.isFavorite = false;
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pokemon);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pokedex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pokedex.js */ "./src/Pokedex.js");


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

const pokedex = new _Pokedex_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

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

async function getEvolutionInfo(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  if (data.status === 404) return;
  const response = await data.json();

  const evoData = [response.sprites.front_default, response.name];

  return evoData;
}

async function getEvolutions(speciesUrl) {
  const data = await fetch(speciesUrl);
  const response = await data.json();

  await getAndDisplayEvo(response.evolution_chain.url);
}

async function getPokemonId(pokemonName) {
  console.log(pokemonName);
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const response = await data.json();

  return response.id;
}

async function getAndDisplayEvo(evoChainUrl) {
  const data = await fetch(evoChainUrl);
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

  const movesSpan = document.createElement("span");
  movesSpan.textContent = "See Moves";
  movesSpan.id = "info-pokeball-bottom-moves-toggle";
  containerPokeballBottom.appendChild(movesSpan);

  for (let i = 0; i < pokedex.currentPokemon[0].evolutionLine.length; i++) {
    let evoData = await getEvolutionInfo(
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

  if (pokedex.offset >= 10) return;
  setTimeout(() => {
    getPokemonNames(offset);
  }, 5000);
}

//getPokemonNames(pokedex.offset);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0Isb0RBQW9EO0FBQ3RFO0FBQ0EsU0FBUyw4Q0FBOEM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBEQUEwRCxPQUFPO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VkZXgvLi9zcmMvUG9rZWRleC5qcyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL1Bva2Vtb24uanMiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2tlbW9uIGZyb20gXCIuL1Bva2Vtb25cIjtcblxuY29uc3QgY29udGFpbmVySW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyLWluZm9cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbFRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3BcIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbEJvdHRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC1ib3R0b21cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbElkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWlkXCIpO1xuXG5jb25zdCBhdXRvQ29tcGxldGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWF1dG9jb21wbGV0ZVwiKTtcblxuY29uc3QgdHlwZXMgPSBbXG4gIFwibm9ybWFsXCIsXG4gIFwiZmlyZVwiLFxuICBcIndhdGVyXCIsXG4gIFwiZ3Jhc3NcIixcbiAgXCJlbGVjdHJpY1wiLFxuICBcImljZVwiLFxuICBcImZpZ2h0aW5nXCIsXG4gIFwicG9pc29uXCIsXG4gIFwiZ3JvdW5kXCIsXG4gIFwiZmx5aW5nXCIsXG4gIFwicHN5Y2hpY1wiLFxuICBcImJ1Z1wiLFxuICBcInJvY2tcIixcbiAgXCJnaG9zdFwiLFxuICBcImRhcmtcIixcbiAgXCJkcmFnb25cIixcbiAgXCJzdGVlbFwiLFxuICBcImZhaXJ5XCIsXG5dO1xuXG5jb25zdCBjb2xvcnMgPSBbXG4gIFwiI0E4QTg3OFwiLCAvL25vcm1hbFxuICBcIiNGMDgwMzBcIiwgLy9maXJlXG4gIFwiIzY4OTBGMFwiLCAvL3dhdGVyXG4gIFwiIzc4Qzg1MFwiLCAvL2dyYXNzXG4gIFwiI0Y4RDAzMFwiLCAvL2VsZWN0cmljXG4gIFwiIzk4RDhEOFwiLCAvL2ljZVxuICBcIiNDMDMwMjhcIiwgLy9maWdodGluZ1xuICBcIiNBMDQwQTBcIiwgLy9wb2lzb25cbiAgXCIjRTBDMDY4XCIsIC8vZ3JvdW5kXG4gIFwiI0E4OTBGMFwiLCAvL2ZseWluZ1xuICBcIiNGODU4ODhcIiwgLy9wc3ljaGljXG4gIFwiI0E4QjgyMFwiLCAvL2J1Z1xuICBcIiNCOEEwMzhcIiwgLy9yb2NrXG4gIFwiIzcwNTg5OFwiLCAvL2dob3N0XG4gIFwiIzcwNTg0OFwiLCAvL2RhcmtcbiAgXCIjNzAzOEY4XCIsIC8vZHJhZ29uXG4gIFwiI0I4QjhEMFwiLCAvL3N0ZWVsXG4gIFwiI0YwQjZCQ1wiLCAvL2ZhaXJ5XG5dO1xuXG5jb25zdCBsaWdodENvbG9ycyA9IFtcbiAgXCIjQzNDM0EyXCIsIC8vbGlnaHQgbm9ybWFsXG4gIFwiI2YwQTA2N1wiLCAvL2xpZ2h0IGZpcmVcbiAgXCIjNjhCMEYwXCIsIC8vbGlnaHQgd2F0ZXJcbiAgXCIjOTdDODdFXCIsIC8vbGlnaHQgZ3Jhc3NcbiAgXCIjRjdEQjY5XCIsIC8vbGlnaHQgZWxlY3RyaWNcbiAgXCIjQkNERURFXCIsIC8vbGlnaHQgaWNlXG4gIFwiI0MyNjE1Q1wiLCAvL2xpZ2h0IGZpZ2h0aW5nXG4gIFwiI0E0NjRBNFwiLCAvL2xpZ2h0IHBvaXNvblxuICBcIiNFMkNCOEVcIiwgLy9saWdodCBncm91bmRcbiAgXCIjQzRCNEY0XCIsIC8vbGlnaHQgZmx5aW5nXG4gIFwiI0Y5N2ZBNFwiLCAvL2xpZ2h0IHBzeWNoaWNcbiAgXCIjQjNCQjY3XCIsIC8vbGlnaHQgYnVnXG4gIFwiI0I5QUE2QlwiLCAvL2xpZ2h0IHJvY2tcbiAgXCIjODI3NDk5XCIsIC8vbGlnaHQgZ2hvc3RcbiAgXCIjNzc2OTVGXCIsIC8vbGlnaHQgZGFya1xuICBcIiM5MTY2RjlcIiwgLy9saWdodCBkcmFnb25cbiAgXCIjQ0ZDRkQ1XCIsIC8vbGlnaHQgc3RlZWxcbiAgXCIjRjFDQUNFXCIsIC8vbGlnaHQgZmFpcnlcbl07XG5cbmNsYXNzIFBva2VkZXgge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFsbFBva2Vtb25OYW1lcyA9IFtdO1xuICAgIHRoaXMuZmlsdGVyZWRQb2tlbW9ucyA9IFtdO1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jdXJyZW50UG9rZW1vbiA9IFtdO1xuICB9XG5cbiAgY3JlYXRlUG9rZW1vbihyZXNwb25zZSkge1xuICAgIHRoaXMucG9rZW1vbiA9IG5ldyBQb2tlbW9uKHJlc3BvbnNlKTtcbiAgICB0aGlzLmN1cnJlbnRQb2tlbW9uLnB1c2godGhpcy5wb2tlbW9uKTtcblxuICAgIHRoaXMuaGFuZGxlQmFja2dyb3VuZCh0aGlzLnBva2Vtb24udHlwZXMpO1xuICAgIHRoaXMuaGFuZGxlRG9tTWFpbkluZm8odGhpcy5wb2tlbW9uKTtcbiAgICB0aGlzLmhhbmRsZURvbU1vdmVzSW5mbyh0aGlzLnBva2Vtb24pO1xuICAgIHRoaXMuaGFuZGxlRG9tSWRJbmZvKHRoaXMucG9rZW1vbik7XG4gIH1cblxuICBoYW5kbGVCYWNrZ3JvdW5kKHR5cGluZykge1xuICAgIGxldCBncmFkaWVudEJnO1xuXG4gICAgaWYgKHR5cGluZy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGxldCBpbmRleE9uZSA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzBdKTtcbiAgICAgIGxldCBwcmltYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhPbmVdO1xuXG4gICAgICBsZXQgaW5kZXhUd28gPSB0eXBlcy5pbmRleE9mKHR5cGluZ1sxXSk7XG4gICAgICBsZXQgc2Vjb25kYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhUd29dO1xuXG4gICAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaW5kZXhPbmUgPSB0eXBlcy5pbmRleE9mKHR5cGluZ1swXSk7XG4gICAgICBsZXQgcHJpbWFyeUNvbG9yID0gY29sb3JzW2luZGV4T25lXTtcblxuICAgICAgbGV0IHNlY29uZGFyeUNvbG9yID0gbGlnaHRDb2xvcnNbaW5kZXhPbmVdO1xuICAgICAgZ3JhZGllbnRCZyA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7cHJpbWFyeUNvbG9yfSwgJHtzZWNvbmRhcnlDb2xvcn0pYDtcbiAgICB9XG5cbiAgICBjb250YWluZXJJbmZvLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGdyYWRpZW50Qmc7XG4gIH1cblxuICBlbXB0eU5vZGUocGFyZW50KSB7XG4gICAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICBwYXJlbnQuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVEb21NYWluSW5mbyhwb2tlbW9uKSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxUb3ApO1xuICAgIGNvbnN0IGJhc2ljSW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcG9rZW1vbk5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgY29uc3QgcG9rZW1vblNwcml0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgY29uc3QgcG9rZW1vblR5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG5cbiAgICBjb25zdCBzaGlueVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIHBva2Vtb25OYW1lLnRleHRDb250ZW50ID0gcG9rZW1vbi5uYW1lO1xuICAgIHBva2Vtb25TcHJpdGUuc3JjID0gcG9rZW1vbi5zcHJpdGU7XG4gICAgcG9rZW1vblR5cGUudGV4dENvbnRlbnQgPVxuICAgICAgcG9rZW1vbi50eXBlcy5sZW5ndGggPiAxXG4gICAgICAgID8gYCR7cG9rZW1vbi50eXBlc1swXX0gLyAke3Bva2Vtb24udHlwZXNbMV19YFxuICAgICAgICA6IGAke3Bva2Vtb24udHlwZXNbMF19YDtcbiAgICBzaGlueVNwYW4udGV4dENvbnRlbnQgPSBcIlRvZ2dsZSBTaGlueVwiO1xuXG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpY1wiO1xuICAgIHBva2Vtb25OYW1lLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1uYW1lXCI7XG4gICAgcG9rZW1vblNwcml0ZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtaW1nXCI7XG4gICAgcG9rZW1vblR5cGUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLXR5cGVcIjtcbiAgICBzaGlueVNwYW4uaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLXNoaW55LXRvZ2dsZVwiO1xuXG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25OYW1lKTtcbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblNwcml0ZSk7XG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25UeXBlKTtcblxuICAgIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKHNoaW55U3Bhbik7XG4gICAgY29udGFpbmVyUG9rZWJhbGxUb3AuYXBwZW5kQ2hpbGQoYmFzaWNJbmZvQ29udGFpbmVyKTtcbiAgfVxuXG4gIGhhbmRsZURvbU1vdmVzSW5mbyhwb2tlbW9uKSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxCb3R0b20pO1xuICAgIGNvbnN0IG1vdmVzSW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbW92ZXNUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICBjb25zdCBtb3Zlc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG5cbiAgICBjb25zdCBldm9TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBva2Vtb24ubW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1vdmVzTGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICBtb3Zlc0xpc3RJdGVtLnRleHRDb250ZW50ID0gcG9rZW1vbi5tb3Zlc1tpXTtcbiAgICAgIG1vdmVzTGlzdC5hcHBlbmRDaGlsZChtb3Zlc0xpc3RJdGVtKTtcbiAgICB9XG5cbiAgICBtb3Zlc1RpdGxlLnRleHRDb250ZW50ID0gXCJNb3ZlczpcIjtcbiAgICBldm9TcGFuLnRleHRDb250ZW50ID0gXCJTZWUgRXZvXCI7XG5cbiAgICBtb3Zlc0luZm9Db250YWluZXIuaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzXCI7XG4gICAgbW92ZXNUaXRsZS5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdGl0bGVcIjtcbiAgICBtb3Zlc0xpc3QuaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLWxpc3RcIjtcbiAgICBldm9TcGFuLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1ldm8tdG9nZ2xlXCI7XG5cbiAgICBtb3Zlc0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQobW92ZXNUaXRsZSk7XG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVzTGlzdCk7XG5cbiAgICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChldm9TcGFuKTtcbiAgICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChtb3Zlc0luZm9Db250YWluZXIpO1xuICB9XG5cbiAgaGFuZGxlRG9tSWRJbmZvKHBva2Vtb24pIHtcbiAgICBjb250YWluZXJQb2tlYmFsbElkLnRleHRDb250ZW50ID0gcG9rZW1vbi5pZDtcbiAgfVxuXG4gIGhhbmRsZVNoaW55VG9nZ2xlKGN1cnJlbnRQb2tlbW9uKSB7XG4gICAgaWYgKGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPT09IGZhbHNlKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiKS5zcmMgPVxuICAgICAgICB0aGlzLnBva2Vtb24uc2hpbnlTcHJpdGU7XG4gICAgICBjdXJyZW50UG9rZW1vblswXS5pc1NoaW55ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIikuc3JjID1cbiAgICAgICAgdGhpcy5wb2tlbW9uLnNwcml0ZTtcbiAgICAgIGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVQb2tlbW9uTm90Rm91bmQoKSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxUb3ApO1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsSWQpO1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJQb2tlbW9uIG5vdCBmb3VuZCA6YChcIjtcbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2UpO1xuICB9XG5cbiAgZmlsdGVyUG9rZW1vbnMoaW5wdXQpIHtcbiAgICB0aGlzLmZpbHRlcmVkUG9rZW1vbnMgPSB0aGlzLmFsbFBva2Vtb25OYW1lcy5maWx0ZXIoKG5hbWUpID0+XG4gICAgICBuYW1lLmluY2x1ZGVzKGlucHV0KVxuICAgICk7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICB0aGlzLmRpc3BsYXlGaWx0ZXJlZFBva2Vtb25zKHRoaXMuZmlsdGVyZWRQb2tlbW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1wdHlOb2RlKGF1dG9Db21wbGV0ZSk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGxheUZpbHRlcmVkUG9rZW1vbnMoZmlsdGVyZWRBcnJheSkge1xuICAgIHRoaXMuZW1wdHlOb2RlKGF1dG9Db21wbGV0ZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgbGkudGV4dENvbnRlbnQgPSBmaWx0ZXJlZEFycmF5W2ldO1xuICAgICAgbGkuY2xhc3NOYW1lID0gXCJhdXRvLXNlYXJjaC1zdWdnZXN0aW9uXCI7XG4gICAgICBhdXRvQ29tcGxldGUuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2tlZGV4O1xuIiwiY2xhc3MgUG9rZW1vbiB7XG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5pZCA9IHRoaXMuaGFuZGxlSWRGb3JtYXR0aW5nKHJlc3BvbnNlLmlkKTtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLmhhbmRsZUNhcGl0YWxpemVkTmFtZShyZXNwb25zZS5uYW1lKTtcbiAgICB0aGlzLnNwZWNpZXNVcmwgPSByZXNwb25zZS5zcGVjaWVzLnVybDtcbiAgICB0aGlzLnNwcml0ZSA9IHJlc3BvbnNlLnNwcml0ZXMuZnJvbnRfZGVmYXVsdDtcbiAgICB0aGlzLnNoaW55U3ByaXRlID0gcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9zaGlueTtcbiAgICB0aGlzLm1vdmVzID0gdGhpcy5oYW5kbGVNb3ZlcyhyZXNwb25zZSk7XG4gICAgdGhpcy50eXBlcyA9IHRoaXMuaGFuZGxlVHlwZXMocmVzcG9uc2UpO1xuICAgIHRoaXMuaXNTaGlueSA9IGZhbHNlO1xuICAgIHRoaXMuZXZvbHV0aW9uTGluZSA9IFtdO1xuICAgIHRoaXMuaXNGYXZvcml0ZSA9IGZhbHNlO1xuICB9XG5cbiAgaGFuZGxlTW92ZXMocmVzcG9uc2UpIHtcbiAgICBjb25zdCBtb3ZlcyA9IFtdO1xuXG4gICAgaWYgKHJlc3BvbnNlLm1vdmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1swXS5tb3ZlLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBtb3Zlcy5wdXNoKHJlc3BvbnNlLm1vdmVzW2ldLm1vdmUubmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlcztcbiAgfVxuXG4gIGhhbmRsZVR5cGVzKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgdHlwZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLnR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0eXBlcy5wdXNoKHJlc3BvbnNlLnR5cGVzW2ldLnR5cGUubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlcztcbiAgfVxuXG4gIGhhbmRsZUNhcGl0YWxpemVkTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xuICB9XG5cbiAgaGFuZGxlSWRGb3JtYXR0aW5nKGlkKSB7XG4gICAgaWYgKGlkID4gMCAmJiBpZCA8IDEwKSB7XG4gICAgICByZXR1cm4gYCMwMCR7aWR9YDtcbiAgICB9IGVsc2UgaWYgKGlkID49IDEwICYmIGlkIDwgMTAwKSB7XG4gICAgICByZXR1cm4gYCMwJHtpZH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCMke2lkfWA7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRmF2b3JpdGUoKSB7XG4gICAgaWYgKCF0aGlzLmlzRmF2b3JpdGUpIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRmF2b3JpdGUpIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2tlbW9uO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgUG9rZWRleCBmcm9tIFwiLi9Qb2tlZGV4LmpzXCI7XG5cbi8vIGNvbnN0IG9kZE5hbWVzID0gW1xuLy8gICBcIm1yLW1pbWVcIixcbi8vICAgXCJkYXJtYW5pdGFuLXN0YW5kYXJkXCIsXG4vLyAgIFwiZGVveHlzLWF0dGFja1wiLFxuLy8gICBcImRlb3h5cy1kZWZlbnNlXCIsXG4vLyAgIFwiZGVveHlzLW5vcm1hbFwiLFxuLy8gICBcIndvcm1hZGFtLXBsYW50XCIsXG4vLyAgIFwibWltZS1qclwiLFxuLy8gICBcInBvcnlnb24telwiLFxuLy8gICBcImdpcmF0aW5hLWFsdGVyZWRcIixcbi8vICAgXCJzaGF5bWluLWxhbmRcIixcbi8vICAgXCJiYXNjdWxpbi1yZWQtc3RyaXBlZFwiLFxuLy8gICBcInRvcm5hZHVzLWluY2FybmF0ZVwiLFxuLy8gICBcInRodW5kdXJ1cy1pbmNhcm5hdGVcIixcbi8vICAgXCJsYW5kb3J1cy1pbmNhcm5hdGVcIixcbi8vICAgXCJrZWxkZW8tb3JkaW5hcnlcIixcbi8vICAgXCJtZWxvZXR0YS1hcmlhXCIsXG4vLyAgIFwibWVvd3N0aWMtbWFsZVwiLFxuLy8gICBcImFlZ2lzbGFzaC1zaGllbGRcIixcbi8vICAgXCJwdW1wa2Fib28tYXZlcmFnZVwiLFxuLy8gICBcImdvdXJnZWlzdC1hdmVyYWdlXCIsXG4vLyAgIFwienlnYXJkZS01MFwiLFxuLy8gICBcImx5Y2Fucm9jLW1pZGRheVwiLFxuLy8gICBcIndpc2hpd2FzaGktc29sb1wiLFxuLy8gICBcInR5cGUtbnVsbFwiLFxuLy8gICBcIm1pbmlvci1yZWQtbWV0ZW9yXCIsXG4vLyAgIFwibWltaWt5dS1kaXNndWlzZWRcIixcbi8vICAgXCJqYW5nbW8tb1wiLFxuLy8gICBcImhha2Ftby1vXCIsXG4vLyAgIFwia29tbW8tb1wiLFxuLy8gICBcInRhcHUta29rb1wiLFxuLy8gICBcInRhcHUtbGVsZVwiLFxuLy8gICBcInRhcHUtYnVsdVwiLFxuLy8gICBcInRhcHUtZmluaVwiLFxuLy8gICBcInRveHRyaWNpdHktYW1wZWRcIixcbi8vICAgXCJtci1yaW1lXCIsXG4vLyAgIFwiZWlzY3VlLWljZVwiLFxuLy8gICBcImluZGVlZGVlLW1hbGVcIixcbi8vICAgXCJtb3JwZWtvLWZ1bGwtYmVsbHlcIixcbi8vICAgXCJ1cnNoaWZ1LXNpbmdsZS1zdHJpa2VcIixcbi8vICAgXCJkZW94eXMtc3BlZWRcIixcbi8vICAgXCJ3b3JtYWRhbS1zYW5keVwiLFxuLy8gICBcIndvcm1hZGFtLXRyYXNoXCIsXG4vLyAgIFwic2hheW1pbi1za3lcIixcbi8vICAgXCJnaXJhdGluYS1vcmlnaW5cIixcbi8vICAgXCJyb3RvbS1oZWF0XCIsXG4vLyAgIFwicm90b20td2FzaFwiLFxuLy8gICBcInJvdG9tLWZyb3N0XCIsXG4vLyAgIFwicm90b20tZmFuXCIsXG4vLyAgIFwicm90b20tbW93XCIsXG4vLyAgIFwiY2FzdGZvcm0tc3VubnlcIixcbi8vIF07XG5cbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1pbnB1dFwiKTtcbmNvbnN0IHNlYXJjaFBva2Vtb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWJ1dHRvblwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsQm90dG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWJvdHRvbVwiKTtcbmNvbnN0IGNvbnRhaW5lclN1Z2dlc3Rpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwicG9rZW1vbi1zZWFyY2gtYXV0b2NvbXBsZXRlXCJcbik7XG5cbmNvbnN0IHBva2VkZXggPSBuZXcgUG9rZWRleCgpO1xuXG4vL0V2ZW50IExpc3RlbmVyc1xuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIGxldCB0cmltbWVkU2VhcmNoID0gc2VhcmNoVmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKHRyaW1tZWRTZWFyY2gubGVuZ3RoICE9PSAwKSB7XG4gICAgcG9rZWRleC5pbml0KCk7XG4gICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIGdldFBva2Vtb24odHJpbW1lZFNlYXJjaCk7XG4gIH1cbn0pO1xuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICBsZXQgc2VhcmNoSW5wdXRWYWx1ZSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICBsZXQgdGFpbG9yZWRJbnB1dFZhbHVlID0gc2VhcmNoSW5wdXRWYWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICBwb2tlZGV4LmZpbHRlclBva2Vtb25zKHRhaWxvcmVkSW5wdXRWYWx1ZSk7XG59KTtcblxuLy9FdmVudCBEZWxlZ2F0aW9uXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC10b3Atc2hpbnktdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmhhbmRsZVNoaW55VG9nZ2xlKHBva2VkZXguY3VycmVudFBva2Vtb24pO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImluZm8tcG9rZWJhbGwtYm90dG9tLWV2by10b2dnbGVcIikge1xuICAgIHBva2VkZXguZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBnZXRFdm9sdXRpb25zKHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uc3BlY2llc1VybCk7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmhhbmRsZURvbU1vdmVzSW5mbyhwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiZXZvbHV0aW9uXCIpIHtcbiAgICBwb2tlZGV4LmluaXQoKTtcbiAgICBnZXRQb2tlbW9uKGUudGFyZ2V0LmlkKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiYXV0by1zZWFyY2gtc3VnZ2VzdGlvblwiKSB7XG4gICAgc2VhcmNoSW5wdXQudmFsdWUgPSBlLnRhcmdldC5pbm5lclRleHQ7XG4gICAgcG9rZWRleC5maWx0ZXJlZFBva2Vtb25zID0gW107XG4gICAgcG9rZWRleC5lbXB0eU5vZGUoY29udGFpbmVyU3VnZ2VzdGlvbnMpO1xuICAgIHNlYXJjaElucHV0LmZvY3VzKCk7XG4gIH0gZWxzZSB7XG4gICAgcG9rZWRleC5lbXB0eU5vZGUoY29udGFpbmVyU3VnZ2VzdGlvbnMpO1xuICB9XG59KTtcblxuLy9Bc3luYyBDb2RlXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb24oaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGlmIChkYXRhLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgcG9rZWRleC5oYW5kbGVQb2tlbW9uTm90Rm91bmQoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gICAgcG9rZWRleC5jcmVhdGVQb2tlbW9uKHJlc3BvbnNlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRFdm9sdXRpb25JbmZvKGlkZW50aWZpZXIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpZGVudGlmaWVyfWApO1xuICBpZiAoZGF0YS5zdGF0dXMgPT09IDQwNCkgcmV0dXJuO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGNvbnN0IGV2b0RhdGEgPSBbcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0LCByZXNwb25zZS5uYW1lXTtcblxuICByZXR1cm4gZXZvRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXZvbHV0aW9ucyhzcGVjaWVzVXJsKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChzcGVjaWVzVXJsKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBhd2FpdCBnZXRBbmREaXNwbGF5RXZvKHJlc3BvbnNlLmV2b2x1dGlvbl9jaGFpbi51cmwpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uSWQocG9rZW1vbk5hbWUpIHtcbiAgY29uc29sZS5sb2cocG9rZW1vbk5hbWUpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke3Bva2Vtb25OYW1lfWApO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIHJldHVybiByZXNwb25zZS5pZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QW5kRGlzcGxheUV2byhldm9DaGFpblVybCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goZXZvQ2hhaW5VcmwpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGxldCBldm9sdXRpb25DaGFpbiA9IFtdO1xuICBsZXQgZXZvRGF0YSA9IHJlc3BvbnNlLmNoYWluO1xuXG4gIGRvIHtcbiAgICBldm9sdXRpb25DaGFpbi5wdXNoKHtcbiAgICAgIG5hbWU6IGV2b0RhdGEuc3BlY2llcy5uYW1lLFxuICAgICAgaWQ6IGF3YWl0IGdldFBva2Vtb25JZChldm9EYXRhLnNwZWNpZXMubmFtZSksXG4gICAgfSk7XG5cbiAgICBldm9EYXRhID0gZXZvRGF0YVtcImV2b2x2ZXNfdG9cIl1bMF07XG4gIH0gd2hpbGUgKCEhZXZvRGF0YSAmJiBldm9EYXRhLmhhc093blByb3BlcnR5KFwiZXZvbHZlc190b1wiKSk7XG5cbiAgaWYgKHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5sZW5ndGggPT09IDApIHtcbiAgICBldm9sdXRpb25DaGFpbi5mb3JFYWNoKChldm9sdXRpb24pID0+XG4gICAgICBwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmUucHVzaChldm9sdXRpb24pXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IG1vdmVzU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBtb3Zlc1NwYW4udGV4dENvbnRlbnQgPSBcIlNlZSBNb3Zlc1wiO1xuICBtb3Zlc1NwYW4uaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLXRvZ2dsZVwiO1xuICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChtb3Zlc1NwYW4pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGV2b0RhdGEgPSBhd2FpdCBnZXRFdm9sdXRpb25JbmZvKFxuICAgICAgYCR7cG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lW2ldLmlkfWBcbiAgICApO1xuICAgIGlmIChldm9EYXRhKSB7XG4gICAgICBsZXQgZXZvSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgIGV2b0ltZy5zcmMgPSBldm9EYXRhWzBdO1xuICAgICAgZXZvSW1nLmlkID0gZXZvRGF0YVsxXTtcbiAgICAgIGV2b0ltZy5jbGFzc05hbWUgPSBcImV2b2x1dGlvblwiO1xuICAgICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQoZXZvSW1nKTtcbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0UG9rZW1vbk5hbWVzKG9mZnNldCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbj9saW1pdD0xNTEmb2Zmc2V0PSR7b2Zmc2V0fWBcbiAgKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICByZXNwb25zZS5yZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgIHBva2VkZXguYWxsUG9rZW1vbk5hbWVzLnB1c2gocmVzdWx0Lm5hbWUpO1xuICB9KTtcbiAgY29uc29sZS5sb2cocG9rZWRleC5hbGxQb2tlbW9uTmFtZXMpO1xuICBwb2tlZGV4Lm9mZnNldCArPSAxNTE7XG5cbiAgaWYgKHBva2VkZXgub2Zmc2V0ID49IDEwKSByZXR1cm47XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGdldFBva2Vtb25OYW1lcyhvZmZzZXQpO1xuICB9LCA1MDAwKTtcbn1cblxuLy9nZXRQb2tlbW9uTmFtZXMocG9rZWRleC5vZmZzZXQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9