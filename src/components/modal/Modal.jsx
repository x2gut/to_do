import "./modal.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Modal({ showModal, setShowModal, onSubmit, setInputData }) {
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Edit</h2>
          <button
            className="close-modal-btn"
            onClick={() => setShowModal(!showModal)}
          >
            <AiOutlineCloseCircle className="icon-close" />
          </button>
        </div>
        <div className="modal-content">
          <form action="#" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit"
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
            <button className="confirm-edit-btn">Edit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
