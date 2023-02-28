import Player from '../Player/Player';

const Game = () => {
  const player = Player('Name');
  const computer = Player('Comp');

  const getPlayerName = () => player.getName();
  const setPlayerName = (name: string) => player.setName(name);

  const getPlayerBoard = () => player.getBoard();
  const getComputerBoard = () => computer.getBoard();

  const playTurn = (coords: number[]) => {
    computer.receiveAttack(coords);
  };

  return {
    getPlayerName,
    setPlayerName,
    getPlayerBoard,
    getComputerBoard,
    playTurn,
  };
};

export default Game;
