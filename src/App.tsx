import { useEffect, useState, useMemo, useRef } from 'react';
import Game from './lib/Game/Game';
import BoardDisplay from './components/BoardDisplay/BoardDisplay';
import BoardData from './interfaces/boardData';

import './App.scss';

const App = () => {
  const game: ReturnType<typeof Game> = useMemo(() => Game(), []);
  const playerBoardData = useRef<BoardData>();
  const computerBoardData = useRef<BoardData>();
  const [playerName, setPlayerName] = useState<string>(game.getPlayerName());

  const [computerAllShots, setComputerAllShots] = useState<number[][]>();
  const [computerMissedShots, setComputerMissedShots] = useState<number[][]>();

  useEffect(() => {
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

  function submitName(event: React.MouseEvent) {
    event.preventDefault();
    const input = document.querySelector('#name-input') as HTMLInputElement;
    const errorDisplay = document.querySelector('.error') as HTMLElement;

    if (input && input.value !== '') {
      game.setPlayerName(input.value);
      setPlayerName(game.getPlayerName());
    } else {
      if (errorDisplay) errorDisplay.style.display = 'inline-block';
    }

    console.log(game.getPlayerName());
  }

  useEffect(() => {
    return;
  }, [computerAllShots, playerName]);

  return (
    <>
      <div className='background'>
        {game.getPlayerName() === '' && (
          <div className='main-layout'>
            <h1 className='layout-header'>Battleship</h1>
            <form className='name-form'>
              <div className='input-wrapper'>
                <label htmlFor='name-input'>Enter Name:</label>
                <input
                  type='text'
                  name='name-input'
                  id='name-input'
                  autoComplete='off'
                />
              </div>
              <span className='error'>* Name cannot be blank</span>
              <button type='submit' onClick={submitName}>
                Submit
              </button>
            </form>
          </div>
        )}
        {game.getPlayerName() !== '' && (
          <div className='deployment-layout'>
            <h1 className='layout-header'>Deployment</h1>
            <div className='directions-container'>
              <p className='instructions'>
                Deploying {`carrier ( length 5 cells )`}
              </p>
              <div className='rotation-icons-container'>
                <img
                  src='../imgs/rotate-left-solid.svg'
                  alt='rotate-left-icon'
                />
                <img
                  src='../imgs/rotate-right-solid.svg'
                  alt='rotate-right-icon'
                />
              </div>
            </div>
            {playerBoardData.current !== undefined && (
              <BoardDisplay
                boardData={{
                  allShots: playerBoardData.current.allShots,
                  missedShots: playerBoardData.current.missedShots,
                  ships: playerBoardData.current.ships,
                }}
              />
            )}
            <div className='deployment-btns-container'>
              <button className='btn confirm-deployment-btn'>Confirm</button>
              <button className='btn cancel-deployment-btn'>Cancel</button>
            </div>
          </div>
        )}
        {game.isGameStarted() && (
          <div className='game-layout'>
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
        )}
      </div>
    </>
  );
};

export default App;
