import './BoardCell.scss';

const BoardCell = (props: {
  row: number;
  col: number;
  state: string;
  callback?: (coords: number[]) => void;
}) => {
  const { row, col, state, callback } = props;

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
      dataset-state={state}></div>
  );
};

export default BoardCell;
