import Ship from '../lib/Ship/Ship';

interface BoardData {
  ships?: {
    [key: string]: ReturnType<typeof Ship>;
  };
  allShots: number[][];
  missedShots: number[][];
}

export default BoardData;
