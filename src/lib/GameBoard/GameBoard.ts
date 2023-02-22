import Ship from '../Ship/Ship';

interface boardData {
  ships: {
    [key: string]: ReturnType<typeof Ship>;
  };
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
    missedShots: [],
  };

  const getData = () => _data;

  const placeShip = (
    coords: [number, number],
    dir: string,
    shipType: string
  ) => {
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
      newLocation.push([startRow + offSet.row * i, startCol + offSet.col * i]);
    }

    ship.setLocation(newLocation);
  };

  const receiveAttack = (coords: number[]) => {
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

    if (!hitShip) {
      _data.missedShots.push(coords);
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
