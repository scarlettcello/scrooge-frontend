import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions, deleteTransaction, reset } from '../features/transactions/transactionSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TransactionItem from '../components/TransactionItem';
import DeleteModal from '../components/Modal';
import '../css/transactions.css';

const Transactions = () => {
  const [ isModalOpen, setIsModalOpen] = useState(false);
  const [ transactionId, setTransactionId] = useState('');
  const { transactions, isSuccess } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getTransactions())
  }, [dispatch]);

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleDelete = (e) => {
    setIsModalOpen(true);
    openModal();
    setTransactionId(e.target.id);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  }

  const handleConfirm = (e) => {
    e.preventDefault();
    dispatch(deleteTransaction(transactionId));
    closeModal();
    history.go(0);
  }

  if (!transactions) {
    return <Spinner/>
  }

  return (
    <>
      <DeleteModal
        isModalOpen={isModalOpen}
        handleCancelClick={handleCancel} 
        handleConfirmClick={handleConfirm}
      />
      <BackButton url="/"/>
      <h1>Transactions</h1>

      <div className="table-container">
        <table className="transactions">
          <thead>
          <tr className="transaction-header">
            <td>Date</td>
            <td>Type</td>
            <td>Category</td>
            <td>Subject</td>
            <td>Total amount</td>
          </tr>
          </thead>
          <tbody>
          { transactions.map((transaction) => (
            <TransactionItem 
              key={transaction._id} 
              id={transaction._id} 
              transaction={transaction} 
              handleClick={handleDelete}
            />
          ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Transactions