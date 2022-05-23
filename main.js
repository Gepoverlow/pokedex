/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
const searchPokemon = document.getElementById("pokemon-search-button");
const containerInfo = document.getElementById("container-info");

const containerPokeballTop = document.getElementById("info-pokeball-top");

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

//Event Listeners
searchPokemon.addEventListener("click", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("pokemon-search-input").value;
  getPokemon(searchValue);
});

//Functionality
async function getPokemon(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const response = await data.json();

  createPokemon(response);
}

function processPokemon(response) {
  const tailoredPokemon = {
    id: response.id,
    name: response.name,
    sprite: response.sprites.front_default,
    moves: handleMoves(response),
    types: handleTypes(response),
  };
  return tailoredPokemon;
}

function handleMoves(response) {
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

function handleTypes(response) {
  const types = [];
  for (let i = 0; i < response.types.length; i++) {
    types.push(response.types[i].type.name);
  }
  return types;
}

function handleBackground(typing) {
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

function createPokemon(response) {
  const pokemon = processPokemon(response);

  handleBackground(pokemon.types);
  handleDomMainInfo(pokemon);
}

function emptyNode(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function handleDomMainInfo(pokemon) {
  emptyNode(containerPokeballTop);
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

// {
//   /* <div id="info-pokeball-top-basic">
//               <h1 id="info-pokeball-top-basic-name">Charizard</h1>
//               <img
//                 id="info-pokeball-top-basic-img"
//                 src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
//                 alt=""
//               />
//               <h3 id="info-pokeball-top-basic-type">Flying / Fire</h3>
//             </div> */
// }

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxnRUFBZ0UsV0FBVztBQUMzRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSixvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLGFBQWEsSUFBSSxlQUFlO0FBQzlFLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsOENBQThDLGFBQWEsSUFBSSxlQUFlO0FBQzlFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGtCQUFrQixJQUFJLGlCQUFpQjtBQUNsRCxXQUFXLGlCQUFpQjs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VkZXgvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaFBva2Vtb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWJ1dHRvblwiKTtcbmNvbnN0IGNvbnRhaW5lckluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lci1pbmZvXCIpO1xuXG5jb25zdCBjb250YWluZXJQb2tlYmFsbFRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1wb2tlYmFsbC10b3BcIik7XG5cbmNvbnN0IHR5cGVzID0gW1xuICBcIm5vcm1hbFwiLFxuICBcImZpcmVcIixcbiAgXCJ3YXRlclwiLFxuICBcImdyYXNzXCIsXG4gIFwiZWxlY3RyaWNcIixcbiAgXCJpY2VcIixcbiAgXCJmaWdodGluZ1wiLFxuICBcInBvaXNvblwiLFxuICBcImdyb3VuZFwiLFxuICBcImZseWluZ1wiLFxuICBcInBzeWNoaWNcIixcbiAgXCJidWdcIixcbiAgXCJyb2NrXCIsXG4gIFwiZ2hvc3RcIixcbiAgXCJkYXJrXCIsXG4gIFwiZHJhZ29uXCIsXG4gIFwic3RlZWxcIixcbiAgXCJmYWlyeVwiLFxuXTtcblxuY29uc3QgY29sb3JzID0gW1xuICBcIiNBOEE4NzhcIiwgLy9ub3JtYWxcbiAgXCIjRjA4MDMwXCIsIC8vZmlyZVxuICBcIiM2ODkwRjBcIiwgLy93YXRlclxuICBcIiM3OEM4NTBcIiwgLy9ncmFzc1xuICBcIiNGOEQwMzBcIiwgLy9lbGVjdHJpY1xuICBcIiM5OEQ4RDhcIiwgLy9pY2VcbiAgXCIjQzAzMDI4XCIsIC8vZmlnaHRpbmdcbiAgXCIjQTA0MEEwXCIsIC8vcG9pc29uXG4gIFwiI0UwQzA2OFwiLCAvL2dyb3VuZFxuICBcIiNBODkwRjBcIiwgLy9mbHlpbmdcbiAgXCIjRjg1ODg4XCIsIC8vcHN5Y2hpY1xuICBcIiNBOEI4MjBcIiwgLy9idWdcbiAgXCIjQjhBMDM4XCIsIC8vcm9ja1xuICBcIiM3MDU4OThcIiwgLy9naG9zdFxuICBcIiM3MDU4NDhcIiwgLy9kYXJrXG4gIFwiIzcwMzhGOFwiLCAvL2RyYWdvblxuICBcIiNCOEI4RDBcIiwgLy9zdGVlbFxuICBcIiNGMEI2QkNcIiwgLy9mYWlyeVxuXTtcblxuY29uc3QgbGlnaHRDb2xvcnMgPSBbXG4gIFwiI0MzQzNBMlwiLCAvL2xpZ2h0IG5vcm1hbFxuICBcIiNmMEEwNjdcIiwgLy9saWdodCBmaXJlXG4gIFwiIzY4QjBGMFwiLCAvL2xpZ2h0IHdhdGVyXG4gIFwiIzk3Qzg3RVwiLCAvL2xpZ2h0IGdyYXNzXG4gIFwiI0Y3REI2OVwiLCAvL2xpZ2h0IGVsZWN0cmljXG4gIFwiI0JDREVERVwiLCAvL2xpZ2h0IGljZVxuICBcIiNDMjYxNUNcIiwgLy9saWdodCBmaWdodGluZ1xuICBcIiNBNDY0QTRcIiwgLy9saWdodCBwb2lzb25cbiAgXCIjRTJDQjhFXCIsIC8vbGlnaHQgZ3JvdW5kXG4gIFwiI0M0QjRGNFwiLCAvL2xpZ2h0IGZseWluZ1xuICBcIiNGOTdmQTRcIiwgLy9saWdodCBwc3ljaGljXG4gIFwiI0IzQkI2N1wiLCAvL2xpZ2h0IGJ1Z1xuICBcIiNCOUFBNkJcIiwgLy9saWdodCByb2NrXG4gIFwiIzgyNzQ5OVwiLCAvL2xpZ2h0IGdob3N0XG4gIFwiIzc3Njk1RlwiLCAvL2xpZ2h0IGRhcmtcbiAgXCIjOTE2NkY5XCIsIC8vbGlnaHQgZHJhZ29uXG4gIFwiI0NGQ0ZENVwiLCAvL2xpZ2h0IHN0ZWVsXG4gIFwiI0YxQ0FDRVwiLCAvL2xpZ2h0IGZhaXJ5XG5dO1xuXG4vL0V2ZW50IExpc3RlbmVyc1xuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIGdldFBva2Vtb24oc2VhcmNoVmFsdWUpO1xufSk7XG5cbi8vRnVuY3Rpb25hbGl0eVxuYXN5bmMgZnVuY3Rpb24gZ2V0UG9rZW1vbihpZGVudGlmaWVyKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aWRlbnRpZmllcn1gKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBjcmVhdGVQb2tlbW9uKHJlc3BvbnNlKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1Bva2Vtb24ocmVzcG9uc2UpIHtcbiAgY29uc3QgdGFpbG9yZWRQb2tlbW9uID0ge1xuICAgIGlkOiByZXNwb25zZS5pZCxcbiAgICBuYW1lOiByZXNwb25zZS5uYW1lLFxuICAgIHNwcml0ZTogcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0LFxuICAgIG1vdmVzOiBoYW5kbGVNb3ZlcyhyZXNwb25zZSksXG4gICAgdHlwZXM6IGhhbmRsZVR5cGVzKHJlc3BvbnNlKSxcbiAgfTtcbiAgcmV0dXJuIHRhaWxvcmVkUG9rZW1vbjtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTW92ZXMocmVzcG9uc2UpIHtcbiAgY29uc3QgbW92ZXMgPSBbXTtcblxuICBpZiAocmVzcG9uc2UubW92ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1swXS5tb3ZlLm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBtb3Zlcy5wdXNoKHJlc3BvbnNlLm1vdmVzW2ldLm1vdmUubmFtZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtb3Zlcztcbn1cblxuZnVuY3Rpb24gaGFuZGxlVHlwZXMocmVzcG9uc2UpIHtcbiAgY29uc3QgdHlwZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS50eXBlcy5sZW5ndGg7IGkrKykge1xuICAgIHR5cGVzLnB1c2gocmVzcG9uc2UudHlwZXNbaV0udHlwZS5uYW1lKTtcbiAgfVxuICByZXR1cm4gdHlwZXM7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUJhY2tncm91bmQodHlwaW5nKSB7XG4gIGxldCBncmFkaWVudEJnO1xuXG4gIGlmICh0eXBpbmcubGVuZ3RoID09PSAyKSB7XG4gICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgIGxldCBwcmltYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhPbmVdO1xuXG4gICAgbGV0IGluZGV4VHdvID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMV0pO1xuICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGNvbG9yc1tpbmRleFR3b107XG5cbiAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfSlgO1xuICB9IGVsc2Uge1xuICAgIGxldCBpbmRleE9uZSA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzBdKTtcbiAgICBsZXQgcHJpbWFyeUNvbG9yID0gY29sb3JzW2luZGV4T25lXTtcblxuICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGxpZ2h0Q29sb3JzW2luZGV4T25lXTtcbiAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfSlgO1xuICB9XG5cbiAgY29udGFpbmVySW5mby5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBncmFkaWVudEJnO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQb2tlbW9uKHJlc3BvbnNlKSB7XG4gIGNvbnN0IHBva2Vtb24gPSBwcm9jZXNzUG9rZW1vbihyZXNwb25zZSk7XG5cbiAgaGFuZGxlQmFja2dyb3VuZChwb2tlbW9uLnR5cGVzKTtcbiAgaGFuZGxlRG9tTWFpbkluZm8ocG9rZW1vbik7XG59XG5cbmZ1bmN0aW9uIGVtcHR5Tm9kZShwYXJlbnQpIHtcbiAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgcGFyZW50LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRG9tTWFpbkluZm8ocG9rZW1vbikge1xuICBlbXB0eU5vZGUoY29udGFpbmVyUG9rZWJhbGxUb3ApO1xuICBjb25zdCBiYXNpY0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBwb2tlbW9uTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgY29uc3QgcG9rZW1vblNwcml0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIGNvbnN0IHBva2Vtb25UeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuXG4gIHBva2Vtb25OYW1lLnRleHRDb250ZW50ID0gcG9rZW1vbi5uYW1lO1xuICBwb2tlbW9uU3ByaXRlLnNyYyA9IHBva2Vtb24uc3ByaXRlO1xuICBwb2tlbW9uVHlwZS50ZXh0Q29udGVudCA9XG4gICAgcG9rZW1vbi50eXBlcy5sZW5ndGggPiAxXG4gICAgICA/IGAke3Bva2Vtb24udHlwZXNbMF19IC8gJHtwb2tlbW9uLnR5cGVzWzFdfWBcbiAgICAgIDogYCR7cG9rZW1vbi50eXBlc1swXX1gO1xuXG4gIGJhc2ljSW5mb0NvbnRhaW5lci5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWNcIjtcbiAgcG9rZW1vbk5hbWUuaWQgPSBcImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLW5hbWVcIjtcbiAgcG9rZW1vblNwcml0ZS5pZCA9IFwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtaW1nXCI7XG4gIHBva2Vtb25UeXBlLmlkID0gXCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy10eXBlXCI7XG5cbiAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25OYW1lKTtcbiAgYmFzaWNJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25TcHJpdGUpO1xuICBiYXNpY0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblR5cGUpO1xuXG4gIGNvbnRhaW5lclBva2ViYWxsVG9wLmFwcGVuZENoaWxkKGJhc2ljSW5mb0NvbnRhaW5lcik7XG59XG5cbi8vIHtcbi8vICAgLyogPGRpdiBpZD1cImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljXCI+XG4vLyAgICAgICAgICAgICAgIDxoMSBpZD1cImluZm8tcG9rZWJhbGwtdG9wLWJhc2ljLW5hbWVcIj5DaGFyaXphcmQ8L2gxPlxuLy8gICAgICAgICAgICAgICA8aW1nXG4vLyAgICAgICAgICAgICAgICAgaWQ9XCJpbmZvLXBva2ViYWxsLXRvcC1iYXNpYy1pbWdcIlxuLy8gICAgICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Qb2tlQVBJL3Nwcml0ZXMvbWFzdGVyL3Nwcml0ZXMvcG9rZW1vbi82LnBuZ1wiXG4vLyAgICAgICAgICAgICAgICAgYWx0PVwiXCJcbi8vICAgICAgICAgICAgICAgLz5cbi8vICAgICAgICAgICAgICAgPGgzIGlkPVwiaW5mby1wb2tlYmFsbC10b3AtYmFzaWMtdHlwZVwiPkZseWluZyAvIEZpcmU8L2gzPlxuLy8gICAgICAgICAgICAgPC9kaXY+ICovXG4vLyB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=