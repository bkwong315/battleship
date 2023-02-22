const Ship = (len: number, loc: number[][] = []) => {
  const length = len;
  const location = loc;
  let _hits = 0;

  const hit = () => _hits++;
  const isSunk = () => length - _hits <= 0;
  const getLength = () => length;
  const getLocation = () => location;

  return { hit, isSunk, getLength, getLocation };
};

export default Ship;
