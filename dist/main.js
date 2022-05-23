/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
const searchPokemon = document.getElementById("pokemon-search-button");

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
  "psyshic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
];

const colors = [
  "#A8A878", //
  "#F08030", //
  "#6890F0", //
  "#78C850", //
  "#F8D030", //
  "#98D8D8", //
  "#C03028", //
  "#A040A0", //
  "#E0C068", //
  "#A890F0", //
  "#F85888", //
  "#A8B820", //
  "#B8A038", //
  "#705898", //
  "#705848", //
  "#7038F8", //
  "#B8B8D0", //
  "#F0B6BC", //
];

const lightColors = [
  "#C3C3A2", //
  "#f0A067", //
  "#68B0F0", //
  "#97C87E", //
  "#F7DB69", //
  "#BCDEDE", //
  "#C2615C", //
  "#A464A4", //
  "#E2CB8E", //
  "#C4B4F4", //
  "#F97fA4", //
  "#B3BB67", //
  "#B9AA6B", //
  "#827499", //
  "#77695F", //
  "#9166F9", //
  "#CFCFD5", //
  "#F1CACE", //
];

async function getPokemon(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const response = await data.json();

  console.log(response);
  processPokemon(response);
}

function processPokemon(response) {
  const tailoredPokemon = {
    id: response.id,
    name: response.name,
    sprite: response.sprites.front_default,
    moves: handleMoves(response),
    types: handleTypes(response),
  };
  console.log(tailoredPokemon);
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
  console.log(types);
  return types;
}

function handleBackground(typing) {
  let gradientBg;

  if (types.length > 1) {
    let indexOne = types.indexOf(typing[0]);
    let primaryColor = colors[indexOne];

    let indexTwo = types.indexOf(typing[1]);
    let secondaryColor = colors[indexTwo];

    gradientBg = `linear-gradient(to right, ${primaryColor}, ${secondaryColor};`;
  } else {
    let indexOne = types.indexOf(typing[0]);
    let primaryColor = colors[indexOne];

    let secondaryColor = colors[indexTwo];
    gradientBg = `linear-gradient(to right, ${primaryColor}, ${secondaryColor};`;
  }

  console.log(gradientBg);
}

function createPokemon() {}

searchPokemon.addEventListener("click", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("pokemon-search-input").value;
  getPokemon(searchValue);
});

handleBackground(["normal", "fairy"]);

//  "#F08030", "#6890F0",

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0VBQWdFLFdBQVc7QUFDM0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSixvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4Q0FBOEMsYUFBYSxJQUFJLGdCQUFnQjtBQUMvRSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxhQUFhLElBQUksZ0JBQWdCO0FBQy9FOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VkZXgvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaFBva2Vtb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWJ1dHRvblwiKTtcblxuY29uc3QgdHlwZXMgPSBbXG4gIFwibm9ybWFsXCIsXG4gIFwiZmlyZVwiLFxuICBcIndhdGVyXCIsXG4gIFwiZ3Jhc3NcIixcbiAgXCJlbGVjdHJpY1wiLFxuICBcImljZVwiLFxuICBcImZpZ2h0aW5nXCIsXG4gIFwicG9pc29uXCIsXG4gIFwiZ3JvdW5kXCIsXG4gIFwiZmx5aW5nXCIsXG4gIFwicHN5c2hpY1wiLFxuICBcImJ1Z1wiLFxuICBcInJvY2tcIixcbiAgXCJnaG9zdFwiLFxuICBcImRhcmtcIixcbiAgXCJkcmFnb25cIixcbiAgXCJzdGVlbFwiLFxuICBcImZhaXJ5XCIsXG5dO1xuXG5jb25zdCBjb2xvcnMgPSBbXG4gIFwiI0E4QTg3OFwiLCAvL1xuICBcIiNGMDgwMzBcIiwgLy9cbiAgXCIjNjg5MEYwXCIsIC8vXG4gIFwiIzc4Qzg1MFwiLCAvL1xuICBcIiNGOEQwMzBcIiwgLy9cbiAgXCIjOThEOEQ4XCIsIC8vXG4gIFwiI0MwMzAyOFwiLCAvL1xuICBcIiNBMDQwQTBcIiwgLy9cbiAgXCIjRTBDMDY4XCIsIC8vXG4gIFwiI0E4OTBGMFwiLCAvL1xuICBcIiNGODU4ODhcIiwgLy9cbiAgXCIjQThCODIwXCIsIC8vXG4gIFwiI0I4QTAzOFwiLCAvL1xuICBcIiM3MDU4OThcIiwgLy9cbiAgXCIjNzA1ODQ4XCIsIC8vXG4gIFwiIzcwMzhGOFwiLCAvL1xuICBcIiNCOEI4RDBcIiwgLy9cbiAgXCIjRjBCNkJDXCIsIC8vXG5dO1xuXG5jb25zdCBsaWdodENvbG9ycyA9IFtcbiAgXCIjQzNDM0EyXCIsIC8vXG4gIFwiI2YwQTA2N1wiLCAvL1xuICBcIiM2OEIwRjBcIiwgLy9cbiAgXCIjOTdDODdFXCIsIC8vXG4gIFwiI0Y3REI2OVwiLCAvL1xuICBcIiNCQ0RFREVcIiwgLy9cbiAgXCIjQzI2MTVDXCIsIC8vXG4gIFwiI0E0NjRBNFwiLCAvL1xuICBcIiNFMkNCOEVcIiwgLy9cbiAgXCIjQzRCNEY0XCIsIC8vXG4gIFwiI0Y5N2ZBNFwiLCAvL1xuICBcIiNCM0JCNjdcIiwgLy9cbiAgXCIjQjlBQTZCXCIsIC8vXG4gIFwiIzgyNzQ5OVwiLCAvL1xuICBcIiM3NzY5NUZcIiwgLy9cbiAgXCIjOTE2NkY5XCIsIC8vXG4gIFwiI0NGQ0ZENVwiLCAvL1xuICBcIiNGMUNBQ0VcIiwgLy9cbl07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb24oaWRlbnRpZmllcikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkZW50aWZpZXJ9YCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICBwcm9jZXNzUG9rZW1vbihyZXNwb25zZSk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NQb2tlbW9uKHJlc3BvbnNlKSB7XG4gIGNvbnN0IHRhaWxvcmVkUG9rZW1vbiA9IHtcbiAgICBpZDogcmVzcG9uc2UuaWQsXG4gICAgbmFtZTogcmVzcG9uc2UubmFtZSxcbiAgICBzcHJpdGU6IHJlc3BvbnNlLnNwcml0ZXMuZnJvbnRfZGVmYXVsdCxcbiAgICBtb3ZlczogaGFuZGxlTW92ZXMocmVzcG9uc2UpLFxuICAgIHR5cGVzOiBoYW5kbGVUeXBlcyhyZXNwb25zZSksXG4gIH07XG4gIGNvbnNvbGUubG9nKHRhaWxvcmVkUG9rZW1vbik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1vdmVzKHJlc3BvbnNlKSB7XG4gIGNvbnN0IG1vdmVzID0gW107XG5cbiAgaWYgKHJlc3BvbnNlLm1vdmVzLmxlbmd0aCA9PT0gMSkge1xuICAgIG1vdmVzLnB1c2gocmVzcG9uc2UubW92ZXNbMF0ubW92ZS5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1tpXS5tb3ZlLm5hbWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbW92ZXM7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVR5cGVzKHJlc3BvbnNlKSB7XG4gIGNvbnN0IHR5cGVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2UudHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICB0eXBlcy5wdXNoKHJlc3BvbnNlLnR5cGVzW2ldLnR5cGUubmFtZSk7XG4gIH1cbiAgY29uc29sZS5sb2codHlwZXMpO1xuICByZXR1cm4gdHlwZXM7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUJhY2tncm91bmQodHlwaW5nKSB7XG4gIGxldCBncmFkaWVudEJnO1xuXG4gIGlmICh0eXBlcy5sZW5ndGggPiAxKSB7XG4gICAgbGV0IGluZGV4T25lID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMF0pO1xuICAgIGxldCBwcmltYXJ5Q29sb3IgPSBjb2xvcnNbaW5kZXhPbmVdO1xuXG4gICAgbGV0IGluZGV4VHdvID0gdHlwZXMuaW5kZXhPZih0eXBpbmdbMV0pO1xuICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGNvbG9yc1tpbmRleFR3b107XG5cbiAgICBncmFkaWVudEJnID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtwcmltYXJ5Q29sb3J9LCAke3NlY29uZGFyeUNvbG9yfTtgO1xuICB9IGVsc2Uge1xuICAgIGxldCBpbmRleE9uZSA9IHR5cGVzLmluZGV4T2YodHlwaW5nWzBdKTtcbiAgICBsZXQgcHJpbWFyeUNvbG9yID0gY29sb3JzW2luZGV4T25lXTtcblxuICAgIGxldCBzZWNvbmRhcnlDb2xvciA9IGNvbG9yc1tpbmRleFR3b107XG4gICAgZ3JhZGllbnRCZyA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7cHJpbWFyeUNvbG9yfSwgJHtzZWNvbmRhcnlDb2xvcn07YDtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGdyYWRpZW50QmcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQb2tlbW9uKCkge31cblxuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIGdldFBva2Vtb24oc2VhcmNoVmFsdWUpO1xufSk7XG5cbmhhbmRsZUJhY2tncm91bmQoW1wibm9ybWFsXCIsIFwiZmFpcnlcIl0pO1xuXG4vLyAgXCIjRjA4MDMwXCIsIFwiIzY4OTBGMFwiLFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9