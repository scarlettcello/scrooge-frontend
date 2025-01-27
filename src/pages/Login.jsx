import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import '../css/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password }= formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth);


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData));
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1><FaSignInAlt/> Login</h1>
        <p>Login or <Link to="/register">Register</Link> to use the features of Scrooge.</p>
      </section>

      <section className="form">
        <form onSubmit={ onSubmit }>
          <div className='form-group'>
            <label htmlFor='email'>ID</label>
            <input 
              type='email' 
              className='form-control' 
              id='email' 
              name='email'
              value={email} 
              onChange={ onChange } 
              placeholder='Enter your email' 
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input 
              type='password' 
              className='form-control' 
              id='password' 
              name='password'
              value={password} 
              onChange={ onChange } 
              placeholder='Enter your password' 
              required
            />
          </div>
          <div className="form-group">
            <button className="btn-primary">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login