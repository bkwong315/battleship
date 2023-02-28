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

  const compBoard = game.getComputerBoard();
  compBoard.placeShip([0, 0], 'right', 'carrier');
  game.playTurn([0, 0]);

  for (let i = 1; i < 5; i++) {
    compBoard.receiveAttack([0, i]);
  }

  expect(game.getComputerBoard().getData().ships['carrier'].isSunk()).toBe(
    true
  );
});
