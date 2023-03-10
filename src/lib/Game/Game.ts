import Player from '../Player/Player';

const Game = () => {
  let player = Player('');
  let computer = Player('Comp');
  let gameStarted = false;

  const getPlayerName = () => player.getName();
  const setPlayerName = (name: string) => player.setName(name);

  const getPlayerBoard = () => player.getBoard();
  const getComputerBoard = () => computer.getBoard();

  const isGameStarted = () => gameStarted;

  const placePlayerShip = (
    coords: [number, number],
    dir: string,
    shipType: string
  ) => player.placeShip(coords, dir, shipType);

  const startGame = () => {
    for (const shipType in player.getBoard().getData().ships) {
      if (
        player.getBoard().getData().ships[shipType].getLocation().length === 0
      ) {
        throw new Error('Not all ships are deployed.');
      }
    }

    gameStarted = true;
  };

  const resetGame = () => {
    player = Player(player.getName());
    computer = Player('Comp');

    gameStarted = false;
  };

  const playTurn = (coords: number[]) => {
    if (!gameStarted) {
      console.log('Game has not started yet.');
      return;
    }
    if (isGameOver()) {
      console.log('Game over! No moves can be made.');
      return;
    }

    computer.receiveAttack(coords);
    if (isGameOver()) {
      console.log('Game over, you win!');
      return;
    }

    player.receiveAttack(getComputerAttack());
    if (isGameOver()) {
      console.log('Game over, you lose!');
    }
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

  const getWinner = () => {
    if (getPlayerBoard().isFleetDestroyed()) return 'computer';
    if (getComputerBoard().isFleetDestroyed()) return 'player';

    return 'game not over';
  };

  return {
    getPlayerName,
    setPlayerName,
    getPlayerBoard,
    getComputerBoard,
    playTurn,
    placePlayerShip,
    isGameStarted,
    startGame,
    resetGame,
    getWinner,
    isGameOver,
  };
};

export default Game;
