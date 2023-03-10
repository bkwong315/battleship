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

test('Start game (success)', () => {
  const game = Game();

  game.placePlayerShip([0, 0], 'right', 'carrier');
  game.placePlayerShip([1, 0], 'right', 'battleship');
  game.placePlayerShip([2, 0], 'right', 'cruiser');
  game.placePlayerShip([3, 0], 'right', 'submarine');
  game.placePlayerShip([4, 0], 'right', 'destroyer');

  game.startGame();

  expect(game.isGameStarted()).toBe(true);
});

test('Reset game', () => {
  const game = Game();

  game.placePlayerShip([0, 0], 'right', 'carrier');
  game.placePlayerShip([1, 0], 'right', 'battleship');
  game.placePlayerShip([2, 0], 'right', 'cruiser');
  game.placePlayerShip([3, 0], 'right', 'submarine');
  game.placePlayerShip([4, 0], 'right', 'destroyer');

  game.startGame();
  game.resetGame();

  expect(game.isGameStarted()).toBe(false);
});

describe('Test get winner method', () => {
  test('Player winner.', () => {
    const game = Game();

    game.placePlayerShip([0, 0], 'right', 'carrier');
    game.placePlayerShip([1, 0], 'right', 'battleship');
    game.placePlayerShip([2, 0], 'right', 'cruiser');
    game.placePlayerShip([3, 0], 'right', 'submarine');
    game.placePlayerShip([4, 0], 'right', 'destroyer');

    game.getComputerBoard().placeShip([0, 0], 'right', 'carrier');
    game.getComputerBoard().placeShip([1, 0], 'right', 'battleship');
    game.getComputerBoard().placeShip([2, 0], 'right', 'cruiser');
    game.getComputerBoard().placeShip([3, 0], 'right', 'submarine');
    game.getComputerBoard().placeShip([4, 0], 'right', 'destroyer');

    const gameBoard = game.getComputerBoard();

    game.startGame();
    let row = 0;
    for (const shipType in gameBoard.getData().ships) {
      const ship = gameBoard.getData().ships[shipType];
      for (let col = 0; col < ship.getLength(); col++) {
        game.playTurn([row, col]);
      }
      row++;
    }

    expect(game.getWinner()).toBe('player');
  });

  test('Computer winner.', () => {
    const game = Game();

    game.placePlayerShip([0, 0], 'right', 'carrier');
    game.placePlayerShip([1, 0], 'right', 'battleship');
    game.placePlayerShip([2, 0], 'right', 'cruiser');
    game.placePlayerShip([3, 0], 'right', 'submarine');
    game.placePlayerShip([4, 0], 'right', 'destroyer');

    const gameBoard = game.getPlayerBoard();

    let row = 0;
    for (const shipType in gameBoard.getData().ships) {
      const ship = gameBoard.getData().ships[shipType];
      for (let col = 0; col < ship.getLength(); col++) {
        gameBoard.receiveAttack([row, col]);
      }
      row++;
    }

    expect(game.getWinner()).toBe('computer');
  });
});
