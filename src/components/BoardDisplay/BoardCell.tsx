import './BoardCell.scss';

const BoardCell = (props: {
  row: number;
  col: number;
  state: string;
  callback?: (coords: [number, number]) => void;
}) => {
  const { row, col, state, callback } = props;
  let interactable = 'true';

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
      dataset-state={state}
      dataset-interactable={interactable}></div>
  );
};

export default BoardCell;
