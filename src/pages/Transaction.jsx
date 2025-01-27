import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTransaction, reset } from '../features/transactions/transactionSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Transaction = () => {
  const {  transaction, isLoading, isError, message} = useSelector((state) => state.transactions);

  const dispatch = useDispatch();
  const { transactionId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTransaction(transactionId));
  }, [isError, message, transactionId])

  if (isLoading) {
    return <Spinner/>
  }

  if (isError) {
    return <h3>Something went wrong</h3>
  }
  
  const calculateTotalAmount = () => {
    const amount = transaction.amount;
    const tax = transaction.taxRate / 100;
    const total = amount + amount * tax;

    return total.toFixed(2);
  }

  const formatDate = () => {
    let date = new Date(transaction.date);
    date = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric'});
    return date;
  }

  return (
    <>
      <BackButton url='/transactions'/>
      <div className='transaction'>
        <div>Date: { formatDate() }</div>
        <div>Category: {transaction.transactionType == 'expense' ? transaction.exCategory : transaction.inCategory}</div>
        <div>Subject: { transaction.subject}</div>
        <div>Amount: ${transaction.amount}</div>
        <div>Tax Rate: { transaction.taxRate} % </div>
        <div>Total Amount: ${ calculateTotalAmount() }</div>
        <div>{ transaction.note}</div>
        <Link to={`/transactions/${transaction._id}/edit`}>Edit</Link>
      </div>
    </>
  )
}

export default Transaction