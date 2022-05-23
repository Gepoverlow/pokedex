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
