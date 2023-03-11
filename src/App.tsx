import { useEffect, useState, useMemo, useRef } from 'react';
import Game from './lib/Game/Game';
import BoardDisplay from './components/BoardDisplay/BoardDisplay';
import BoardData from './interfaces/boardData';
import Modal from './components/Modal/Modal';

import './App.scss';

const App = () => {
  const game: ReturnType<typeof Game> = useMemo(() => Game(), []);
  const playerBoardData = useRef<BoardData>();
  const computerBoardData = useRef<BoardData>();

  const [playerName, setPlayerName] = useState<string>(game.getPlayerName());
  const [computerAllShots, setComputerAllShots] = useState<number[][]>();
  const [computerMissedShots, setComputerMissedShots] = useState<number[][]>();
  const [placementDir, setPlacementDir] = useState<string>('right');
  const placementDirRef = useRef<string>('');
  placementDirRef.current = placementDir;
  const [currShipType, setCurrShipType] = useState<string>('carrier');
  const currShipTypeRef = useRef<string>();
  currShipTypeRef.current = currShipType;
  const [deploymentCoords, setDeploymentCoords] = useState<[number, number]>([
    0, 0,
  ]);
  const deploymentCoordsRef = useRef<[number, number]>();
  deploymentCoordsRef.current = deploymentCoords;

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    initializeGame();

    return () => {
      game.resetGame();
    };
  }, []);

  function initializeGame() {
    setComputerAllShots([]);
    setComputerMissedShots([]);

    playerBoardData.current = game.getPlayerBoard().getData();
    computerBoardData.current = game.getComputerBoard().getData();
  }

  function resetGame() {
    game.resetGame();
    setPlacementDir('right');
    setDeploymentCoords([0, 0]);
    setCurrShipType('carrier');

    initializeGame();
  }

  function updateBoard(coords: number[]) {
    try {
      game.playTurn(coords);
    } catch (error) {
      if (typeof error === 'string') {
        setErrorMsg(error);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }

      return;
    }

    setErrorMsg('');

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

  function cycleShip() {
    const shipTypes = [
      'carrier',
      'battleship',
      'cruiser',
      'submarine',
      'destroyer',
    ];

    try {
      game.placePlayerShip(
        deploymentCoords,
        placementDirRef.current,
        currShipType
      );
    } catch (error) {
      if (typeof error === 'string') {
        setErrorMsg(error);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }

      return;
    }

    setErrorMsg('');

    const shipIdx = shipTypes.findIndex(
      (shipType) => shipType === currShipType
    );

    if (shipIdx === shipTypes.length - 1) {
      // Updating currShipType to cause rerender
      setCurrShipType(shipTypes[shipIdx - 1]);
      setErrorMsg('');
      game.startGame();
    } else {
      setCurrShipType(shipTypes[shipIdx + 1]);
      currShipTypeRef.current = currShipType;
    }
  }

  function rotateShip(rotateDir: string) {
    const directions = ['up', 'right', 'down', 'left'];
    let currIdx = directions.findIndex(
      (direction) => direction === placementDir
    );

    if (rotateDir === 'clockwise') {
      currIdx = currIdx + 1 >= directions.length ? 0 : currIdx + 1;
    } else if (rotateDir === 'counter-clockwise') {
      currIdx = currIdx - 1 < 0 ? directions.length - 1 : currIdx - 1;
    }

    setPlacementDir(directions[currIdx]);
    placementDirRef.current = placementDir;
  }

  useEffect(() => {
    return;
  }, [computerAllShots, playerName, placementDir, currShipType]);

  return (
    <>
      {game.isGameStarted() && game.isGameOver() && (
        <Modal
          msg={`${game.getWinner()} wins!`}
          btnMsg='Play Again?'
          callback={resetGame}
        />
      )}
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
        {!game.isGameStarted() && game.getPlayerName() !== '' && (
          <div className='deployment-layout'>
            <h1 className='layout-header'>Deployment</h1>
            <div className='directions-container'>
              <div className='player-info-container'>
                {errorMsg === '' && (
                  <p className='instructions'>
                    Deploying{' '}
                    {`${currShipType} ( length ${game
                      .getPlayerBoard()
                      .getData()
                      .ships[`${currShipType}`].getLength()} cells )`}
                  </p>
                )}
                {errorMsg !== '' && <p className='error-text'>{errorMsg}</p>}
              </div>
              <div className='rotation-icons-container'>
                <img
                  src='../imgs/rotate-left-solid.svg'
                  alt='rotate-left-icon'
                  onClick={rotateShip.bind(null, 'counter-clockwise')}
                />
                <img
                  src='../imgs/rotate-right-solid.svg'
                  alt='rotate-right-icon'
                  onClick={rotateShip.bind(null, 'clockwise')}
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
                deploymentCoords={deploymentCoords}
                placementDir={placementDir}
                currShipType={currShipType}
                cellCallback={setDeploymentCoords}
              />
            )}
            <div className='deployment-btns-container'>
              <button
                onClick={cycleShip}
                className='btn confirm-deployment-btn'>
                Confirm
              </button>
              <button className='btn cancel-deployment-btn'>Cancel</button>
            </div>
          </div>
        )}
        {game.isGameStarted() && (
          <div className='game-layout'>
            <div className='info-display'>
              {errorMsg === '' && <p>Select tile to attack!</p>}
              {errorMsg !== '' && <p className='error-text'>{errorMsg}</p>}
            </div>
            <div className='boards-container'>
              <div className='board-wrapper'>
                <p className='player-board-name'>
                  {game.getPlayerName()}'s Board
                </p>
                {playerBoardData.current !== undefined && (
                  <BoardDisplay
                    boardData={{
                      allShots: playerBoardData.current.allShots,
                      missedShots: playerBoardData.current.missedShots,
                      ships: playerBoardData.current.ships,
                    }}
                  />
                )}
              </div>
              <div className='board-wrapper'>
                <p className='computer-board-name'>Computer's Board</p>
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
          </div>
        )}
      </div>
    </>
  );
};

export default App;
