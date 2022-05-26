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
      document.getElementById("info-pokeball-top-basic-img").src = this.pokemon.shinySprite;

      currentPokemon[0].isShiny = true;
    } else {
      document.getElementById("info-pokeball-top-basic-img").src = this.pokemon.sprite;
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
    this.filteredPokemons = this.allPokemonNames.filter((name) => name.includes(input));
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

    if (response.moves.length === 0) {
      console.log("moves not found"); //
    } else if (response.moves.length === 1) {
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


const searchInput = document.getElementById("pokemon-search-input");
const searchPokemon = document.getElementById("pokemon-search-button");
const containerPokeballBottom = document.getElementById("info-pokeball-bottom");
const containerSuggestions = document.getElementById("pokemon-search-autocomplete");

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

  await handleEvolutionData(response.evolution_chain.url);
  await displayEvolutions();
}

async function handleEvolutionData(chainUrl) {
  const data = await fetch(chainUrl);
  const response = await data.json();

  let evolutionChain = [];
  let evoData = response.chain;

  do {
    let baseString = evoData.species.url;
    let splicedString = baseString.slice(42, baseString.length - 1);

    evolutionChain.push({
      name: evoData.species.name,
      id: splicedString,
    });

    if (evoData.evolves_to.length > 1) {
      for (let i = 0; i < evoData.evolves_to.length; i++) {
        let baseString = evoData.evolves_to[i].species.url;
        let splicedString = baseString.slice(42, baseString.length - 1);

        evolutionChain.push({ name: evoData.evolves_to[i].species.name, id: splicedString });

        if (evoData.evolves_to[i].evolves_to.length > 0) {
          let baseStringDupe = evoData.evolves_to[i].evolves_to[0].species.url;
          let splicedStringDupe = baseStringDupe.slice(42, baseString.length - 1);

          evolutionChain.push({
            name: evoData.evolves_to[i].evolves_to[0].species.name,
            id: splicedStringDupe,
          });
        }
      }
    }

    evoData = evoData["evolves_to"][0];
  } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

  let removedDuplicates = removeDuplicateObjects(evolutionChain);
  console.log(removedDuplicates);
  if (pokedex.currentPokemon[0].evolutionLine.length === 0) {
    removedDuplicates.forEach((evolution) =>
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
    let evoData = await getEvolutionData(`${pokedex.currentPokemon[0].evolutionLine[i].id}`);
    if (evoData) {
      let evoImg = document.createElement("img");
      evoImg.src = evoData[0];
      evoImg.id = evoData[1];
      evoImg.className = "evolution";
      containerPokeballBottom.appendChild(evoImg);
    }
  }
}

function removeDuplicateObjects(array) {
  return [...new Set(array.map((s) => JSON.stringify(s)))].map((s) => JSON.parse(s));
}

async function getPokemonNames(offset) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=${offset}`);
  const response = await data.json();

  response.results.forEach((result) => {
    pokedex.allPokemonNames.push(result.name);
  });
  pokedex.offset += 151;

  if (pokedex.offset >= 1200) return;
  setTimeout(() => {
    getPokemonNames(pokedex.offset);
  }, 1000);
}
//getPokemonNames(pokedex.offset);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ3hGOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL1Bva2VkZXguanMiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9Qb2tlbW9uLmpzIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9rZW1vbiBmcm9tIFwiLi9Qb2tlbW9uXCI7XG5cbmNvbnN0IGNvbnRhaW5lckluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lci1pbmZvXCIpO1xuY29uc3QgY29udGFpbmVyUG9rZWJhbGxUb3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtdG9wXCIpO1xuY29uc3QgY29udGFpbmVyUG9rZWJhbGxCb3R0b20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtYm90dG9tXCIpO1xuY29uc3QgY29udGFpbmVyUG9rZWJhbGxJZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC1pZFwiKTtcblxuY29uc3QgYXV0b0NvbXBsZXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1hdXRvY29tcGxldGVcIik7XG5cbmNvbnN0IHR5cGVzID0gW1xuICBcIm5vcm1hbFwiLFxuICBcImZpcmVcIixcbiAgXCJ3YXRlclwiLFxuICBcImdyYXNzXCIsXG4gIFwiZWxlY3RyaWNcIixcbiAgXCJpY2VcIixcbiAgXCJmaWdodGluZ1wiLFxuICBcInBvaXNvblwiLFxuICBcImdyb3VuZFwiLFxuICBcImZseWluZ1wiLFxuICBcInBzeWNoaWNcIixcbiAgXCJidWdcIixcbiAgXCJyb2NrXCIsXG4gIFwiZ2hvc3RcIixcbiAgXCJkYXJrXCIsXG4gIFwiZHJhZ29uXCIsXG4gIFwic3RlZWxcIixcbiAgXCJmYWlyeVwiLFxuXTtcblxuY29uc3QgY29sb3JzID0gW1xuICBcIiNBOEE4NzhcIiwgLy9ub3JtYWxcbiAgXCIjRjA4MDMwXCIsIC8vZmlyZVxuICBcIiM2ODkwRjBcIiwgLy93YXRlclxuICBcIiM3OEM4NTBcIiwgLy9ncmFzc1xuICBcIiNGOEQwMzBcIiwgLy9lbGVjdHJpY1xuICBcIiM5OEQ4RDhcIiwgLy9pY2VcbiAgXCIjQzAzMDI4XCIsIC8vZmlnaHRpbmdcbiAgXCIjQTA0MEEwXCIsIC8vcG9pc29uXG4gIFwiI0UwQzA2OFwiLCAvL2dyb3VuZFxuICBcIiNBODkwRjBcIiwgLy9mbHlpbmdcbiAgXCIjRjg1ODg4XCIsIC8vcHN5Y2hpY1xuICBcIiNBOEI4MjBcIiwgLy9idWdcbiAgXCIjQjhBMDM4XCIsIC8vcm9ja1xuICBcIiM3MDU4OThcIiwgLy9naG9zdFxuICBcIiM3MDU4NDhcIiwgLy9kYXJrXG4gIFwiIzcwMzhGOFwiLCAvL2RyYWdvblxuICBcIiNCOEI4RDBcIiwgLy9zdGVlbFxuICBcIiNGMEI2QkNcIiwgLy9mYWlyeVxuXTtcblxuY29uc3QgbGlnaHRDb2xvcnMgPSBbXG4gIFwiI0MzQzNBMlwiLCAvL2xpZ2h0IG5vcm1hbFxuICBcIiNmMEEwNjdcIiwgLy9saWdodCBmaXJlXG4gIFwiIzY4QjBGMFwiLCAvL2xpZ2h0IHdhdGVyXG4gIFwiIzk3Qzg3RVwiLCAvL2xpZ2h0IGdyYXNzXG4gIFwiI0Y3REI2OVwiLCAvL2xpZ2h0IGVsZWN0cmljXG4gIFwiI0JDREVERVwiLCAvL2xpZ2h0IGljZVxuICBcIiNDMjYxNUNcIiwgLy9saWdodCBmaWdodGluZ1xuICBcIiNBNDY0QTRcIiwgLy9saWdodCBwb2lzb25cbiAgXCIjRTJDQjhFXCIsIC8vbGlnaHQgZ3JvdW5kXG4gIFwiI0M0QjRGNFwiLCAvL2xpZ2h0IGZseWluZ1xuICBcIiNGOTdmQTRcIiwgLy9saWdodCBwc3ljaGljXG4gIFwiI0IzQkI2N1wiLCAvL2xpZ2h0IGJ1Z1xuICBcIiNCOUFBNkJcIiwgLy9saWdodCByb2NrXG4gIFwiIzgyNzQ5OVwiLCAvL2xpZ2h0IGdob3N0XG4gIFwiIzc3Njk1RlwiLCAvL2xpZ2h0IGRhcmtcbiAgXCIjOTE2NkY5XCIsIC8vbGlnaHQgZHJhZ29uXG4gIFwiI0NGQ0ZENVwiLCAvL2xpZ2h0IHN0ZWVsXG4gIFwiI0YxQ0FDRVwiLCAvL2xpZ2h0IGZhaXJ5XG5dO1xuXG5jbGFzcyBQb2tlZGV4IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hbGxQb2tlbW9uTmFtZXMgPSBbXTtcbiAgICB0aGlzLmZpbHRlcmVkUG9rZW1vbnMgPSBbXTtcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY3VycmVudFBva2Vtb24gPSBbXTtcbiAgfVxuXG4gIGNyZWF0ZVBva2Vtb24ocmVzcG9uc2UpIHtcbiAgICB0aGlzLnBva2Vtb24gPSBuZXcgUG9rZW1vbihyZXNwb25zZSk7XG4gICAgdGhpcy5jdXJyZW50UG9rZW1vbi5wdXNoKHRoaXMucG9rZW1vbik7XG5cbiAgICB0aGlzLmhhbmRsZUJhY2tncm91bmQodGhpcy5wb2tlbW9uLnR5cGVzKTtcbiAgICB0aGlzLmhhbmRsZURvbU1haW5JbmZvKHRoaXMucG9rZW1vbik7XG4gICAgdGhpcy5oYW5kbGVEb21Nb3Zlc0luZm8odGhpcy5wb2tlbW9uKTtcbiAgICB0aGlzLmhhbmRsZURvbUlkSW5mbyh0aGlzLnBva2Vtb24pO1xuICB9XG5cbiAgaGFuZGxlQmFja2dyb3VuZCh0eXBpbmcpIHtcbiAgICBsZXQgZ3JhZGllbnRCZztcblxuICAgIGlmICh0eXBpbmcubGVuZ3RoID09PSAyKSB7XG4gICAgICBsZXQgaW5kZXhPbmUgPSB0eXBlcy5pbmRleE9mKHR5cGluZ1swXSk7XG4gICAgICBsZXQgcHJpbWFyeUNvbG9yID0gY29sb3JzW2luZGV4T25lXTtcblxuICAgICAgbGV0IGluZGV4VHdvID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMV0pO1xuICAgICAgbGV0IHNlY29uZGFyeUNvbG9yID0gY29sb3JzW2luZGV4VHdvXTtcblxuICAgICAgZ3JhZGllbnRCZyA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7cHJpbWFyeUNvbG9yfSwgJHtzZWNvbmRhcnlDb2xvcn0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgICAgbGV0IHByaW1hcnlDb2xvciA9IGNvbG9yc1tpbmRleE9uZV07XG5cbiAgICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGxpZ2h0Q29sb3JzW2luZGV4T25lXTtcbiAgICAgIGdyYWRpZW50QmcgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3ByaW1hcnlDb2xvcn0sICR7c2Vjb25kYXJ5Q29sb3J9KWA7XG4gICAgfVxuXG4gICAgY29udGFpbmVySW5mby5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBncmFkaWVudEJnO1xuICB9XG5cbiAgZW1wdHlOb2RlKHBhcmVudCkge1xuICAgIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgcGFyZW50LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRG9tTWFpbkluZm8ocG9rZW1vbikge1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsVG9wKTtcbiAgICBjb25zdCBiYXNpY0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHBva2Vtb25OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIGNvbnN0IHBva2Vtb25TcHJpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGNvbnN0IHBva2Vtb25UeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuXG4gICAgY29uc3Qgc2hpbnlTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICBwb2tlbW9uTmFtZS50ZXh0Q29udGVudCA9IHBva2Vtb24ubmFtZTtcbiAgICBwb2tlbW9uU3ByaXRlLnNyYyA9IHBva2Vtb24uc3ByaXRlO1xuICAgIHBva2Vtb25UeXBlLnRleHRDb250ZW50ID1cbiAgICAgIHBva2Vtb24udHlwZXMubGVuZ3RoID4gMVxuICAgICAgICA/IGAke3Bva2Vtb24udHlwZXNbMF19IC8gJHtwb2tlbW9uLnR5cGVzWzFdfWBcbiAgICAgICAgOiBgJHtwb2tlbW9uLnR5cGVzWzBdfWA7XG4gICAgc2hpbnlTcGFuLnRleHRDb250ZW50ID0gXCJUb2dnbGUgU2hpbnlcIjtcblxuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWNcIjtcbiAgICBwb2tlbW9uTmFtZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtbmFtZVwiO1xuICAgIHBva2Vtb25TcHJpdGUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiO1xuICAgIHBva2Vtb25UeXBlLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy10eXBlXCI7XG4gICAgc2hpbnlTcGFuLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1zaGlueS10b2dnbGVcIjtcblxuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uTmFtZSk7XG4gICAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25TcHJpdGUpO1xuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uVHlwZSk7XG5cbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChzaGlueVNwYW4pO1xuICAgIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKGJhc2ljSW5mb0NvbnRhaW5lcik7XG4gIH1cblxuICBoYW5kbGVEb21Nb3Zlc0luZm8ocG9rZW1vbikge1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBjb25zdCBtb3Zlc0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG1vdmVzVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgY29uc3QgbW92ZXNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuXG4gICAgY29uc3QgZXZvU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2tlbW9uLm1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBtb3Zlc0xpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgbW92ZXNMaXN0SXRlbS50ZXh0Q29udGVudCA9IHBva2Vtb24ubW92ZXNbaV07XG4gICAgICBtb3Zlc0xpc3QuYXBwZW5kQ2hpbGQobW92ZXNMaXN0SXRlbSk7XG4gICAgfVxuXG4gICAgbW92ZXNUaXRsZS50ZXh0Q29udGVudCA9IFwiTW92ZXM6XCI7XG4gICAgZXZvU3Bhbi50ZXh0Q29udGVudCA9IFwiU2VlIEV2b1wiO1xuXG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlc1wiO1xuICAgIG1vdmVzVGl0bGUuaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLXRpdGxlXCI7XG4gICAgbW92ZXNMaXN0LmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy1saXN0XCI7XG4gICAgZXZvU3Bhbi5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tZXZvLXRvZ2dsZVwiO1xuXG4gICAgbW92ZXNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVzVGl0bGUpO1xuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb3Zlc0xpc3QpO1xuXG4gICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQoZXZvU3Bhbik7XG4gICAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQobW92ZXNJbmZvQ29udGFpbmVyKTtcbiAgfVxuXG4gIGhhbmRsZURvbUlkSW5mbyhwb2tlbW9uKSB7XG4gICAgY29udGFpbmVyUG9rZWJhbGxJZC50ZXh0Q29udGVudCA9IHBva2Vtb24uaWQ7XG4gIH1cblxuICBoYW5kbGVTaGlueVRvZ2dsZShjdXJyZW50UG9rZW1vbikge1xuICAgIGlmIChjdXJyZW50UG9rZW1vblswXS5pc1NoaW55ID09PSBmYWxzZSkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIikuc3JjID0gdGhpcy5wb2tlbW9uLnNoaW55U3ByaXRlO1xuXG4gICAgICBjdXJyZW50UG9rZW1vblswXS5pc1NoaW55ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIikuc3JjID0gdGhpcy5wb2tlbW9uLnNwcml0ZTtcbiAgICAgIGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVQb2tlbW9uTm90Rm91bmQoKSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxUb3ApO1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsSWQpO1xuICAgIHRoaXMuZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJQb2tlbW9uIG5vdCBmb3VuZCA6YChcIjtcbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2UpO1xuICB9XG5cbiAgZmlsdGVyUG9rZW1vbnMoaW5wdXQpIHtcbiAgICB0aGlzLmZpbHRlcmVkUG9rZW1vbnMgPSB0aGlzLmFsbFBva2Vtb25OYW1lcy5maWx0ZXIoKG5hbWUpID0+IG5hbWUuaW5jbHVkZXMoaW5wdXQpKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIHRoaXMuZGlzcGxheUZpbHRlcmVkUG9rZW1vbnModGhpcy5maWx0ZXJlZFBva2Vtb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbXB0eU5vZGUoYXV0b0NvbXBsZXRlKTtcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5RmlsdGVyZWRQb2tlbW9ucyhmaWx0ZXJlZEFycmF5KSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoYXV0b0NvbXBsZXRlKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyZWRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICBsaS50ZXh0Q29udGVudCA9IGZpbHRlcmVkQXJyYXlbaV07XG4gICAgICBsaS5jbGFzc05hbWUgPSBcImF1dG8tc2VhcmNoLXN1Z2dlc3Rpb25cIjtcbiAgICAgIGF1dG9Db21wbGV0ZS5hcHBlbmRDaGlsZChsaSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBva2VkZXg7XG4iLCJjbGFzcyBQb2tlbW9uIHtcbiAgY29uc3RydWN0b3IocmVzcG9uc2UpIHtcbiAgICB0aGlzLmlkID0gdGhpcy5oYW5kbGVJZEZvcm1hdHRpbmcocmVzcG9uc2UuaWQpO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuaGFuZGxlQ2FwaXRhbGl6ZWROYW1lKHJlc3BvbnNlLm5hbWUpO1xuICAgIHRoaXMuc3BlY2llc1VybCA9IHJlc3BvbnNlLnNwZWNpZXMudXJsO1xuICAgIHRoaXMuc3ByaXRlID0gcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0O1xuICAgIHRoaXMuc2hpbnlTcHJpdGUgPSByZXNwb25zZS5zcHJpdGVzLmZyb250X3NoaW55O1xuICAgIHRoaXMubW92ZXMgPSB0aGlzLmhhbmRsZU1vdmVzKHJlc3BvbnNlKTtcbiAgICB0aGlzLnR5cGVzID0gdGhpcy5oYW5kbGVUeXBlcyhyZXNwb25zZSk7XG4gICAgdGhpcy5pc1NoaW55ID0gZmFsc2U7XG4gICAgdGhpcy5ldm9sdXRpb25MaW5lID0gW107XG4gICAgdGhpcy5pc0Zhdm9yaXRlID0gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVNb3ZlcyhyZXNwb25zZSkge1xuICAgIGNvbnN0IG1vdmVzID0gW107XG5cbiAgICBpZiAocmVzcG9uc2UubW92ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm1vdmVzIG5vdCBmb3VuZFwiKTsgLy9cbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLm1vdmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1swXS5tb3ZlLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBtb3Zlcy5wdXNoKHJlc3BvbnNlLm1vdmVzW2ldLm1vdmUubmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlcztcbiAgfVxuXG4gIGhhbmRsZVR5cGVzKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgdHlwZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLnR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0eXBlcy5wdXNoKHJlc3BvbnNlLnR5cGVzW2ldLnR5cGUubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlcztcbiAgfVxuXG4gIGhhbmRsZUNhcGl0YWxpemVkTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xuICB9XG5cbiAgaGFuZGxlSWRGb3JtYXR0aW5nKGlkKSB7XG4gICAgaWYgKGlkID4gMCAmJiBpZCA8IDEwKSB7XG4gICAgICByZXR1cm4gYCMwMCR7aWR9YDtcbiAgICB9IGVsc2UgaWYgKGlkID49IDEwICYmIGlkIDwgMTAwKSB7XG4gICAgICByZXR1cm4gYCMwJHtpZH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCMke2lkfWA7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRmF2b3JpdGUoKSB7XG4gICAgaWYgKCF0aGlzLmlzRmF2b3JpdGUpIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRmF2b3JpdGUpIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2tlbW9uO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgUG9rZWRleCBmcm9tIFwiLi9Qb2tlZGV4LmpzXCI7XG5cbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1pbnB1dFwiKTtcbmNvbnN0IHNlYXJjaFBva2Vtb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWJ1dHRvblwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsQm90dG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWJvdHRvbVwiKTtcbmNvbnN0IGNvbnRhaW5lclN1Z2dlc3Rpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1hdXRvY29tcGxldGVcIik7XG5cbmNvbnN0IHBva2VkZXggPSBuZXcgUG9rZWRleCgpO1xuXG4vL0V2ZW50IExpc3RlbmVyc1xuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIGxldCB0cmltbWVkU2VhcmNoID0gc2VhcmNoVmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKHRyaW1tZWRTZWFyY2gubGVuZ3RoICE9PSAwKSB7XG4gICAgcG9rZWRleC5pbml0KCk7XG4gICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIGdldFBva2Vtb24odHJpbW1lZFNlYXJjaCk7XG4gIH1cbn0pO1xuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICBsZXQgc2VhcmNoSW5wdXRWYWx1ZSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICBsZXQgdGFpbG9yZWRJbnB1dFZhbHVlID0gc2VhcmNoSW5wdXRWYWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICBwb2tlZGV4LmZpbHRlclBva2Vtb25zKHRhaWxvcmVkSW5wdXRWYWx1ZSk7XG59KTtcblxuLy9FdmVudCBEZWxlZ2F0aW9uXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC10b3Atc2hpbnktdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmhhbmRsZVNoaW55VG9nZ2xlKHBva2VkZXguY3VycmVudFBva2Vtb24pO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImluZm8tcG9rZWJhbGwtYm90dG9tLWV2by10b2dnbGVcIikge1xuICAgIHBva2VkZXguZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBnZXRFdm9sdXRpb25zKHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uc3BlY2llc1VybCk7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmhhbmRsZURvbU1vdmVzSW5mbyhwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiZXZvbHV0aW9uXCIpIHtcbiAgICBwb2tlZGV4LmluaXQoKTtcbiAgICBnZXRQb2tlbW9uKGUudGFyZ2V0LmlkKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiYXV0by1zZWFyY2gtc3VnZ2VzdGlvblwiKSB7XG4gICAgc2VhcmNoSW5wdXQudmFsdWUgPSBlLnRhcmdldC5pbm5lclRleHQ7XG4gICAgcG9rZWRleC5maWx0ZXJlZFBva2Vtb25zID0gW107XG4gICAgcG9rZWRleC5lbXB0eU5vZGUoY29udGFpbmVyU3VnZ2VzdGlvbnMpO1xuICAgIHNlYXJjaElucHV0LmZvY3VzKCk7XG4gIH0gZWxzZSB7XG4gICAgcG9rZWRleC5lbXB0eU5vZGUoY29udGFpbmVyU3VnZ2VzdGlvbnMpO1xuICB9XG59KTtcblxuLy9Bc3luYyBDb2RlXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb24oaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGlmIChkYXRhLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgcG9rZWRleC5oYW5kbGVQb2tlbW9uTm90Rm91bmQoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gICAgcG9rZWRleC5jcmVhdGVQb2tlbW9uKHJlc3BvbnNlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRFdm9sdXRpb25EYXRhKGlkZW50aWZpZXIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpZGVudGlmaWVyfWApO1xuICBpZiAoZGF0YS5zdGF0dXMgPT09IDQwNCkgcmV0dXJuO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGNvbnN0IGV2b0RhdGEgPSBbcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0LCByZXNwb25zZS5uYW1lXTtcblxuICByZXR1cm4gZXZvRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXZvbHV0aW9ucyhzcGVjaWVzVXJsKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChzcGVjaWVzVXJsKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBhd2FpdCBoYW5kbGVFdm9sdXRpb25EYXRhKHJlc3BvbnNlLmV2b2x1dGlvbl9jaGFpbi51cmwpO1xuICBhd2FpdCBkaXNwbGF5RXZvbHV0aW9ucygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVFdm9sdXRpb25EYXRhKGNoYWluVXJsKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChjaGFpblVybCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgbGV0IGV2b2x1dGlvbkNoYWluID0gW107XG4gIGxldCBldm9EYXRhID0gcmVzcG9uc2UuY2hhaW47XG5cbiAgZG8ge1xuICAgIGxldCBiYXNlU3RyaW5nID0gZXZvRGF0YS5zcGVjaWVzLnVybDtcbiAgICBsZXQgc3BsaWNlZFN0cmluZyA9IGJhc2VTdHJpbmcuc2xpY2UoNDIsIGJhc2VTdHJpbmcubGVuZ3RoIC0gMSk7XG5cbiAgICBldm9sdXRpb25DaGFpbi5wdXNoKHtcbiAgICAgIG5hbWU6IGV2b0RhdGEuc3BlY2llcy5uYW1lLFxuICAgICAgaWQ6IHNwbGljZWRTdHJpbmcsXG4gICAgfSk7XG5cbiAgICBpZiAoZXZvRGF0YS5ldm9sdmVzX3RvLmxlbmd0aCA+IDEpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZvRGF0YS5ldm9sdmVzX3RvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBiYXNlU3RyaW5nID0gZXZvRGF0YS5ldm9sdmVzX3RvW2ldLnNwZWNpZXMudXJsO1xuICAgICAgICBsZXQgc3BsaWNlZFN0cmluZyA9IGJhc2VTdHJpbmcuc2xpY2UoNDIsIGJhc2VTdHJpbmcubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgZXZvbHV0aW9uQ2hhaW4ucHVzaCh7IG5hbWU6IGV2b0RhdGEuZXZvbHZlc190b1tpXS5zcGVjaWVzLm5hbWUsIGlkOiBzcGxpY2VkU3RyaW5nIH0pO1xuXG4gICAgICAgIGlmIChldm9EYXRhLmV2b2x2ZXNfdG9baV0uZXZvbHZlc190by5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IGJhc2VTdHJpbmdEdXBlID0gZXZvRGF0YS5ldm9sdmVzX3RvW2ldLmV2b2x2ZXNfdG9bMF0uc3BlY2llcy51cmw7XG4gICAgICAgICAgbGV0IHNwbGljZWRTdHJpbmdEdXBlID0gYmFzZVN0cmluZ0R1cGUuc2xpY2UoNDIsIGJhc2VTdHJpbmcubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgICBldm9sdXRpb25DaGFpbi5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGV2b0RhdGEuZXZvbHZlc190b1tpXS5ldm9sdmVzX3RvWzBdLnNwZWNpZXMubmFtZSxcbiAgICAgICAgICAgIGlkOiBzcGxpY2VkU3RyaW5nRHVwZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGV2b0RhdGEgPSBldm9EYXRhW1wiZXZvbHZlc190b1wiXVswXTtcbiAgfSB3aGlsZSAoISFldm9EYXRhICYmIGV2b0RhdGEuaGFzT3duUHJvcGVydHkoXCJldm9sdmVzX3RvXCIpKTtcblxuICBsZXQgcmVtb3ZlZER1cGxpY2F0ZXMgPSByZW1vdmVEdXBsaWNhdGVPYmplY3RzKGV2b2x1dGlvbkNoYWluKTtcbiAgY29uc29sZS5sb2cocmVtb3ZlZER1cGxpY2F0ZXMpO1xuICBpZiAocG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lLmxlbmd0aCA9PT0gMCkge1xuICAgIHJlbW92ZWREdXBsaWNhdGVzLmZvckVhY2goKGV2b2x1dGlvbikgPT5cbiAgICAgIHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5wdXNoKGV2b2x1dGlvbilcbiAgICApO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlFdm9sdXRpb25zKCkge1xuICBjb25zdCBtb3Zlc1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgbW92ZXNTcGFuLnRleHRDb250ZW50ID0gXCJTZWUgTW92ZXNcIjtcbiAgbW92ZXNTcGFuLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10b2dnbGVcIjtcbiAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQobW92ZXNTcGFuKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5sZW5ndGg7IGkrKykge1xuICAgIGxldCBldm9EYXRhID0gYXdhaXQgZ2V0RXZvbHV0aW9uRGF0YShgJHtwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmVbaV0uaWR9YCk7XG4gICAgaWYgKGV2b0RhdGEpIHtcbiAgICAgIGxldCBldm9JbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgZXZvSW1nLnNyYyA9IGV2b0RhdGFbMF07XG4gICAgICBldm9JbWcuaWQgPSBldm9EYXRhWzFdO1xuICAgICAgZXZvSW1nLmNsYXNzTmFtZSA9IFwiZXZvbHV0aW9uXCI7XG4gICAgICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChldm9JbWcpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVEdXBsaWNhdGVPYmplY3RzKGFycmF5KSB7XG4gIHJldHVybiBbLi4ubmV3IFNldChhcnJheS5tYXAoKHMpID0+IEpTT04uc3RyaW5naWZ5KHMpKSldLm1hcCgocykgPT4gSlNPTi5wYXJzZShzKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25OYW1lcyhvZmZzZXQpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24/bGltaXQ9MTUxJm9mZnNldD0ke29mZnNldH1gKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICByZXNwb25zZS5yZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgIHBva2VkZXguYWxsUG9rZW1vbk5hbWVzLnB1c2gocmVzdWx0Lm5hbWUpO1xuICB9KTtcbiAgcG9rZWRleC5vZmZzZXQgKz0gMTUxO1xuXG4gIGlmIChwb2tlZGV4Lm9mZnNldCA+PSAxMjAwKSByZXR1cm47XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGdldFBva2Vtb25OYW1lcyhwb2tlZGV4Lm9mZnNldCk7XG4gIH0sIDEwMDApO1xufVxuLy9nZXRQb2tlbW9uTmFtZXMocG9rZWRleC5vZmZzZXQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9