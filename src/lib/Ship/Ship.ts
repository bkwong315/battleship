const Ship = (len: number, loc: number[][] = []) => {
  const length = len;
  let location = loc;
  let _hits = 0;

  const hit = () => _hits++;
  const isSunk = () => length - _hits <= 0;
  const getLength = () => length;
  const setLocation = (loc: number[][]) => {
    location = loc;
  };
  const getLocation = () => [...location];

  return { hit, isSunk, getLength, setLocation, getLocation };
};

export default Ship;
