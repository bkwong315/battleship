import Game from './Game';

test('Get player name', () => {
  const game = Game();

  game.setPlayerName('Test Name');

  expect(game.getPlayerName()).toBe('Test Name');
});
