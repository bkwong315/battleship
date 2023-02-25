import Player from './Player';

test('Test sendAttack method', () => {
  const p1 = Player('p1');

  expect(p1.sendAttack([0, 0])).toStrictEqual({ sender: 'p1', coords: [0, 0] });
});

test('Player name set and get', () => {
  const p1 = Player('p1');

  p1.setName('New Name');

  expect(p1.getName()).toBe('New Name');
});
