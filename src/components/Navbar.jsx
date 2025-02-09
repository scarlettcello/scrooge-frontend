import '../css/navbar.css';
// import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset} from '../features/auth/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <Link to="/">Scrooge</Link>
        </div>
        <ul>
          { user ? (
            <>
              <li><Link to="/transactions/add">Add</Link></li>
              <li><button className='btn' onClick={ onLogout }>Logout</button></li>
            </>
          ) : (         
            <>          
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>

          )
        }


        </ul>
      </div>
    </nav>
  )
}

export default Navbar;