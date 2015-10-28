import assert from 'assert';
import {Game, player} from '../src/game';

describe('initial state', () => {
  let p1, p2, game;
  
  before(() => {
    p1 = player('Phil', []);
    p2 = player('fender', []);
  });
  
  it('should create a new game object', () => {
    game = new Game(p1, p2); 
    assert(typeof game, 'object');
    assert(game.p1, p1);
    assert(game.p2, p2);
    assert.deepEqual(game.turns, 0);
  });
  
  it('should be p1 going first from coin toss', () => {
    const rng = 1;
    game.coinToss(rng);
    assert.deepEqual(game.currentPlayer, game.p1);
    assert.deepEqual(game.otherPlayer, game.p2);
  });
  
  it('should be p2 going first from coin toss', () => {
    const rng = 0;
    game.coinToss(rng);
    assert.deepEqual(game.currentPlayer, game.p2);
    assert.deepEqual(game.otherPlayer, game.p1);
  });
  
  it('should start the game', () => {
    game.start();
    assert.deepEqual(game.turns, 1);
    assert.deepEqual(game.currentPlayer.energy, 5);
  });
  
  it('should handle next turn', () => {
    const {currentPlayer, otherPlayer} = game;
    game.nextTurn(5);
    assert.deepEqual(game.turns, 2);
    assert(game.currentPlayer, otherPlayer);
    assert(game.otherPlayer, currentPlayer);
    assert.deepEqual(game.otherPlayer.energy, 5);
    assert.deepEqual(game.currentPlayer.energy, 5);
  });
});