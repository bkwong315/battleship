import GameBoard from '../GameBoard/GameBoard';

const Player = (initialName: string) => {
  let name = initialName;
  const gameBoard = GameBoard();

  const getName = () => name;
  const setName = (newName: string) => (name = newName);
  const getBoard = () => gameBoard;

  const placeShip = (coords: [number, number], dir: string, shipType: string) =>
    gameBoard.placeShip(coords, dir, shipType);

  const sendAttack = (coords: [number, number]) => {
    return {
      sender: name,
      coords,
    };
  };

  const receiveAttack = (coords: number[]) => gameBoard.receiveAttack(coords);

  const hasLost = () => gameBoard.isFleetDestroyed();

  return {
    getName,
    setName,
    getBoard,
    placeShip,
    sendAttack,
    receiveAttack,
    hasLost,
  };
};

export default Player;
