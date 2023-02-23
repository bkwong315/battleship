import GameBoard from './GameBoard';

describe('Testing placeShip method', () => {
  test('Place ship on valid coords', () => {
    const gameBoard = GameBoard();

    gameBoard.placeShip([0, 0], 'down', 'carrier');

    expect(gameBoard.getData().ships['carrier'].getLocation()).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ]);
  });

  test('Place ship on invalid starting coords', () => {
    const gameBoard = GameBoard();

    expect(() => {
      gameBoard.placeShip([-1, 7], 'down', 'submarine');
    }).toThrow(
      'Invalid coords. Coords must be of the following format [0-6,0-6].'
    );
  });

  test('Place ship on valid starting coords, but extends out of bounds', () => {
    const gameBoard = GameBoard();

    expect(() => {
      gameBoard.placeShip([5, 6], 'right', 'submarine');
    }).toThrow('Invalid coords. Coords must be between 0-6 for both axes.');
  });
});

describe('Testing receiveAttack method', () => {
  test('Invalid coords', () => {
    const gameBoard = GameBoard();

    gameBoard.placeShip([2, 2], 'right', 'cruiser');

    expect(() => {
      gameBoard.receiveAttack([7, 1]);
    }).toThrow(
      'Invalid coords. Coords must be of the following format [0-6,0-6].'
    );
  });

  test('Repeat coords', () => {
    const gameBoard = GameBoard();

    gameBoard.placeShip([2, 2], 'right', 'cruiser');
    gameBoard.receiveAttack([2, 2]);

    expect(() => {
      gameBoard.receiveAttack([2, 2]);
    }).toThrow('Invalid coords. Cannot attack the same coords twice.');
  });

  test('Receive hit', () => {
    const gameBoard = GameBoard();

    gameBoard.placeShip([2, 2], 'right', 'cruiser');

    expect(gameBoard.receiveAttack([2, 2])).toEqual('hit');
  });

  test('Receive miss', () => {
    const gameBoard = GameBoard();

    gameBoard.placeShip([1, 4], 'right', 'destroyer');

    expect(gameBoard.receiveAttack([0, 0])).toEqual('miss');
    expect(gameBoard.getData().missedShots).toEqual([[0, 0]]);
  });
});

describe('Testing isFleetDestroyed method', () => {
  test('One ship sunk', () => {
    const gameBoard = GameBoard();

    gameBoard.placeShip([0, 0], 'right', 'carrier');

    const ship = gameBoard.getData().ships['carrier'];
    for (let col = 0; col < ship.getLength(); col++) {
      gameBoard.receiveAttack([0, col]);
    }

    expect(gameBoard.isFleetDestroyed()).toBe(false);
  });
  test('All ships sunk', () => {
    const gameBoard = GameBoard();

    gameBoard.placeShip([0, 0], 'right', 'carrier');
    gameBoard.placeShip([1, 0], 'right', 'battleship');
    gameBoard.placeShip([2, 0], 'right', 'cruiser');
    gameBoard.placeShip([3, 0], 'right', 'submarine');
    gameBoard.placeShip([4, 0], 'right', 'destroyer');

    let row = 0;
    for (const shipType in gameBoard.getData().ships) {
      const ship = gameBoard.getData().ships[shipType];
      for (let col = 0; col < ship.getLength(); col++) {
        gameBoard.receiveAttack([row, col]);
      }
      row++;
    }

    expect(gameBoard.isFleetDestroyed()).toBe(true);
  });
});
