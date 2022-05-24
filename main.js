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
    getAndDisplayEvoLine(pokedex.currentPokemon[0].speciesUrl);
  }
});

//Async Code
async function getPokemon(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const response = await data.json();

  pokedex.createPokemon(response);
}

async function getEvolutionsSprites(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const response = await data.json();

  return response.sprites.front_default;
}

async function getAndDisplayEvoLine(speciesUrl) {
  const data = await fetch(speciesUrl);
  const response = await data.json();

  await getEvolutions(response.evolution_chain.url);
}

async function getEvolutions(evoChainUrl) {
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
    let evoImg = document.createElement("img");
    evoImg.src = await getEvolutionsSprites(
      `${pokedex.currentPokemon[0].evolutionLine[i]}`
    );
    containerPokeballBottom.appendChild(evoImg);
  }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGdFQUFnRSxXQUFXO0FBQzNFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnRUFBZ0UsV0FBVztBQUMzRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0Isb0RBQW9EO0FBQ3RFO0FBQ0E7QUFDQSxTQUFTLDJDQUEyQztBQUNwRDtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VkZXgvLi9zcmMvUG9rZWRleC5qcyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL1Bva2Vtb24uanMiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2tlbW9uIGZyb20gXCIuL1Bva2Vtb25cIjtcblxuY29uc3QgY29udGFpbmVySW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyLWluZm9cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbFRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3BcIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbEJvdHRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC1ib3R0b21cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbElkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWlkXCIpO1xuY29uc3QgdHlwZXMgPSBbXG4gIFwibm9ybWFsXCIsXG4gIFwiZmlyZVwiLFxuICBcIndhdGVyXCIsXG4gIFwiZ3Jhc3NcIixcbiAgXCJlbGVjdHJpY1wiLFxuICBcImljZVwiLFxuICBcImZpZ2h0aW5nXCIsXG4gIFwicG9pc29uXCIsXG4gIFwiZ3JvdW5kXCIsXG4gIFwiZmx5aW5nXCIsXG4gIFwicHN5Y2hpY1wiLFxuICBcImJ1Z1wiLFxuICBcInJvY2tcIixcbiAgXCJnaG9zdFwiLFxuICBcImRhcmtcIixcbiAgXCJkcmFnb25cIixcbiAgXCJzdGVlbFwiLFxuICBcImZhaXJ5XCIsXG5dO1xuXG5jb25zdCBjb2xvcnMgPSBbXG4gIFwiI0E4QTg3OFwiLCAvL25vcm1hbFxuICBcIiNGMDgwMzBcIiwgLy9maXJlXG4gIFwiIzY4OTBGMFwiLCAvL3dhdGVyXG4gIFwiIzc4Qzg1MFwiLCAvL2dyYXNzXG4gIFwiI0Y4RDAzMFwiLCAvL2VsZWN0cmljXG4gIFwiIzk4RDhEOFwiLCAvL2ljZVxuICBcIiNDMDMwMjhcIiwgLy9maWdodGluZ1xuICBcIiNBMDQwQTBcIiwgLy9wb2lzb25cbiAgXCIjRTBDMDY4XCIsIC8vZ3JvdW5kXG4gIFwiI0E4OTBGMFwiLCAvL2ZseWluZ1xuICBcIiNGODU4ODhcIiwgLy9wc3ljaGljXG4gIFwiI0E4QjgyMFwiLCAvL2J1Z1xuICBcIiNCOEEwMzhcIiwgLy9yb2NrXG4gIFwiIzcwNTg5OFwiLCAvL2dob3N0XG4gIFwiIzcwNTg0OFwiLCAvL2RhcmtcbiAgXCIjNzAzOEY4XCIsIC8vZHJhZ29uXG4gIFwiI0I4QjhEMFwiLCAvL3N0ZWVsXG4gIFwiI0YwQjZCQ1wiLCAvL2ZhaXJ5XG5dO1xuXG5jb25zdCBsaWdodENvbG9ycyA9IFtcbiAgXCIjQzNDM0EyXCIsIC8vbGlnaHQgbm9ybWFsXG4gIFwiI2YwQTA2N1wiLCAvL2xpZ2h0IGZpcmVcbiAgXCIjNjhCMEYwXCIsIC8vbGlnaHQgd2F0ZXJcbiAgXCIjOTdDODdFXCIsIC8vbGlnaHQgZ3Jhc3NcbiAgXCIjRjdEQjY5XCIsIC8vbGlnaHQgZWxlY3RyaWNcbiAgXCIjQkNERURFXCIsIC8vbGlnaHQgaWNlXG4gIFwiI0MyNjE1Q1wiLCAvL2xpZ2h0IGZpZ2h0aW5nXG4gIFwiI0E0NjRBNFwiLCAvL2xpZ2h0IHBvaXNvblxuICBcIiNFMkNCOEVcIiwgLy9saWdodCBncm91bmRcbiAgXCIjQzRCNEY0XCIsIC8vbGlnaHQgZmx5aW5nXG4gIFwiI0Y5N2ZBNFwiLCAvL2xpZ2h0IHBzeWNoaWNcbiAgXCIjQjNCQjY3XCIsIC8vbGlnaHQgYnVnXG4gIFwiI0I5QUE2QlwiLCAvL2xpZ2h0IHJvY2tcbiAgXCIjODI3NDk5XCIsIC8vbGlnaHQgZ2hvc3RcbiAgXCIjNzc2OTVGXCIsIC8vbGlnaHQgZGFya1xuICBcIiM5MTY2RjlcIiwgLy9saWdodCBkcmFnb25cbiAgXCIjQ0ZDRkQ1XCIsIC8vbGlnaHQgc3RlZWxcbiAgXCIjRjFDQUNFXCIsIC8vbGlnaHQgZmFpcnlcbl07XG5cbmNsYXNzIFBva2VkZXgge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmN1cnJlbnRQb2tlbW9uID0gW107XG4gIH1cblxuICBjcmVhdGVQb2tlbW9uKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5wb2tlbW9uID0gbmV3IFBva2Vtb24ocmVzcG9uc2UpO1xuICAgIHRoaXMuY3VycmVudFBva2Vtb24ucHVzaCh0aGlzLnBva2Vtb24pO1xuXG4gICAgdGhpcy5oYW5kbGVCYWNrZ3JvdW5kKHRoaXMucG9rZW1vbi50eXBlcyk7XG4gICAgdGhpcy5oYW5kbGVEb21NYWluSW5mbyh0aGlzLnBva2Vtb24pO1xuICAgIHRoaXMuaGFuZGxlRG9tTW92ZXNJbmZvKHRoaXMucG9rZW1vbik7XG4gICAgdGhpcy5oYW5kbGVEb21JZEluZm8odGhpcy5wb2tlbW9uKTtcbiAgfVxuXG4gIGhhbmRsZUJhY2tncm91bmQodHlwaW5nKSB7XG4gICAgbGV0IGdyYWRpZW50Qmc7XG5cbiAgICBpZiAodHlwaW5nLmxlbmd0aCA9PT0gMikge1xuICAgICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgICAgbGV0IHByaW1hcnlDb2xvciA9IGNvbG9yc1tpbmRleE9uZV07XG5cbiAgICAgIGxldCBpbmRleFR3byA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzFdKTtcbiAgICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGNvbG9yc1tpbmRleFR3b107XG5cbiAgICAgIGdyYWRpZW50QmcgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3ByaW1hcnlDb2xvcn0sICR7c2Vjb25kYXJ5Q29sb3J9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpbmRleE9uZSA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzBdKTtcbiAgICAgIGxldCBwcmltYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhPbmVdO1xuXG4gICAgICBsZXQgc2Vjb25kYXJ5Q29sb3IgPSBsaWdodENvbG9yc1tpbmRleE9uZV07XG4gICAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfSlgO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckluZm8uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gZ3JhZGllbnRCZztcbiAgfVxuXG4gIGVtcHR5Tm9kZShwYXJlbnQpIHtcbiAgICB3aGlsZSAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHBhcmVudC5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURvbU1haW5JbmZvKHBva2Vtb24pIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbFRvcCk7XG4gICAgY29uc3QgYmFzaWNJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBwb2tlbW9uTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBjb25zdCBwb2tlbW9uU3ByaXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBjb25zdCBwb2tlbW9uVHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcblxuICAgIGNvbnN0IHNoaW55U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgcG9rZW1vbk5hbWUudGV4dENvbnRlbnQgPSBwb2tlbW9uLm5hbWU7XG4gICAgcG9rZW1vblNwcml0ZS5zcmMgPSBwb2tlbW9uLnNwcml0ZTtcbiAgICBwb2tlbW9uVHlwZS50ZXh0Q29udGVudCA9XG4gICAgICBwb2tlbW9uLnR5cGVzLmxlbmd0aCA+IDFcbiAgICAgICAgPyBgJHtwb2tlbW9uLnR5cGVzWzBdfSAvICR7cG9rZW1vbi50eXBlc1sxXX1gXG4gICAgICAgIDogYCR7cG9rZW1vbi50eXBlc1swXX1gO1xuICAgIHNoaW55U3Bhbi50ZXh0Q29udGVudCA9IFwiVG9nZ2xlIFNoaW55XCI7XG5cbiAgICBiYXNpY0luZm9Db250YWluZXIuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljXCI7XG4gICAgcG9rZW1vbk5hbWUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLW5hbWVcIjtcbiAgICBwb2tlbW9uU3ByaXRlLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIjtcbiAgICBwb2tlbW9uVHlwZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtdHlwZVwiO1xuICAgIHNoaW55U3Bhbi5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3Atc2hpbnktdG9nZ2xlXCI7XG5cbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vbk5hbWUpO1xuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uU3ByaXRlKTtcbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblR5cGUpO1xuXG4gICAgY29udGFpbmVyUG9rZWJhbGxUb3AuYXBwZW5kQ2hpbGQoc2hpbnlTcGFuKTtcbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChiYXNpY0luZm9Db250YWluZXIpO1xuICB9XG5cbiAgaGFuZGxlRG9tTW92ZXNJbmZvKHBva2Vtb24pIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbEJvdHRvbSk7XG4gICAgY29uc3QgbW92ZXNJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBtb3Zlc1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIGNvbnN0IG1vdmVzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcblxuICAgIGNvbnN0IGV2b1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9rZW1vbi5tb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbW92ZXNMaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIG1vdmVzTGlzdEl0ZW0udGV4dENvbnRlbnQgPSBwb2tlbW9uLm1vdmVzW2ldO1xuICAgICAgbW92ZXNMaXN0LmFwcGVuZENoaWxkKG1vdmVzTGlzdEl0ZW0pO1xuICAgIH1cblxuICAgIG1vdmVzVGl0bGUudGV4dENvbnRlbnQgPSBcIk1vdmVzOlwiO1xuICAgIGV2b1NwYW4udGV4dENvbnRlbnQgPSBcIlRvZ2dsZSBFdm9cIjtcblxuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXNcIjtcbiAgICBtb3Zlc1RpdGxlLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10aXRsZVwiO1xuICAgIG1vdmVzTGlzdC5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtbGlzdFwiO1xuICAgIGV2b1NwYW4uaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLWV2by10b2dnbGVcIjtcblxuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb3Zlc1RpdGxlKTtcbiAgICBtb3Zlc0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQobW92ZXNMaXN0KTtcblxuICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKGV2b1NwYW4pO1xuICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKG1vdmVzSW5mb0NvbnRhaW5lcik7XG4gIH1cblxuICBoYW5kbGVEb21JZEluZm8ocG9rZW1vbikge1xuICAgIGNvbnRhaW5lclBva2ViYWxsSWQudGV4dENvbnRlbnQgPSBwb2tlbW9uLmlkO1xuICB9XG5cbiAgaGFuZGxlU2hpbnlUb2dnbGUoY3VycmVudFBva2Vtb24pIHtcbiAgICBpZiAoY3VycmVudFBva2Vtb25bMF0uaXNTaGlueSA9PT0gZmFsc2UpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtaW1nXCIpLnNyYyA9XG4gICAgICAgIHRoaXMucG9rZW1vbi5zaGlueVNwcml0ZTtcbiAgICAgIGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiKS5zcmMgPVxuICAgICAgICB0aGlzLnBva2Vtb24uc3ByaXRlO1xuICAgICAgY3VycmVudFBva2Vtb25bMF0uaXNTaGlueSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2tlZGV4O1xuXG57XG4gIC8qIDxkaXYgaWQ9XCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlc1wiPlxuICAgICAgICAgICAgICA8aDMgaWQ9XCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10aXRsZVwiPk1vdmVzPC9oMz5cbiAgICAgICAgICAgICAgPHVsIGlkPVwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtbGlzdFwiPlxuICAgICAgICAgICAgICAgIDxsaT5BIHJhbmRvbSBBdHRhY2s8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5BIHJhbmRvbSBBdHRhY2s8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5BIHJhbmRvbSBBdHRhY2s8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5BIHJhbmRvbSBBdHRhY2s8L2xpPlxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+ICovXG59XG4iLCJjbGFzcyBQb2tlbW9uIHtcbiAgY29uc3RydWN0b3IocmVzcG9uc2UpIHtcbiAgICB0aGlzLmlkID0gdGhpcy5oYW5kbGVJZEZvcm1hdHRpbmcocmVzcG9uc2UuaWQpO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuaGFuZGxlQ2FwaXRhbGl6ZWROYW1lKHJlc3BvbnNlLm5hbWUpO1xuICAgIHRoaXMuc3BlY2llc1VybCA9IHJlc3BvbnNlLnNwZWNpZXMudXJsO1xuICAgIHRoaXMuc3ByaXRlID0gcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0O1xuICAgIHRoaXMuc2hpbnlTcHJpdGUgPSByZXNwb25zZS5zcHJpdGVzLmZyb250X3NoaW55O1xuICAgIHRoaXMubW92ZXMgPSB0aGlzLmhhbmRsZU1vdmVzKHJlc3BvbnNlKTtcbiAgICB0aGlzLnR5cGVzID0gdGhpcy5oYW5kbGVUeXBlcyhyZXNwb25zZSk7XG4gICAgdGhpcy5pc1NoaW55ID0gZmFsc2U7XG4gICAgdGhpcy5ldm9sdXRpb25MaW5lID0gW107XG4gIH1cblxuICBoYW5kbGVNb3ZlcyhyZXNwb25zZSkge1xuICAgIGNvbnN0IG1vdmVzID0gW107XG5cbiAgICBpZiAocmVzcG9uc2UubW92ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBtb3Zlcy5wdXNoKHJlc3BvbnNlLm1vdmVzWzBdLm1vdmUubmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIG1vdmVzLnB1c2gocmVzcG9uc2UubW92ZXNbaV0ubW92ZS5uYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1vdmVzO1xuICB9XG5cbiAgaGFuZGxlVHlwZXMocmVzcG9uc2UpIHtcbiAgICBjb25zdCB0eXBlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2UudHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHR5cGVzLnB1c2gocmVzcG9uc2UudHlwZXNbaV0udHlwZS5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVzO1xuICB9XG5cbiAgaGFuZGxlQ2FwaXRhbGl6ZWROYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSk7XG4gIH1cblxuICBoYW5kbGVJZEZvcm1hdHRpbmcoaWQpIHtcbiAgICBpZiAoaWQgPiAwICYmIGlkIDwgMTApIHtcbiAgICAgIHJldHVybiBgIzAwJHtpZH1gO1xuICAgIH0gZWxzZSBpZiAoaWQgPj0gMTAgJiYgaWQgPCAxMDApIHtcbiAgICAgIHJldHVybiBgIzAke2lkfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgIyR7aWR9YDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9rZW1vbjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBva2VkZXggZnJvbSBcIi4vUG9rZWRleC5qc1wiO1xuXG5jb25zdCBzZWFyY2hQb2tlbW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1idXR0b25cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbEJvdHRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC1ib3R0b21cIik7XG5cbmNvbnN0IHBva2VkZXggPSBuZXcgUG9rZWRleCgpO1xuXG4vL0V2ZW50IExpc3RlbmVyc1xuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIHBva2VkZXguaW5pdCgpO1xuICBnZXRQb2tlbW9uKHNlYXJjaFZhbHVlKTtcbn0pO1xuXG4vL0V2ZW50IERlbGVnYXRpb25cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5pZCA9PT0gXCJpbmZvLXBva2ViYWxsLXRvcC1zaGlueS10b2dnbGVcIikge1xuICAgIHBva2VkZXguaGFuZGxlU2hpbnlUb2dnbGUocG9rZWRleC5jdXJyZW50UG9rZW1vbik7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tZXZvLXRvZ2dsZVwiKSB7XG4gICAgcG9rZWRleC5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxCb3R0b20pO1xuICAgIGdldEFuZERpc3BsYXlFdm9MaW5lKHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uc3BlY2llc1VybCk7XG4gIH1cbn0pO1xuXG4vL0FzeW5jIENvZGVcbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb24oaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgcG9rZWRleC5jcmVhdGVQb2tlbW9uKHJlc3BvbnNlKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXZvbHV0aW9uc1Nwcml0ZXMoaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgcmV0dXJuIHJlc3BvbnNlLnNwcml0ZXMuZnJvbnRfZGVmYXVsdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QW5kRGlzcGxheUV2b0xpbmUoc3BlY2llc1VybCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goc3BlY2llc1VybCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgYXdhaXQgZ2V0RXZvbHV0aW9ucyhyZXNwb25zZS5ldm9sdXRpb25fY2hhaW4udXJsKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXZvbHV0aW9ucyhldm9DaGFpblVybCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goZXZvQ2hhaW5VcmwpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGxldCBldm9sdXRpb25DaGFpbiA9IFtdO1xuICBsZXQgZXZvRGF0YSA9IHJlc3BvbnNlLmNoYWluO1xuXG4gIGRvIHtcbiAgICBldm9sdXRpb25DaGFpbi5wdXNoKGV2b0RhdGEuc3BlY2llcy5uYW1lKTtcblxuICAgIGV2b0RhdGEgPSBldm9EYXRhW1wiZXZvbHZlc190b1wiXVswXTtcbiAgfSB3aGlsZSAoISFldm9EYXRhICYmIGV2b0RhdGEuaGFzT3duUHJvcGVydHkoXCJldm9sdmVzX3RvXCIpKTtcblxuICBldm9sdXRpb25DaGFpbi5mb3JFYWNoKChldm9sdXRpb24pID0+XG4gICAgcG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lLnB1c2goZXZvbHV0aW9uKVxuICApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGV2b0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZXZvSW1nLnNyYyA9IGF3YWl0IGdldEV2b2x1dGlvbnNTcHJpdGVzKFxuICAgICAgYCR7cG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lW2ldfWBcbiAgICApO1xuICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKGV2b0ltZyk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==