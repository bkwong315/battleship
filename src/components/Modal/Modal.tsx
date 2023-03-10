import './Modal.scss';

const Modal = (props: {
  msg: string;
  btnMsg?: string;
  callback?: () => void;
}) => {
  const { msg, btnMsg, callback } = props;

  return (
    <div className='modal-container'>
      <div className='modal-card'>
        <p>{msg}</p>
        {callback && <button onClick={callback}>{btnMsg}</button>}
      </div>
    </div>
  );
};

export default Modal;
