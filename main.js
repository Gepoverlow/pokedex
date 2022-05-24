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
    console.log(evoData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGdFQUFnRSxXQUFXO0FBQzNFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnRUFBZ0UsV0FBVztBQUMzRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixvREFBb0Q7QUFDdEU7QUFDQSxTQUFTLDJDQUEyQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL1Bva2VkZXguanMiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9Qb2tlbW9uLmpzIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9rZW1vbiBmcm9tIFwiLi9Qb2tlbW9uXCI7XG5cbmNvbnN0IGNvbnRhaW5lckluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lci1pbmZvXCIpO1xuY29uc3QgY29udGFpbmVyUG9rZWJhbGxUb3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtdG9wXCIpO1xuY29uc3QgY29udGFpbmVyUG9rZWJhbGxCb3R0b20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtYm90dG9tXCIpO1xuY29uc3QgY29udGFpbmVyUG9rZWJhbGxJZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC1pZFwiKTtcbmNvbnN0IHR5cGVzID0gW1xuICBcIm5vcm1hbFwiLFxuICBcImZpcmVcIixcbiAgXCJ3YXRlclwiLFxuICBcImdyYXNzXCIsXG4gIFwiZWxlY3RyaWNcIixcbiAgXCJpY2VcIixcbiAgXCJmaWdodGluZ1wiLFxuICBcInBvaXNvblwiLFxuICBcImdyb3VuZFwiLFxuICBcImZseWluZ1wiLFxuICBcInBzeWNoaWNcIixcbiAgXCJidWdcIixcbiAgXCJyb2NrXCIsXG4gIFwiZ2hvc3RcIixcbiAgXCJkYXJrXCIsXG4gIFwiZHJhZ29uXCIsXG4gIFwic3RlZWxcIixcbiAgXCJmYWlyeVwiLFxuXTtcblxuY29uc3QgY29sb3JzID0gW1xuICBcIiNBOEE4NzhcIiwgLy9ub3JtYWxcbiAgXCIjRjA4MDMwXCIsIC8vZmlyZVxuICBcIiM2ODkwRjBcIiwgLy93YXRlclxuICBcIiM3OEM4NTBcIiwgLy9ncmFzc1xuICBcIiNGOEQwMzBcIiwgLy9lbGVjdHJpY1xuICBcIiM5OEQ4RDhcIiwgLy9pY2VcbiAgXCIjQzAzMDI4XCIsIC8vZmlnaHRpbmdcbiAgXCIjQTA0MEEwXCIsIC8vcG9pc29uXG4gIFwiI0UwQzA2OFwiLCAvL2dyb3VuZFxuICBcIiNBODkwRjBcIiwgLy9mbHlpbmdcbiAgXCIjRjg1ODg4XCIsIC8vcHN5Y2hpY1xuICBcIiNBOEI4MjBcIiwgLy9idWdcbiAgXCIjQjhBMDM4XCIsIC8vcm9ja1xuICBcIiM3MDU4OThcIiwgLy9naG9zdFxuICBcIiM3MDU4NDhcIiwgLy9kYXJrXG4gIFwiIzcwMzhGOFwiLCAvL2RyYWdvblxuICBcIiNCOEI4RDBcIiwgLy9zdGVlbFxuICBcIiNGMEI2QkNcIiwgLy9mYWlyeVxuXTtcblxuY29uc3QgbGlnaHRDb2xvcnMgPSBbXG4gIFwiI0MzQzNBMlwiLCAvL2xpZ2h0IG5vcm1hbFxuICBcIiNmMEEwNjdcIiwgLy9saWdodCBmaXJlXG4gIFwiIzY4QjBGMFwiLCAvL2xpZ2h0IHdhdGVyXG4gIFwiIzk3Qzg3RVwiLCAvL2xpZ2h0IGdyYXNzXG4gIFwiI0Y3REI2OVwiLCAvL2xpZ2h0IGVsZWN0cmljXG4gIFwiI0JDREVERVwiLCAvL2xpZ2h0IGljZVxuICBcIiNDMjYxNUNcIiwgLy9saWdodCBmaWdodGluZ1xuICBcIiNBNDY0QTRcIiwgLy9saWdodCBwb2lzb25cbiAgXCIjRTJDQjhFXCIsIC8vbGlnaHQgZ3JvdW5kXG4gIFwiI0M0QjRGNFwiLCAvL2xpZ2h0IGZseWluZ1xuICBcIiNGOTdmQTRcIiwgLy9saWdodCBwc3ljaGljXG4gIFwiI0IzQkI2N1wiLCAvL2xpZ2h0IGJ1Z1xuICBcIiNCOUFBNkJcIiwgLy9saWdodCByb2NrXG4gIFwiIzgyNzQ5OVwiLCAvL2xpZ2h0IGdob3N0XG4gIFwiIzc3Njk1RlwiLCAvL2xpZ2h0IGRhcmtcbiAgXCIjOTE2NkY5XCIsIC8vbGlnaHQgZHJhZ29uXG4gIFwiI0NGQ0ZENVwiLCAvL2xpZ2h0IHN0ZWVsXG4gIFwiI0YxQ0FDRVwiLCAvL2xpZ2h0IGZhaXJ5XG5dO1xuXG5jbGFzcyBQb2tlZGV4IHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jdXJyZW50UG9rZW1vbiA9IFtdO1xuICB9XG5cbiAgY3JlYXRlUG9rZW1vbihyZXNwb25zZSkge1xuICAgIHRoaXMucG9rZW1vbiA9IG5ldyBQb2tlbW9uKHJlc3BvbnNlKTtcbiAgICB0aGlzLmN1cnJlbnRQb2tlbW9uLnB1c2godGhpcy5wb2tlbW9uKTtcblxuICAgIHRoaXMuaGFuZGxlQmFja2dyb3VuZCh0aGlzLnBva2Vtb24udHlwZXMpO1xuICAgIHRoaXMuaGFuZGxlRG9tTWFpbkluZm8odGhpcy5wb2tlbW9uKTtcbiAgICB0aGlzLmhhbmRsZURvbU1vdmVzSW5mbyh0aGlzLnBva2Vtb24pO1xuICAgIHRoaXMuaGFuZGxlRG9tSWRJbmZvKHRoaXMucG9rZW1vbik7XG4gIH1cblxuICBoYW5kbGVCYWNrZ3JvdW5kKHR5cGluZykge1xuICAgIGxldCBncmFkaWVudEJnO1xuXG4gICAgaWYgKHR5cGluZy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGxldCBpbmRleE9uZSA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzBdKTtcbiAgICAgIGxldCBwcmltYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhPbmVdO1xuXG4gICAgICBsZXQgaW5kZXhUd28gPSB0eXBlcy5pbmRleE9mKHR5cGluZ1sxXSk7XG4gICAgICBsZXQgc2Vjb25kYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhUd29dO1xuXG4gICAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaW5kZXhPbmUgPSB0eXBlcy5pbmRleE9mKHR5cGluZ1swXSk7XG4gICAgICBsZXQgcHJpbWFyeUNvbG9yID0gY29sb3JzW2luZGV4T25lXTtcblxuICAgICAgbGV0IHNlY29uZGFyeUNvbG9yID0gbGlnaHRDb2xvcnNbaW5kZXhPbmVdO1xuICAgICAgZ3JhZGllbnRCZyA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7cHJpbWFyeUNvbG9yfSwgJHtzZWNvbmRhcnlDb2xvcn0pYDtcbiAgICB9XG5cbiAgICBjb250YWluZXJJbmZvLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGdyYWRpZW50Qmc7XG4gIH1cblxuICBlbXB0eU5vZGUocGFyZW50KSB7XG4gICAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICBwYXJlbnQuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVEb21NYWluSW5mbyhwb2tlbW9uKSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxUb3ApO1xuICAgIGNvbnN0IGJhc2ljSW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcG9rZW1vbk5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgY29uc3QgcG9rZW1vblNwcml0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgY29uc3QgcG9rZW1vblR5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG5cbiAgICBjb25zdCBzaGlueVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIHBva2Vtb25OYW1lLnRleHRDb250ZW50ID0gcG9rZW1vbi5uYW1lO1xuICAgIHBva2Vtb25TcHJpdGUuc3JjID0gcG9rZW1vbi5zcHJpdGU7XG4gICAgcG9rZW1vblR5cGUudGV4dENvbnRlbnQgPVxuICAgICAgcG9rZW1vbi50eXBlcy5sZW5ndGggPiAxXG4gICAgICAgID8gYCR7cG9rZW1vbi50eXBlc1swXX0gLyAke3Bva2Vtb24udHlwZXNbMV19YFxuICAgICAgICA6IGAke3Bva2Vtb24udHlwZXNbMF19YDtcbiAgICBzaGlueVNwYW4udGV4dENvbnRlbnQgPSBcIlRvZ2dsZSBTaGlueVwiO1xuXG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpY1wiO1xuICAgIHBva2Vtb25OYW1lLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1uYW1lXCI7XG4gICAgcG9rZW1vblNwcml0ZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtaW1nXCI7XG4gICAgcG9rZW1vblR5cGUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLXR5cGVcIjtcbiAgICBzaGlueVNwYW4uaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLXNoaW55LXRvZ2dsZVwiO1xuXG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25OYW1lKTtcbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblNwcml0ZSk7XG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25UeXBlKTtcblxuICAgIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKHNoaW55U3Bhbik7XG4gICAgY29udGFpbmVyUG9rZWJhbGxUb3AuYXBwZW5kQ2hpbGQoYmFzaWNJbmZvQ29udGFpbmVyKTtcbiAgfVxuXG4gIGhhbmRsZURvbU1vdmVzSW5mbyhwb2tlbW9uKSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxCb3R0b20pO1xuICAgIGNvbnN0IG1vdmVzSW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbW92ZXNUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICBjb25zdCBtb3Zlc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG5cbiAgICBjb25zdCBldm9TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBva2Vtb24ubW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1vdmVzTGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICBtb3Zlc0xpc3RJdGVtLnRleHRDb250ZW50ID0gcG9rZW1vbi5tb3Zlc1tpXTtcbiAgICAgIG1vdmVzTGlzdC5hcHBlbmRDaGlsZChtb3Zlc0xpc3RJdGVtKTtcbiAgICB9XG5cbiAgICBtb3Zlc1RpdGxlLnRleHRDb250ZW50ID0gXCJNb3ZlczpcIjtcbiAgICBldm9TcGFuLnRleHRDb250ZW50ID0gXCJUb2dnbGUgRXZvXCI7XG5cbiAgICBtb3Zlc0luZm9Db250YWluZXIuaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzXCI7XG4gICAgbW92ZXNUaXRsZS5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdGl0bGVcIjtcbiAgICBtb3Zlc0xpc3QuaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLWxpc3RcIjtcbiAgICBldm9TcGFuLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1ldm8tdG9nZ2xlXCI7XG5cbiAgICBtb3Zlc0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQobW92ZXNUaXRsZSk7XG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVzTGlzdCk7XG5cbiAgICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChldm9TcGFuKTtcbiAgICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChtb3Zlc0luZm9Db250YWluZXIpO1xuICB9XG5cbiAgaGFuZGxlRG9tSWRJbmZvKHBva2Vtb24pIHtcbiAgICBjb250YWluZXJQb2tlYmFsbElkLnRleHRDb250ZW50ID0gcG9rZW1vbi5pZDtcbiAgfVxuXG4gIGhhbmRsZVNoaW55VG9nZ2xlKGN1cnJlbnRQb2tlbW9uKSB7XG4gICAgaWYgKGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPT09IGZhbHNlKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiKS5zcmMgPVxuICAgICAgICB0aGlzLnBva2Vtb24uc2hpbnlTcHJpdGU7XG4gICAgICBjdXJyZW50UG9rZW1vblswXS5pc1NoaW55ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIikuc3JjID1cbiAgICAgICAgdGhpcy5wb2tlbW9uLnNwcml0ZTtcbiAgICAgIGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9rZWRleDtcblxue1xuICAvKiA8ZGl2IGlkPVwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXNcIj5cbiAgICAgICAgICAgICAgPGgzIGlkPVwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdGl0bGVcIj5Nb3ZlczwvaDM+XG4gICAgICAgICAgICAgIDx1bCBpZD1cImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLWxpc3RcIj5cbiAgICAgICAgICAgICAgICA8bGk+QSByYW5kb20gQXR0YWNrPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+QSByYW5kb20gQXR0YWNrPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+QSByYW5kb20gQXR0YWNrPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+QSByYW5kb20gQXR0YWNrPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PiAqL1xufVxuIiwiY2xhc3MgUG9rZW1vbiB7XG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5pZCA9IHRoaXMuaGFuZGxlSWRGb3JtYXR0aW5nKHJlc3BvbnNlLmlkKTtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLmhhbmRsZUNhcGl0YWxpemVkTmFtZShyZXNwb25zZS5uYW1lKTtcbiAgICB0aGlzLnNwZWNpZXNVcmwgPSByZXNwb25zZS5zcGVjaWVzLnVybDtcbiAgICB0aGlzLnNwcml0ZSA9IHJlc3BvbnNlLnNwcml0ZXMuZnJvbnRfZGVmYXVsdDtcbiAgICB0aGlzLnNoaW55U3ByaXRlID0gcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9zaGlueTtcbiAgICB0aGlzLm1vdmVzID0gdGhpcy5oYW5kbGVNb3ZlcyhyZXNwb25zZSk7XG4gICAgdGhpcy50eXBlcyA9IHRoaXMuaGFuZGxlVHlwZXMocmVzcG9uc2UpO1xuICAgIHRoaXMuaXNTaGlueSA9IGZhbHNlO1xuICAgIHRoaXMuZXZvbHV0aW9uTGluZSA9IFtdO1xuICB9XG5cbiAgaGFuZGxlTW92ZXMocmVzcG9uc2UpIHtcbiAgICBjb25zdCBtb3ZlcyA9IFtdO1xuXG4gICAgaWYgKHJlc3BvbnNlLm1vdmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1swXS5tb3ZlLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBtb3Zlcy5wdXNoKHJlc3BvbnNlLm1vdmVzW2ldLm1vdmUubmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlcztcbiAgfVxuXG4gIGhhbmRsZVR5cGVzKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgdHlwZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLnR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0eXBlcy5wdXNoKHJlc3BvbnNlLnR5cGVzW2ldLnR5cGUubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlcztcbiAgfVxuXG4gIGhhbmRsZUNhcGl0YWxpemVkTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xuICB9XG5cbiAgaGFuZGxlSWRGb3JtYXR0aW5nKGlkKSB7XG4gICAgaWYgKGlkID4gMCAmJiBpZCA8IDEwKSB7XG4gICAgICByZXR1cm4gYCMwMCR7aWR9YDtcbiAgICB9IGVsc2UgaWYgKGlkID49IDEwICYmIGlkIDwgMTAwKSB7XG4gICAgICByZXR1cm4gYCMwJHtpZH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCMke2lkfWA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBva2Vtb247XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQb2tlZGV4IGZyb20gXCIuL1Bva2VkZXguanNcIjtcblxuY29uc3Qgc2VhcmNoUG9rZW1vbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtYnV0dG9uXCIpO1xuY29uc3QgY29udGFpbmVyUG9rZWJhbGxCb3R0b20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtYm90dG9tXCIpO1xuXG5jb25zdCBwb2tlZGV4ID0gbmV3IFBva2VkZXgoKTtcblxuLy9FdmVudCBMaXN0ZW5lcnNcbnNlYXJjaFBva2Vtb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBsZXQgc2VhcmNoVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWlucHV0XCIpLnZhbHVlO1xuICBwb2tlZGV4LmluaXQoKTtcbiAgZ2V0UG9rZW1vbihzZWFyY2hWYWx1ZSk7XG59KTtcblxuLy9FdmVudCBEZWxlZ2F0aW9uXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC10b3Atc2hpbnktdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmhhbmRsZVNoaW55VG9nZ2xlKHBva2VkZXguY3VycmVudFBva2Vtb24pO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImluZm8tcG9rZWJhbGwtYm90dG9tLWV2by10b2dnbGVcIikge1xuICAgIHBva2VkZXguZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBnZXRFdm9sdXRpb25zKHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uc3BlY2llc1VybCk7XG4gIH1cbn0pO1xuXG4vL0FzeW5jIENvZGVcbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb24oaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgcG9rZWRleC5jcmVhdGVQb2tlbW9uKHJlc3BvbnNlKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXZvbHV0aW9uSW5mbyhpZGVudGlmaWVyKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aWRlbnRpZmllcn1gKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBjb25zdCBldm9EYXRhID0gW3Jlc3BvbnNlLnNwcml0ZXMuZnJvbnRfZGVmYXVsdCwgcmVzcG9uc2UubmFtZV07XG4gIHJldHVybiBldm9EYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRFdm9sdXRpb25zKHNwZWNpZXNVcmwpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKHNwZWNpZXNVcmwpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGF3YWl0IGdldEFuZERpc3BsYXlFdm8ocmVzcG9uc2UuZXZvbHV0aW9uX2NoYWluLnVybCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFuZERpc3BsYXlFdm8oZXZvQ2hhaW5VcmwpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGV2b0NoYWluVXJsKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBsZXQgZXZvbHV0aW9uQ2hhaW4gPSBbXTtcbiAgbGV0IGV2b0RhdGEgPSByZXNwb25zZS5jaGFpbjtcblxuICBkbyB7XG4gICAgZXZvbHV0aW9uQ2hhaW4ucHVzaChldm9EYXRhLnNwZWNpZXMubmFtZSk7XG5cbiAgICBldm9EYXRhID0gZXZvRGF0YVtcImV2b2x2ZXNfdG9cIl1bMF07XG4gIH0gd2hpbGUgKCEhZXZvRGF0YSAmJiBldm9EYXRhLmhhc093blByb3BlcnR5KFwiZXZvbHZlc190b1wiKSk7XG5cbiAgZXZvbHV0aW9uQ2hhaW4uZm9yRWFjaCgoZXZvbHV0aW9uKSA9PlxuICAgIHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5wdXNoKGV2b2x1dGlvbilcbiAgKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5sZW5ndGg7IGkrKykge1xuICAgIGxldCBldm9EYXRhID0gYXdhaXQgZ2V0RXZvbHV0aW9uSW5mbyhcbiAgICAgIGAke3Bva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZVtpXX1gXG4gICAgKTtcbiAgICBjb25zb2xlLmxvZyhldm9EYXRhKTtcbiAgICBsZXQgZXZvSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBldm9JbWcuc3JjID0gZXZvRGF0YVswXTtcbiAgICBldm9JbWcuaWQgPSBldm9EYXRhWzFdO1xuICAgIGV2b0ltZy5jbGFzc05hbWUgPSBcImV2b2x1dGlvblwiO1xuICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKGV2b0ltZyk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==