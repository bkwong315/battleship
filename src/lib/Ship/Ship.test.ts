import Ship from './Ship';

test('Ship is not sunk by default', () => {
  const carrier = Ship(5);

  expect(carrier.isSunk()).toBe(false);
});

test('Ship is not sunk when the number of hits is less than ship length', () => {
  const cruiser = Ship(3);

  cruiser.hit();

  expect(cruiser.isSunk()).toBe(false);
});

test('Ship is sunk when the number of hits is equal to ship length', () => {
  const destroyer = Ship(2);

  while (!destroyer.isSunk()) {
    destroyer.hit();
  }

  expect(destroyer.isSunk()).toBe(true);
});
