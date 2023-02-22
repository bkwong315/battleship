import GameBoard from './GameBoard';

test('Place ship on valid spaces', () => {
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
