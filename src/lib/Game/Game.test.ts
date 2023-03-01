import GameBoard from '../GameBoard/GameBoard';
import Game from './Game';

test('Get player name', () => {
  const game = Game();

  game.setPlayerName('Test Name');

  expect(game.getPlayerName()).toBe('Test Name');
});

describe('Get boards', () => {
  test('Get player board', () => {
    const game = Game();

    expect(JSON.stringify(game.getPlayerBoard())).toBe(
      JSON.stringify(GameBoard())
    );
  });

  test('Get computer board', () => {
    const game = Game();

    expect(JSON.stringify(game.getPlayerBoard())).toBe(
      JSON.stringify(GameBoard())
    );
  });
});

test('Send attack', () => {
  const game = Game();

  game.placePlayerShip([0, 0], 'right', 'carrier');
  game.placePlayerShip([1, 0], 'right', 'battleship');
  game.placePlayerShip([2, 0], 'right', 'cruiser');
  game.placePlayerShip([3, 0], 'right', 'submarine');
  game.placePlayerShip([4, 0], 'right', 'destroyer');

  game.getComputerBoard().placeShip([0, 0], 'right', 'carrier');

  game.startGame();
  game.playTurn([0, 0]);
  game.playTurn([0, 1]);
  game.playTurn([0, 2]);
  game.playTurn([0, 3]);
  game.playTurn([0, 4]);

  expect(game.getComputerBoard().getData().ships['carrier'].isSunk()).toBe(
    true
  );
});

test('Start game (fail)', () => {
  const game = Game();

  game.placePlayerShip([0, 0], 'right', 'carrier');
  game.placePlayerShip([1, 0], 'right', 'battleship');
  game.placePlayerShip([2, 0], 'right', 'cruiser');
  game.placePlayerShip([3, 0], 'right', 'submarine');

  expect(() => {
    game.startGame();
  }).toThrow('Not all ships are deployed.');
});
