// slices/planSlice.js
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactions, createTransaction} from '../services/apiService';



// Tạo một thunks để gọi API
export const fetchBills = createAsyncThunk(
    'bills/fetchBills',
    async (UserAccountID) => {
    const goats = await getTransactions(UserAccountID); // Gọi hàm getGoats từ API
    return goats;
    }
);
  
export const createBill = createAsyncThunk(
    'bills/createBill',
    async (user) => {
        const goat = await createTransaction(user); 
        return goat;
    }
);
  
  
 

const billSlice = createSlice({
  name: 'bills',
  initialState: {
    bills: [], // Danh sách các kế hoạch
    currentPlan: null,
    status: 'idle',
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bills = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPlan = action.payload;
      })
      .addCase(createBill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      ;
  },
});


export default billSlice.reducer;


