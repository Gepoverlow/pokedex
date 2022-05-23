/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
const searchPokemon = document.getElementById("pokemon-search-button");

async function getPokemon(identifier) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const response = await data.json();

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

  for (let i = 0; i < 4; i++) {
    moves.push(response.moves[i].move.name);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0EsZ0VBQWdFLFdBQVc7QUFDM0U7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VkZXgvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaFBva2Vtb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBva2Vtb24tc2VhcmNoLWJ1dHRvblwiKTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0UG9rZW1vbihpZGVudGlmaWVyKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aWRlbnRpZmllcn1gKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICBwcm9jZXNzUG9rZW1vbihyZXNwb25zZSk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NQb2tlbW9uKHJlc3BvbnNlKSB7XG4gIGNvbnN0IHRhaWxvcmVkUG9rZW1vbiA9IHtcbiAgICBpZDogcmVzcG9uc2UuaWQsXG4gICAgbmFtZTogcmVzcG9uc2UubmFtZSxcbiAgICBzcHJpdGU6IHJlc3BvbnNlLnNwcml0ZXMuZnJvbnRfZGVmYXVsdCxcbiAgICBtb3ZlczogaGFuZGxlTW92ZXMocmVzcG9uc2UpLFxuICB9O1xuICBjb25zb2xlLmxvZyh0YWlsb3JlZFBva2Vtb24pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVNb3ZlcyhyZXNwb25zZSkge1xuICBjb25zdCBtb3ZlcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgbW92ZXMucHVzaChyZXNwb25zZS5tb3Zlc1tpXS5tb3ZlLm5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIG1vdmVzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQb2tlbW9uKCkge31cblxuc2VhcmNoUG9rZW1vbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGxldCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9rZW1vbi1zZWFyY2gtaW5wdXRcIikudmFsdWU7XG4gIGdldFBva2Vtb24oc2VhcmNoVmFsdWUpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=