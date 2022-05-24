class Pokemon {
  constructor(response) {
    this.id = response.id;
    this.name = response.name;
    this.sprite = response.sprites.front_default;
    this.moves = this.handleMoves(response);
    this.types = this.handleTypes(response);
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
}

export default Pokemon;
