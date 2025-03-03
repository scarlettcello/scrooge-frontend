import axios from 'axios';

const url = process.env.NODE_ENV == 'production' ? 
process.env.API_URL: 'http://localhost:5000';

const addTransaction = async (transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(`${url}/api/transactions/`, transactionData, config);

  return response.data;
}

const getTransactions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(`${url}/api/transactions/`, config);

  return response.data;
}

const getTransaction = async (transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(`${url}/api/transactions/` + transactionId, config);

  return response.data;
}

const updateTransaction = async (transactionId, transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(url + transactionId, transactionData, config);

  return response.data;
}

const deleteTransaction = async (transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(url + transactionId, config);

  return response.data;
}

const transactionService = { addTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction}

export default transactionService;