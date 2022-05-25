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


const oddNames = [
  "mr-mime",
  "darmanitan-standard",
  "deoxys-attack",
  "deoxys-defense",
  "deoxys-normal",
  "wormadam-plant",
  "mime-jr",
  "porygon-z",
  "giratina-altered",
  "shaymin-land",
  "basculin-red-striped",
  "tornadus-incarnate",
  "thundurus-incarnate",
  "landorus-incarnate",
  "keldeo-ordinary",
  "meloetta-aria",
  "meowstic-male",
  "aegislash-shield",
  "pumpkaboo-average",
  "gourgeist-average",
  "zygarde-50",
  "lycanroc-midday",
  "wishiwashi-solo",
  "type-null",
  "minior-red-meteor",
  "mimikyu-disguised",
  "jangmo-o",
  "hakamo-o",
  "kommo-o",
  "tapu-koko",
  "tapu-lele",
  "tapu-bulu",
  "tapu-fini",
  "toxtricity-amped",
  "mr-rime",
  "eiscue-ice",
  "indeedee-male",
  "morpeko-full-belly",
  "urshifu-single-strike",
  "deoxys-speed",
  "wormadam-sandy",
  "wormadam-trash",
  "shaymin-sky",
  "giratina-origin",
  "rotom-heat",
  "rotom-wash",
  "rotom-frost",
  "rotom-fan",
  "rotom-mow",
  "castform-sunny",
];

const searchInput = document.getElementById("pokemon-search-input");
const searchPokemon = document.getElementById("pokemon-search-button");
const containerPokeballBottom = document.getElementById("info-pokeball-bottom");

const pokedex = new _Pokedex_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

//Event Listeners
searchPokemon.addEventListener("click", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("pokemon-search-input").value;
  let trimmedSearch = searchValue.trim().toLowerCase();

  if (trimmedSearch.length !== 0) {
    pokedex.init();
    getPokemon(trimmedSearch);
  }
});

searchInput.addEventListener("keyup", () => {
  let searchInputValue = searchInput.value;

  pokedex.filterPokemons(searchInputValue);
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

async function getAndDisplayEvo(evoChainUrl) {
  const data = await fetch(evoChainUrl);
  const response = await data.json();

  let evolutionChain = [];
  let evoData = response.chain;

  do {
    evolutionChain.push(evoData.species.name);

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
      `${pokedex.currentPokemon[0].evolutionLine[i]}`
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

  if (pokedex.offset >= 151) return;
  setTimeout(() => {
    getPokemonNames(offset);
  }, 5000);
}

//getPokemonNames(pokedex.offset);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLDBEQUEwRCxPQUFPO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VkZXgvLi9zcmMvUG9rZWRleC5qcyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL1Bva2Vtb24uanMiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2tlbW9uIGZyb20gXCIuL1Bva2Vtb25cIjtcblxuY29uc3QgY29udGFpbmVySW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyLWluZm9cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbFRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3BcIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbEJvdHRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC1ib3R0b21cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbElkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWlkXCIpO1xuXG5jb25zdCBhdXRvQ29tcGxldGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWF1dG9jb21wbGV0ZVwiKTtcblxuY29uc3QgdHlwZXMgPSBbXG4gIFwibm9ybWFsXCIsXG4gIFwiZmlyZVwiLFxuICBcIndhdGVyXCIsXG4gIFwiZ3Jhc3NcIixcbiAgXCJlbGVjdHJpY1wiLFxuICBcImljZVwiLFxuICBcImZpZ2h0aW5nXCIsXG4gIFwicG9pc29uXCIsXG4gIFwiZ3JvdW5kXCIsXG4gIFwiZmx5aW5nXCIsXG4gIFwicHN5Y2hpY1wiLFxuICBcImJ1Z1wiLFxuICBcInJvY2tcIixcbiAgXCJnaG9zdFwiLFxuICBcImRhcmtcIixcbiAgXCJkcmFnb25cIixcbiAgXCJzdGVlbFwiLFxuICBcImZhaXJ5XCIsXG5dO1xuXG5jb25zdCBjb2xvcnMgPSBbXG4gIFwiI0E4QTg3OFwiLCAvL25vcm1hbFxuICBcIiNGMDgwMzBcIiwgLy9maXJlXG4gIFwiIzY4OTBGMFwiLCAvL3dhdGVyXG4gIFwiIzc4Qzg1MFwiLCAvL2dyYXNzXG4gIFwiI0Y4RDAzMFwiLCAvL2VsZWN0cmljXG4gIFwiIzk4RDhEOFwiLCAvL2ljZVxuICBcIiNDMDMwMjhcIiwgLy9maWdodGluZ1xuICBcIiNBMDQwQTBcIiwgLy9wb2lzb25cbiAgXCIjRTBDMDY4XCIsIC8vZ3JvdW5kXG4gIFwiI0E4OTBGMFwiLCAvL2ZseWluZ1xuICBcIiNGODU4ODhcIiwgLy9wc3ljaGljXG4gIFwiI0E4QjgyMFwiLCAvL2J1Z1xuICBcIiNCOEEwMzhcIiwgLy9yb2NrXG4gIFwiIzcwNTg5OFwiLCAvL2dob3N0XG4gIFwiIzcwNTg0OFwiLCAvL2RhcmtcbiAgXCIjNzAzOEY4XCIsIC8vZHJhZ29uXG4gIFwiI0I4QjhEMFwiLCAvL3N0ZWVsXG4gIFwiI0YwQjZCQ1wiLCAvL2ZhaXJ5XG5dO1xuXG5jb25zdCBsaWdodENvbG9ycyA9IFtcbiAgXCIjQzNDM0EyXCIsIC8vbGlnaHQgbm9ybWFsXG4gIFwiI2YwQTA2N1wiLCAvL2xpZ2h0IGZpcmVcbiAgXCIjNjhCMEYwXCIsIC8vbGlnaHQgd2F0ZXJcbiAgXCIjOTdDODdFXCIsIC8vbGlnaHQgZ3Jhc3NcbiAgXCIjRjdEQjY5XCIsIC8vbGlnaHQgZWxlY3RyaWNcbiAgXCIjQkNERURFXCIsIC8vbGlnaHQgaWNlXG4gIFwiI0MyNjE1Q1wiLCAvL2xpZ2h0IGZpZ2h0aW5nXG4gIFwiI0E0NjRBNFwiLCAvL2xpZ2h0IHBvaXNvblxuICBcIiNFMkNCOEVcIiwgLy9saWdodCBncm91bmRcbiAgXCIjQzRCNEY0XCIsIC8vbGlnaHQgZmx5aW5nXG4gIFwiI0Y5N2ZBNFwiLCAvL2xpZ2h0IHBzeWNoaWNcbiAgXCIjQjNCQjY3XCIsIC8vbGlnaHQgYnVnXG4gIFwiI0I5QUE2QlwiLCAvL2xpZ2h0IHJvY2tcbiAgXCIjODI3NDk5XCIsIC8vbGlnaHQgZ2hvc3RcbiAgXCIjNzc2OTVGXCIsIC8vbGlnaHQgZGFya1xuICBcIiM5MTY2RjlcIiwgLy9saWdodCBkcmFnb25cbiAgXCIjQ0ZDRkQ1XCIsIC8vbGlnaHQgc3RlZWxcbiAgXCIjRjFDQUNFXCIsIC8vbGlnaHQgZmFpcnlcbl07XG5cbmNsYXNzIFBva2VkZXgge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFsbFBva2Vtb25OYW1lcyA9IFtdO1xuICAgIHRoaXMuZmlsdGVyZWRQb2tlbW9ucyA9IFtdO1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jdXJyZW50UG9rZW1vbiA9IFtdO1xuICB9XG5cbiAgY3JlYXRlUG9rZW1vbihyZXNwb25zZSkge1xuICAgIHRoaXMucG9rZW1vbiA9IG5ldyBQb2tlbW9uKHJlc3BvbnNlKTtcbiAgICB0aGlzLmN1cnJlbnRQb2tlbW9uLnB1c2godGhpcy5wb2tlbW9uKTtcblxuICAgIHRoaXMuaGFuZGxlQmFja2dyb3VuZCh0aGlzLnBva2Vtb24udHlwZXMpO1xuICAgIHRoaXMuaGFuZGxlRG9tTWFpbkluZm8odGhpcy5wb2tlbW9uKTtcbiAgICB0aGlzLmhhbmRsZURvbU1vdmVzSW5mbyh0aGlzLnBva2Vtb24pO1xuICAgIHRoaXMuaGFuZGxlRG9tSWRJbmZvKHRoaXMucG9rZW1vbik7XG4gIH1cblxuICBoYW5kbGVCYWNrZ3JvdW5kKHR5cGluZykge1xuICAgIGxldCBncmFkaWVudEJnO1xuXG4gICAgaWYgKHR5cGluZy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGxldCBpbmRleE9uZSA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzBdKTtcbiAgICAgIGxldCBwcmltYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhPbmVdO1xuXG4gICAgICBsZXQgaW5kZXhUd28gPSB0eXBlcy5pbmRleE9mKHR5cGluZ1sxXSk7XG4gICAgICBsZXQgc2Vjb25kYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhUd29dO1xuXG4gICAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaW5kZXhPbmUgPSB0eXBlcy5pbmRleE9mKHR5cGluZ1swXSk7XG4gICAgICBsZXQgcHJpbWFyeUNvbG9yID0gY29sb3JzW2luZGV4T25lXTtcblxuICAgICAgbGV0IHNlY29uZGFyeUNvbG9yID0gbGlnaHRDb2xvcnNbaW5kZXhPbmVdO1xuICAgICAgZ3JhZGllbnRCZyA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7cHJpbWFyeUNvbG9yfSwgJHtzZWNvbmRhcnlDb2xvcn0pYDtcbiAgICB9XG5cbiAgICBjb250YWluZXJJbmZvLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGdyYWRpZW50Qmc7XG4gIH1cblxuICBlbXB0eU5vZGUocGFyZW50KSB7XG4gICAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICBwYXJlbnQuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVEb21NYWluSW5mbyhwb2tlbW9uKSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxUb3ApO1xuICAgIGNvbnN0IGJhc2ljSW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcG9rZW1vbk5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgY29uc3QgcG9rZW1vblNwcml0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgY29uc3QgcG9rZW1vblR5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG5cbiAgICBjb25zdCBzaGlueVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIHBva2Vtb25OYW1lLnRleHRDb250ZW50ID0gcG9rZW1vbi5uYW1lO1xuICAgIHBva2Vtb25TcHJpdGUuc3JjID0gcG9rZW1vbi5zcHJpdGU7XG4gICAgcG9rZW1vblR5cGUudGV4dENvbnRlbnQgPVxuICAgICAgcG9rZW1vbi50eXBlcy5sZW5ndGggPiAxXG4gICAgICAgID8gYCR7cG9rZW1vbi50eXBlc1swXX0gLyAke3Bva2Vtb24udHlwZXNbMV19YFxuICAgICAgICA6IGAke3Bva2Vtb24udHlwZXNbMF19YDtcbiAgICBzaGlueVNwYW4udGV4dENvbnRlbnQgPSBcIlRvZ2dsZSBTaGlueVwiO1xuXG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpY1wiO1xuICAgIHBva2Vtb25OYW1lLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1uYW1lXCI7XG4gICAgcG9rZW1vblNwcml0ZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtaW1nXCI7XG4gICAgcG9rZW1vblR5cGUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLXR5cGVcIjtcbiAgICBzaGlueVNwYW4uaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLXNoaW55LXRvZ2dsZVwiO1xuXG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25OYW1lKTtcbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblNwcml0ZSk7XG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25UeXBlKTtcblxuICAgIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKHNoaW55U3Bhbik7XG4gICAgY29udGFpbmVyUG9rZWJhbGxUb3AuYXBwZW5kQ2hpbGQoYmFzaWNJbmZvQ29udGFpbmVyKTtcbiAgfVxuXG4gIGhhbmRsZURvbU1vdmVzSW5mbyhwb2tlbW9uKSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxCb3R0b20pO1xuICAgIGNvbnN0IG1vdmVzSW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbW92ZXNUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICBjb25zdCBtb3Zlc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG5cbiAgICBjb25zdCBldm9TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBva2Vtb24ubW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1vdmVzTGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICBtb3Zlc0xpc3RJdGVtLnRleHRDb250ZW50ID0gcG9rZW1vbi5tb3Zlc1tpXTtcbiAgICAgIG1vdmVzTGlzdC5hcHBlbmRDaGlsZChtb3Zlc0xpc3RJdGVtKTtcbiAgICB9XG5cbiAgICBtb3Zlc1RpdGxlLnRleHRDb250ZW50ID0gXCJNb3ZlczpcIjtcbiAgICBldm9TcGFuLnRleHRDb250ZW50ID0gXCJTZWUgRXZvXCI7XG5cbiAgICBtb3Zlc0luZm9Db250YWluZXIuaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzXCI7XG4gICAgbW92ZXNUaXRsZS5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdGl0bGVcIjtcbiAgICBtb3Zlc0xpc3QuaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLWxpc3RcIjtcbiAgICBldm9TcGFuLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1ldm8tdG9nZ2xlXCI7XG5cbiAgICBtb3Zlc0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQobW92ZXNUaXRsZSk7XG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVzTGlzdCk7XG5cbiAgICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChldm9TcGFuKTtcbiAgICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChtb3Zlc0luZm9Db250YWluZXIpO1xuICB9XG5cbiAgaGFuZGxlRG9tSWRJbmZvKHBva2Vtb24pIHtcbiAgICBjb250YWluZXJQb2tlYmFsbElkLnRleHRDb250ZW50ID0gcG9rZW1vbi5pZDtcbiAgfVxuXG4gIGhhbmRsZVNoaW55VG9nZ2xlKGN1cnJlbnRQb2tlbW9uKSB7XG4gICAgaWYgKGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPT09IGZhbHNlKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiKS5zcmMgPVxuICAgICAgICB0aGlzLnBva2Vtb24uc2hpbnlTcHJpdGU7XG4gICAgICBjdXJyZW50UG9rZW1vblswXS5pc1NoaW55ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIikuc3JjID1cbiAgICAgICAgdGhpcy5wb2tlbW9uLnNwcml0ZTtcbiAgICAgIGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVQb2tlbW9uTm90Rm91bmQoKSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxUb3ApO1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsSWQpO1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJQb2tlbW9uIG5vdCBmb3VuZCA6YChcIjtcbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2UpO1xuICB9XG5cbiAgZmlsdGVyUG9rZW1vbnMoaW5wdXQpIHtcbiAgICB0aGlzLmZpbHRlcmVkUG9rZW1vbnMgPSB0aGlzLmFsbFBva2Vtb25OYW1lcy5maWx0ZXIoKG5hbWUpID0+XG4gICAgICBuYW1lLmluY2x1ZGVzKGlucHV0KVxuICAgICk7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICB0aGlzLmRpc3BsYXlGaWx0ZXJlZFBva2Vtb25zKHRoaXMuZmlsdGVyZWRQb2tlbW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1wdHlOb2RlKGF1dG9Db21wbGV0ZSk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGxheUZpbHRlcmVkUG9rZW1vbnMoZmlsdGVyZWRBcnJheSkge1xuICAgIHRoaXMuZW1wdHlOb2RlKGF1dG9Db21wbGV0ZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgbGkudGV4dENvbnRlbnQgPSBmaWx0ZXJlZEFycmF5W2ldO1xuICAgICAgYXV0b0NvbXBsZXRlLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9rZWRleDtcbiIsImNsYXNzIFBva2Vtb24ge1xuICBjb25zdHJ1Y3RvcihyZXNwb25zZSkge1xuICAgIHRoaXMuaWQgPSB0aGlzLmhhbmRsZUlkRm9ybWF0dGluZyhyZXNwb25zZS5pZCk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5oYW5kbGVDYXBpdGFsaXplZE5hbWUocmVzcG9uc2UubmFtZSk7XG4gICAgdGhpcy5zcGVjaWVzVXJsID0gcmVzcG9uc2Uuc3BlY2llcy51cmw7XG4gICAgdGhpcy5zcHJpdGUgPSByZXNwb25zZS5zcHJpdGVzLmZyb250X2RlZmF1bHQ7XG4gICAgdGhpcy5zaGlueVNwcml0ZSA9IHJlc3BvbnNlLnNwcml0ZXMuZnJvbnRfc2hpbnk7XG4gICAgdGhpcy5tb3ZlcyA9IHRoaXMuaGFuZGxlTW92ZXMocmVzcG9uc2UpO1xuICAgIHRoaXMudHlwZXMgPSB0aGlzLmhhbmRsZVR5cGVzKHJlc3BvbnNlKTtcbiAgICB0aGlzLmlzU2hpbnkgPSBmYWxzZTtcbiAgICB0aGlzLmV2b2x1dGlvbkxpbmUgPSBbXTtcbiAgICB0aGlzLmlzRmF2b3JpdGUgPSBmYWxzZTtcbiAgfVxuXG4gIGhhbmRsZU1vdmVzKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgbW92ZXMgPSBbXTtcblxuICAgIGlmIChyZXNwb25zZS5tb3Zlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIG1vdmVzLnB1c2gocmVzcG9uc2UubW92ZXNbMF0ubW92ZS5uYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1tpXS5tb3ZlLm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW92ZXM7XG4gIH1cblxuICBoYW5kbGVUeXBlcyhyZXNwb25zZSkge1xuICAgIGNvbnN0IHR5cGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS50eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdHlwZXMucHVzaChyZXNwb25zZS50eXBlc1tpXS50eXBlLm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZXM7XG4gIH1cblxuICBoYW5kbGVDYXBpdGFsaXplZE5hbWUobmFtZSkge1xuICAgIHJldHVybiBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKTtcbiAgfVxuXG4gIGhhbmRsZUlkRm9ybWF0dGluZyhpZCkge1xuICAgIGlmIChpZCA+IDAgJiYgaWQgPCAxMCkge1xuICAgICAgcmV0dXJuIGAjMDAke2lkfWA7XG4gICAgfSBlbHNlIGlmIChpZCA+PSAxMCAmJiBpZCA8IDEwMCkge1xuICAgICAgcmV0dXJuIGAjMCR7aWR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAjJHtpZH1gO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZhdm9yaXRlKCkge1xuICAgIGlmICghdGhpcy5pc0Zhdm9yaXRlKSB7XG4gICAgICB0aGlzLmlzRmF2b3JpdGUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0Zhdm9yaXRlKSB7XG4gICAgICB0aGlzLmlzRmF2b3JpdGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9rZW1vbjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBva2VkZXggZnJvbSBcIi4vUG9rZWRleC5qc1wiO1xuXG5jb25zdCBvZGROYW1lcyA9IFtcbiAgXCJtci1taW1lXCIsXG4gIFwiZGFybWFuaXRhbi1zdGFuZGFyZFwiLFxuICBcImRlb3h5cy1hdHRhY2tcIixcbiAgXCJkZW94eXMtZGVmZW5zZVwiLFxuICBcImRlb3h5cy1ub3JtYWxcIixcbiAgXCJ3b3JtYWRhbS1wbGFudFwiLFxuICBcIm1pbWUtanJcIixcbiAgXCJwb3J5Z29uLXpcIixcbiAgXCJnaXJhdGluYS1hbHRlcmVkXCIsXG4gIFwic2hheW1pbi1sYW5kXCIsXG4gIFwiYmFzY3VsaW4tcmVkLXN0cmlwZWRcIixcbiAgXCJ0b3JuYWR1cy1pbmNhcm5hdGVcIixcbiAgXCJ0aHVuZHVydXMtaW5jYXJuYXRlXCIsXG4gIFwibGFuZG9ydXMtaW5jYXJuYXRlXCIsXG4gIFwia2VsZGVvLW9yZGluYXJ5XCIsXG4gIFwibWVsb2V0dGEtYXJpYVwiLFxuICBcIm1lb3dzdGljLW1hbGVcIixcbiAgXCJhZWdpc2xhc2gtc2hpZWxkXCIsXG4gIFwicHVtcGthYm9vLWF2ZXJhZ2VcIixcbiAgXCJnb3VyZ2Vpc3QtYXZlcmFnZVwiLFxuICBcInp5Z2FyZGUtNTBcIixcbiAgXCJseWNhbnJvYy1taWRkYXlcIixcbiAgXCJ3aXNoaXdhc2hpLXNvbG9cIixcbiAgXCJ0eXBlLW51bGxcIixcbiAgXCJtaW5pb3ItcmVkLW1ldGVvclwiLFxuICBcIm1pbWlreXUtZGlzZ3Vpc2VkXCIsXG4gIFwiamFuZ21vLW9cIixcbiAgXCJoYWthbW8tb1wiLFxuICBcImtvbW1vLW9cIixcbiAgXCJ0YXB1LWtva29cIixcbiAgXCJ0YXB1LWxlbGVcIixcbiAgXCJ0YXB1LWJ1bHVcIixcbiAgXCJ0YXB1LWZpbmlcIixcbiAgXCJ0b3h0cmljaXR5LWFtcGVkXCIsXG4gIFwibXItcmltZVwiLFxuICBcImVpc2N1ZS1pY2VcIixcbiAgXCJpbmRlZWRlZS1tYWxlXCIsXG4gIFwibW9ycGVrby1mdWxsLWJlbGx5XCIsXG4gIFwidXJzaGlmdS1zaW5nbGUtc3RyaWtlXCIsXG4gIFwiZGVveHlzLXNwZWVkXCIsXG4gIFwid29ybWFkYW0tc2FuZHlcIixcbiAgXCJ3b3JtYWRhbS10cmFzaFwiLFxuICBcInNoYXltaW4tc2t5XCIsXG4gIFwiZ2lyYXRpbmEtb3JpZ2luXCIsXG4gIFwicm90b20taGVhdFwiLFxuICBcInJvdG9tLXdhc2hcIixcbiAgXCJyb3RvbS1mcm9zdFwiLFxuICBcInJvdG9tLWZhblwiLFxuICBcInJvdG9tLW1vd1wiLFxuICBcImNhc3Rmb3JtLXN1bm55XCIsXG5dO1xuXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIik7XG5jb25zdCBzZWFyY2hQb2tlbW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1idXR0b25cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbEJvdHRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC1ib3R0b21cIik7XG5cbmNvbnN0IHBva2VkZXggPSBuZXcgUG9rZWRleCgpO1xuXG4vL0V2ZW50IExpc3RlbmVyc1xuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIGxldCB0cmltbWVkU2VhcmNoID0gc2VhcmNoVmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKHRyaW1tZWRTZWFyY2gubGVuZ3RoICE9PSAwKSB7XG4gICAgcG9rZWRleC5pbml0KCk7XG4gICAgZ2V0UG9rZW1vbih0cmltbWVkU2VhcmNoKTtcbiAgfVxufSk7XG5cbnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoKSA9PiB7XG4gIGxldCBzZWFyY2hJbnB1dFZhbHVlID0gc2VhcmNoSW5wdXQudmFsdWU7XG5cbiAgcG9rZWRleC5maWx0ZXJQb2tlbW9ucyhzZWFyY2hJbnB1dFZhbHVlKTtcbn0pO1xuXG4vL0V2ZW50IERlbGVnYXRpb25cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5pZCA9PT0gXCJpbmZvLXBva2ViYWxsLXRvcC1zaGlueS10b2dnbGVcIikge1xuICAgIHBva2VkZXguaGFuZGxlU2hpbnlUb2dnbGUocG9rZWRleC5jdXJyZW50UG9rZW1vbik7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tZXZvLXRvZ2dsZVwiKSB7XG4gICAgcG9rZWRleC5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxCb3R0b20pO1xuICAgIGdldEV2b2x1dGlvbnMocG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5zcGVjaWVzVXJsKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5pZCA9PT0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10b2dnbGVcIikge1xuICAgIHBva2VkZXguaGFuZGxlRG9tTW92ZXNJbmZvKHBva2VkZXguY3VycmVudFBva2Vtb25bMF0pO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJldm9sdXRpb25cIikge1xuICAgIHBva2VkZXguaW5pdCgpO1xuICAgIGdldFBva2Vtb24oZS50YXJnZXQuaWQpO1xuICB9XG59KTtcblxuLy9Bc3luYyBDb2RlXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb24oaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGlmIChkYXRhLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgcG9rZWRleC5oYW5kbGVQb2tlbW9uTm90Rm91bmQoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gICAgcG9rZWRleC5jcmVhdGVQb2tlbW9uKHJlc3BvbnNlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRFdm9sdXRpb25JbmZvKGlkZW50aWZpZXIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpZGVudGlmaWVyfWApO1xuICBpZiAoZGF0YS5zdGF0dXMgPT09IDQwNCkgcmV0dXJuO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGNvbnN0IGV2b0RhdGEgPSBbcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0LCByZXNwb25zZS5uYW1lXTtcblxuICByZXR1cm4gZXZvRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXZvbHV0aW9ucyhzcGVjaWVzVXJsKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChzcGVjaWVzVXJsKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBhd2FpdCBnZXRBbmREaXNwbGF5RXZvKHJlc3BvbnNlLmV2b2x1dGlvbl9jaGFpbi51cmwpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBbmREaXNwbGF5RXZvKGV2b0NoYWluVXJsKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChldm9DaGFpblVybCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgbGV0IGV2b2x1dGlvbkNoYWluID0gW107XG4gIGxldCBldm9EYXRhID0gcmVzcG9uc2UuY2hhaW47XG5cbiAgZG8ge1xuICAgIGV2b2x1dGlvbkNoYWluLnB1c2goZXZvRGF0YS5zcGVjaWVzLm5hbWUpO1xuXG4gICAgZXZvRGF0YSA9IGV2b0RhdGFbXCJldm9sdmVzX3RvXCJdWzBdO1xuICB9IHdoaWxlICghIWV2b0RhdGEgJiYgZXZvRGF0YS5oYXNPd25Qcm9wZXJ0eShcImV2b2x2ZXNfdG9cIikpO1xuXG4gIGlmIChwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmUubGVuZ3RoID09PSAwKSB7XG4gICAgZXZvbHV0aW9uQ2hhaW4uZm9yRWFjaCgoZXZvbHV0aW9uKSA9PlxuICAgICAgcG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lLnB1c2goZXZvbHV0aW9uKVxuICAgICk7XG4gIH1cblxuICBjb25zdCBtb3Zlc1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgbW92ZXNTcGFuLnRleHRDb250ZW50ID0gXCJTZWUgTW92ZXNcIjtcbiAgbW92ZXNTcGFuLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10b2dnbGVcIjtcbiAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQobW92ZXNTcGFuKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5sZW5ndGg7IGkrKykge1xuICAgIGxldCBldm9EYXRhID0gYXdhaXQgZ2V0RXZvbHV0aW9uSW5mbyhcbiAgICAgIGAke3Bva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZVtpXX1gXG4gICAgKTtcbiAgICBpZiAoZXZvRGF0YSkge1xuICAgICAgbGV0IGV2b0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICBldm9JbWcuc3JjID0gZXZvRGF0YVswXTtcbiAgICAgIGV2b0ltZy5pZCA9IGV2b0RhdGFbMV07XG4gICAgICBldm9JbWcuY2xhc3NOYW1lID0gXCJldm9sdXRpb25cIjtcbiAgICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKGV2b0ltZyk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25OYW1lcyhvZmZzZXQpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24/bGltaXQ9MTUxJm9mZnNldD0ke29mZnNldH1gXG4gICk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgcmVzcG9uc2UucmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcbiAgICBwb2tlZGV4LmFsbFBva2Vtb25OYW1lcy5wdXNoKHJlc3VsdC5uYW1lKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKHBva2VkZXguYWxsUG9rZW1vbk5hbWVzKTtcbiAgcG9rZWRleC5vZmZzZXQgKz0gMTUxO1xuXG4gIGlmIChwb2tlZGV4Lm9mZnNldCA+PSAxNTEpIHJldHVybjtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZ2V0UG9rZW1vbk5hbWVzKG9mZnNldCk7XG4gIH0sIDUwMDApO1xufVxuXG4vL2dldFBva2Vtb25OYW1lcyhwb2tlZGV4Lm9mZnNldCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=