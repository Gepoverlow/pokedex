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
  }

  log() {
    console.log(this.currentPokemon);
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

  handleDomMovesInfo(pokemon) {
    this.emptyNode(containerPokeballBottom);
    const movesInfoContainer = document.createElement("div");
    const movesTitle = document.createElement("h3");
    const movesList = document.createElement("ul");

    for (let i = 0; i < pokemon.moves.length; i++) {
      const movesListItem = document.createElement("li");
      movesListItem.textContent = pokemon.moves[i];
      movesList.appendChild(movesListItem);
    }

    movesTitle.textContent = "Moves:";

    movesInfoContainer.id = "info-pokeball-bottom-moves";
    movesTitle.id = "info-pokeball-bottom-moves-title";
    movesList.id = "info-pokeball-bottom-moves-list";

    movesInfoContainer.appendChild(movesTitle);
    movesInfoContainer.appendChild(movesList);

    containerPokeballBottom.appendChild(movesInfoContainer);
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
    this.sprite = response.sprites.front_default;
    this.moves = this.handleMoves(response);
    this.types = this.handleTypes(response);
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

const pokedex = new _Pokedex_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

//Event Listeners
searchPokemon.addEventListener("click", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("pokemon-search-input").value;
  pokedex.init();
  getPokemon(searchValue);
});

//Functionality
async function getPokemon(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const response = await data.json();

  pokedex.createPokemon(response);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZ0M7O0FBRWhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixnREFBTztBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnREFBZ0QsYUFBYSxJQUFJLGVBQWU7QUFDaEYsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsYUFBYSxJQUFJLGVBQWU7QUFDaEY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsa0JBQWtCLElBQUksaUJBQWlCO0FBQ3BELGFBQWEsaUJBQWlCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDcExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQiwyQkFBMkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsR0FBRztBQUN0QixNQUFNO0FBQ04sa0JBQWtCLEdBQUc7QUFDckIsTUFBTTtBQUNOLGlCQUFpQixHQUFHO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7VUM3Q3ZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNObUM7O0FBRW5DOztBQUVBLG9CQUFvQixtREFBTzs7QUFFM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGdFQUFnRSxXQUFXO0FBQzNFOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL1Bva2VkZXguanMiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9Qb2tlbW9uLmpzIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9rZW1vbiBmcm9tIFwiLi9Qb2tlbW9uXCI7XG5cbmNvbnN0IGNvbnRhaW5lckluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lci1pbmZvXCIpO1xuY29uc3QgY29udGFpbmVyUG9rZWJhbGxUb3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtdG9wXCIpO1xuY29uc3QgY29udGFpbmVyUG9rZWJhbGxCb3R0b20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtYm90dG9tXCIpO1xuXG5jb25zdCB0eXBlcyA9IFtcbiAgXCJub3JtYWxcIixcbiAgXCJmaXJlXCIsXG4gIFwid2F0ZXJcIixcbiAgXCJncmFzc1wiLFxuICBcImVsZWN0cmljXCIsXG4gIFwiaWNlXCIsXG4gIFwiZmlnaHRpbmdcIixcbiAgXCJwb2lzb25cIixcbiAgXCJncm91bmRcIixcbiAgXCJmbHlpbmdcIixcbiAgXCJwc3ljaGljXCIsXG4gIFwiYnVnXCIsXG4gIFwicm9ja1wiLFxuICBcImdob3N0XCIsXG4gIFwiZGFya1wiLFxuICBcImRyYWdvblwiLFxuICBcInN0ZWVsXCIsXG4gIFwiZmFpcnlcIixcbl07XG5cbmNvbnN0IGNvbG9ycyA9IFtcbiAgXCIjQThBODc4XCIsIC8vbm9ybWFsXG4gIFwiI0YwODAzMFwiLCAvL2ZpcmVcbiAgXCIjNjg5MEYwXCIsIC8vd2F0ZXJcbiAgXCIjNzhDODUwXCIsIC8vZ3Jhc3NcbiAgXCIjRjhEMDMwXCIsIC8vZWxlY3RyaWNcbiAgXCIjOThEOEQ4XCIsIC8vaWNlXG4gIFwiI0MwMzAyOFwiLCAvL2ZpZ2h0aW5nXG4gIFwiI0EwNDBBMFwiLCAvL3BvaXNvblxuICBcIiNFMEMwNjhcIiwgLy9ncm91bmRcbiAgXCIjQTg5MEYwXCIsIC8vZmx5aW5nXG4gIFwiI0Y4NTg4OFwiLCAvL3BzeWNoaWNcbiAgXCIjQThCODIwXCIsIC8vYnVnXG4gIFwiI0I4QTAzOFwiLCAvL3JvY2tcbiAgXCIjNzA1ODk4XCIsIC8vZ2hvc3RcbiAgXCIjNzA1ODQ4XCIsIC8vZGFya1xuICBcIiM3MDM4RjhcIiwgLy9kcmFnb25cbiAgXCIjQjhCOEQwXCIsIC8vc3RlZWxcbiAgXCIjRjBCNkJDXCIsIC8vZmFpcnlcbl07XG5cbmNvbnN0IGxpZ2h0Q29sb3JzID0gW1xuICBcIiNDM0MzQTJcIiwgLy9saWdodCBub3JtYWxcbiAgXCIjZjBBMDY3XCIsIC8vbGlnaHQgZmlyZVxuICBcIiM2OEIwRjBcIiwgLy9saWdodCB3YXRlclxuICBcIiM5N0M4N0VcIiwgLy9saWdodCBncmFzc1xuICBcIiNGN0RCNjlcIiwgLy9saWdodCBlbGVjdHJpY1xuICBcIiNCQ0RFREVcIiwgLy9saWdodCBpY2VcbiAgXCIjQzI2MTVDXCIsIC8vbGlnaHQgZmlnaHRpbmdcbiAgXCIjQTQ2NEE0XCIsIC8vbGlnaHQgcG9pc29uXG4gIFwiI0UyQ0I4RVwiLCAvL2xpZ2h0IGdyb3VuZFxuICBcIiNDNEI0RjRcIiwgLy9saWdodCBmbHlpbmdcbiAgXCIjRjk3ZkE0XCIsIC8vbGlnaHQgcHN5Y2hpY1xuICBcIiNCM0JCNjdcIiwgLy9saWdodCBidWdcbiAgXCIjQjlBQTZCXCIsIC8vbGlnaHQgcm9ja1xuICBcIiM4Mjc0OTlcIiwgLy9saWdodCBnaG9zdFxuICBcIiM3NzY5NUZcIiwgLy9saWdodCBkYXJrXG4gIFwiIzkxNjZGOVwiLCAvL2xpZ2h0IGRyYWdvblxuICBcIiNDRkNGRDVcIiwgLy9saWdodCBzdGVlbFxuICBcIiNGMUNBQ0VcIiwgLy9saWdodCBmYWlyeVxuXTtcblxuY2xhc3MgUG9rZWRleCB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBpbml0KCkge1xuICAgIHRoaXMuY3VycmVudFBva2Vtb24gPSBbXTtcbiAgfVxuXG4gIGNyZWF0ZVBva2Vtb24ocmVzcG9uc2UpIHtcbiAgICB0aGlzLnBva2Vtb24gPSBuZXcgUG9rZW1vbihyZXNwb25zZSk7XG4gICAgdGhpcy5jdXJyZW50UG9rZW1vbi5wdXNoKHRoaXMucG9rZW1vbik7XG5cbiAgICB0aGlzLmhhbmRsZUJhY2tncm91bmQodGhpcy5wb2tlbW9uLnR5cGVzKTtcbiAgICB0aGlzLmhhbmRsZURvbU1haW5JbmZvKHRoaXMucG9rZW1vbik7XG4gICAgdGhpcy5oYW5kbGVEb21Nb3Zlc0luZm8odGhpcy5wb2tlbW9uKTtcbiAgfVxuXG4gIGxvZygpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRQb2tlbW9uKTtcbiAgfVxuXG4gIGhhbmRsZUJhY2tncm91bmQodHlwaW5nKSB7XG4gICAgbGV0IGdyYWRpZW50Qmc7XG5cbiAgICBpZiAodHlwaW5nLmxlbmd0aCA9PT0gMikge1xuICAgICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgICAgbGV0IHByaW1hcnlDb2xvciA9IGNvbG9yc1tpbmRleE9uZV07XG5cbiAgICAgIGxldCBpbmRleFR3byA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzFdKTtcbiAgICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGNvbG9yc1tpbmRleFR3b107XG5cbiAgICAgIGdyYWRpZW50QmcgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3ByaW1hcnlDb2xvcn0sICR7c2Vjb25kYXJ5Q29sb3J9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpbmRleE9uZSA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzBdKTtcbiAgICAgIGxldCBwcmltYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhPbmVdO1xuXG4gICAgICBsZXQgc2Vjb25kYXJ5Q29sb3IgPSBsaWdodENvbG9yc1tpbmRleE9uZV07XG4gICAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfSlgO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckluZm8uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gZ3JhZGllbnRCZztcbiAgfVxuXG4gIGVtcHR5Tm9kZShwYXJlbnQpIHtcbiAgICB3aGlsZSAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHBhcmVudC5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURvbU1haW5JbmZvKHBva2Vtb24pIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbFRvcCk7XG4gICAgY29uc3QgYmFzaWNJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBwb2tlbW9uTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBjb25zdCBwb2tlbW9uU3ByaXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBjb25zdCBwb2tlbW9uVHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcblxuICAgIHBva2Vtb25OYW1lLnRleHRDb250ZW50ID0gcG9rZW1vbi5uYW1lO1xuICAgIHBva2Vtb25TcHJpdGUuc3JjID0gcG9rZW1vbi5zcHJpdGU7XG4gICAgcG9rZW1vblR5cGUudGV4dENvbnRlbnQgPVxuICAgICAgcG9rZW1vbi50eXBlcy5sZW5ndGggPiAxXG4gICAgICAgID8gYCR7cG9rZW1vbi50eXBlc1swXX0gLyAke3Bva2Vtb24udHlwZXNbMV19YFxuICAgICAgICA6IGAke3Bva2Vtb24udHlwZXNbMF19YDtcblxuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWNcIjtcbiAgICBwb2tlbW9uTmFtZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtbmFtZVwiO1xuICAgIHBva2Vtb25TcHJpdGUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiO1xuICAgIHBva2Vtb25UeXBlLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy10eXBlXCI7XG5cbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vbk5hbWUpO1xuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uU3ByaXRlKTtcbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblR5cGUpO1xuXG4gICAgY29udGFpbmVyUG9rZWJhbGxUb3AuYXBwZW5kQ2hpbGQoYmFzaWNJbmZvQ29udGFpbmVyKTtcbiAgfVxuXG4gIGhhbmRsZURvbU1vdmVzSW5mbyhwb2tlbW9uKSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxCb3R0b20pO1xuICAgIGNvbnN0IG1vdmVzSW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbW92ZXNUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICBjb25zdCBtb3Zlc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBva2Vtb24ubW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1vdmVzTGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICBtb3Zlc0xpc3RJdGVtLnRleHRDb250ZW50ID0gcG9rZW1vbi5tb3Zlc1tpXTtcbiAgICAgIG1vdmVzTGlzdC5hcHBlbmRDaGlsZChtb3Zlc0xpc3RJdGVtKTtcbiAgICB9XG5cbiAgICBtb3Zlc1RpdGxlLnRleHRDb250ZW50ID0gXCJNb3ZlczpcIjtcblxuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXNcIjtcbiAgICBtb3Zlc1RpdGxlLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10aXRsZVwiO1xuICAgIG1vdmVzTGlzdC5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtbGlzdFwiO1xuXG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVzVGl0bGUpO1xuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb3Zlc0xpc3QpO1xuXG4gICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQobW92ZXNJbmZvQ29udGFpbmVyKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2tlZGV4O1xuXG57XG4gIC8qIDxkaXYgaWQ9XCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlc1wiPlxuICAgICAgICAgICAgICA8aDMgaWQ9XCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10aXRsZVwiPk1vdmVzPC9oMz5cbiAgICAgICAgICAgICAgPHVsIGlkPVwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtbGlzdFwiPlxuICAgICAgICAgICAgICAgIDxsaT5BIHJhbmRvbSBBdHRhY2s8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5BIHJhbmRvbSBBdHRhY2s8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5BIHJhbmRvbSBBdHRhY2s8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5BIHJhbmRvbSBBdHRhY2s8L2xpPlxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+ICovXG59XG4iLCJjbGFzcyBQb2tlbW9uIHtcbiAgY29uc3RydWN0b3IocmVzcG9uc2UpIHtcbiAgICB0aGlzLmlkID0gdGhpcy5oYW5kbGVJZEZvcm1hdHRpbmcocmVzcG9uc2UuaWQpO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuaGFuZGxlQ2FwaXRhbGl6ZWROYW1lKHJlc3BvbnNlLm5hbWUpO1xuICAgIHRoaXMuc3ByaXRlID0gcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0O1xuICAgIHRoaXMubW92ZXMgPSB0aGlzLmhhbmRsZU1vdmVzKHJlc3BvbnNlKTtcbiAgICB0aGlzLnR5cGVzID0gdGhpcy5oYW5kbGVUeXBlcyhyZXNwb25zZSk7XG4gIH1cblxuICBoYW5kbGVNb3ZlcyhyZXNwb25zZSkge1xuICAgIGNvbnN0IG1vdmVzID0gW107XG5cbiAgICBpZiAocmVzcG9uc2UubW92ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBtb3Zlcy5wdXNoKHJlc3BvbnNlLm1vdmVzWzBdLm1vdmUubmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIG1vdmVzLnB1c2gocmVzcG9uc2UubW92ZXNbaV0ubW92ZS5uYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1vdmVzO1xuICB9XG5cbiAgaGFuZGxlVHlwZXMocmVzcG9uc2UpIHtcbiAgICBjb25zdCB0eXBlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2UudHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHR5cGVzLnB1c2gocmVzcG9uc2UudHlwZXNbaV0udHlwZS5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVzO1xuICB9XG5cbiAgaGFuZGxlQ2FwaXRhbGl6ZWROYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSk7XG4gIH1cblxuICBoYW5kbGVJZEZvcm1hdHRpbmcoaWQpIHtcbiAgICBpZiAoaWQgPiAwICYmIGlkIDwgMTApIHtcbiAgICAgIHJldHVybiBgIzAwJHtpZH1gO1xuICAgIH0gZWxzZSBpZiAoaWQgPj0gMTAgJiYgaWQgPCAxMDApIHtcbiAgICAgIHJldHVybiBgIzAke2lkfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgIyR7aWR9YDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9rZW1vbjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBva2VkZXggZnJvbSBcIi4vUG9rZWRleC5qc1wiO1xuXG5jb25zdCBzZWFyY2hQb2tlbW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1idXR0b25cIik7XG5cbmNvbnN0IHBva2VkZXggPSBuZXcgUG9rZWRleCgpO1xuXG4vL0V2ZW50IExpc3RlbmVyc1xuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIHBva2VkZXguaW5pdCgpO1xuICBnZXRQb2tlbW9uKHNlYXJjaFZhbHVlKTtcbn0pO1xuXG4vL0Z1bmN0aW9uYWxpdHlcbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb24oaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgcG9rZWRleC5jcmVhdGVQb2tlbW9uKHJlc3BvbnNlKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==