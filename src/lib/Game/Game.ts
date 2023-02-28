import Player from '../Player/Player';

const Game = () => {
  const player = Player('Name');
  const computer = Player('Comp');

  const getPlayerName = () => player.getName();
  const setPlayerName = (name: string) => player.setName(name);

  const getPlayerBoard = () => player.getBoard();
  const getComputerBoard = () => computer.getBoard();

  const playTurn = (coords: number[]) => {
    if (!isGameOver()) computer.receiveAttack(coords);
    if (!isGameOver()) player.receiveAttack(getComputerAttack());
  };

  const getComputerAttack = () => {
    const prevShots = getPlayerBoard().getData().allShots;
    let targetCoords = [getRandomInt(10), getRandomInt(10)];

    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }

    while (
      prevShots.some(
        (coords) =>
          targetCoords[0] === coords[0] && targetCoords[1] === coords[1]
      )
    ) {
      targetCoords = [getRandomInt(10), getRandomInt(10)];
    }

    return targetCoords;
  };

  const isGameOver = () =>
    getPlayerBoard().isFleetDestroyed() ||
    getComputerBoard().isFleetDestroyed();

  return {
    getPlayerName,
    setPlayerName,
    getPlayerBoard,
    getComputerBoard,
    playTurn,
  };
};

export default Game;
