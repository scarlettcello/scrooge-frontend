import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Spinner from '../components/Spinner';

function TransactionItem({ id, transaction, handleClick}) {

  const location = useLocation();

  const calculateTotalAmount = () => {
    const amount = transaction.amount;
    const tax = transaction.taxRate / 100;
    const total = amount + amount * tax;

    return total.toFixed(2);
  }

  const formatDate = () => {
    let date = new Date(transaction.date);
    date = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric'});
    // console.log(date);
    return date;
  }


  return (
    <tr className='transaction-row'>
        <td>{ formatDate() }</td>

        { location.pathname == '/transactions' && <><td>{ transaction.transactionType }</td>
        <td>{ transaction.transactionType == 'expense' ? transaction.exCategory : transaction.inCategory}</td></>}

        <td>{ transaction.subject }</td>
        <td>${ calculateTotalAmount() }</td>
        { location.pathname == "/transactions" && 
          <td>
            <Link to={`/transactions/${transaction._id}`}>Detail</Link>
            <button id={id} onClick={handleClick}>Delete</button>
          </td>
        }
    </tr>
  )
}

export default TransactionItem;