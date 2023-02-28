import { useEffect, useState } from 'react';
import BoardCell from './BoardCell';
import BoardData from '../../interfaces/boardData';

import './BoardDisplay.scss';

const BoardDisplay = (props: {
  boardData: BoardData;
  cellCallback?: (coords: number[]) => void;
}) => {
  const { boardData, cellCallback } = props;
  const { missedShots, allShots } = boardData;
  const [boardCells, setBoardCells] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    setBoardCells(createBoardCells());
  }, [allShots]);

  function createBoardCells() {
    const cells = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        let cellState = 'unknown';
        if (
          missedShots.some(
            (coords: number[]) => coords[0] === row && coords[1] === col
          )
        ) {
          cellState = 'miss';
        } else if (
          !boardData.missedShots.some(
            (coords: number[]) => coords[0] === row && coords[1] === col
          ) &&
          allShots.some(
            (coords: number[]) => coords[0] === row && coords[1] === col
          )
        ) {
          cellState = 'hit';
        }
        cells.push(
          <BoardCell
            key={row * 10 + col}
            row={row}
            col={col}
            state={cellState}
            callback={cellCallback ? cellCallback : undefined}
          />
        );
      }
    }

    return cells;
  }

  return <div className='board-grid'>{boardCells}</div>;
};

export default BoardDisplay;
