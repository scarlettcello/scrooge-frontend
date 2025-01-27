import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionService from './transactionService';

const initialState = {
  transactions: [],
  transaction: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const addTransaction = createAsyncThunk('transactions/add', async (transactionData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await transactionService.addTransaction(transactionData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getTransactions = createAsyncThunk('transactions/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await transactionService.getTransactions(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getTransaction = createAsyncThunk('transactions/get', async (transactionId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await transactionService.getTransaction(transactionId, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTransaction = createAsyncThunk('transactions/update', async (transactionData, thunkAPI) => {
  const { id, data } = transactionData;

  try {
    const token = thunkAPI.getState().auth.user.token;
    return await transactionService.updateTransaction(id, data, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTransaction = createAsyncThunk('transactions/delete', async (transactionId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await transactionService.deleteTransaction(transactionId, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(addTransaction.pending, (state) => { state.isLoading = true })
    .addCase(addTransaction.fulfilled, (state) => {
      state.isLoading = false,
      state.isSuccess = true 
    })
    .addCase(addTransaction.rejected, (state, action) => { 
      state.isLoading = false,
      state.isError = true,
      state.message = action.payload 
    })
    .addCase(getTransactions.pending, (state) => { state.isLoading = true })
    .addCase(getTransactions.fulfilled, (state, action) => {
      state.isLoading = false,
      state.isSuccess = true,
      state.transactions = action.payload
    })
    .addCase(getTransactions.rejected, (state, action) => { 
      state.isLoading = false,
      state.isError = true,
      state.message = action.payload
      console.log(state.transactions); 
    })
    .addCase(getTransaction.pending, (state) => { state.isLoading = true })
    .addCase(getTransaction.fulfilled, (state, action) => {
      state.isLoading = false,
      state.isSuccess = true,
      state.transaction = action.payload
    })
    .addCase(getTransaction.rejected, (state, action) => { 
      state.isLoading = false,
      state.isError = true,
      state.message = action.payload 
    })
    .addCase(updateTransaction.fulfilled, (state, action) => {
      state.transaction = action.payload,
      state.transactions = state.transactions.map((transaction) =>
        transaction._id === action.payload._id ? action.payload : transaction
      )
    })
    .addCase(deleteTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.transactions = state.transactions.filter((transaction) => transaction._id !== action.payload.id )
    })
  }
});

export const { reset } = transactionSlice.actions;

export default transactionSlice.reducer;