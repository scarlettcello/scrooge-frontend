import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { getTransactions, reset } from '../features/transactions/transactionSlice';
import Spinner from './Spinner';
import TransactionItem from './TransactionItem';
import '../css/transactions.css';

const RecentTransactions = () => {
  const { transactions, isSuccess } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getTransactions())
  }, [dispatch]);

  if (!transactions) {
    return <Spinner/>
  }

  let incomes = [];
  let expenses = [];

  transactions.forEach(el => {
    el.transactionType !== "expense" ? expenses.push(el) : incomes.push(el);
  });

  return (
    <div className='row'>
      <div className='col-lg-6'>
        <h2>Income</h2>
        <div className="table-container">
          <table className="income">
            <thead>
            <tr className="transaction-header">
              <td>Date</td>
              <td>Subject</td>
              <td>Total amount</td>
            </tr>
            </thead>
            <tbody>
            { incomes.map((transaction) => (
              <TransactionItem key={transaction._id} id={transaction._id} transaction={transaction} />
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='col-lg-6'>
        <h2>Expense</h2>
        <div className="table-container">
          <table className="expense">
            <thead>
              <tr className="transaction-header">
                <td>Date</td>
                <td>Subject</td>
                <td>Total amount</td>
              </tr>
            </thead>
            <tbody>
              { expenses.map((transaction) => (
                <TransactionItem key={transaction._id} id={transaction._id} transaction={transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RecentTransactions;