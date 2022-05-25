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
    console.log(response);
    const moves = [];

    if (response.moves.length === 0) {
      console.log("moves not found");
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
//getPokemonNames(pokedex.offset);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixvREFBb0Q7QUFDdEU7QUFDQSxTQUFTLDhDQUE4QztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMERBQTBELE9BQU87QUFDakU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9Qb2tlZGV4LmpzIiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvUG9rZW1vbi5qcyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBva2Vtb24gZnJvbSBcIi4vUG9rZW1vblwiO1xuXG5jb25zdCBjb250YWluZXJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXItaW5mb1wiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLXRvcFwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsQm90dG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXBva2ViYWxsLWJvdHRvbVwiKTtcbmNvbnN0IGNvbnRhaW5lclBva2ViYWxsSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtaWRcIik7XG5cbmNvbnN0IGF1dG9Db21wbGV0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtYXV0b2NvbXBsZXRlXCIpO1xuXG5jb25zdCB0eXBlcyA9IFtcbiAgXCJub3JtYWxcIixcbiAgXCJmaXJlXCIsXG4gIFwid2F0ZXJcIixcbiAgXCJncmFzc1wiLFxuICBcImVsZWN0cmljXCIsXG4gIFwiaWNlXCIsXG4gIFwiZmlnaHRpbmdcIixcbiAgXCJwb2lzb25cIixcbiAgXCJncm91bmRcIixcbiAgXCJmbHlpbmdcIixcbiAgXCJwc3ljaGljXCIsXG4gIFwiYnVnXCIsXG4gIFwicm9ja1wiLFxuICBcImdob3N0XCIsXG4gIFwiZGFya1wiLFxuICBcImRyYWdvblwiLFxuICBcInN0ZWVsXCIsXG4gIFwiZmFpcnlcIixcbl07XG5cbmNvbnN0IGNvbG9ycyA9IFtcbiAgXCIjQThBODc4XCIsIC8vbm9ybWFsXG4gIFwiI0YwODAzMFwiLCAvL2ZpcmVcbiAgXCIjNjg5MEYwXCIsIC8vd2F0ZXJcbiAgXCIjNzhDODUwXCIsIC8vZ3Jhc3NcbiAgXCIjRjhEMDMwXCIsIC8vZWxlY3RyaWNcbiAgXCIjOThEOEQ4XCIsIC8vaWNlXG4gIFwiI0MwMzAyOFwiLCAvL2ZpZ2h0aW5nXG4gIFwiI0EwNDBBMFwiLCAvL3BvaXNvblxuICBcIiNFMEMwNjhcIiwgLy9ncm91bmRcbiAgXCIjQTg5MEYwXCIsIC8vZmx5aW5nXG4gIFwiI0Y4NTg4OFwiLCAvL3BzeWNoaWNcbiAgXCIjQThCODIwXCIsIC8vYnVnXG4gIFwiI0I4QTAzOFwiLCAvL3JvY2tcbiAgXCIjNzA1ODk4XCIsIC8vZ2hvc3RcbiAgXCIjNzA1ODQ4XCIsIC8vZGFya1xuICBcIiM3MDM4RjhcIiwgLy9kcmFnb25cbiAgXCIjQjhCOEQwXCIsIC8vc3RlZWxcbiAgXCIjRjBCNkJDXCIsIC8vZmFpcnlcbl07XG5cbmNvbnN0IGxpZ2h0Q29sb3JzID0gW1xuICBcIiNDM0MzQTJcIiwgLy9saWdodCBub3JtYWxcbiAgXCIjZjBBMDY3XCIsIC8vbGlnaHQgZmlyZVxuICBcIiM2OEIwRjBcIiwgLy9saWdodCB3YXRlclxuICBcIiM5N0M4N0VcIiwgLy9saWdodCBncmFzc1xuICBcIiNGN0RCNjlcIiwgLy9saWdodCBlbGVjdHJpY1xuICBcIiNCQ0RFREVcIiwgLy9saWdodCBpY2VcbiAgXCIjQzI2MTVDXCIsIC8vbGlnaHQgZmlnaHRpbmdcbiAgXCIjQTQ2NEE0XCIsIC8vbGlnaHQgcG9pc29uXG4gIFwiI0UyQ0I4RVwiLCAvL2xpZ2h0IGdyb3VuZFxuICBcIiNDNEI0RjRcIiwgLy9saWdodCBmbHlpbmdcbiAgXCIjRjk3ZkE0XCIsIC8vbGlnaHQgcHN5Y2hpY1xuICBcIiNCM0JCNjdcIiwgLy9saWdodCBidWdcbiAgXCIjQjlBQTZCXCIsIC8vbGlnaHQgcm9ja1xuICBcIiM4Mjc0OTlcIiwgLy9saWdodCBnaG9zdFxuICBcIiM3NzY5NUZcIiwgLy9saWdodCBkYXJrXG4gIFwiIzkxNjZGOVwiLCAvL2xpZ2h0IGRyYWdvblxuICBcIiNDRkNGRDVcIiwgLy9saWdodCBzdGVlbFxuICBcIiNGMUNBQ0VcIiwgLy9saWdodCBmYWlyeVxuXTtcblxuY2xhc3MgUG9rZWRleCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWxsUG9rZW1vbk5hbWVzID0gW107XG4gICAgdGhpcy5maWx0ZXJlZFBva2Vtb25zID0gW107XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmN1cnJlbnRQb2tlbW9uID0gW107XG4gIH1cblxuICBjcmVhdGVQb2tlbW9uKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5wb2tlbW9uID0gbmV3IFBva2Vtb24ocmVzcG9uc2UpO1xuICAgIHRoaXMuY3VycmVudFBva2Vtb24ucHVzaCh0aGlzLnBva2Vtb24pO1xuXG4gICAgdGhpcy5oYW5kbGVCYWNrZ3JvdW5kKHRoaXMucG9rZW1vbi50eXBlcyk7XG4gICAgdGhpcy5oYW5kbGVEb21NYWluSW5mbyh0aGlzLnBva2Vtb24pO1xuICAgIHRoaXMuaGFuZGxlRG9tTW92ZXNJbmZvKHRoaXMucG9rZW1vbik7XG4gICAgdGhpcy5oYW5kbGVEb21JZEluZm8odGhpcy5wb2tlbW9uKTtcbiAgfVxuXG4gIGhhbmRsZUJhY2tncm91bmQodHlwaW5nKSB7XG4gICAgbGV0IGdyYWRpZW50Qmc7XG5cbiAgICBpZiAodHlwaW5nLmxlbmd0aCA9PT0gMikge1xuICAgICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgICAgbGV0IHByaW1hcnlDb2xvciA9IGNvbG9yc1tpbmRleE9uZV07XG5cbiAgICAgIGxldCBpbmRleFR3byA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzFdKTtcbiAgICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGNvbG9yc1tpbmRleFR3b107XG5cbiAgICAgIGdyYWRpZW50QmcgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3ByaW1hcnlDb2xvcn0sICR7c2Vjb25kYXJ5Q29sb3J9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpbmRleE9uZSA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzBdKTtcbiAgICAgIGxldCBwcmltYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhPbmVdO1xuXG4gICAgICBsZXQgc2Vjb25kYXJ5Q29sb3IgPSBsaWdodENvbG9yc1tpbmRleE9uZV07XG4gICAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfSlgO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckluZm8uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gZ3JhZGllbnRCZztcbiAgfVxuXG4gIGVtcHR5Tm9kZShwYXJlbnQpIHtcbiAgICB3aGlsZSAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHBhcmVudC5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURvbU1haW5JbmZvKHBva2Vtb24pIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbFRvcCk7XG4gICAgY29uc3QgYmFzaWNJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBwb2tlbW9uTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBjb25zdCBwb2tlbW9uU3ByaXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBjb25zdCBwb2tlbW9uVHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcblxuICAgIGNvbnN0IHNoaW55U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgcG9rZW1vbk5hbWUudGV4dENvbnRlbnQgPSBwb2tlbW9uLm5hbWU7XG4gICAgcG9rZW1vblNwcml0ZS5zcmMgPSBwb2tlbW9uLnNwcml0ZTtcbiAgICBwb2tlbW9uVHlwZS50ZXh0Q29udGVudCA9XG4gICAgICBwb2tlbW9uLnR5cGVzLmxlbmd0aCA+IDFcbiAgICAgICAgPyBgJHtwb2tlbW9uLnR5cGVzWzBdfSAvICR7cG9rZW1vbi50eXBlc1sxXX1gXG4gICAgICAgIDogYCR7cG9rZW1vbi50eXBlc1swXX1gO1xuICAgIHNoaW55U3Bhbi50ZXh0Q29udGVudCA9IFwiVG9nZ2xlIFNoaW55XCI7XG5cbiAgICBiYXNpY0luZm9Db250YWluZXIuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljXCI7XG4gICAgcG9rZW1vbk5hbWUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLW5hbWVcIjtcbiAgICBwb2tlbW9uU3ByaXRlLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIjtcbiAgICBwb2tlbW9uVHlwZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtdHlwZVwiO1xuICAgIHNoaW55U3Bhbi5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3Atc2hpbnktdG9nZ2xlXCI7XG5cbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vbk5hbWUpO1xuICAgIGJhc2ljSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uU3ByaXRlKTtcbiAgICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblR5cGUpO1xuXG4gICAgY29udGFpbmVyUG9rZWJhbGxUb3AuYXBwZW5kQ2hpbGQoc2hpbnlTcGFuKTtcbiAgICBjb250YWluZXJQb2tlYmFsbFRvcC5hcHBlbmRDaGlsZChiYXNpY0luZm9Db250YWluZXIpO1xuICB9XG5cbiAgaGFuZGxlRG9tTW92ZXNJbmZvKHBva2Vtb24pIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbEJvdHRvbSk7XG4gICAgY29uc3QgbW92ZXNJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBtb3Zlc1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIGNvbnN0IG1vdmVzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcblxuICAgIGNvbnN0IGV2b1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9rZW1vbi5tb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbW92ZXNMaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIG1vdmVzTGlzdEl0ZW0udGV4dENvbnRlbnQgPSBwb2tlbW9uLm1vdmVzW2ldO1xuICAgICAgbW92ZXNMaXN0LmFwcGVuZENoaWxkKG1vdmVzTGlzdEl0ZW0pO1xuICAgIH1cblxuICAgIG1vdmVzVGl0bGUudGV4dENvbnRlbnQgPSBcIk1vdmVzOlwiO1xuICAgIGV2b1NwYW4udGV4dENvbnRlbnQgPSBcIlNlZSBFdm9cIjtcblxuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXNcIjtcbiAgICBtb3Zlc1RpdGxlLmlkID0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1tb3Zlcy10aXRsZVwiO1xuICAgIG1vdmVzTGlzdC5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtbGlzdFwiO1xuICAgIGV2b1NwYW4uaWQgPSBcImluZm8tcG9rZWJhbGwtYm90dG9tLWV2by10b2dnbGVcIjtcblxuICAgIG1vdmVzSW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb3Zlc1RpdGxlKTtcbiAgICBtb3Zlc0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQobW92ZXNMaXN0KTtcblxuICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKGV2b1NwYW4pO1xuICAgIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKG1vdmVzSW5mb0NvbnRhaW5lcik7XG4gIH1cblxuICBoYW5kbGVEb21JZEluZm8ocG9rZW1vbikge1xuICAgIGNvbnRhaW5lclBva2ViYWxsSWQudGV4dENvbnRlbnQgPSBwb2tlbW9uLmlkO1xuICB9XG5cbiAgaGFuZGxlU2hpbnlUb2dnbGUoY3VycmVudFBva2Vtb24pIHtcbiAgICBpZiAoY3VycmVudFBva2Vtb25bMF0uaXNTaGlueSA9PT0gZmFsc2UpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtaW1nXCIpLnNyYyA9XG4gICAgICAgIHRoaXMucG9rZW1vbi5zaGlueVNwcml0ZTtcbiAgICAgIGN1cnJlbnRQb2tlbW9uWzBdLmlzU2hpbnkgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLWltZ1wiKS5zcmMgPVxuICAgICAgICB0aGlzLnBva2Vtb24uc3ByaXRlO1xuICAgICAgY3VycmVudFBva2Vtb25bMF0uaXNTaGlueSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVBva2Vtb25Ob3RGb3VuZCgpIHtcbiAgICB0aGlzLmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbFRvcCk7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxJZCk7XG4gICAgdGhpcy5lbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxCb3R0b20pO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlBva2Vtb24gbm90IGZvdW5kIDpgKFwiO1xuICAgIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKGVycm9yTWVzc2FnZSk7XG4gIH1cblxuICBmaWx0ZXJQb2tlbW9ucyhpbnB1dCkge1xuICAgIHRoaXMuZmlsdGVyZWRQb2tlbW9ucyA9IHRoaXMuYWxsUG9rZW1vbk5hbWVzLmZpbHRlcigobmFtZSkgPT5cbiAgICAgIG5hbWUuaW5jbHVkZXMoaW5wdXQpXG4gICAgKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIHRoaXMuZGlzcGxheUZpbHRlcmVkUG9rZW1vbnModGhpcy5maWx0ZXJlZFBva2Vtb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbXB0eU5vZGUoYXV0b0NvbXBsZXRlKTtcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5RmlsdGVyZWRQb2tlbW9ucyhmaWx0ZXJlZEFycmF5KSB7XG4gICAgdGhpcy5lbXB0eU5vZGUoYXV0b0NvbXBsZXRlKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyZWRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICBsaS50ZXh0Q29udGVudCA9IGZpbHRlcmVkQXJyYXlbaV07XG4gICAgICBsaS5jbGFzc05hbWUgPSBcImF1dG8tc2VhcmNoLXN1Z2dlc3Rpb25cIjtcbiAgICAgIGF1dG9Db21wbGV0ZS5hcHBlbmRDaGlsZChsaSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBva2VkZXg7XG4iLCJjbGFzcyBQb2tlbW9uIHtcbiAgY29uc3RydWN0b3IocmVzcG9uc2UpIHtcbiAgICB0aGlzLmlkID0gdGhpcy5oYW5kbGVJZEZvcm1hdHRpbmcocmVzcG9uc2UuaWQpO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuaGFuZGxlQ2FwaXRhbGl6ZWROYW1lKHJlc3BvbnNlLm5hbWUpO1xuICAgIHRoaXMuc3BlY2llc1VybCA9IHJlc3BvbnNlLnNwZWNpZXMudXJsO1xuICAgIHRoaXMuc3ByaXRlID0gcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0O1xuICAgIHRoaXMuc2hpbnlTcHJpdGUgPSByZXNwb25zZS5zcHJpdGVzLmZyb250X3NoaW55O1xuICAgIHRoaXMubW92ZXMgPSB0aGlzLmhhbmRsZU1vdmVzKHJlc3BvbnNlKTtcbiAgICB0aGlzLnR5cGVzID0gdGhpcy5oYW5kbGVUeXBlcyhyZXNwb25zZSk7XG4gICAgdGhpcy5pc1NoaW55ID0gZmFsc2U7XG4gICAgdGhpcy5ldm9sdXRpb25MaW5lID0gW107XG4gICAgdGhpcy5pc0Zhdm9yaXRlID0gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVNb3ZlcyhyZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICBjb25zdCBtb3ZlcyA9IFtdO1xuXG4gICAgaWYgKHJlc3BvbnNlLm1vdmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coXCJtb3ZlcyBub3QgZm91bmRcIik7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5tb3Zlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIG1vdmVzLnB1c2gocmVzcG9uc2UubW92ZXNbMF0ubW92ZS5uYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1tpXS5tb3ZlLm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW92ZXM7XG4gIH1cblxuICBoYW5kbGVUeXBlcyhyZXNwb25zZSkge1xuICAgIGNvbnN0IHR5cGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS50eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdHlwZXMucHVzaChyZXNwb25zZS50eXBlc1tpXS50eXBlLm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZXM7XG4gIH1cblxuICBoYW5kbGVDYXBpdGFsaXplZE5hbWUobmFtZSkge1xuICAgIHJldHVybiBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKTtcbiAgfVxuXG4gIGhhbmRsZUlkRm9ybWF0dGluZyhpZCkge1xuICAgIGlmIChpZCA+IDAgJiYgaWQgPCAxMCkge1xuICAgICAgcmV0dXJuIGAjMDAke2lkfWA7XG4gICAgfSBlbHNlIGlmIChpZCA+PSAxMCAmJiBpZCA8IDEwMCkge1xuICAgICAgcmV0dXJuIGAjMCR7aWR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAjJHtpZH1gO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZhdm9yaXRlKCkge1xuICAgIGlmICghdGhpcy5pc0Zhdm9yaXRlKSB7XG4gICAgICB0aGlzLmlzRmF2b3JpdGUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0Zhdm9yaXRlKSB7XG4gICAgICB0aGlzLmlzRmF2b3JpdGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9rZW1vbjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBva2VkZXggZnJvbSBcIi4vUG9rZWRleC5qc1wiO1xuXG4vLyBjb25zdCBvZGROYW1lcyA9IFtcbi8vICAgXCJtci1taW1lXCIsXG4vLyAgIFwiZGFybWFuaXRhbi1zdGFuZGFyZFwiLFxuLy8gICBcImRlb3h5cy1hdHRhY2tcIixcbi8vICAgXCJkZW94eXMtZGVmZW5zZVwiLFxuLy8gICBcImRlb3h5cy1ub3JtYWxcIixcbi8vICAgXCJ3b3JtYWRhbS1wbGFudFwiLFxuLy8gICBcIm1pbWUtanJcIixcbi8vICAgXCJwb3J5Z29uLXpcIixcbi8vICAgXCJnaXJhdGluYS1hbHRlcmVkXCIsXG4vLyAgIFwic2hheW1pbi1sYW5kXCIsXG4vLyAgIFwiYmFzY3VsaW4tcmVkLXN0cmlwZWRcIixcbi8vICAgXCJ0b3JuYWR1cy1pbmNhcm5hdGVcIixcbi8vICAgXCJ0aHVuZHVydXMtaW5jYXJuYXRlXCIsXG4vLyAgIFwibGFuZG9ydXMtaW5jYXJuYXRlXCIsXG4vLyAgIFwia2VsZGVvLW9yZGluYXJ5XCIsXG4vLyAgIFwibWVsb2V0dGEtYXJpYVwiLFxuLy8gICBcIm1lb3dzdGljLW1hbGVcIixcbi8vICAgXCJhZWdpc2xhc2gtc2hpZWxkXCIsXG4vLyAgIFwicHVtcGthYm9vLWF2ZXJhZ2VcIixcbi8vICAgXCJnb3VyZ2Vpc3QtYXZlcmFnZVwiLFxuLy8gICBcInp5Z2FyZGUtNTBcIixcbi8vICAgXCJseWNhbnJvYy1taWRkYXlcIixcbi8vICAgXCJ3aXNoaXdhc2hpLXNvbG9cIixcbi8vICAgXCJ0eXBlLW51bGxcIixcbi8vICAgXCJtaW5pb3ItcmVkLW1ldGVvclwiLFxuLy8gICBcIm1pbWlreXUtZGlzZ3Vpc2VkXCIsXG4vLyAgIFwiamFuZ21vLW9cIixcbi8vICAgXCJoYWthbW8tb1wiLFxuLy8gICBcImtvbW1vLW9cIixcbi8vICAgXCJ0YXB1LWtva29cIixcbi8vICAgXCJ0YXB1LWxlbGVcIixcbi8vICAgXCJ0YXB1LWJ1bHVcIixcbi8vICAgXCJ0YXB1LWZpbmlcIixcbi8vICAgXCJ0b3h0cmljaXR5LWFtcGVkXCIsXG4vLyAgIFwibXItcmltZVwiLFxuLy8gICBcImVpc2N1ZS1pY2VcIixcbi8vICAgXCJpbmRlZWRlZS1tYWxlXCIsXG4vLyAgIFwibW9ycGVrby1mdWxsLWJlbGx5XCIsXG4vLyAgIFwidXJzaGlmdS1zaW5nbGUtc3RyaWtlXCIsXG4vLyAgIFwiZGVveHlzLXNwZWVkXCIsXG4vLyAgIFwid29ybWFkYW0tc2FuZHlcIixcbi8vICAgXCJ3b3JtYWRhbS10cmFzaFwiLFxuLy8gICBcInNoYXltaW4tc2t5XCIsXG4vLyAgIFwiZ2lyYXRpbmEtb3JpZ2luXCIsXG4vLyAgIFwicm90b20taGVhdFwiLFxuLy8gICBcInJvdG9tLXdhc2hcIixcbi8vICAgXCJyb3RvbS1mcm9zdFwiLFxuLy8gICBcInJvdG9tLWZhblwiLFxuLy8gICBcInJvdG9tLW1vd1wiLFxuLy8gICBcImNhc3Rmb3JtLXN1bm55XCIsXG4vLyBdO1xuXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIik7XG5jb25zdCBzZWFyY2hQb2tlbW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2tlbW9uLXNlYXJjaC1idXR0b25cIik7XG5jb25zdCBjb250YWluZXJQb2tlYmFsbEJvdHRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC1ib3R0b21cIik7XG5jb25zdCBjb250YWluZXJTdWdnZXN0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcInBva2Vtb24tc2VhcmNoLWF1dG9jb21wbGV0ZVwiXG4pO1xuXG5jb25zdCBwb2tlZGV4ID0gbmV3IFBva2VkZXgoKTtcblxuLy9FdmVudCBMaXN0ZW5lcnNcbnNlYXJjaFBva2Vtb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBsZXQgc2VhcmNoVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWlucHV0XCIpLnZhbHVlO1xuICBsZXQgdHJpbW1lZFNlYXJjaCA9IHNlYXJjaFZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gIGlmICh0cmltbWVkU2VhcmNoLmxlbmd0aCAhPT0gMCkge1xuICAgIHBva2VkZXguaW5pdCgpO1xuICAgIHNlYXJjaElucHV0LnZhbHVlID0gXCJcIjtcbiAgICBnZXRQb2tlbW9uKHRyaW1tZWRTZWFyY2gpO1xuICB9XG59KTtcblxuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgbGV0IHNlYXJjaElucHV0VmFsdWUgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgbGV0IHRhaWxvcmVkSW5wdXRWYWx1ZSA9IHNlYXJjaElucHV0VmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgcG9rZWRleC5maWx0ZXJQb2tlbW9ucyh0YWlsb3JlZElucHV0VmFsdWUpO1xufSk7XG5cbi8vRXZlbnQgRGVsZWdhdGlvblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImluZm8tcG9rZWJhbGwtdG9wLXNoaW55LXRvZ2dsZVwiKSB7XG4gICAgcG9rZWRleC5oYW5kbGVTaGlueVRvZ2dsZShwb2tlZGV4LmN1cnJlbnRQb2tlbW9uKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5pZCA9PT0gXCJpbmZvLXBva2ViYWxsLWJvdHRvbS1ldm8tdG9nZ2xlXCIpIHtcbiAgICBwb2tlZGV4LmVtcHR5Tm9kZShjb250YWluZXJQb2tlYmFsbEJvdHRvbSk7XG4gICAgZ2V0RXZvbHV0aW9ucyhwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLnNwZWNpZXNVcmwpO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImluZm8tcG9rZWJhbGwtYm90dG9tLW1vdmVzLXRvZ2dsZVwiKSB7XG4gICAgcG9rZWRleC5oYW5kbGVEb21Nb3Zlc0luZm8ocG9rZWRleC5jdXJyZW50UG9rZW1vblswXSk7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImV2b2x1dGlvblwiKSB7XG4gICAgcG9rZWRleC5pbml0KCk7XG4gICAgZ2V0UG9rZW1vbihlLnRhcmdldC5pZCk7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImF1dG8tc2VhcmNoLXN1Z2dlc3Rpb25cIikge1xuICAgIHNlYXJjaElucHV0LnZhbHVlID0gZS50YXJnZXQuaW5uZXJUZXh0O1xuICAgIHBva2VkZXguZmlsdGVyZWRQb2tlbW9ucyA9IFtdO1xuICAgIHBva2VkZXguZW1wdHlOb2RlKGNvbnRhaW5lclN1Z2dlc3Rpb25zKTtcbiAgICBzZWFyY2hJbnB1dC5mb2N1cygpO1xuICB9IGVsc2Uge1xuICAgIHBva2VkZXguZW1wdHlOb2RlKGNvbnRhaW5lclN1Z2dlc3Rpb25zKTtcbiAgfVxufSk7XG5cbi8vQXN5bmMgQ29kZVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uKGlkZW50aWZpZXIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpZGVudGlmaWVyfWApO1xuICBpZiAoZGF0YS5zdGF0dXMgPT09IDQwNCkge1xuICAgIHBva2VkZXguaGFuZGxlUG9rZW1vbk5vdEZvdW5kKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICAgIHBva2VkZXguY3JlYXRlUG9rZW1vbihyZXNwb25zZSk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXZvbHV0aW9uRGF0YShpZGVudGlmaWVyKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aWRlbnRpZmllcn1gKTtcbiAgaWYgKGRhdGEuc3RhdHVzID09PSA0MDQpIHJldHVybjtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBjb25zdCBldm9EYXRhID0gW3Jlc3BvbnNlLnNwcml0ZXMuZnJvbnRfZGVmYXVsdCwgcmVzcG9uc2UubmFtZV07XG5cbiAgcmV0dXJuIGV2b0RhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEV2b2x1dGlvbnMoc3BlY2llc1VybCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goc3BlY2llc1VybCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgYXdhaXQgaGFuZGxlRXZvbHV0aW9uRGF0YShyZXNwb25zZS5ldm9sdXRpb25fY2hhaW4udXJsKTtcbiAgYXdhaXQgZGlzcGxheUV2b2x1dGlvbnMoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0UG9rZW1vbklkKHBva2Vtb25OYW1lKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7cG9rZW1vbk5hbWV9YCk7XG4gIGlmIChkYXRhLnN0YXR1cyA9PT0gNDA0KSByZXR1cm47IC8vXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gIHJldHVybiByZXNwb25zZS5pZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlRXZvbHV0aW9uRGF0YShjaGFpblVybCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goY2hhaW5VcmwpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGxldCBldm9sdXRpb25DaGFpbiA9IFtdO1xuICBsZXQgZXZvRGF0YSA9IHJlc3BvbnNlLmNoYWluO1xuXG4gIGRvIHtcbiAgICBsZXQgYmFzZVN0cmluZyA9IGV2b0RhdGEuc3BlY2llcy51cmw7XG4gICAgbGV0IHNwbGljZWRTdHJpbmcgPSBiYXNlU3RyaW5nLnNsaWNlKDQyLCBiYXNlU3RyaW5nLmxlbmd0aCAtIDEpO1xuXG4gICAgZXZvbHV0aW9uQ2hhaW4ucHVzaCh7XG4gICAgICBuYW1lOiBldm9EYXRhLnNwZWNpZXMubmFtZSxcbiAgICAgIGlkOiBzcGxpY2VkU3RyaW5nLFxuICAgICAgLy8gaWQ6IGF3YWl0IGdldFBva2Vtb25JZChldm9EYXRhLnNwZWNpZXMubmFtZSksXG4gICAgfSk7XG5cbiAgICBldm9EYXRhID0gZXZvRGF0YVtcImV2b2x2ZXNfdG9cIl1bMF07XG4gIH0gd2hpbGUgKCEhZXZvRGF0YSAmJiBldm9EYXRhLmhhc093blByb3BlcnR5KFwiZXZvbHZlc190b1wiKSk7XG5cbiAgaWYgKHBva2VkZXguY3VycmVudFBva2Vtb25bMF0uZXZvbHV0aW9uTGluZS5sZW5ndGggPT09IDApIHtcbiAgICBldm9sdXRpb25DaGFpbi5mb3JFYWNoKChldm9sdXRpb24pID0+XG4gICAgICBwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmUucHVzaChldm9sdXRpb24pXG4gICAgKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBkaXNwbGF5RXZvbHV0aW9ucygpIHtcbiAgY29uc3QgbW92ZXNTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIG1vdmVzU3Bhbi50ZXh0Q29udGVudCA9IFwiU2VlIE1vdmVzXCI7XG4gIG1vdmVzU3Bhbi5pZCA9IFwiaW5mby1wb2tlYmFsbC1ib3R0b20tbW92ZXMtdG9nZ2xlXCI7XG4gIGNvbnRhaW5lclBva2ViYWxsQm90dG9tLmFwcGVuZENoaWxkKG1vdmVzU3Bhbik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgZXZvRGF0YSA9IGF3YWl0IGdldEV2b2x1dGlvbkRhdGEoXG4gICAgICBgJHtwb2tlZGV4LmN1cnJlbnRQb2tlbW9uWzBdLmV2b2x1dGlvbkxpbmVbaV0uaWR9YFxuICAgICk7XG4gICAgaWYgKGV2b0RhdGEpIHtcbiAgICAgIGxldCBldm9JbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgZXZvSW1nLnNyYyA9IGV2b0RhdGFbMF07XG4gICAgICBldm9JbWcuaWQgPSBldm9EYXRhWzFdO1xuICAgICAgZXZvSW1nLmNsYXNzTmFtZSA9IFwiZXZvbHV0aW9uXCI7XG4gICAgICBjb250YWluZXJQb2tlYmFsbEJvdHRvbS5hcHBlbmRDaGlsZChldm9JbWcpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uTmFtZXMob2Zmc2V0KSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uP2xpbWl0PTE1MSZvZmZzZXQ9JHtvZmZzZXR9YFxuICApO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIHJlc3BvbnNlLnJlc3VsdHMuZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgcG9rZWRleC5hbGxQb2tlbW9uTmFtZXMucHVzaChyZXN1bHQubmFtZSk7XG4gIH0pO1xuICBwb2tlZGV4Lm9mZnNldCArPSAxNTE7XG5cbiAgaWYgKHBva2VkZXgub2Zmc2V0ID49IDEyMDApIHJldHVybjtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZ2V0UG9rZW1vbk5hbWVzKHBva2VkZXgub2Zmc2V0KTtcbiAgfSwgMTAwMCk7XG59XG4vL2dldFBva2Vtb25OYW1lcyhwb2tlZGV4Lm9mZnNldCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=