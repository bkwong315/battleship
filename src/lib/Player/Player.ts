import GameBoard from '../GameBoard/GameBoard';

const Player = (pid: string) => {
  const playerId = pid;
  const gameBoard = GameBoard();

  const placeShip = (coords: [number, number], dir: string, shipType: string) =>
    gameBoard.placeShip(coords, dir, shipType);

  const sendAttack = (coords: [number, number]) => {
    return {
      sender: playerId,
      coords,
    };
  };

  return { placeShip, sendAttack };
};

export default Player;
