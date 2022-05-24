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
    evoSpan.textContent = "Toggle Evo";

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pokedex);

{
  /* <div id="info-pokeball-bottom-moves">
              <h3 id="info-pokeball-bottom-moves-title">Moves</h3>
              <ul id="info-pokeball-bottom-moves-list">
                <li>A random Attack</li>
                <li>A random Attack</li>
                <li>A random Attack</li>
                <li>A random Attack</li>
              </ul>
            </div> */
}


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


const searchPokemon = document.getElementById("pokemon-search-button");
const containerPokeballBottom = document.getElementById("info-pokeball-bottom");

const pokedex = new _Pokedex_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGdFQUFnRSxXQUFXO0FBQzNFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnRUFBZ0UsV0FBVztBQUMzRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixvREFBb0Q7QUFDdEU7QUFDQSxTQUFTLDJDQUEyQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9Qb2tlZGV4LmpzIiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvUG9rZW1vbi5qcyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBva2Vtb24gZnJvbSBcIi4vUG9rZW1vblwiO1xuXG5jb25zdCBjb250YWluZXJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXItaW5mb1wiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcFwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsQm90dG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWJvdHRvbVwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtaWRcIik7XG5jb25zdCB0eXBlcyA9IFtcbiAgXCJub3JtYWxcIixcbiAgXCJmaXJlXCIsXG4gIFwid2F0ZXJcIixcbiAgXCJncmFzc1wiLFxuICBcImVsZWN0cmljXCIsXG4gIFwiaWNlXCIsXG4gIFwiZmlnaHRpbmdcIixcbiAgXCJwb2lzb25cIixcbiAgXCJncm91bmRcIixcbiAgXCJmbHlpbmdcIixcbiAgXCJwc3ljaGljXCIsXG4gIFwiYnVnXCIsXG4gIFwicm9ja1wiLFxuICBcImdob3N0XCIsXG4gIFwiZGFya1wiLFxuICBcImRyYWdvblwiLFxuICBcInN0ZWVsXCIsXG4gIFwiZmFpcnlcIixcbl07XG5cbmNvbnN0IGNvbG9ycyA9IFtcbiAgXCIjQThBODc4XCIsIC8vbm9ybWFsXG4gIFwiI0YwODAzMFwiLCAvL2ZpcmVcbiAgXCIjNjg5MEYwXCIsIC8vd2F0ZXJcbiAgXCIjNzhDODUwXCIsIC8vZ3Jhc3NcbiAgXCIjRjhEMDMwXCIsIC8vZWxlY3RyaWNcbiAgXCIjOThEOEQ4XCIsIC8vaWNlXG4gIFwiI0MwMzAyOFwiLCAvL2ZpZ2h0aW5nXG4gIFwiI0EwNDBBMFwiLCAvL3BvaXNvblxuICBcIiNFMEMwNjhcIiwgLy9ncm91bmRcbiAgXCIjQTg5MEYwXCIsIC8vZmx5aW5nXG4gIFwiI0Y4NTg4OFwiLCAvL3BzeWNoaWNcbiAgXCIjQThCODIwXCIsIC8vYnVnXG4gIFwiI0I4QTAzOFwiLCAvL3JvY2tcbiAgXCIjNzA1ODk4XCIsIC8vZ2hvc3RcbiAgXCIjNzA1ODQ4XCIsIC8vZGFya1xuICBcIiM3MDM4RjhcIiwgLy9kcmFnb25cbiAgXCIjQjhCOEQwXCIsIC8vc3RlZWxcbiAgXCIjRjBCNkJDXCIsIC8vZmFpcnlcbl07XG5cbmNvbnN0IGxpZ2h0Q29sb3JzID0gW1xuICBcIiNDM0MzQTJcIiwgLy9saWdodCBub3JtYWxcbiAgXCIjZjBBMDY3XCIsIC8vbGlnaHQgZmlyZVxuICBcIiM2OEIwRjBcIiwgLy9saWdodCB3YXRlclxuICBcIiM5N0M4N0VcIiwgLy9saWdodCBncmFzc1xuICBcIiNGN0RCNjlcIiwgLy9saWdodCBlbGVjdHJpY1xuICBcIiNCQ0RFREVcIiwgLy9saWdodCBpY2VcbiAgXCIjQzI2MTVDXCIsIC8vbGlnaHQgZmlnaHRpbmdcbiAgXCIjQTQ2NEE0XCIsIC8vbGlnaHQgcG9pc29uXG4gIFwiI0UyQ0I4RVwiLCAvL2xpZ2h0IGdyb3VuZFxuICBcIiNDNEI0RjRcIiwgLy9saWdodCBmbHlpbmdcbiAgXCIjRjk3ZkE0XCIsIC8vbGlnaHQgcHN5Y2hpY1xuICBcIiNCM0JCNjdcIiwgLy9saWdodCBidWdcbiAgXCIjQjlBQTZCXCIsIC8vbGlnaHQgcm9ja1xuICBcIiM4Mjc0OTlcIiwgLy9saWdodCBnaG9zdFxuICBcIiM3NzY5NUZcIiwgLy9saWdodCBkYXJrXG4gIFwiIzkxNjZGOVwiLCAvL2xpZ2h0IGRyYWdvblxuICBcIiNDRkNGRDVcIiwgLy9saWdodCBzdGVlbFxuICBcIiNGMUNBQ0VcIiwgLy9saWdodCBmYWlyeVxuXTtcblxuY2xhc3MgUG9rZWRleCB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBpbml0KCkge1xuICAgIHRoaXMuY3VycmVudFBva2Vtb24gPSBbXTtcbiAgfVxuXG4gIGNyZWF0ZVBva2Vtb24ocmVzcG9uc2UpIHtcbiAgICB0aGlzLnBva2Vtb24gPSBuZXcgUG9rZW1vbihyZXNwb25zZSk7XG4gICAgdGhpcy5jdXJyZW50UG9rZW1vbi5wdXNoKHRoaXMucG9rZW1vbik7XG5cbiAgICB0aGlzLmhhbmRsZUJhY2tncm91bmQodGhpcy5wb2tlbW9uLnR5cGVzKTtcbiAgICB0aGlzLmhhbmRsZURvbU1haW5JbmZvKHRoaXMucG9rZW1vbik7XG4gICAgdGhpcy5oYW5kbGVEb21Nb3Zlc0luZm8odGhpcy5wb2tlbW9uKTtcbiAgICB0aGlzLmhhbmRsZURvbUlkSW5mbyh0aGlzLnBva2Vtb24pO1xuICB9XG5cbiAgaGFuZGxlQmFja2dyb3VuZCh0eXBpbmcpIHtcbiAgICBsZXQgZ3JhZGllbnRCZztcblxuICAgIGlmICh0eXBpbmcubGVuZ3RoID09PSAyKSB7XG4gICAgICBsZXQgaW5kZXhPbmUgPSB0eXBlcy5pbmRleE9mKHR5cGluZ1swXSk7XG4gICAgICBsZXQgcHJpbWFyeUNvbG9yID0gY29sb3JzW2luZGV4T25lXTtcblxuICAgICAgbGV0IGluZGV4VHdvID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMV0pO1xuICAgICAgbGV0IHNlY29uZGFyeUNvbG9yID0gY29sb3JzW2luZGV4VHdvXTtcblxuICAgICAgZ3JhZGllbnRCZyA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7cHJpbWFyeUNvbG9yfSwgJHtzZWNvbmRhcnlDb2xvcn0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgICAgbGV0IHByaW1hcnlDb2xvciA9IGNvbG9yc1tpbmRleE9uZV07XG5cbiAgICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGxpZ2h0Q29sb3JzW2luZGV4T25lXTtcbiAgICAgIGdyYWRpZW50QmcgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3ByaW1hcnlDb2xvcn0sICR7c2Vjb25kYXJ5Q29sb3J9KWA7XG4gICAgfVxuXG4gICAgY29udGFpbmVySW5mby5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBncmFkaWVudEJnO1xuICB9XG5cbiAgZW1wdHlOb2RlKHBhcmVudCkge1xuICAgIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgcGFyZW50LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRG9tTWFpbkluZm8ocG9rZW1vbikge1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsVG9wKTtcbiAgICBjb25zdCBiYXNpY0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHBva2Vtb25OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIGNvbnN0IHBva2Vtb25TcHJpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGNvbnN0IHBva2Vtb25UeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuXG4gICAgY29uc3Qgc2hpbnlTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICBwb2tlbW9uTmFtZS50ZXh0Q29udGVudCA9IHBva2Vtb24ubmFtZTtcbiAgICBwb2tlbW9uU3ByaXRlLnNyYyA9IHBva2Vtb24uc3ByaXRlO1xuICAgIHBva2Vtb25UeXBlLnRleHRDb250ZW50ID1cbiAgICAgIHBva2Vtb24udHlwZXMubGVuZ3RoID4gMVxuICAgICAgICA/IGAke3Bva2Vtb24udHlwZXNbMF19IC8gJHtwb2tlbW9uLnR5cGVzWzFdfWBcbiAgICAgICAgOiBgJHtwb2tlbW9uLnR5cGVzWzBdfWA7XG4gICAgc2hpbnlTcGFuLnRleHRDb250ZW50ID0gXCJUb2dnbGUgU2hpbnlcIjtcblxuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWNcIjtcbiAgICBwb2tlbW9uTmFtZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtbmFtZVwiO1xuICAgIHBva2Vtb25TcHJpdGUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiO1xuICAgIHBva2Vtb25UeXBlLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy10eXBlXCI7XG4gICAgc2hpbnlTcGFuLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1zaGlueS10b2dnbGVcIjtcblxuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uTmFtZSk7XG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25TcHJpdGUpO1xuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uVHlwZSk7XG5cbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChzaGlueVNwYW4pO1xuICAgIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKGJhc2ljSW5mb0NvbnRhaW5lcik7XG4gIH1cblxuICBoYW5kbGVEb21Nb3Zlc0luZm8ocG9rZW1vbikge1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBjb25zdCBtb3Zlc0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG1vdmVzVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgY29uc3QgbW92ZXNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuXG4gICAgY29uc3QgZXZvU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2tlbW9uLm1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBtb3Zlc0xpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgbW92ZXNMaXN0SXRlbS50ZXh0Q29udGVudCA9IHBva2Vtb24ubW92ZXNbaV07XG4gICAgICBtb3Zlc0xpc3QuYXBwZW5kQ2hpbGQobW92ZXNMaXN0SXRlbSk7XG4gICAgfVxuXG4gICAgbW92ZXNUaXRsZS50ZXh0Q29udGVudCA9IFwiTW92ZXM6XCI7XG4gICAgZXZvU3Bhbi50ZXh0Q29udGVudCA9IFwiVG9nZ2xlIEV2b1wiO1xuXG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlc1wiO1xuICAgIG1vdmVzVGl0bGUuaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLXRpdGxlXCI7XG4gICAgbW92ZXNMaXN0LmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy1saXN0XCI7XG4gICAgZXZvU3Bhbi5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tZXZvLXRvZ2dsZVwiO1xuXG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVzVGl0bGUpO1xuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb3Zlc0xpc3QpO1xuXG4gICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQoZXZvU3Bhbik7XG4gICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQobW92ZXNJbmZvQ29udGFpbmVyKTtcbiAgfVxuXG4gIGhhbmRsZURvbUlkSW5mbyhwb2tlbW9uKSB7XG4gICAgY29udGFpbmVyUG9rZWJhbGxJZC50ZXh0Q29udGVudCA9IHBva2Vtb24uaWQ7XG4gIH1cblxuICBoYW5kbGVTaGlueVRvZ2dsZShjdXJyZW50UG9rZW1vbikge1xuICAgIGlmIChjdXJyZW50UG9rZW1vblswXS5pc1NoaW55ID09PSBmYWxzZSkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIikuc3JjID1cbiAgICAgICAgdGhpcy5wb2tlbW9uLnNoaW55U3ByaXRlO1xuICAgICAgY3VycmVudFBva2Vtb25bMF0uaXNTaGlueSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtaW1nXCIpLnNyYyA9XG4gICAgICAgIHRoaXMucG9rZW1vbi5zcHJpdGU7XG4gICAgICBjdXJyZW50UG9rZW1vblswXS5pc1NoaW55ID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBva2VkZXg7XG5cbntcbiAgLyogPGRpdiBpZD1cImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzXCI+XG4gICAgICAgICAgICAgIDxoMyBpZD1cImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLXRpdGxlXCI+TW92ZXM8L2gzPlxuICAgICAgICAgICAgICA8dWwgaWQ9XCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy1saXN0XCI+XG4gICAgICAgICAgICAgICAgPGxpPkEgcmFuZG9tIEF0dGFjazwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPkEgcmFuZG9tIEF0dGFjazwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPkEgcmFuZG9tIEF0dGFjazwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPkEgcmFuZG9tIEF0dGFjazwvbGk+XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj4gKi9cbn1cbiIsImNsYXNzIFBva2Vtb24ge1xuICBjb25zdHJ1Y3RvcihyZXNwb25zZSkge1xuICAgIHRoaXMuaWQgPSB0aGlzLmhhbmRsZUlkRm9ybWF0dGluZyhyZXNwb25zZS5pZCk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5oYW5kbGVDYXBpdGFsaXplZE5hbWUocmVzcG9uc2UubmFtZSk7XG4gICAgdGhpcy5zcGVjaWVzVXJsID0gcmVzcG9uc2Uuc3BlY2llcy51cmw7XG4gICAgdGhpcy5zcHJpdGUgPSByZXNwb25zZS5zcHJpdGVzLmZyb250X2RlZmF1bHQ7XG4gICAgdGhpcy5zaGlueVNwcml0ZSA9IHJlc3BvbnNlLnNwcml0ZXMuZnJvbnRfc2hpbnk7XG4gICAgdGhpcy5tb3ZlcyA9IHRoaXMuaGFuZGxlTW92ZXMocmVzcG9uc2UpO1xuICAgIHRoaXMudHlwZXMgPSB0aGlzLmhhbmRsZVR5cGVzKHJlc3BvbnNlKTtcbiAgICB0aGlzLmlzU2hpbnkgPSBmYWxzZTtcbiAgICB0aGlzLmV2b2x1dGlvbkxpbmUgPSBbXTtcbiAgfVxuXG4gIGhhbmRsZU1vdmVzKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgbW92ZXMgPSBbXTtcblxuICAgIGlmIChyZXNwb25zZS5tb3Zlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIG1vdmVzLnB1c2gocmVzcG9uc2UubW92ZXNbMF0ubW92ZS5uYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1tpXS5tb3ZlLm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW92ZXM7XG4gIH1cblxuICBoYW5kbGVUeXBlcyhyZXNwb25zZSkge1xuICAgIGNvbnN0IHR5cGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS50eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdHlwZXMucHVzaChyZXNwb25zZS50eXBlc1tpXS50eXBlLm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZXM7XG4gIH1cblxuICBoYW5kbGVDYXBpdGFsaXplZE5hbWUobmFtZSkge1xuICAgIHJldHVybiBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKTtcbiAgfVxuXG4gIGhhbmRsZUlkRm9ybWF0dGluZyhpZCkge1xuICAgIGlmIChpZCA+IDAgJiYgaWQgPCAxMCkge1xuICAgICAgcmV0dXJuIGAjMDAke2lkfWA7XG4gICAgfSBlbHNlIGlmIChpZCA+PSAxMCAmJiBpZCA8IDEwMCkge1xuICAgICAgcmV0dXJuIGAjMCR7aWR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAjJHtpZH1gO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2tlbW9uO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgUG9rZWRleCBmcm9tIFwiLi9Qb2tlZGV4LmpzXCI7XG5cbmNvbnN0IHNlYXJjaFBva2Vtb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWJ1dHRvblwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsQm90dG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWJvdHRvbVwiKTtcblxuY29uc3QgcG9rZWRleCA9IG5ldyBQb2tlZGV4KCk7XG5cbi8vRXZlbnQgTGlzdGVuZXJzXG5zZWFyY2hQb2tlbW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgbGV0IHNlYXJjaFZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1pbnB1dFwiKS52YWx1ZTtcbiAgcG9rZWRleC5pbml0KCk7XG4gIGdldFBva2Vtb24oc2VhcmNoVmFsdWUpO1xufSk7XG5cbi8vRXZlbnQgRGVsZWdhdGlvblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImluZm8tcG9rZWJhbGwtdG9wLXNoaW55LXRvZ2dsZVwiKSB7XG4gICAgcG9rZWRleC5oYW5kbGVTaGlueVRvZ2dsZShwb2tlZGV4LmN1cnJlbnRQb2tlbW9uKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5pZCA9PT0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1ldm8tdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbEJvdHRvbSk7XG4gICAgZ2V0RXZvbHV0aW9ucyhwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLnNwZWNpZXNVcmwpO1xuICB9XG59KTtcblxuLy9Bc3luYyBDb2RlXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uKGlkZW50aWZpZXIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpZGVudGlmaWVyfWApO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIHBva2VkZXguY3JlYXRlUG9rZW1vbihyZXNwb25zZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEV2b2x1dGlvbkluZm8oaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgY29uc3QgZXZvRGF0YSA9IFtyZXNwb25zZS5zcHJpdGVzLmZyb250X2RlZmF1bHQsIHJlc3BvbnNlLm5hbWVdO1xuICByZXR1cm4gZXZvRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXZvbHV0aW9ucyhzcGVjaWVzVXJsKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChzcGVjaWVzVXJsKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBhd2FpdCBnZXRBbmREaXNwbGF5RXZvKHJlc3BvbnNlLmV2b2x1dGlvbl9jaGFpbi51cmwpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBbmREaXNwbGF5RXZvKGV2b0NoYWluVXJsKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChldm9DaGFpblVybCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgbGV0IGV2b2x1dGlvbkNoYWluID0gW107XG4gIGxldCBldm9EYXRhID0gcmVzcG9uc2UuY2hhaW47XG5cbiAgZG8ge1xuICAgIGV2b2x1dGlvbkNoYWluLnB1c2goZXZvRGF0YS5zcGVjaWVzLm5hbWUpO1xuXG4gICAgZXZvRGF0YSA9IGV2b0RhdGFbXCJldm9sdmVzX3RvXCJdWzBdO1xuICB9IHdoaWxlICghIWV2b0RhdGEgJiYgZXZvRGF0YS5oYXNPd25Qcm9wZXJ0eShcImV2b2x2ZXNfdG9cIikpO1xuXG4gIGV2b2x1dGlvbkNoYWluLmZvckVhY2goKGV2b2x1dGlvbikgPT5cbiAgICBwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmUucHVzaChldm9sdXRpb24pXG4gICk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgZXZvRGF0YSA9IGF3YWl0IGdldEV2b2x1dGlvbkluZm8oXG4gICAgICBgJHtwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmVbaV19YFxuICAgICk7XG4gICAgbGV0IGV2b0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZXZvSW1nLnNyYyA9IGV2b0RhdGFbMF07XG4gICAgZXZvSW1nLmlkID0gZXZvRGF0YVsxXTtcbiAgICBldm9JbWcuY2xhc3NOYW1lID0gXCJldm9sdXRpb25cIjtcbiAgICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChldm9JbWcpO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=