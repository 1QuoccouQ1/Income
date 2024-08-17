// src/redux/transactionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tạo một thunks để gọi API
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await fetch('https://66a70e0253c13f22a3ce546e.mockapi.io/todos'); // Thay URL bằng API của bạn
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return response.json();
  }
);



const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Thêm các action khác nếu cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
