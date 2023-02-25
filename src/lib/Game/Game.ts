import Player from '../Player/Player';

const Game = () => {
  const player = Player('Name');

  const getPlayerName = () => player.getName();
  const setPlayerName = (name: string) => player.setName(name);

  return { getPlayerName, setPlayerName };
};

export default Game;
