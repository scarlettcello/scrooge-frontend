import { Link } from 'react-router-dom';
import RecentTransactions from '../components/RecentTransactions';
import '../css/dashboard.css';

const DashBoard = () => {
  return (
    <>
      <h1>DashBoard</h1>
        <RecentTransactions/>
      <div className='button'>
        <Link to={`/transactions`}>View all transactions</Link>
      </div>
    </>
  )
}

export default DashBoard