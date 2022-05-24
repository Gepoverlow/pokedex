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
  constructor() {
    this.allPokemonNames = [];
    this.offset = 100;
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

async function getPokemonNames(offset) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`
  );
  const response = await data.json();

  response.results.forEach((result) => {
    pokedex.allPokemonNames.push(result.name);
  });
  console.log(pokedex.allPokemonNames);
  offset += 100;

  if (pokedex.offset >= 1126) return;
  setTimeout(() => {
    getPokemonNames(offset);
  }, 5000);
}

// getPokemonNames(pokedex.offset);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L3Bva2VkZXgvLi9zcmMvUG9rZW1vbi5qcyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBva2Vtb24gZnJvbSBcIi4vUG9rZW1vblwiO1xuXG5jb25zdCBjb250YWluZXJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXItaW5mb1wiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcFwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsQm90dG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWJvdHRvbVwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtaWRcIik7XG5jb25zdCB0eXBlcyA9IFtcbiAgXCJub3JtYWxcIixcbiAgXCJmaXJlXCIsXG4gIFwid2F0ZXJcIixcbiAgXCJncmFzc1wiLFxuICBcImVsZWN0cmljXCIsXG4gIFwiaWNlXCIsXG4gIFwiZmlnaHRpbmdcIixcbiAgXCJwb2lzb25cIixcbiAgXCJncm91bmRcIixcbiAgXCJmbHlpbmdcIixcbiAgXCJwc3ljaGljXCIsXG4gIFwiYnVnXCIsXG4gIFwicm9ja1wiLFxuICBcImdob3N0XCIsXG4gIFwiZGFya1wiLFxuICBcImRyYWdvblwiLFxuICBcInN0ZWVsXCIsXG4gIFwiZmFpcnlcIixcbl07XG5cbmNvbnN0IGNvbG9ycyA9IFtcbiAgXCIjQThBODc4XCIsIC8vbm9ybWFsXG4gIFwiI0YwODAzMFwiLCAvL2ZpcmVcbiAgXCIjNjg5MEYwXCIsIC8vd2F0ZXJcbiAgXCIjNzhDODUwXCIsIC8vZ3Jhc3NcbiAgXCIjRjhEMDMwXCIsIC8vZWxlY3RyaWNcbiAgXCIjOThEOEQ4XCIsIC8vaWNlXG4gIFwiI0MwMzAyOFwiLCAvL2ZpZ2h0aW5nXG4gIFwiI0EwNDBBMFwiLCAvL3BvaXNvblxuICBcIiNFMEMwNjhcIiwgLy9ncm91bmRcbiAgXCIjQTg5MEYwXCIsIC8vZmx5aW5nXG4gIFwiI0Y4NTg4OFwiLCAvL3BzeWNoaWNcbiAgXCIjQThCODIwXCIsIC8vYnVnXG4gIFwiI0I4QTAzOFwiLCAvL3JvY2tcbiAgXCIjNzA1ODk4XCIsIC8vZ2hvc3RcbiAgXCIjNzA1ODQ4XCIsIC8vZGFya1xuICBcIiM3MDM4RjhcIiwgLy9kcmFnb25cbiAgXCIjQjhCOEQwXCIsIC8vc3RlZWxcbiAgXCIjRjBCNkJDXCIsIC8vZmFpcnlcbl07XG5cbmNvbnN0IGxpZ2h0Q29sb3JzID0gW1xuICBcIiNDM0MzQTJcIiwgLy9saWdodCBub3JtYWxcbiAgXCIjZjBBMDY3XCIsIC8vbGlnaHQgZmlyZVxuICBcIiM2OEIwRjBcIiwgLy9saWdodCB3YXRlclxuICBcIiM5N0M4N0VcIiwgLy9saWdodCBncmFzc1xuICBcIiNGN0RCNjlcIiwgLy9saWdodCBlbGVjdHJpY1xuICBcIiNCQ0RFREVcIiwgLy9saWdodCBpY2VcbiAgXCIjQzI2MTVDXCIsIC8vbGlnaHQgZmlnaHRpbmdcbiAgXCIjQTQ2NEE0XCIsIC8vbGlnaHQgcG9pc29uXG4gIFwiI0UyQ0I4RVwiLCAvL2xpZ2h0IGdyb3VuZFxuICBcIiNDNEI0RjRcIiwgLy9saWdodCBmbHlpbmdcbiAgXCIjRjk3ZkE0XCIsIC8vbGlnaHQgcHN5Y2hpY1xuICBcIiNCM0JCNjdcIiwgLy9saWdodCBidWdcbiAgXCIjQjlBQTZCXCIsIC8vbGlnaHQgcm9ja1xuICBcIiM4Mjc0OTlcIiwgLy9saWdodCBnaG9zdFxuICBcIiM3NzY5NUZcIiwgLy9saWdodCBkYXJrXG4gIFwiIzkxNjZGOVwiLCAvL2xpZ2h0IGRyYWdvblxuICBcIiNDRkNGRDVcIiwgLy9saWdodCBzdGVlbFxuICBcIiNGMUNBQ0VcIiwgLy9saWdodCBmYWlyeVxuXTtcblxuY2xhc3MgUG9rZWRleCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWxsUG9rZW1vbk5hbWVzID0gW107XG4gICAgdGhpcy5vZmZzZXQgPSAxMDA7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY3VycmVudFBva2Vtb24gPSBbXTtcbiAgfVxuXG4gIGNyZWF0ZVBva2Vtb24ocmVzcG9uc2UpIHtcbiAgICB0aGlzLnBva2Vtb24gPSBuZXcgUG9rZW1vbihyZXNwb25zZSk7XG4gICAgdGhpcy5jdXJyZW50UG9rZW1vbi5wdXNoKHRoaXMucG9rZW1vbik7XG5cbiAgICB0aGlzLmhhbmRsZUJhY2tncm91bmQodGhpcy5wb2tlbW9uLnR5cGVzKTtcbiAgICB0aGlzLmhhbmRsZURvbU1haW5JbmZvKHRoaXMucG9rZW1vbik7XG4gICAgdGhpcy5oYW5kbGVEb21Nb3Zlc0luZm8odGhpcy5wb2tlbW9uKTtcbiAgICB0aGlzLmhhbmRsZURvbUlkSW5mbyh0aGlzLnBva2Vtb24pO1xuICB9XG5cbiAgaGFuZGxlQmFja2dyb3VuZCh0eXBpbmcpIHtcbiAgICBsZXQgZ3JhZGllbnRCZztcblxuICAgIGlmICh0eXBpbmcubGVuZ3RoID09PSAyKSB7XG4gICAgICBsZXQgaW5kZXhPbmUgPSB0eXBlcy5pbmRleE9mKHR5cGluZ1swXSk7XG4gICAgICBsZXQgcHJpbWFyeUNvbG9yID0gY29sb3JzW2luZGV4T25lXTtcblxuICAgICAgbGV0IGluZGV4VHdvID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMV0pO1xuICAgICAgbGV0IHNlY29uZGFyeUNvbG9yID0gY29sb3JzW2luZGV4VHdvXTtcblxuICAgICAgZ3JhZGllbnRCZyA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7cHJpbWFyeUNvbG9yfSwgJHtzZWNvbmRhcnlDb2xvcn0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgICAgbGV0IHByaW1hcnlDb2xvciA9IGNvbG9yc1tpbmRleE9uZV07XG5cbiAgICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGxpZ2h0Q29sb3JzW2luZGV4T25lXTtcbiAgICAgIGdyYWRpZW50QmcgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3ByaW1hcnlDb2xvcn0sICR7c2Vjb25kYXJ5Q29sb3J9KWA7XG4gICAgfVxuXG4gICAgY29udGFpbmVySW5mby5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBncmFkaWVudEJnO1xuICB9XG5cbiAgZW1wdHlOb2RlKHBhcmVudCkge1xuICAgIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgcGFyZW50LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRG9tTWFpbkluZm8ocG9rZW1vbikge1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsVG9wKTtcbiAgICBjb25zdCBiYXNpY0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHBva2Vtb25OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIGNvbnN0IHBva2Vtb25TcHJpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGNvbnN0IHBva2Vtb25UeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuXG4gICAgY29uc3Qgc2hpbnlTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICBwb2tlbW9uTmFtZS50ZXh0Q29udGVudCA9IHBva2Vtb24ubmFtZTtcbiAgICBwb2tlbW9uU3ByaXRlLnNyYyA9IHBva2Vtb24uc3ByaXRlO1xuICAgIHBva2Vtb25UeXBlLnRleHRDb250ZW50ID1cbiAgICAgIHBva2Vtb24udHlwZXMubGVuZ3RoID4gMVxuICAgICAgICA/IGAke3Bva2Vtb24udHlwZXNbMF19IC8gJHtwb2tlbW9uLnR5cGVzWzFdfWBcbiAgICAgICAgOiBgJHtwb2tlbW9uLnR5cGVzWzBdfWA7XG4gICAgc2hpbnlTcGFuLnRleHRDb250ZW50ID0gXCJUb2dnbGUgU2hpbnlcIjtcblxuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWNcIjtcbiAgICBwb2tlbW9uTmFtZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtbmFtZVwiO1xuICAgIHBva2Vtb25TcHJpdGUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiO1xuICAgIHBva2Vtb25UeXBlLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy10eXBlXCI7XG4gICAgc2hpbnlTcGFuLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1zaGlueS10b2dnbGVcIjtcblxuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uTmFtZSk7XG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25TcHJpdGUpO1xuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uVHlwZSk7XG5cbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChzaGlueVNwYW4pO1xuICAgIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKGJhc2ljSW5mb0NvbnRhaW5lcik7XG4gIH1cblxuICBoYW5kbGVEb21Nb3Zlc0luZm8ocG9rZW1vbikge1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBjb25zdCBtb3Zlc0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG1vdmVzVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgY29uc3QgbW92ZXNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuXG4gICAgY29uc3QgZXZvU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2tlbW9uLm1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBtb3Zlc0xpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgbW92ZXNMaXN0SXRlbS50ZXh0Q29udGVudCA9IHBva2Vtb24ubW92ZXNbaV07XG4gICAgICBtb3Zlc0xpc3QuYXBwZW5kQ2hpbGQobW92ZXNMaXN0SXRlbSk7XG4gICAgfVxuXG4gICAgbW92ZXNUaXRsZS50ZXh0Q29udGVudCA9IFwiTW92ZXM6XCI7XG4gICAgZXZvU3Bhbi50ZXh0Q29udGVudCA9IFwiU2VlIEV2b1wiO1xuXG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlc1wiO1xuICAgIG1vdmVzVGl0bGUuaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLXRpdGxlXCI7XG4gICAgbW92ZXNMaXN0LmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy1saXN0XCI7XG4gICAgZXZvU3Bhbi5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tZXZvLXRvZ2dsZVwiO1xuXG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVzVGl0bGUpO1xuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb3Zlc0xpc3QpO1xuXG4gICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQoZXZvU3Bhbik7XG4gICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQobW92ZXNJbmZvQ29udGFpbmVyKTtcbiAgfVxuXG4gIGhhbmRsZURvbUlkSW5mbyhwb2tlbW9uKSB7XG4gICAgY29udGFpbmVyUG9rZWJhbGxJZC50ZXh0Q29udGVudCA9IHBva2Vtb24uaWQ7XG4gIH1cblxuICBoYW5kbGVTaGlueVRvZ2dsZShjdXJyZW50UG9rZW1vbikge1xuICAgIGlmIChjdXJyZW50UG9rZW1vblswXS5pc1NoaW55ID09PSBmYWxzZSkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIikuc3JjID1cbiAgICAgICAgdGhpcy5wb2tlbW9uLnNoaW55U3ByaXRlO1xuICAgICAgY3VycmVudFBva2Vtb25bMF0uaXNTaGlueSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtaW1nXCIpLnNyYyA9XG4gICAgICAgIHRoaXMucG9rZW1vbi5zcHJpdGU7XG4gICAgICBjdXJyZW50UG9rZW1vblswXS5pc1NoaW55ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUG9rZW1vbk5vdEZvdW5kKCkge1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsVG9wKTtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbElkKTtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbEJvdHRvbSk7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiUG9rZW1vbiBub3QgZm91bmQgOmAoXCI7XG4gICAgY29udGFpbmVyUG9rZWJhbGxUb3AuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2tlZGV4O1xuIiwiY2xhc3MgUG9rZW1vbiB7XG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5pZCA9IHRoaXMuaGFuZGxlSWRGb3JtYXR0aW5nKHJlc3BvbnNlLmlkKTtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLmhhbmRsZUNhcGl0YWxpemVkTmFtZShyZXNwb25zZS5uYW1lKTtcbiAgICB0aGlzLnNwZWNpZXNVcmwgPSByZXNwb25zZS5zcGVjaWVzLnVybDtcbiAgICB0aGlzLnNwcml0ZSA9IHJlc3BvbnNlLnNwcml0ZXMuZnJvbnRfZGVmYXVsdDtcbiAgICB0aGlzLnNoaW55U3ByaXRlID0gcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9zaGlueTtcbiAgICB0aGlzLm1vdmVzID0gdGhpcy5oYW5kbGVNb3ZlcyhyZXNwb25zZSk7XG4gICAgdGhpcy50eXBlcyA9IHRoaXMuaGFuZGxlVHlwZXMocmVzcG9uc2UpO1xuICAgIHRoaXMuaXNTaGlueSA9IGZhbHNlO1xuICAgIHRoaXMuZXZvbHV0aW9uTGluZSA9IFtdO1xuICAgIHRoaXMuaXNGYXZvcml0ZSA9IGZhbHNlO1xuICB9XG5cbiAgaGFuZGxlTW92ZXMocmVzcG9uc2UpIHtcbiAgICBjb25zdCBtb3ZlcyA9IFtdO1xuXG4gICAgaWYgKHJlc3BvbnNlLm1vdmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1swXS5tb3ZlLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBtb3Zlcy5wdXNoKHJlc3BvbnNlLm1vdmVzW2ldLm1vdmUubmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlcztcbiAgfVxuXG4gIGhhbmRsZVR5cGVzKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgdHlwZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLnR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0eXBlcy5wdXNoKHJlc3BvbnNlLnR5cGVzW2ldLnR5cGUubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlcztcbiAgfVxuXG4gIGhhbmRsZUNhcGl0YWxpemVkTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xuICB9XG5cbiAgaGFuZGxlSWRGb3JtYXR0aW5nKGlkKSB7XG4gICAgaWYgKGlkID4gMCAmJiBpZCA8IDEwKSB7XG4gICAgICByZXR1cm4gYCMwMCR7aWR9YDtcbiAgICB9IGVsc2UgaWYgKGlkID49IDEwICYmIGlkIDwgMTAwKSB7XG4gICAgICByZXR1cm4gYCMwJHtpZH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCMke2lkfWA7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRmF2b3JpdGUoKSB7XG4gICAgaWYgKCF0aGlzLmlzRmF2b3JpdGUpIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRmF2b3JpdGUpIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2tlbW9uO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgUG9rZWRleCBmcm9tIFwiLi9Qb2tlZGV4LmpzXCI7XG5cbmNvbnN0IG9kZE5hbWVzID0gW1xuICBcIm1yLW1pbWVcIixcbiAgXCJkYXJtYW5pdGFuLXN0YW5kYXJkXCIsXG4gIFwiZGVveHlzLWF0dGFja1wiLFxuICBcImRlb3h5cy1kZWZlbnNlXCIsXG4gIFwiZGVveHlzLW5vcm1hbFwiLFxuICBcIndvcm1hZGFtLXBsYW50XCIsXG4gIFwibWltZS1qclwiLFxuICBcInBvcnlnb24telwiLFxuICBcImdpcmF0aW5hLWFsdGVyZWRcIixcbiAgXCJzaGF5bWluLWxhbmRcIixcbiAgXCJiYXNjdWxpbi1yZWQtc3RyaXBlZFwiLFxuICBcInRvcm5hZHVzLWluY2FybmF0ZVwiLFxuICBcInRodW5kdXJ1cy1pbmNhcm5hdGVcIixcbiAgXCJsYW5kb3J1cy1pbmNhcm5hdGVcIixcbiAgXCJrZWxkZW8tb3JkaW5hcnlcIixcbiAgXCJtZWxvZXR0YS1hcmlhXCIsXG4gIFwibWVvd3N0aWMtbWFsZVwiLFxuICBcImFlZ2lzbGFzaC1zaGllbGRcIixcbiAgXCJwdW1wa2Fib28tYXZlcmFnZVwiLFxuICBcImdvdXJnZWlzdC1hdmVyYWdlXCIsXG4gIFwienlnYXJkZS01MFwiLFxuICBcImx5Y2Fucm9jLW1pZGRheVwiLFxuICBcIndpc2hpd2FzaGktc29sb1wiLFxuICBcInR5cGUtbnVsbFwiLFxuICBcIm1pbmlvci1yZWQtbWV0ZW9yXCIsXG4gIFwibWltaWt5dS1kaXNndWlzZWRcIixcbiAgXCJqYW5nbW8tb1wiLFxuICBcImhha2Ftby1vXCIsXG4gIFwia29tbW8tb1wiLFxuICBcInRhcHUta29rb1wiLFxuICBcInRhcHUtbGVsZVwiLFxuICBcInRhcHUtYnVsdVwiLFxuICBcInRhcHUtZmluaVwiLFxuICBcInRveHRyaWNpdHktYW1wZWRcIixcbiAgXCJtci1yaW1lXCIsXG4gIFwiZWlzY3VlLWljZVwiLFxuICBcImluZGVlZGVlLW1hbGVcIixcbiAgXCJtb3JwZWtvLWZ1bGwtYmVsbHlcIixcbiAgXCJ1cnNoaWZ1LXNpbmdsZS1zdHJpa2VcIixcbiAgXCJkZW94eXMtc3BlZWRcIixcbiAgXCJ3b3JtYWRhbS1zYW5keVwiLFxuICBcIndvcm1hZGFtLXRyYXNoXCIsXG4gIFwic2hheW1pbi1za3lcIixcbiAgXCJnaXJhdGluYS1vcmlnaW5cIixcbiAgXCJyb3RvbS1oZWF0XCIsXG4gIFwicm90b20td2FzaFwiLFxuICBcInJvdG9tLWZyb3N0XCIsXG4gIFwicm90b20tZmFuXCIsXG4gIFwicm90b20tbW93XCIsXG4gIFwiY2FzdGZvcm0tc3VubnlcIixcbl07XG5cbmNvbnN0IHNlYXJjaFBva2Vtb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWJ1dHRvblwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsQm90dG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWJvdHRvbVwiKTtcblxuY29uc3QgcG9rZWRleCA9IG5ldyBQb2tlZGV4KCk7XG5cbi8vRXZlbnQgTGlzdGVuZXJzXG5zZWFyY2hQb2tlbW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgbGV0IHNlYXJjaFZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1pbnB1dFwiKS52YWx1ZTtcbiAgbGV0IHRyaW1tZWRTZWFyY2ggPSBzZWFyY2hWYWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICBpZiAodHJpbW1lZFNlYXJjaC5sZW5ndGggIT09IDApIHtcbiAgICBwb2tlZGV4LmluaXQoKTtcbiAgICBnZXRQb2tlbW9uKHRyaW1tZWRTZWFyY2gpO1xuICB9XG59KTtcblxuLy9FdmVudCBEZWxlZ2F0aW9uXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC10b3Atc2hpbnktdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmhhbmRsZVNoaW55VG9nZ2xlKHBva2VkZXguY3VycmVudFBva2Vtb24pO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImluZm8tcG9rZWJhbGwtYm90dG9tLWV2by10b2dnbGVcIikge1xuICAgIHBva2VkZXguZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBnZXRFdm9sdXRpb25zKHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uc3BlY2llc1VybCk7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmhhbmRsZURvbU1vdmVzSW5mbyhwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiZXZvbHV0aW9uXCIpIHtcbiAgICBwb2tlZGV4LmluaXQoKTtcbiAgICBnZXRQb2tlbW9uKGUudGFyZ2V0LmlkKTtcbiAgfVxufSk7XG5cbi8vQXN5bmMgQ29kZVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uKGlkZW50aWZpZXIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpZGVudGlmaWVyfWApO1xuICBpZiAoZGF0YS5zdGF0dXMgPT09IDQwNCkge1xuICAgIHBva2VkZXguaGFuZGxlUG9rZW1vbk5vdEZvdW5kKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICAgIHBva2VkZXguY3JlYXRlUG9rZW1vbihyZXNwb25zZSk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXZvbHV0aW9uSW5mbyhpZGVudGlmaWVyKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aWRlbnRpZmllcn1gKTtcbiAgaWYgKGRhdGEuc3RhdHVzID09PSA0MDQpIHJldHVybjtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBjb25zdCBldm9EYXRhID0gW3Jlc3BvbnNlLnNwcml0ZXMuZnJvbnRfZGVmYXVsdCwgcmVzcG9uc2UubmFtZV07XG5cbiAgcmV0dXJuIGV2b0RhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEV2b2x1dGlvbnMoc3BlY2llc1VybCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goc3BlY2llc1VybCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgYXdhaXQgZ2V0QW5kRGlzcGxheUV2byhyZXNwb25zZS5ldm9sdXRpb25fY2hhaW4udXJsKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QW5kRGlzcGxheUV2byhldm9DaGFpblVybCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goZXZvQ2hhaW5VcmwpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGxldCBldm9sdXRpb25DaGFpbiA9IFtdO1xuICBsZXQgZXZvRGF0YSA9IHJlc3BvbnNlLmNoYWluO1xuXG4gIGRvIHtcbiAgICBldm9sdXRpb25DaGFpbi5wdXNoKGV2b0RhdGEuc3BlY2llcy5uYW1lKTtcblxuICAgIGV2b0RhdGEgPSBldm9EYXRhW1wiZXZvbHZlc190b1wiXVswXTtcbiAgfSB3aGlsZSAoISFldm9EYXRhICYmIGV2b0RhdGEuaGFzT3duUHJvcGVydHkoXCJldm9sdmVzX3RvXCIpKTtcblxuICBpZiAocG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lLmxlbmd0aCA9PT0gMCkge1xuICAgIGV2b2x1dGlvbkNoYWluLmZvckVhY2goKGV2b2x1dGlvbikgPT5cbiAgICAgIHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5wdXNoKGV2b2x1dGlvbilcbiAgICApO1xuICB9XG5cbiAgY29uc3QgbW92ZXNTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIG1vdmVzU3Bhbi50ZXh0Q29udGVudCA9IFwiU2VlIE1vdmVzXCI7XG4gIG1vdmVzU3Bhbi5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdG9nZ2xlXCI7XG4gIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKG1vdmVzU3Bhbik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgZXZvRGF0YSA9IGF3YWl0IGdldEV2b2x1dGlvbkluZm8oXG4gICAgICBgJHtwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmVbaV19YFxuICAgICk7XG4gICAgaWYgKGV2b0RhdGEpIHtcbiAgICAgIGxldCBldm9JbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgZXZvSW1nLnNyYyA9IGV2b0RhdGFbMF07XG4gICAgICBldm9JbWcuaWQgPSBldm9EYXRhWzFdO1xuICAgICAgZXZvSW1nLmNsYXNzTmFtZSA9IFwiZXZvbHV0aW9uXCI7XG4gICAgICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChldm9JbWcpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uTmFtZXMob2Zmc2V0KSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uP2xpbWl0PTEwMCZvZmZzZXQ9JHtvZmZzZXR9YFxuICApO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIHJlc3BvbnNlLnJlc3VsdHMuZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgcG9rZWRleC5hbGxQb2tlbW9uTmFtZXMucHVzaChyZXN1bHQubmFtZSk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhwb2tlZGV4LmFsbFBva2Vtb25OYW1lcyk7XG4gIG9mZnNldCArPSAxMDA7XG5cbiAgaWYgKHBva2VkZXgub2Zmc2V0ID49IDExMjYpIHJldHVybjtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZ2V0UG9rZW1vbk5hbWVzKG9mZnNldCk7XG4gIH0sIDUwMDApO1xufVxuXG4vLyBnZXRQb2tlbW9uTmFtZXMocG9rZWRleC5vZmZzZXQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9