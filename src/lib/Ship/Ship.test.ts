import Ship from './Ship';

test('Ship is not sunk by default', () => {
  const carrier = Ship(5);

  expect(carrier.isSunk()).toBe(false);
});

test('Ship is sunk when the number of hits is equal to ship length', () => {
  const destroyer = Ship(5);

  while (!destroyer.isSunk()) {
    destroyer.hit();
  }

  expect(destroyer.isSunk()).toBe(true);
});
