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
  constructor() {}

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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQixtREFBTzs7QUFFM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQSxnRUFBZ0UsV0FBVztBQUMzRTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdFQUFnRSxXQUFXO0FBQzNFO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixvREFBb0Q7QUFDdEU7QUFDQSxTQUFTLDJDQUEyQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VkZXgvLi9zcmMvUG9rZWRleC5qcyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL1Bva2Vtb24uanMiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2tlbW9uIGZyb20gXCIuL1Bva2Vtb25cIjtcblxuY29uc3QgY29udGFpbmVySW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyLWluZm9cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbFRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3BcIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbEJvdHRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC1ib3R0b21cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbElkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWlkXCIpO1xuY29uc3QgdHlwZXMgPSBbXG4gIFwibm9ybWFsXCIsXG4gIFwiZmlyZVwiLFxuICBcIndhdGVyXCIsXG4gIFwiZ3Jhc3NcIixcbiAgXCJlbGVjdHJpY1wiLFxuICBcImljZVwiLFxuICBcImZpZ2h0aW5nXCIsXG4gIFwicG9pc29uXCIsXG4gIFwiZ3JvdW5kXCIsXG4gIFwiZmx5aW5nXCIsXG4gIFwicHN5Y2hpY1wiLFxuICBcImJ1Z1wiLFxuICBcInJvY2tcIixcbiAgXCJnaG9zdFwiLFxuICBcImRhcmtcIixcbiAgXCJkcmFnb25cIixcbiAgXCJzdGVlbFwiLFxuICBcImZhaXJ5XCIsXG5dO1xuXG5jb25zdCBjb2xvcnMgPSBbXG4gIFwiI0E4QTg3OFwiLCAvL25vcm1hbFxuICBcIiNGMDgwMzBcIiwgLy9maXJlXG4gIFwiIzY4OTBGMFwiLCAvL3dhdGVyXG4gIFwiIzc4Qzg1MFwiLCAvL2dyYXNzXG4gIFwiI0Y4RDAzMFwiLCAvL2VsZWN0cmljXG4gIFwiIzk4RDhEOFwiLCAvL2ljZVxuICBcIiNDMDMwMjhcIiwgLy9maWdodGluZ1xuICBcIiNBMDQwQTBcIiwgLy9wb2lzb25cbiAgXCIjRTBDMDY4XCIsIC8vZ3JvdW5kXG4gIFwiI0E4OTBGMFwiLCAvL2ZseWluZ1xuICBcIiNGODU4ODhcIiwgLy9wc3ljaGljXG4gIFwiI0E4QjgyMFwiLCAvL2J1Z1xuICBcIiNCOEEwMzhcIiwgLy9yb2NrXG4gIFwiIzcwNTg5OFwiLCAvL2dob3N0XG4gIFwiIzcwNTg0OFwiLCAvL2RhcmtcbiAgXCIjNzAzOEY4XCIsIC8vZHJhZ29uXG4gIFwiI0I4QjhEMFwiLCAvL3N0ZWVsXG4gIFwiI0YwQjZCQ1wiLCAvL2ZhaXJ5XG5dO1xuXG5jb25zdCBsaWdodENvbG9ycyA9IFtcbiAgXCIjQzNDM0EyXCIsIC8vbGlnaHQgbm9ybWFsXG4gIFwiI2YwQTA2N1wiLCAvL2xpZ2h0IGZpcmVcbiAgXCIjNjhCMEYwXCIsIC8vbGlnaHQgd2F0ZXJcbiAgXCIjOTdDODdFXCIsIC8vbGlnaHQgZ3Jhc3NcbiAgXCIjRjdEQjY5XCIsIC8vbGlnaHQgZWxlY3RyaWNcbiAgXCIjQkNERURFXCIsIC8vbGlnaHQgaWNlXG4gIFwiI0MyNjE1Q1wiLCAvL2xpZ2h0IGZpZ2h0aW5nXG4gIFwiI0E0NjRBNFwiLCAvL2xpZ2h0IHBvaXNvblxuICBcIiNFMkNCOEVcIiwgLy9saWdodCBncm91bmRcbiAgXCIjQzRCNEY0XCIsIC8vbGlnaHQgZmx5aW5nXG4gIFwiI0Y5N2ZBNFwiLCAvL2xpZ2h0IHBzeWNoaWNcbiAgXCIjQjNCQjY3XCIsIC8vbGlnaHQgYnVnXG4gIFwiI0I5QUE2QlwiLCAvL2xpZ2h0IHJvY2tcbiAgXCIjODI3NDk5XCIsIC8vbGlnaHQgZ2hvc3RcbiAgXCIjNzc2OTVGXCIsIC8vbGlnaHQgZGFya1xuICBcIiM5MTY2RjlcIiwgLy9saWdodCBkcmFnb25cbiAgXCIjQ0ZDRkQ1XCIsIC8vbGlnaHQgc3RlZWxcbiAgXCIjRjFDQUNFXCIsIC8vbGlnaHQgZmFpcnlcbl07XG5cbmNsYXNzIFBva2VkZXgge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmN1cnJlbnRQb2tlbW9uID0gW107XG4gIH1cblxuICBjcmVhdGVQb2tlbW9uKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5wb2tlbW9uID0gbmV3IFBva2Vtb24ocmVzcG9uc2UpO1xuICAgIHRoaXMuY3VycmVudFBva2Vtb24ucHVzaCh0aGlzLnBva2Vtb24pO1xuXG4gICAgdGhpcy5oYW5kbGVCYWNrZ3JvdW5kKHRoaXMucG9rZW1vbi50eXBlcyk7XG4gICAgdGhpcy5oYW5kbGVEb21NYWluSW5mbyh0aGlzLnBva2Vtb24pO1xuICAgIHRoaXMuaGFuZGxlRG9tTW92ZXNJbmZvKHRoaXMucG9rZW1vbik7XG4gICAgdGhpcy5oYW5kbGVEb21JZEluZm8odGhpcy5wb2tlbW9uKTtcbiAgfVxuXG4gIGhhbmRsZUJhY2tncm91bmQodHlwaW5nKSB7XG4gICAgbGV0IGdyYWRpZW50Qmc7XG5cbiAgICBpZiAodHlwaW5nLmxlbmd0aCA9PT0gMikge1xuICAgICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgICAgbGV0IHByaW1hcnlDb2xvciA9IGNvbG9yc1tpbmRleE9uZV07XG5cbiAgICAgIGxldCBpbmRleFR3byA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzFdKTtcbiAgICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGNvbG9yc1tpbmRleFR3b107XG5cbiAgICAgIGdyYWRpZW50QmcgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3ByaW1hcnlDb2xvcn0sICR7c2Vjb25kYXJ5Q29sb3J9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpbmRleE9uZSA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzBdKTtcbiAgICAgIGxldCBwcmltYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhPbmVdO1xuXG4gICAgICBsZXQgc2Vjb25kYXJ5Q29sb3IgPSBsaWdodENvbG9yc1tpbmRleE9uZV07XG4gICAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfSlgO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckluZm8uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gZ3JhZGllbnRCZztcbiAgfVxuXG4gIGVtcHR5Tm9kZShwYXJlbnQpIHtcbiAgICB3aGlsZSAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHBhcmVudC5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURvbU1haW5JbmZvKHBva2Vtb24pIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbFRvcCk7XG4gICAgY29uc3QgYmFzaWNJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBwb2tlbW9uTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBjb25zdCBwb2tlbW9uU3ByaXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBjb25zdCBwb2tlbW9uVHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcblxuICAgIGNvbnN0IHNoaW55U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgcG9rZW1vbk5hbWUudGV4dENvbnRlbnQgPSBwb2tlbW9uLm5hbWU7XG4gICAgcG9rZW1vblNwcml0ZS5zcmMgPSBwb2tlbW9uLnNwcml0ZTtcbiAgICBwb2tlbW9uVHlwZS50ZXh0Q29udGVudCA9XG4gICAgICBwb2tlbW9uLnR5cGVzLmxlbmd0aCA+IDFcbiAgICAgICAgPyBgJHtwb2tlbW9uLnR5cGVzWzBdfSAvICR7cG9rZW1vbi50eXBlc1sxXX1gXG4gICAgICAgIDogYCR7cG9rZW1vbi50eXBlc1swXX1gO1xuICAgIHNoaW55U3Bhbi50ZXh0Q29udGVudCA9IFwiVG9nZ2xlIFNoaW55XCI7XG5cbiAgICBiYXNpY0luZm9Db250YWluZXIuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljXCI7XG4gICAgcG9rZW1vbk5hbWUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLW5hbWVcIjtcbiAgICBwb2tlbW9uU3ByaXRlLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIjtcbiAgICBwb2tlbW9uVHlwZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtdHlwZVwiO1xuICAgIHNoaW55U3Bhbi5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3Atc2hpbnktdG9nZ2xlXCI7XG5cbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vbk5hbWUpO1xuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uU3ByaXRlKTtcbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblR5cGUpO1xuXG4gICAgY29udGFpbmVyUG9rZWJhbGxUb3AuYXBwZW5kQ2hpbGQoc2hpbnlTcGFuKTtcbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChiYXNpY0luZm9Db250YWluZXIpO1xuICB9XG5cbiAgaGFuZGxlRG9tTW92ZXNJbmZvKHBva2Vtb24pIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbEJvdHRvbSk7XG4gICAgY29uc3QgbW92ZXNJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBtb3Zlc1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIGNvbnN0IG1vdmVzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcblxuICAgIGNvbnN0IGV2b1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9rZW1vbi5tb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbW92ZXNMaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIG1vdmVzTGlzdEl0ZW0udGV4dENvbnRlbnQgPSBwb2tlbW9uLm1vdmVzW2ldO1xuICAgICAgbW92ZXNMaXN0LmFwcGVuZENoaWxkKG1vdmVzTGlzdEl0ZW0pO1xuICAgIH1cblxuICAgIG1vdmVzVGl0bGUudGV4dENvbnRlbnQgPSBcIk1vdmVzOlwiO1xuICAgIGV2b1NwYW4udGV4dENvbnRlbnQgPSBcIlNlZSBFdm9cIjtcblxuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXNcIjtcbiAgICBtb3Zlc1RpdGxlLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10aXRsZVwiO1xuICAgIG1vdmVzTGlzdC5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtbGlzdFwiO1xuICAgIGV2b1NwYW4uaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLWV2by10b2dnbGVcIjtcblxuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb3Zlc1RpdGxlKTtcbiAgICBtb3Zlc0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQobW92ZXNMaXN0KTtcblxuICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKGV2b1NwYW4pO1xuICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKG1vdmVzSW5mb0NvbnRhaW5lcik7XG4gIH1cblxuICBoYW5kbGVEb21JZEluZm8ocG9rZW1vbikge1xuICAgIGNvbnRhaW5lclBva2ViYWxsSWQudGV4dENvbnRlbnQgPSBwb2tlbW9uLmlkO1xuICB9XG5cbiAgaGFuZGxlU2hpbnlUb2dnbGUoY3VycmVudFBva2Vtb24pIHtcbiAgICBpZiAoY3VycmVudFBva2Vtb25bMF0uaXNTaGlueSA9PT0gZmFsc2UpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtaW1nXCIpLnNyYyA9XG4gICAgICAgIHRoaXMucG9rZW1vbi5zaGlueVNwcml0ZTtcbiAgICAgIGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiKS5zcmMgPVxuICAgICAgICB0aGlzLnBva2Vtb24uc3ByaXRlO1xuICAgICAgY3VycmVudFBva2Vtb25bMF0uaXNTaGlueSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVBva2Vtb25Ob3RGb3VuZCgpIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbFRvcCk7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxJZCk7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxCb3R0b20pO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlBva2Vtb24gbm90IGZvdW5kIDpgKFwiO1xuICAgIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKGVycm9yTWVzc2FnZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9rZWRleDtcbiIsImNsYXNzIFBva2Vtb24ge1xuICBjb25zdHJ1Y3RvcihyZXNwb25zZSkge1xuICAgIHRoaXMuaWQgPSB0aGlzLmhhbmRsZUlkRm9ybWF0dGluZyhyZXNwb25zZS5pZCk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5oYW5kbGVDYXBpdGFsaXplZE5hbWUocmVzcG9uc2UubmFtZSk7XG4gICAgdGhpcy5zcGVjaWVzVXJsID0gcmVzcG9uc2Uuc3BlY2llcy51cmw7XG4gICAgdGhpcy5zcHJpdGUgPSByZXNwb25zZS5zcHJpdGVzLmZyb250X2RlZmF1bHQ7XG4gICAgdGhpcy5zaGlueVNwcml0ZSA9IHJlc3BvbnNlLnNwcml0ZXMuZnJvbnRfc2hpbnk7XG4gICAgdGhpcy5tb3ZlcyA9IHRoaXMuaGFuZGxlTW92ZXMocmVzcG9uc2UpO1xuICAgIHRoaXMudHlwZXMgPSB0aGlzLmhhbmRsZVR5cGVzKHJlc3BvbnNlKTtcbiAgICB0aGlzLmlzU2hpbnkgPSBmYWxzZTtcbiAgICB0aGlzLmV2b2x1dGlvbkxpbmUgPSBbXTtcbiAgICB0aGlzLmlzRmF2b3JpdGUgPSBmYWxzZTtcbiAgfVxuXG4gIGhhbmRsZU1vdmVzKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgbW92ZXMgPSBbXTtcblxuICAgIGlmIChyZXNwb25zZS5tb3Zlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIG1vdmVzLnB1c2gocmVzcG9uc2UubW92ZXNbMF0ubW92ZS5uYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1tpXS5tb3ZlLm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW92ZXM7XG4gIH1cblxuICBoYW5kbGVUeXBlcyhyZXNwb25zZSkge1xuICAgIGNvbnN0IHR5cGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS50eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdHlwZXMucHVzaChyZXNwb25zZS50eXBlc1tpXS50eXBlLm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZXM7XG4gIH1cblxuICBoYW5kbGVDYXBpdGFsaXplZE5hbWUobmFtZSkge1xuICAgIHJldHVybiBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKTtcbiAgfVxuXG4gIGhhbmRsZUlkRm9ybWF0dGluZyhpZCkge1xuICAgIGlmIChpZCA+IDAgJiYgaWQgPCAxMCkge1xuICAgICAgcmV0dXJuIGAjMDAke2lkfWA7XG4gICAgfSBlbHNlIGlmIChpZCA+PSAxMCAmJiBpZCA8IDEwMCkge1xuICAgICAgcmV0dXJuIGAjMCR7aWR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAjJHtpZH1gO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZhdm9yaXRlKCkge1xuICAgIGlmICghdGhpcy5pc0Zhdm9yaXRlKSB7XG4gICAgICB0aGlzLmlzRmF2b3JpdGUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0Zhdm9yaXRlKSB7XG4gICAgICB0aGlzLmlzRmF2b3JpdGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9rZW1vbjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBva2VkZXggZnJvbSBcIi4vUG9rZWRleC5qc1wiO1xuXG5jb25zdCBvZGROYW1lcyA9IFtcbiAgXCJtci1taW1lXCIsXG4gIFwiZGFybWFuaXRhbi1zdGFuZGFyZFwiLFxuICBcImRlb3h5cy1hdHRhY2tcIixcbiAgXCJkZW94eXMtZGVmZW5zZVwiLFxuICBcImRlb3h5cy1ub3JtYWxcIixcbiAgXCJ3b3JtYWRhbS1wbGFudFwiLFxuICBcIm1pbWUtanJcIixcbiAgXCJwb3J5Z29uLXpcIixcbiAgXCJnaXJhdGluYS1hbHRlcmVkXCIsXG4gIFwic2hheW1pbi1sYW5kXCIsXG4gIFwiYmFzY3VsaW4tcmVkLXN0cmlwZWRcIixcbiAgXCJ0b3JuYWR1cy1pbmNhcm5hdGVcIixcbiAgXCJ0aHVuZHVydXMtaW5jYXJuYXRlXCIsXG4gIFwibGFuZG9ydXMtaW5jYXJuYXRlXCIsXG4gIFwia2VsZGVvLW9yZGluYXJ5XCIsXG4gIFwibWVsb2V0dGEtYXJpYVwiLFxuICBcIm1lb3dzdGljLW1hbGVcIixcbiAgXCJhZWdpc2xhc2gtc2hpZWxkXCIsXG4gIFwicHVtcGthYm9vLWF2ZXJhZ2VcIixcbiAgXCJnb3VyZ2Vpc3QtYXZlcmFnZVwiLFxuICBcInp5Z2FyZGUtNTBcIixcbiAgXCJseWNhbnJvYy1taWRkYXlcIixcbiAgXCJ3aXNoaXdhc2hpLXNvbG9cIixcbiAgXCJ0eXBlLW51bGxcIixcbiAgXCJtaW5pb3ItcmVkLW1ldGVvclwiLFxuICBcIm1pbWlreXUtZGlzZ3Vpc2VkXCIsXG4gIFwiamFuZ21vLW9cIixcbiAgXCJoYWthbW8tb1wiLFxuICBcImtvbW1vLW9cIixcbiAgXCJ0YXB1LWtva29cIixcbiAgXCJ0YXB1LWxlbGVcIixcbiAgXCJ0YXB1LWJ1bHVcIixcbiAgXCJ0YXB1LWZpbmlcIixcbiAgXCJ0b3h0cmljaXR5LWFtcGVkXCIsXG4gIFwibXItcmltZVwiLFxuICBcImVpc2N1ZS1pY2VcIixcbiAgXCJpbmRlZWRlZS1tYWxlXCIsXG4gIFwibW9ycGVrby1mdWxsLWJlbGx5XCIsXG4gIFwidXJzaGlmdS1zaW5nbGUtc3RyaWtlXCIsXG4gIFwiZGVveHlzLXNwZWVkXCIsXG4gIFwid29ybWFkYW0tc2FuZHlcIixcbiAgXCJ3b3JtYWRhbS10cmFzaFwiLFxuICBcInNoYXltaW4tc2t5XCIsXG4gIFwiZ2lyYXRpbmEtb3JpZ2luXCIsXG4gIFwicm90b20taGVhdFwiLFxuICBcInJvdG9tLXdhc2hcIixcbiAgXCJyb3RvbS1mcm9zdFwiLFxuICBcInJvdG9tLWZhblwiLFxuICBcInJvdG9tLW1vd1wiLFxuICBcImNhc3Rmb3JtLXN1bm55XCIsXG5dO1xuXG5jb25zdCBzZWFyY2hQb2tlbW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1idXR0b25cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbEJvdHRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC1ib3R0b21cIik7XG5cbmNvbnN0IHBva2VkZXggPSBuZXcgUG9rZWRleCgpO1xuXG4vL0V2ZW50IExpc3RlbmVyc1xuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIGxldCB0cmltbWVkU2VhcmNoID0gc2VhcmNoVmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKHRyaW1tZWRTZWFyY2gubGVuZ3RoICE9PSAwKSB7XG4gICAgcG9rZWRleC5pbml0KCk7XG4gICAgZ2V0UG9rZW1vbih0cmltbWVkU2VhcmNoKTtcbiAgfVxufSk7XG5cbi8vRXZlbnQgRGVsZWdhdGlvblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImluZm8tcG9rZWJhbGwtdG9wLXNoaW55LXRvZ2dsZVwiKSB7XG4gICAgcG9rZWRleC5oYW5kbGVTaGlueVRvZ2dsZShwb2tlZGV4LmN1cnJlbnRQb2tlbW9uKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5pZCA9PT0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1ldm8tdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbEJvdHRvbSk7XG4gICAgZ2V0RXZvbHV0aW9ucyhwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLnNwZWNpZXNVcmwpO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLXRvZ2dsZVwiKSB7XG4gICAgcG9rZWRleC5oYW5kbGVEb21Nb3Zlc0luZm8ocG9rZWRleC5jdXJyZW50UG9rZW1vblswXSk7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImV2b2x1dGlvblwiKSB7XG4gICAgcG9rZWRleC5pbml0KCk7XG4gICAgZ2V0UG9rZW1vbihlLnRhcmdldC5pZCk7XG4gIH1cbn0pO1xuXG4vL0FzeW5jIENvZGVcblxuYXN5bmMgZnVuY3Rpb24gZ2V0UG9rZW1vbihpZGVudGlmaWVyKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aWRlbnRpZmllcn1gKTtcbiAgaWYgKGRhdGEuc3RhdHVzID09PSA0MDQpIHtcbiAgICBwb2tlZGV4LmhhbmRsZVBva2Vtb25Ob3RGb3VuZCgpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgICBwb2tlZGV4LmNyZWF0ZVBva2Vtb24ocmVzcG9uc2UpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEV2b2x1dGlvbkluZm8oaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGlmIChkYXRhLnN0YXR1cyA9PT0gNDA0KSByZXR1cm47XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgY29uc3QgZXZvRGF0YSA9IFtyZXNwb25zZS5zcHJpdGVzLmZyb250X2RlZmF1bHQsIHJlc3BvbnNlLm5hbWVdO1xuXG4gIHJldHVybiBldm9EYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRFdm9sdXRpb25zKHNwZWNpZXNVcmwpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKHNwZWNpZXNVcmwpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGF3YWl0IGdldEFuZERpc3BsYXlFdm8ocmVzcG9uc2UuZXZvbHV0aW9uX2NoYWluLnVybCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFuZERpc3BsYXlFdm8oZXZvQ2hhaW5VcmwpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGV2b0NoYWluVXJsKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBsZXQgZXZvbHV0aW9uQ2hhaW4gPSBbXTtcbiAgbGV0IGV2b0RhdGEgPSByZXNwb25zZS5jaGFpbjtcblxuICBkbyB7XG4gICAgZXZvbHV0aW9uQ2hhaW4ucHVzaChldm9EYXRhLnNwZWNpZXMubmFtZSk7XG5cbiAgICBldm9EYXRhID0gZXZvRGF0YVtcImV2b2x2ZXNfdG9cIl1bMF07XG4gIH0gd2hpbGUgKCEhZXZvRGF0YSAmJiBldm9EYXRhLmhhc093blByb3BlcnR5KFwiZXZvbHZlc190b1wiKSk7XG5cbiAgaWYgKHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5sZW5ndGggPT09IDApIHtcbiAgICBldm9sdXRpb25DaGFpbi5mb3JFYWNoKChldm9sdXRpb24pID0+XG4gICAgICBwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmUucHVzaChldm9sdXRpb24pXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IG1vdmVzU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBtb3Zlc1NwYW4udGV4dENvbnRlbnQgPSBcIlNlZSBNb3Zlc1wiO1xuICBtb3Zlc1NwYW4uaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLXRvZ2dsZVwiO1xuICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChtb3Zlc1NwYW4pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGV2b0RhdGEgPSBhd2FpdCBnZXRFdm9sdXRpb25JbmZvKFxuICAgICAgYCR7cG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lW2ldfWBcbiAgICApO1xuICAgIGlmIChldm9EYXRhKSB7XG4gICAgICBsZXQgZXZvSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgIGV2b0ltZy5zcmMgPSBldm9EYXRhWzBdO1xuICAgICAgZXZvSW1nLmlkID0gZXZvRGF0YVsxXTtcbiAgICAgIGV2b0ltZy5jbGFzc05hbWUgPSBcImV2b2x1dGlvblwiO1xuICAgICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQoZXZvSW1nKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==