import { useSelector } from 'react-redux';
import { useLocation, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashBoard from '../pages/DashBoard';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

const MainLayout = () => {

  const {user} = useSelector(state => state.auth);
  const location = useLocation();

  return (
    <>
      <Navbar/>
      <main>
        <div className="container">
          { user !== null ? <Outlet/> : location.pathname == "/register" ? <Register/> : <Login/>}
        </div>
        <ToastContainer />
      </main>

    </>
  )
}

export default MainLayout;