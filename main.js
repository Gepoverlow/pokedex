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
  "#A8A878",
  "#F08030",
  "#6890F0",
  "#78C850",
  "#F8D030",
  "#98D8D8",
  "#C03028",
  "#A040A0",
  "#E0C068",
  "#A890F0",
  "#F85888",
  "#A8B820",
  "#B8A038",
  "#705898",
  "#705848",
  "#7038F8",
  "#B8B8D0",
  "#F0B6BC",
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

function handleBackground(types) {
  let gradientBg = "";

  if (types.length > 1) {
    gradientBg = ``;
  }
}

function createPokemon() {}

searchPokemon.addEventListener("click", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("pokemon-search-input").value;
  getPokemon(searchValue);
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdFQUFnRSxXQUFXO0FBQzNFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VkZXgvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaFBva2Vtb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWJ1dHRvblwiKTtcblxuY29uc3QgdHlwZXMgPSBbXG4gIFwibm9ybWFsXCIsXG4gIFwiZmlyZVwiLFxuICBcIndhdGVyXCIsXG4gIFwiZ3Jhc3NcIixcbiAgXCJlbGVjdHJpY1wiLFxuICBcImljZVwiLFxuICBcImZpZ2h0aW5nXCIsXG4gIFwicG9pc29uXCIsXG4gIFwiZ3JvdW5kXCIsXG4gIFwiZmx5aW5nXCIsXG4gIFwicHN5c2hpY1wiLFxuICBcImJ1Z1wiLFxuICBcInJvY2tcIixcbiAgXCJnaG9zdFwiLFxuICBcImRhcmtcIixcbiAgXCJkcmFnb25cIixcbiAgXCJzdGVlbFwiLFxuICBcImZhaXJ5XCIsXG5dO1xuXG5jb25zdCBjb2xvcnMgPSBbXG4gIFwiI0E4QTg3OFwiLFxuICBcIiNGMDgwMzBcIixcbiAgXCIjNjg5MEYwXCIsXG4gIFwiIzc4Qzg1MFwiLFxuICBcIiNGOEQwMzBcIixcbiAgXCIjOThEOEQ4XCIsXG4gIFwiI0MwMzAyOFwiLFxuICBcIiNBMDQwQTBcIixcbiAgXCIjRTBDMDY4XCIsXG4gIFwiI0E4OTBGMFwiLFxuICBcIiNGODU4ODhcIixcbiAgXCIjQThCODIwXCIsXG4gIFwiI0I4QTAzOFwiLFxuICBcIiM3MDU4OThcIixcbiAgXCIjNzA1ODQ4XCIsXG4gIFwiIzcwMzhGOFwiLFxuICBcIiNCOEI4RDBcIixcbiAgXCIjRjBCNkJDXCIsXG5dO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uKGlkZW50aWZpZXIpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpZGVudGlmaWVyfWApO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgcHJvY2Vzc1Bva2Vtb24ocmVzcG9uc2UpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzUG9rZW1vbihyZXNwb25zZSkge1xuICBjb25zdCB0YWlsb3JlZFBva2Vtb24gPSB7XG4gICAgaWQ6IHJlc3BvbnNlLmlkLFxuICAgIG5hbWU6IHJlc3BvbnNlLm5hbWUsXG4gICAgc3ByaXRlOiByZXNwb25zZS5zcHJpdGVzLmZyb250X2RlZmF1bHQsXG4gICAgbW92ZXM6IGhhbmRsZU1vdmVzKHJlc3BvbnNlKSxcbiAgICB0eXBlczogaGFuZGxlVHlwZXMocmVzcG9uc2UpLFxuICB9O1xuICBjb25zb2xlLmxvZyh0YWlsb3JlZFBva2Vtb24pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVNb3ZlcyhyZXNwb25zZSkge1xuICBjb25zdCBtb3ZlcyA9IFtdO1xuXG4gIGlmIChyZXNwb25zZS5tb3Zlcy5sZW5ndGggPT09IDEpIHtcbiAgICBtb3Zlcy5wdXNoKHJlc3BvbnNlLm1vdmVzWzBdLm1vdmUubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIG1vdmVzLnB1c2gocmVzcG9uc2UubW92ZXNbaV0ubW92ZS5uYW1lKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1vdmVzO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVUeXBlcyhyZXNwb25zZSkge1xuICBjb25zdCB0eXBlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLnR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdHlwZXMucHVzaChyZXNwb25zZS50eXBlc1tpXS50eXBlLm5hbWUpO1xuICB9XG4gIGNvbnNvbGUubG9nKHR5cGVzKTtcbiAgcmV0dXJuIHR5cGVzO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVCYWNrZ3JvdW5kKHR5cGVzKSB7XG4gIGxldCBncmFkaWVudEJnID0gXCJcIjtcblxuICBpZiAodHlwZXMubGVuZ3RoID4gMSkge1xuICAgIGdyYWRpZW50QmcgPSBgYDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQb2tlbW9uKCkge31cblxuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIGdldFBva2Vtb24oc2VhcmNoVmFsdWUpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=