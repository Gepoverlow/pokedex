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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cGFjazovL3Bva2VkZXgvLi9zcmMvUG9rZW1vbi5qcyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBva2Vtb24gZnJvbSBcIi4vUG9rZW1vblwiO1xuXG5jb25zdCBjb250YWluZXJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXItaW5mb1wiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcFwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsQm90dG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWJvdHRvbVwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtaWRcIik7XG5jb25zdCB0eXBlcyA9IFtcbiAgXCJub3JtYWxcIixcbiAgXCJmaXJlXCIsXG4gIFwid2F0ZXJcIixcbiAgXCJncmFzc1wiLFxuICBcImVsZWN0cmljXCIsXG4gIFwiaWNlXCIsXG4gIFwiZmlnaHRpbmdcIixcbiAgXCJwb2lzb25cIixcbiAgXCJncm91bmRcIixcbiAgXCJmbHlpbmdcIixcbiAgXCJwc3ljaGljXCIsXG4gIFwiYnVnXCIsXG4gIFwicm9ja1wiLFxuICBcImdob3N0XCIsXG4gIFwiZGFya1wiLFxuICBcImRyYWdvblwiLFxuICBcInN0ZWVsXCIsXG4gIFwiZmFpcnlcIixcbl07XG5cbmNvbnN0IGNvbG9ycyA9IFtcbiAgXCIjQThBODc4XCIsIC8vbm9ybWFsXG4gIFwiI0YwODAzMFwiLCAvL2ZpcmVcbiAgXCIjNjg5MEYwXCIsIC8vd2F0ZXJcbiAgXCIjNzhDODUwXCIsIC8vZ3Jhc3NcbiAgXCIjRjhEMDMwXCIsIC8vZWxlY3RyaWNcbiAgXCIjOThEOEQ4XCIsIC8vaWNlXG4gIFwiI0MwMzAyOFwiLCAvL2ZpZ2h0aW5nXG4gIFwiI0EwNDBBMFwiLCAvL3BvaXNvblxuICBcIiNFMEMwNjhcIiwgLy9ncm91bmRcbiAgXCIjQTg5MEYwXCIsIC8vZmx5aW5nXG4gIFwiI0Y4NTg4OFwiLCAvL3BzeWNoaWNcbiAgXCIjQThCODIwXCIsIC8vYnVnXG4gIFwiI0I4QTAzOFwiLCAvL3JvY2tcbiAgXCIjNzA1ODk4XCIsIC8vZ2hvc3RcbiAgXCIjNzA1ODQ4XCIsIC8vZGFya1xuICBcIiM3MDM4RjhcIiwgLy9kcmFnb25cbiAgXCIjQjhCOEQwXCIsIC8vc3RlZWxcbiAgXCIjRjBCNkJDXCIsIC8vZmFpcnlcbl07XG5cbmNvbnN0IGxpZ2h0Q29sb3JzID0gW1xuICBcIiNDM0MzQTJcIiwgLy9saWdodCBub3JtYWxcbiAgXCIjZjBBMDY3XCIsIC8vbGlnaHQgZmlyZVxuICBcIiM2OEIwRjBcIiwgLy9saWdodCB3YXRlclxuICBcIiM5N0M4N0VcIiwgLy9saWdodCBncmFzc1xuICBcIiNGN0RCNjlcIiwgLy9saWdodCBlbGVjdHJpY1xuICBcIiNCQ0RFREVcIiwgLy9saWdodCBpY2VcbiAgXCIjQzI2MTVDXCIsIC8vbGlnaHQgZmlnaHRpbmdcbiAgXCIjQTQ2NEE0XCIsIC8vbGlnaHQgcG9pc29uXG4gIFwiI0UyQ0I4RVwiLCAvL2xpZ2h0IGdyb3VuZFxuICBcIiNDNEI0RjRcIiwgLy9saWdodCBmbHlpbmdcbiAgXCIjRjk3ZkE0XCIsIC8vbGlnaHQgcHN5Y2hpY1xuICBcIiNCM0JCNjdcIiwgLy9saWdodCBidWdcbiAgXCIjQjlBQTZCXCIsIC8vbGlnaHQgcm9ja1xuICBcIiM4Mjc0OTlcIiwgLy9saWdodCBnaG9zdFxuICBcIiM3NzY5NUZcIiwgLy9saWdodCBkYXJrXG4gIFwiIzkxNjZGOVwiLCAvL2xpZ2h0IGRyYWdvblxuICBcIiNDRkNGRDVcIiwgLy9saWdodCBzdGVlbFxuICBcIiNGMUNBQ0VcIiwgLy9saWdodCBmYWlyeVxuXTtcblxuY2xhc3MgUG9rZWRleCB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBpbml0KCkge1xuICAgIHRoaXMuY3VycmVudFBva2Vtb24gPSBbXTtcbiAgfVxuXG4gIGNyZWF0ZVBva2Vtb24ocmVzcG9uc2UpIHtcbiAgICB0aGlzLnBva2Vtb24gPSBuZXcgUG9rZW1vbihyZXNwb25zZSk7XG4gICAgdGhpcy5jdXJyZW50UG9rZW1vbi5wdXNoKHRoaXMucG9rZW1vbik7XG5cbiAgICB0aGlzLmhhbmRsZUJhY2tncm91bmQodGhpcy5wb2tlbW9uLnR5cGVzKTtcbiAgICB0aGlzLmhhbmRsZURvbU1haW5JbmZvKHRoaXMucG9rZW1vbik7XG4gICAgdGhpcy5oYW5kbGVEb21Nb3Zlc0luZm8odGhpcy5wb2tlbW9uKTtcbiAgICB0aGlzLmhhbmRsZURvbUlkSW5mbyh0aGlzLnBva2Vtb24pO1xuICB9XG5cbiAgbG9nKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFBva2Vtb24pO1xuICB9XG5cbiAgaGFuZGxlQmFja2dyb3VuZCh0eXBpbmcpIHtcbiAgICBsZXQgZ3JhZGllbnRCZztcblxuICAgIGlmICh0eXBpbmcubGVuZ3RoID09PSAyKSB7XG4gICAgICBsZXQgaW5kZXhPbmUgPSB0eXBlcy5pbmRleE9mKHR5cGluZ1swXSk7XG4gICAgICBsZXQgcHJpbWFyeUNvbG9yID0gY29sb3JzW2luZGV4T25lXTtcblxuICAgICAgbGV0IGluZGV4VHdvID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMV0pO1xuICAgICAgbGV0IHNlY29uZGFyeUNvbG9yID0gY29sb3JzW2luZGV4VHdvXTtcblxuICAgICAgZ3JhZGllbnRCZyA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7cHJpbWFyeUNvbG9yfSwgJHtzZWNvbmRhcnlDb2xvcn0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgICAgbGV0IHByaW1hcnlDb2xvciA9IGNvbG9yc1tpbmRleE9uZV07XG5cbiAgICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGxpZ2h0Q29sb3JzW2luZGV4T25lXTtcbiAgICAgIGdyYWRpZW50QmcgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3ByaW1hcnlDb2xvcn0sICR7c2Vjb25kYXJ5Q29sb3J9KWA7XG4gICAgfVxuXG4gICAgY29udGFpbmVySW5mby5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBncmFkaWVudEJnO1xuICB9XG5cbiAgZW1wdHlOb2RlKHBhcmVudCkge1xuICAgIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgcGFyZW50LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRG9tTWFpbkluZm8ocG9rZW1vbikge1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsVG9wKTtcbiAgICBjb25zdCBiYXNpY0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHBva2Vtb25OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIGNvbnN0IHBva2Vtb25TcHJpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGNvbnN0IHBva2Vtb25UeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuXG4gICAgY29uc3Qgc2hpbnlTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICBwb2tlbW9uTmFtZS50ZXh0Q29udGVudCA9IHBva2Vtb24ubmFtZTtcbiAgICBwb2tlbW9uU3ByaXRlLnNyYyA9IHBva2Vtb24uc3ByaXRlO1xuICAgIHBva2Vtb25UeXBlLnRleHRDb250ZW50ID1cbiAgICAgIHBva2Vtb24udHlwZXMubGVuZ3RoID4gMVxuICAgICAgICA/IGAke3Bva2Vtb24udHlwZXNbMF19IC8gJHtwb2tlbW9uLnR5cGVzWzFdfWBcbiAgICAgICAgOiBgJHtwb2tlbW9uLnR5cGVzWzBdfWA7XG4gICAgc2hpbnlTcGFuLnRleHRDb250ZW50ID0gXCJUb2dnbGUgU2hpbnlcIjtcblxuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWNcIjtcbiAgICBwb2tlbW9uTmFtZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtbmFtZVwiO1xuICAgIHBva2Vtb25TcHJpdGUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiO1xuICAgIHBva2Vtb25UeXBlLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy10eXBlXCI7XG4gICAgc2hpbnlTcGFuLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1zaGlueS10b2dnbGVcIjtcblxuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uTmFtZSk7XG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25TcHJpdGUpO1xuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uVHlwZSk7XG5cbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChzaGlueVNwYW4pO1xuICAgIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKGJhc2ljSW5mb0NvbnRhaW5lcik7XG4gIH1cblxuICBoYW5kbGVEb21Nb3Zlc0luZm8ocG9rZW1vbikge1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBjb25zdCBtb3Zlc0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG1vdmVzVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgY29uc3QgbW92ZXNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuXG4gICAgY29uc3QgZXZvU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2tlbW9uLm1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBtb3Zlc0xpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgbW92ZXNMaXN0SXRlbS50ZXh0Q29udGVudCA9IHBva2Vtb24ubW92ZXNbaV07XG4gICAgICBtb3Zlc0xpc3QuYXBwZW5kQ2hpbGQobW92ZXNMaXN0SXRlbSk7XG4gICAgfVxuXG4gICAgbW92ZXNUaXRsZS50ZXh0Q29udGVudCA9IFwiTW92ZXM6XCI7XG4gICAgZXZvU3Bhbi50ZXh0Q29udGVudCA9IFwiVG9nZ2xlIEV2b1wiO1xuXG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlc1wiO1xuICAgIG1vdmVzVGl0bGUuaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLXRpdGxlXCI7XG4gICAgbW92ZXNMaXN0LmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy1saXN0XCI7XG4gICAgZXZvU3Bhbi5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tZXZvLXRvZ2dsZVwiO1xuXG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVzVGl0bGUpO1xuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb3Zlc0xpc3QpO1xuXG4gICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQoZXZvU3Bhbik7XG4gICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQobW92ZXNJbmZvQ29udGFpbmVyKTtcbiAgfVxuXG4gIGhhbmRsZURvbUlkSW5mbyhwb2tlbW9uKSB7XG4gICAgY29udGFpbmVyUG9rZWJhbGxJZC50ZXh0Q29udGVudCA9IHBva2Vtb24uaWQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9rZWRleDtcblxue1xuICAvKiA8ZGl2IGlkPVwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXNcIj5cbiAgICAgICAgICAgICAgPGgzIGlkPVwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdGl0bGVcIj5Nb3ZlczwvaDM+XG4gICAgICAgICAgICAgIDx1bCBpZD1cImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLWxpc3RcIj5cbiAgICAgICAgICAgICAgICA8bGk+QSByYW5kb20gQXR0YWNrPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+QSByYW5kb20gQXR0YWNrPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+QSByYW5kb20gQXR0YWNrPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+QSByYW5kb20gQXR0YWNrPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PiAqL1xufVxuIiwiY2xhc3MgUG9rZW1vbiB7XG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5pZCA9IHRoaXMuaGFuZGxlSWRGb3JtYXR0aW5nKHJlc3BvbnNlLmlkKTtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLmhhbmRsZUNhcGl0YWxpemVkTmFtZShyZXNwb25zZS5uYW1lKTtcbiAgICB0aGlzLnNwcml0ZSA9IHJlc3BvbnNlLnNwcml0ZXMuZnJvbnRfZGVmYXVsdDtcbiAgICB0aGlzLm1vdmVzID0gdGhpcy5oYW5kbGVNb3ZlcyhyZXNwb25zZSk7XG4gICAgdGhpcy50eXBlcyA9IHRoaXMuaGFuZGxlVHlwZXMocmVzcG9uc2UpO1xuICB9XG5cbiAgaGFuZGxlTW92ZXMocmVzcG9uc2UpIHtcbiAgICBjb25zdCBtb3ZlcyA9IFtdO1xuXG4gICAgaWYgKHJlc3BvbnNlLm1vdmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1swXS5tb3ZlLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBtb3Zlcy5wdXNoKHJlc3BvbnNlLm1vdmVzW2ldLm1vdmUubmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlcztcbiAgfVxuXG4gIGhhbmRsZVR5cGVzKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgdHlwZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLnR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0eXBlcy5wdXNoKHJlc3BvbnNlLnR5cGVzW2ldLnR5cGUubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlcztcbiAgfVxuXG4gIGhhbmRsZUNhcGl0YWxpemVkTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xuICB9XG5cbiAgaGFuZGxlSWRGb3JtYXR0aW5nKGlkKSB7XG4gICAgaWYgKGlkID4gMCAmJiBpZCA8IDEwKSB7XG4gICAgICByZXR1cm4gYCMwMCR7aWR9YDtcbiAgICB9IGVsc2UgaWYgKGlkID49IDEwICYmIGlkIDwgMTAwKSB7XG4gICAgICByZXR1cm4gYCMwJHtpZH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCMke2lkfWA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBva2Vtb247XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQb2tlZGV4IGZyb20gXCIuL1Bva2VkZXguanNcIjtcblxuY29uc3Qgc2VhcmNoUG9rZW1vbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtYnV0dG9uXCIpO1xuXG5jb25zdCBwb2tlZGV4ID0gbmV3IFBva2VkZXgoKTtcblxuLy9FdmVudCBMaXN0ZW5lcnNcbnNlYXJjaFBva2Vtb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBsZXQgc2VhcmNoVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWlucHV0XCIpLnZhbHVlO1xuICBwb2tlZGV4LmluaXQoKTtcbiAgZ2V0UG9rZW1vbihzZWFyY2hWYWx1ZSk7XG59KTtcblxuLy9GdW5jdGlvbmFsaXR5XG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uKGlkZW50aWZpZXIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpZGVudGlmaWVyfWApO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIHBva2VkZXguY3JlYXRlUG9rZW1vbihyZXNwb25zZSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=