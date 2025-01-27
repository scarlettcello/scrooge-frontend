import Modal from 'react-modal';

Modal.setAppElement('#root');

const DeleteModal = ({ isModalOpen, handleCancelClick, handleConfirmClick }) => {

  return (
    <Modal
      isOpen={isModalOpen}
    >
      <h2>Are you sure you want to delete this?</h2>
      <button className="btn btn-neutral" onClick={handleCancelClick}>
        Cancel
      </button>
      <button className="btn btn-danger" onClick={handleConfirmClick}>
        Confirm
      </button>
    </Modal>  
  )
}

export default DeleteModal;