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

async function getPokemonId(pokemonName) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  if (data.status === 404) return; //
  const response = await data.json();

  console.log(response);

  return response.id;
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
      // id: await getPokemonId(evoData.species.name),
    });

    evoData = evoData["evolves_to"][0];
  } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

  if (pokedex.currentPokemon[0].evolutionLine.length === 0) {
    evolutionChain.forEach((evolution) =>
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
    let evoData = await getEvolutionData(
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
  pokedex.offset += 151;

  if (pokedex.offset >= 1200) return;
  setTimeout(() => {
    getPokemonNames(pokedex.offset);
  }, 1000);
}
getPokemonNames(pokedex.offset);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixvREFBb0Q7QUFDdEU7QUFDQSxTQUFTLDhDQUE4QztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMERBQTBELE9BQU87QUFDakU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9Qb2tlZGV4LmpzIiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvUG9rZW1vbi5qcyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBva2Vtb24gZnJvbSBcIi4vUG9rZW1vblwiO1xuXG5jb25zdCBjb250YWluZXJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXItaW5mb1wiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcFwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsQm90dG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWJvdHRvbVwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtaWRcIik7XG5cbmNvbnN0IGF1dG9Db21wbGV0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtYXV0b2NvbXBsZXRlXCIpO1xuXG5jb25zdCB0eXBlcyA9IFtcbiAgXCJub3JtYWxcIixcbiAgXCJmaXJlXCIsXG4gIFwid2F0ZXJcIixcbiAgXCJncmFzc1wiLFxuICBcImVsZWN0cmljXCIsXG4gIFwiaWNlXCIsXG4gIFwiZmlnaHRpbmdcIixcbiAgXCJwb2lzb25cIixcbiAgXCJncm91bmRcIixcbiAgXCJmbHlpbmdcIixcbiAgXCJwc3ljaGljXCIsXG4gIFwiYnVnXCIsXG4gIFwicm9ja1wiLFxuICBcImdob3N0XCIsXG4gIFwiZGFya1wiLFxuICBcImRyYWdvblwiLFxuICBcInN0ZWVsXCIsXG4gIFwiZmFpcnlcIixcbl07XG5cbmNvbnN0IGNvbG9ycyA9IFtcbiAgXCIjQThBODc4XCIsIC8vbm9ybWFsXG4gIFwiI0YwODAzMFwiLCAvL2ZpcmVcbiAgXCIjNjg5MEYwXCIsIC8vd2F0ZXJcbiAgXCIjNzhDODUwXCIsIC8vZ3Jhc3NcbiAgXCIjRjhEMDMwXCIsIC8vZWxlY3RyaWNcbiAgXCIjOThEOEQ4XCIsIC8vaWNlXG4gIFwiI0MwMzAyOFwiLCAvL2ZpZ2h0aW5nXG4gIFwiI0EwNDBBMFwiLCAvL3BvaXNvblxuICBcIiNFMEMwNjhcIiwgLy9ncm91bmRcbiAgXCIjQTg5MEYwXCIsIC8vZmx5aW5nXG4gIFwiI0Y4NTg4OFwiLCAvL3BzeWNoaWNcbiAgXCIjQThCODIwXCIsIC8vYnVnXG4gIFwiI0I4QTAzOFwiLCAvL3JvY2tcbiAgXCIjNzA1ODk4XCIsIC8vZ2hvc3RcbiAgXCIjNzA1ODQ4XCIsIC8vZGFya1xuICBcIiM3MDM4RjhcIiwgLy9kcmFnb25cbiAgXCIjQjhCOEQwXCIsIC8vc3RlZWxcbiAgXCIjRjBCNkJDXCIsIC8vZmFpcnlcbl07XG5cbmNvbnN0IGxpZ2h0Q29sb3JzID0gW1xuICBcIiNDM0MzQTJcIiwgLy9saWdodCBub3JtYWxcbiAgXCIjZjBBMDY3XCIsIC8vbGlnaHQgZmlyZVxuICBcIiM2OEIwRjBcIiwgLy9saWdodCB3YXRlclxuICBcIiM5N0M4N0VcIiwgLy9saWdodCBncmFzc1xuICBcIiNGN0RCNjlcIiwgLy9saWdodCBlbGVjdHJpY1xuICBcIiNCQ0RFREVcIiwgLy9saWdodCBpY2VcbiAgXCIjQzI2MTVDXCIsIC8vbGlnaHQgZmlnaHRpbmdcbiAgXCIjQTQ2NEE0XCIsIC8vbGlnaHQgcG9pc29uXG4gIFwiI0UyQ0I4RVwiLCAvL2xpZ2h0IGdyb3VuZFxuICBcIiNDNEI0RjRcIiwgLy9saWdodCBmbHlpbmdcbiAgXCIjRjk3ZkE0XCIsIC8vbGlnaHQgcHN5Y2hpY1xuICBcIiNCM0JCNjdcIiwgLy9saWdodCBidWdcbiAgXCIjQjlBQTZCXCIsIC8vbGlnaHQgcm9ja1xuICBcIiM4Mjc0OTlcIiwgLy9saWdodCBnaG9zdFxuICBcIiM3NzY5NUZcIiwgLy9saWdodCBkYXJrXG4gIFwiIzkxNjZGOVwiLCAvL2xpZ2h0IGRyYWdvblxuICBcIiNDRkNGRDVcIiwgLy9saWdodCBzdGVlbFxuICBcIiNGMUNBQ0VcIiwgLy9saWdodCBmYWlyeVxuXTtcblxuY2xhc3MgUG9rZWRleCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWxsUG9rZW1vbk5hbWVzID0gW107XG4gICAgdGhpcy5maWx0ZXJlZFBva2Vtb25zID0gW107XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmN1cnJlbnRQb2tlbW9uID0gW107XG4gIH1cblxuICBjcmVhdGVQb2tlbW9uKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5wb2tlbW9uID0gbmV3IFBva2Vtb24ocmVzcG9uc2UpO1xuICAgIHRoaXMuY3VycmVudFBva2Vtb24ucHVzaCh0aGlzLnBva2Vtb24pO1xuXG4gICAgdGhpcy5oYW5kbGVCYWNrZ3JvdW5kKHRoaXMucG9rZW1vbi50eXBlcyk7XG4gICAgdGhpcy5oYW5kbGVEb21NYWluSW5mbyh0aGlzLnBva2Vtb24pO1xuICAgIHRoaXMuaGFuZGxlRG9tTW92ZXNJbmZvKHRoaXMucG9rZW1vbik7XG4gICAgdGhpcy5oYW5kbGVEb21JZEluZm8odGhpcy5wb2tlbW9uKTtcbiAgfVxuXG4gIGhhbmRsZUJhY2tncm91bmQodHlwaW5nKSB7XG4gICAgbGV0IGdyYWRpZW50Qmc7XG5cbiAgICBpZiAodHlwaW5nLmxlbmd0aCA9PT0gMikge1xuICAgICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgICAgbGV0IHByaW1hcnlDb2xvciA9IGNvbG9yc1tpbmRleE9uZV07XG5cbiAgICAgIGxldCBpbmRleFR3byA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzFdKTtcbiAgICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGNvbG9yc1tpbmRleFR3b107XG5cbiAgICAgIGdyYWRpZW50QmcgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3ByaW1hcnlDb2xvcn0sICR7c2Vjb25kYXJ5Q29sb3J9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpbmRleE9uZSA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzBdKTtcbiAgICAgIGxldCBwcmltYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhPbmVdO1xuXG4gICAgICBsZXQgc2Vjb25kYXJ5Q29sb3IgPSBsaWdodENvbG9yc1tpbmRleE9uZV07XG4gICAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfSlgO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckluZm8uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gZ3JhZGllbnRCZztcbiAgfVxuXG4gIGVtcHR5Tm9kZShwYXJlbnQpIHtcbiAgICB3aGlsZSAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHBhcmVudC5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURvbU1haW5JbmZvKHBva2Vtb24pIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbFRvcCk7XG4gICAgY29uc3QgYmFzaWNJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBwb2tlbW9uTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBjb25zdCBwb2tlbW9uU3ByaXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBjb25zdCBwb2tlbW9uVHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcblxuICAgIGNvbnN0IHNoaW55U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgcG9rZW1vbk5hbWUudGV4dENvbnRlbnQgPSBwb2tlbW9uLm5hbWU7XG4gICAgcG9rZW1vblNwcml0ZS5zcmMgPSBwb2tlbW9uLnNwcml0ZTtcbiAgICBwb2tlbW9uVHlwZS50ZXh0Q29udGVudCA9XG4gICAgICBwb2tlbW9uLnR5cGVzLmxlbmd0aCA+IDFcbiAgICAgICAgPyBgJHtwb2tlbW9uLnR5cGVzWzBdfSAvICR7cG9rZW1vbi50eXBlc1sxXX1gXG4gICAgICAgIDogYCR7cG9rZW1vbi50eXBlc1swXX1gO1xuICAgIHNoaW55U3Bhbi50ZXh0Q29udGVudCA9IFwiVG9nZ2xlIFNoaW55XCI7XG5cbiAgICBiYXNpY0luZm9Db250YWluZXIuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljXCI7XG4gICAgcG9rZW1vbk5hbWUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLW5hbWVcIjtcbiAgICBwb2tlbW9uU3ByaXRlLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIjtcbiAgICBwb2tlbW9uVHlwZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtdHlwZVwiO1xuICAgIHNoaW55U3Bhbi5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3Atc2hpbnktdG9nZ2xlXCI7XG5cbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vbk5hbWUpO1xuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uU3ByaXRlKTtcbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblR5cGUpO1xuXG4gICAgY29udGFpbmVyUG9rZWJhbGxUb3AuYXBwZW5kQ2hpbGQoc2hpbnlTcGFuKTtcbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChiYXNpY0luZm9Db250YWluZXIpO1xuICB9XG5cbiAgaGFuZGxlRG9tTW92ZXNJbmZvKHBva2Vtb24pIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbEJvdHRvbSk7XG4gICAgY29uc3QgbW92ZXNJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBtb3Zlc1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIGNvbnN0IG1vdmVzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcblxuICAgIGNvbnN0IGV2b1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9rZW1vbi5tb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbW92ZXNMaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIG1vdmVzTGlzdEl0ZW0udGV4dENvbnRlbnQgPSBwb2tlbW9uLm1vdmVzW2ldO1xuICAgICAgbW92ZXNMaXN0LmFwcGVuZENoaWxkKG1vdmVzTGlzdEl0ZW0pO1xuICAgIH1cblxuICAgIG1vdmVzVGl0bGUudGV4dENvbnRlbnQgPSBcIk1vdmVzOlwiO1xuICAgIGV2b1NwYW4udGV4dENvbnRlbnQgPSBcIlNlZSBFdm9cIjtcblxuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXNcIjtcbiAgICBtb3Zlc1RpdGxlLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10aXRsZVwiO1xuICAgIG1vdmVzTGlzdC5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtbGlzdFwiO1xuICAgIGV2b1NwYW4uaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLWV2by10b2dnbGVcIjtcblxuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb3Zlc1RpdGxlKTtcbiAgICBtb3Zlc0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQobW92ZXNMaXN0KTtcblxuICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKGV2b1NwYW4pO1xuICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKG1vdmVzSW5mb0NvbnRhaW5lcik7XG4gIH1cblxuICBoYW5kbGVEb21JZEluZm8ocG9rZW1vbikge1xuICAgIGNvbnRhaW5lclBva2ViYWxsSWQudGV4dENvbnRlbnQgPSBwb2tlbW9uLmlkO1xuICB9XG5cbiAgaGFuZGxlU2hpbnlUb2dnbGUoY3VycmVudFBva2Vtb24pIHtcbiAgICBpZiAoY3VycmVudFBva2Vtb25bMF0uaXNTaGlueSA9PT0gZmFsc2UpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtaW1nXCIpLnNyYyA9XG4gICAgICAgIHRoaXMucG9rZW1vbi5zaGlueVNwcml0ZTtcbiAgICAgIGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiKS5zcmMgPVxuICAgICAgICB0aGlzLnBva2Vtb24uc3ByaXRlO1xuICAgICAgY3VycmVudFBva2Vtb25bMF0uaXNTaGlueSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVBva2Vtb25Ob3RGb3VuZCgpIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbFRvcCk7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxJZCk7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxCb3R0b20pO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlBva2Vtb24gbm90IGZvdW5kIDpgKFwiO1xuICAgIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKGVycm9yTWVzc2FnZSk7XG4gIH1cblxuICBmaWx0ZXJQb2tlbW9ucyhpbnB1dCkge1xuICAgIHRoaXMuZmlsdGVyZWRQb2tlbW9ucyA9IHRoaXMuYWxsUG9rZW1vbk5hbWVzLmZpbHRlcigobmFtZSkgPT5cbiAgICAgIG5hbWUuaW5jbHVkZXMoaW5wdXQpXG4gICAgKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIHRoaXMuZGlzcGxheUZpbHRlcmVkUG9rZW1vbnModGhpcy5maWx0ZXJlZFBva2Vtb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbXB0eU5vZGUoYXV0b0NvbXBsZXRlKTtcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5RmlsdGVyZWRQb2tlbW9ucyhmaWx0ZXJlZEFycmF5KSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoYXV0b0NvbXBsZXRlKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyZWRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICBsaS50ZXh0Q29udGVudCA9IGZpbHRlcmVkQXJyYXlbaV07XG4gICAgICBsaS5jbGFzc05hbWUgPSBcImF1dG8tc2VhcmNoLXN1Z2dlc3Rpb25cIjtcbiAgICAgIGF1dG9Db21wbGV0ZS5hcHBlbmRDaGlsZChsaSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBva2VkZXg7XG4iLCJjbGFzcyBQb2tlbW9uIHtcbiAgY29uc3RydWN0b3IocmVzcG9uc2UpIHtcbiAgICB0aGlzLmlkID0gdGhpcy5oYW5kbGVJZEZvcm1hdHRpbmcocmVzcG9uc2UuaWQpO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuaGFuZGxlQ2FwaXRhbGl6ZWROYW1lKHJlc3BvbnNlLm5hbWUpO1xuICAgIHRoaXMuc3BlY2llc1VybCA9IHJlc3BvbnNlLnNwZWNpZXMudXJsO1xuICAgIHRoaXMuc3ByaXRlID0gcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0O1xuICAgIHRoaXMuc2hpbnlTcHJpdGUgPSByZXNwb25zZS5zcHJpdGVzLmZyb250X3NoaW55O1xuICAgIHRoaXMubW92ZXMgPSB0aGlzLmhhbmRsZU1vdmVzKHJlc3BvbnNlKTtcbiAgICB0aGlzLnR5cGVzID0gdGhpcy5oYW5kbGVUeXBlcyhyZXNwb25zZSk7XG4gICAgdGhpcy5pc1NoaW55ID0gZmFsc2U7XG4gICAgdGhpcy5ldm9sdXRpb25MaW5lID0gW107XG4gICAgdGhpcy5pc0Zhdm9yaXRlID0gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVNb3ZlcyhyZXNwb25zZSkge1xuICAgIGNvbnN0IG1vdmVzID0gW107XG5cbiAgICBpZiAocmVzcG9uc2UubW92ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm1vdmVzIG5vdCBmb3VuZFwiKTsgLy9cbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLm1vdmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1swXS5tb3ZlLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBtb3Zlcy5wdXNoKHJlc3BvbnNlLm1vdmVzW2ldLm1vdmUubmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlcztcbiAgfVxuXG4gIGhhbmRsZVR5cGVzKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgdHlwZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLnR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0eXBlcy5wdXNoKHJlc3BvbnNlLnR5cGVzW2ldLnR5cGUubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlcztcbiAgfVxuXG4gIGhhbmRsZUNhcGl0YWxpemVkTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xuICB9XG5cbiAgaGFuZGxlSWRGb3JtYXR0aW5nKGlkKSB7XG4gICAgaWYgKGlkID4gMCAmJiBpZCA8IDEwKSB7XG4gICAgICByZXR1cm4gYCMwMCR7aWR9YDtcbiAgICB9IGVsc2UgaWYgKGlkID49IDEwICYmIGlkIDwgMTAwKSB7XG4gICAgICByZXR1cm4gYCMwJHtpZH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCMke2lkfWA7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRmF2b3JpdGUoKSB7XG4gICAgaWYgKCF0aGlzLmlzRmF2b3JpdGUpIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRmF2b3JpdGUpIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2tlbW9uO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgUG9rZWRleCBmcm9tIFwiLi9Qb2tlZGV4LmpzXCI7XG5cbi8vIGNvbnN0IG9kZE5hbWVzID0gW1xuLy8gICBcIm1yLW1pbWVcIixcbi8vICAgXCJkYXJtYW5pdGFuLXN0YW5kYXJkXCIsXG4vLyAgIFwiZGVveHlzLWF0dGFja1wiLFxuLy8gICBcImRlb3h5cy1kZWZlbnNlXCIsXG4vLyAgIFwiZGVveHlzLW5vcm1hbFwiLFxuLy8gICBcIndvcm1hZGFtLXBsYW50XCIsXG4vLyAgIFwibWltZS1qclwiLFxuLy8gICBcInBvcnlnb24telwiLFxuLy8gICBcImdpcmF0aW5hLWFsdGVyZWRcIixcbi8vICAgXCJzaGF5bWluLWxhbmRcIixcbi8vICAgXCJiYXNjdWxpbi1yZWQtc3RyaXBlZFwiLFxuLy8gICBcInRvcm5hZHVzLWluY2FybmF0ZVwiLFxuLy8gICBcInRodW5kdXJ1cy1pbmNhcm5hdGVcIixcbi8vICAgXCJsYW5kb3J1cy1pbmNhcm5hdGVcIixcbi8vICAgXCJrZWxkZW8tb3JkaW5hcnlcIixcbi8vICAgXCJtZWxvZXR0YS1hcmlhXCIsXG4vLyAgIFwibWVvd3N0aWMtbWFsZVwiLFxuLy8gICBcImFlZ2lzbGFzaC1zaGllbGRcIixcbi8vICAgXCJwdW1wa2Fib28tYXZlcmFnZVwiLFxuLy8gICBcImdvdXJnZWlzdC1hdmVyYWdlXCIsXG4vLyAgIFwienlnYXJkZS01MFwiLFxuLy8gICBcImx5Y2Fucm9jLW1pZGRheVwiLFxuLy8gICBcIndpc2hpd2FzaGktc29sb1wiLFxuLy8gICBcInR5cGUtbnVsbFwiLFxuLy8gICBcIm1pbmlvci1yZWQtbWV0ZW9yXCIsXG4vLyAgIFwibWltaWt5dS1kaXNndWlzZWRcIixcbi8vICAgXCJqYW5nbW8tb1wiLFxuLy8gICBcImhha2Ftby1vXCIsXG4vLyAgIFwia29tbW8tb1wiLFxuLy8gICBcInRhcHUta29rb1wiLFxuLy8gICBcInRhcHUtbGVsZVwiLFxuLy8gICBcInRhcHUtYnVsdVwiLFxuLy8gICBcInRhcHUtZmluaVwiLFxuLy8gICBcInRveHRyaWNpdHktYW1wZWRcIixcbi8vICAgXCJtci1yaW1lXCIsXG4vLyAgIFwiZWlzY3VlLWljZVwiLFxuLy8gICBcImluZGVlZGVlLW1hbGVcIixcbi8vICAgXCJtb3JwZWtvLWZ1bGwtYmVsbHlcIixcbi8vICAgXCJ1cnNoaWZ1LXNpbmdsZS1zdHJpa2VcIixcbi8vICAgXCJkZW94eXMtc3BlZWRcIixcbi8vICAgXCJ3b3JtYWRhbS1zYW5keVwiLFxuLy8gICBcIndvcm1hZGFtLXRyYXNoXCIsXG4vLyAgIFwic2hheW1pbi1za3lcIixcbi8vICAgXCJnaXJhdGluYS1vcmlnaW5cIixcbi8vICAgXCJyb3RvbS1oZWF0XCIsXG4vLyAgIFwicm90b20td2FzaFwiLFxuLy8gICBcInJvdG9tLWZyb3N0XCIsXG4vLyAgIFwicm90b20tZmFuXCIsXG4vLyAgIFwicm90b20tbW93XCIsXG4vLyAgIFwiY2FzdGZvcm0tc3VubnlcIixcbi8vIF07XG5cbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1pbnB1dFwiKTtcbmNvbnN0IHNlYXJjaFBva2Vtb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWJ1dHRvblwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsQm90dG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWJvdHRvbVwiKTtcbmNvbnN0IGNvbnRhaW5lclN1Z2dlc3Rpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwicG9rZW1vbi1zZWFyY2gtYXV0b2NvbXBsZXRlXCJcbik7XG5cbmNvbnN0IHBva2VkZXggPSBuZXcgUG9rZWRleCgpO1xuXG4vL0V2ZW50IExpc3RlbmVyc1xuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIGxldCB0cmltbWVkU2VhcmNoID0gc2VhcmNoVmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKHRyaW1tZWRTZWFyY2gubGVuZ3RoICE9PSAwKSB7XG4gICAgcG9rZWRleC5pbml0KCk7XG4gICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIGdldFBva2Vtb24odHJpbW1lZFNlYXJjaCk7XG4gIH1cbn0pO1xuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICBsZXQgc2VhcmNoSW5wdXRWYWx1ZSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICBsZXQgdGFpbG9yZWRJbnB1dFZhbHVlID0gc2VhcmNoSW5wdXRWYWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICBwb2tlZGV4LmZpbHRlclBva2Vtb25zKHRhaWxvcmVkSW5wdXRWYWx1ZSk7XG59KTtcblxuLy9FdmVudCBEZWxlZ2F0aW9uXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC10b3Atc2hpbnktdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmhhbmRsZVNoaW55VG9nZ2xlKHBva2VkZXguY3VycmVudFBva2Vtb24pO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImluZm8tcG9rZWJhbGwtYm90dG9tLWV2by10b2dnbGVcIikge1xuICAgIHBva2VkZXguZW1wdHlOb2RlKGNvbnRhaW5lclBva2ViYWxsQm90dG9tKTtcbiAgICBnZXRFdm9sdXRpb25zKHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uc3BlY2llc1VybCk7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmhhbmRsZURvbU1vdmVzSW5mbyhwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiZXZvbHV0aW9uXCIpIHtcbiAgICBwb2tlZGV4LmluaXQoKTtcbiAgICBnZXRQb2tlbW9uKGUudGFyZ2V0LmlkKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiYXV0by1zZWFyY2gtc3VnZ2VzdGlvblwiKSB7XG4gICAgc2VhcmNoSW5wdXQudmFsdWUgPSBlLnRhcmdldC5pbm5lclRleHQ7XG4gICAgcG9rZWRleC5maWx0ZXJlZFBva2Vtb25zID0gW107XG4gICAgcG9rZWRleC5lbXB0eU5vZGUoY29udGFpbmVyU3VnZ2VzdGlvbnMpO1xuICAgIHNlYXJjaElucHV0LmZvY3VzKCk7XG4gIH0gZWxzZSB7XG4gICAgcG9rZWRleC5lbXB0eU5vZGUoY29udGFpbmVyU3VnZ2VzdGlvbnMpO1xuICB9XG59KTtcblxuLy9Bc3luYyBDb2RlXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb24oaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGlmIChkYXRhLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgcG9rZWRleC5oYW5kbGVQb2tlbW9uTm90Rm91bmQoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gICAgcG9rZWRleC5jcmVhdGVQb2tlbW9uKHJlc3BvbnNlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRFdm9sdXRpb25EYXRhKGlkZW50aWZpZXIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpZGVudGlmaWVyfWApO1xuICBpZiAoZGF0YS5zdGF0dXMgPT09IDQwNCkgcmV0dXJuO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGNvbnN0IGV2b0RhdGEgPSBbcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0LCByZXNwb25zZS5uYW1lXTtcblxuICByZXR1cm4gZXZvRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXZvbHV0aW9ucyhzcGVjaWVzVXJsKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChzcGVjaWVzVXJsKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBhd2FpdCBoYW5kbGVFdm9sdXRpb25EYXRhKHJlc3BvbnNlLmV2b2x1dGlvbl9jaGFpbi51cmwpO1xuICBhd2FpdCBkaXNwbGF5RXZvbHV0aW9ucygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uSWQocG9rZW1vbk5hbWUpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtwb2tlbW9uTmFtZX1gKTtcbiAgaWYgKGRhdGEuc3RhdHVzID09PSA0MDQpIHJldHVybjsgLy9cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgcmV0dXJuIHJlc3BvbnNlLmlkO1xufVxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVFdm9sdXRpb25EYXRhKGNoYWluVXJsKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChjaGFpblVybCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgbGV0IGV2b2x1dGlvbkNoYWluID0gW107XG4gIGxldCBldm9EYXRhID0gcmVzcG9uc2UuY2hhaW47XG5cbiAgZG8ge1xuICAgIGxldCBiYXNlU3RyaW5nID0gZXZvRGF0YS5zcGVjaWVzLnVybDtcbiAgICBsZXQgc3BsaWNlZFN0cmluZyA9IGJhc2VTdHJpbmcuc2xpY2UoNDIsIGJhc2VTdHJpbmcubGVuZ3RoIC0gMSk7XG5cbiAgICBldm9sdXRpb25DaGFpbi5wdXNoKHtcbiAgICAgIG5hbWU6IGV2b0RhdGEuc3BlY2llcy5uYW1lLFxuICAgICAgaWQ6IHNwbGljZWRTdHJpbmcsXG4gICAgICAvLyBpZDogYXdhaXQgZ2V0UG9rZW1vbklkKGV2b0RhdGEuc3BlY2llcy5uYW1lKSxcbiAgICB9KTtcblxuICAgIGV2b0RhdGEgPSBldm9EYXRhW1wiZXZvbHZlc190b1wiXVswXTtcbiAgfSB3aGlsZSAoISFldm9EYXRhICYmIGV2b0RhdGEuaGFzT3duUHJvcGVydHkoXCJldm9sdmVzX3RvXCIpKTtcblxuICBpZiAocG9rZWRleC5jdXJyZW50UG9rZW1vblswXS5ldm9sdXRpb25MaW5lLmxlbmd0aCA9PT0gMCkge1xuICAgIGV2b2x1dGlvbkNoYWluLmZvckVhY2goKGV2b2x1dGlvbikgPT5cbiAgICAgIHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5wdXNoKGV2b2x1dGlvbilcbiAgICApO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlFdm9sdXRpb25zKCkge1xuICBjb25zdCBtb3Zlc1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgbW92ZXNTcGFuLnRleHRDb250ZW50ID0gXCJTZWUgTW92ZXNcIjtcbiAgbW92ZXNTcGFuLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10b2dnbGVcIjtcbiAgY29udGFpbmVyUG9rZWJhbGxCb3R0b20uYXBwZW5kQ2hpbGQobW92ZXNTcGFuKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5sZW5ndGg7IGkrKykge1xuICAgIGxldCBldm9EYXRhID0gYXdhaXQgZ2V0RXZvbHV0aW9uRGF0YShcbiAgICAgIGAke3Bva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZVtpXS5pZH1gXG4gICAgKTtcbiAgICBpZiAoZXZvRGF0YSkge1xuICAgICAgbGV0IGV2b0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICBldm9JbWcuc3JjID0gZXZvRGF0YVswXTtcbiAgICAgIGV2b0ltZy5pZCA9IGV2b0RhdGFbMV07XG4gICAgICBldm9JbWcuY2xhc3NOYW1lID0gXCJldm9sdXRpb25cIjtcbiAgICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKGV2b0ltZyk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25OYW1lcyhvZmZzZXQpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24/bGltaXQ9MTUxJm9mZnNldD0ke29mZnNldH1gXG4gICk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgcmVzcG9uc2UucmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcbiAgICBwb2tlZGV4LmFsbFBva2Vtb25OYW1lcy5wdXNoKHJlc3VsdC5uYW1lKTtcbiAgfSk7XG4gIHBva2VkZXgub2Zmc2V0ICs9IDE1MTtcblxuICBpZiAocG9rZWRleC5vZmZzZXQgPj0gMTIwMCkgcmV0dXJuO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBnZXRQb2tlbW9uTmFtZXMocG9rZWRleC5vZmZzZXQpO1xuICB9LCAxMDAwKTtcbn1cbmdldFBva2Vtb25OYW1lcyhwb2tlZGV4Lm9mZnNldCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=