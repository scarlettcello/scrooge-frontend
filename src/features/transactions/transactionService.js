import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions/'

const addTransaction = async (transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, transactionData, config);

  return response.data;
}

const getTransactions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config);

  return response.data;
}

const getTransaction = async (transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + transactionId, config);

  return response.data;
}

const updateTransaction = async (transactionId, transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + transactionId, transactionData, config);

  return response.data;
}

const deleteTransaction = async (transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + transactionId, config);

  return response.data;
}

const transactionService = { addTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction}

export default transactionService;