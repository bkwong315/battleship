import { useEffect, useState, useMemo, useRef } from 'react';
import Game from './lib/Game/Game';
import BoardDisplay from './components/BoardDisplay/BoardDisplay';
import BoardData from './interfaces/boardData';

import './App.scss';

const App = () => {
  const game: ReturnType<typeof Game> = useMemo(() => Game(), []);
  const playerBoardData = useRef<BoardData>();
  const computerBoardData = useRef<BoardData>();

  const [computerAllShots, setComputerAllShots] = useState<number[][]>();
  const [computerMissedShots, setComputerMissedShots] = useState<number[][]>();

  useEffect(() => {
    game.setPlayerName('John');

    setComputerAllShots([]);
    setComputerMissedShots([]);

    playerBoardData.current = game.getPlayerBoard().getData();
    computerBoardData.current = game.getComputerBoard().getData();

    game.getComputerBoard().placeShip([0, 0], 'down', 'carrier');
    game.getComputerBoard().placeShip([0, 1], 'down', 'battleship');
    game.getComputerBoard().placeShip([0, 2], 'down', 'cruiser');
    game.getComputerBoard().placeShip([0, 3], 'down', 'submarine');
    game.getComputerBoard().placeShip([0, 4], 'down', 'destroyer');

    game.getPlayerBoard().placeShip([0, 0], 'down', 'carrier');
    game.getPlayerBoard().placeShip([0, 1], 'down', 'battleship');
    game.getPlayerBoard().placeShip([0, 2], 'down', 'cruiser');
    game.getPlayerBoard().placeShip([0, 3], 'down', 'submarine');
    game.getPlayerBoard().placeShip([0, 4], 'down', 'destroyer');
  }, []);

  function updateBoard(coords: number[]) {
    try {
      game.playTurn(coords);
    } catch (err) {
      console.error(err);
      return;
    }

    if (computerBoardData.current !== undefined) {
      setComputerAllShots([...computerBoardData.current.allShots]);
      setComputerMissedShots([...computerBoardData.current.missedShots]);
    }
  }

  useEffect(() => {
    return;
  }, [computerAllShots]);

  return (
    <>
      <div className='layout'>
        <div className='boards-container'>
          {playerBoardData.current !== undefined && (
            <BoardDisplay
              boardData={{
                allShots: playerBoardData.current.allShots,
                missedShots: playerBoardData.current.missedShots,
                ships: playerBoardData.current.ships,
              }}
            />
          )}
          {computerAllShots !== undefined &&
            computerMissedShots !== undefined && (
              <BoardDisplay
                boardData={{
                  allShots: computerAllShots,
                  missedShots: computerMissedShots,
                }}
                cellCallback={updateBoard}
              />
            )}
        </div>
      </div>
    </>
  );
};

export default App;
