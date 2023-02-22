import Ship from './Ship';

test('Ship is not sunk by default', () => {
  const carrier = Ship(5);

  expect(carrier.isSunk()).toBe(false);
});

test('Ship length returns properly', () => {
  const submarine = Ship(3);

  expect(submarine.getLength()).toBe(3);
});

test('Ship location setter works properly', () => {
  const location = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];
  const cruiser = Ship(3, location);

  const newLocation = [
    [2, 0],
    [2, 1],
    [2, 2],
  ];

  cruiser.setLocation(newLocation);

  expect(cruiser.getLocation()).toStrictEqual(newLocation);
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
