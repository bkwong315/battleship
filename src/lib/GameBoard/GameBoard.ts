import Ship from '../Ship/Ship';

interface boardData {
  ships: {
    [key: string]: ReturnType<typeof Ship>;
  };
  allShots: number[][];
  missedShots: number[][];
}

const GameBoard = () => {
  const _data: boardData = {
    ships: {
      carrier: Ship(5),
      battleship: Ship(4),
      cruiser: Ship(3),
      submarine: Ship(3),
      destroyer: Ship(2),
    },
    allShots: [],
    missedShots: [],
  };

  const getData = () => _data;

  const placeShip = (
    coords: [number, number],
    dir: string,
    shipType: string
  ) => {
    if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {
      throw new Error(
        'Invalid coords. Coords must be of the following format [0-9,0-9].'
      );
    }
    const [startRow, startCol] = coords;

    const ship = _data.ships[shipType];

    const offSet = { row: 0, col: 0 };
    switch (dir) {
      case 'up':
        offSet.row = -1;
        break;
      case 'right':
        offSet.col = 1;
        break;
      case 'down':
        offSet.row = 1;
        break;
      case 'left':
        offSet.col = -1;
        break;
    }

    const newLocation = [];
    for (let i = 0; i < ship.getLength(); i++) {
      if (
        startRow + offSet.row * i < 0 ||
        startRow + offSet.row * i > 9 ||
        startCol + offSet.col * i < 0 ||
        startCol + offSet.col * i > 9
      ) {
        throw new Error(
          'Invalid coords. Coords must be between 0-9 for both axes.'
        );
      }
      newLocation.push([startRow + offSet.row * i, startCol + offSet.col * i]);
    }

    ship.setLocation(newLocation);
  };

  const receiveAttack = (coords: number[]) => {
    if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {
      throw new Error(
        'Invalid coords. Coords must be of the following format [0-9,0-9].'
      );
    }

    for (const prevShot of _data.allShots) {
      if (prevShot[0] === coords[0] && prevShot[1] === coords[1])
        throw new Error('Invalid coords. Cannot attack the same coords twice.');
    }

    let hitShip = false;

    for (const shipType in _data.ships) {
      const ship = _data.ships[shipType];

      for (const pos of ship.getLocation()) {
        if (pos[0] === coords[0] && pos[1] === coords[1]) {
          ship.hit();
          hitShip = true;
          break;
        }
      }

      if (hitShip) break;
    }

    _data.allShots = [..._data.allShots, coords];

    if (!hitShip) {
      _data.missedShots = [..._data.missedShots, coords];
      return 'miss';
    }

    return 'hit';
  };

  const isFleetDestroyed = () => {
    for (const shipType in _data.ships) {
      if (!_data.ships[shipType].isSunk()) {
        return false;
      }
    }
    return true;
  };

  return { placeShip, receiveAttack, isFleetDestroyed, getData };
};

export default GameBoard;
