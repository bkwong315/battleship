import { useEffect, useState } from 'react';
import BoardCell from './BoardCell';
import BoardData from '../../interfaces/boardData';

import './BoardDisplay.scss';
import * as React from 'react';

const BoardDisplay = (props: {
  boardData: BoardData;
  deploymentCoords?: [number, number];
  currShipType?: string;
  placementDir?: string;
  cellCallback?: (coords: [number, number]) => void;
}) => {
  const {
    boardData,
    deploymentCoords,
    placementDir,
    currShipType,
    cellCallback,
  } = props;
  const { missedShots, allShots, ships } = boardData;
  const [boardCells, setBoardCells] = useState<React.ReactElement[]>([]);
  let selectedCoords: number[][] = [];
  let invalidPlacement = false;

  useEffect(() => {
    if (deploymentCoords && currShipType && placementDir && ships) {
      invalidPlacement = false;
      const newSelectedCoords = [deploymentCoords];
      const dirs: { [key: string]: [number, number] } = {
        up: [-1, 0],
        right: [0, 1],
        down: [1, 0],
        left: [0, -1],
      };

      for (let i = 1; i < ships[currShipType].getLength(); i++) {
        const newRow = deploymentCoords[0] + dirs[placementDir][0] * i;
        const newCol = deploymentCoords[1] + dirs[placementDir][1] * i;

        if (newRow < 0 || newRow > 9 || newCol < 0 || newCol > 9)
          invalidPlacement = true;

        newSelectedCoords.push([newRow, newCol]);
      }

      selectedCoords = newSelectedCoords;
    }

    setBoardCells(createBoardCells());
  }, [allShots, deploymentCoords, placementDir]);

  function createBoardCells() {
    const cells = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        let cellState = 'unknown';

        if (ships) {
          for (const shipType in ships) {
            for (const pos of ships[shipType].getLocation()) {
              if (pos[0] === row && pos[1] === col) cellState = 'ship';
            }
          }
        } else if (
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
            selectedCoords={selectedCoords}
            invalidPlacement={invalidPlacement}
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
