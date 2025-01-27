import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import './App.css' 
import './css/layout.css';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/DashBoard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import Transactions from './pages/Transactions';
import Transaction from './pages/Transaction';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<PrivateRoute />} >
          <Route path="/" element = {<Dashboard/>} />
        </Route>
        <Route path="/transactions/add" element={<PrivateRoute />} >
          <Route path="/transactions/add" element = {<AddTransaction/>} />
        </Route>
        <Route path="/transactions/:transactionId/edit" element={<PrivateRoute />} >
          <Route path="/transactions/:transactionId/edit" element = {<EditTransaction/>} />
        </Route>
        <Route path="/transactions" element={<PrivateRoute />} >
          <Route path="/transactions" element = {<Transactions/>} />
        </Route>
        <Route path="/transactions/:transactionId" element={<PrivateRoute />} >
          <Route path="/transactions/:transactionId" element = {<Transaction/>} />
        </Route>
        {/* 
        <Route path="/transactions/:id" element={<TransactionPage/>} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    )
  )
  return <RouterProvider router={router} />;
}

export default App
