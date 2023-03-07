import './BoardCell.scss';

const BoardCell = (props: {
  row: number;
  col: number;
  state: string;
  selectedCoords: number[][];
  invalidPlacement?: boolean;
  callback?: (coords: [number, number]) => void;
}) => {
  const { row, col, state, selectedCoords, invalidPlacement, callback } = props;
  let interactable = 'true';
  let selected = 'false';

  for (const coords of selectedCoords) {
    if (coords[0] === row && coords[1] === col) {
      selected = 'true';
      break;
    }
  }

  if (selected === 'true' && invalidPlacement) selected = 'invalid';
  if (callback === undefined) interactable = 'false';

  return (
    <div
      className='board-cell'
      onClick={
        callback
          ? () => {
              callback([row, col]);
            }
          : undefined
      }
      dataset-selected={selected}
      dataset-state={state}
      dataset-interactable={interactable}></div>
  );
};

export default BoardCell;
