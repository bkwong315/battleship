const Ship = (length: number) => {
  const maxHp = length;
  let hits = 0;

  const hit = () => hits++;
  const isSunk = () => maxHp - hits <= 0;

  return { hit, isSunk };
};

export default Ship;
