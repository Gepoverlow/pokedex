/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
const searchPokemon = document.getElementById("pokemon-search-button");

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

function createPokemon() {}

searchPokemon.addEventListener("click", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("pokemon-search-input").value;
  getPokemon(searchValue);
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0EsZ0VBQWdFLFdBQVc7QUFDM0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VkZXgvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaFBva2Vtb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWJ1dHRvblwiKTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0UG9rZW1vbihpZGVudGlmaWVyKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aWRlbnRpZmllcn1gKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gIHByb2Nlc3NQb2tlbW9uKHJlc3BvbnNlKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1Bva2Vtb24ocmVzcG9uc2UpIHtcbiAgY29uc3QgdGFpbG9yZWRQb2tlbW9uID0ge1xuICAgIGlkOiByZXNwb25zZS5pZCxcbiAgICBuYW1lOiByZXNwb25zZS5uYW1lLFxuICAgIHNwcml0ZTogcmVzcG9uc2Uuc3ByaXRlcy5mcm9udF9kZWZhdWx0LFxuICAgIG1vdmVzOiBoYW5kbGVNb3ZlcyhyZXNwb25zZSksXG4gIH07XG4gIGNvbnNvbGUubG9nKHRhaWxvcmVkUG9rZW1vbik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1vdmVzKHJlc3BvbnNlKSB7XG4gIGNvbnN0IG1vdmVzID0gW107XG5cbiAgaWYgKHJlc3BvbnNlLm1vdmVzLmxlbmd0aCA9PT0gMSkge1xuICAgIG1vdmVzLnB1c2gocmVzcG9uc2UubW92ZXNbMF0ubW92ZS5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1tpXS5tb3ZlLm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtb3Zlcztcbn1cblxuZnVuY3Rpb24gY3JlYXRlUG9rZW1vbigpIHt9XG5cbnNlYXJjaFBva2Vtb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBsZXQgc2VhcmNoVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWlucHV0XCIpLnZhbHVlO1xuICBnZXRQb2tlbW9uKHNlYXJjaFZhbHVlKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9