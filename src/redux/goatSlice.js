// features/goats/goatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGoats, Creategoat, updateGoat ,DelGoat ,findGoat} from '../services/apiService';

// Tạo một thunks để gọi API
export const fetchGoats = createAsyncThunk(
    'goats/fetchGoats',
    async (UserAccountID) => {
      const goats = await getGoats(UserAccountID); // Gọi hàm getGoats từ API
      return goats;
    }
  );
  export const fetchFindGoat = createAsyncThunk(
    'users/findGoat',
    async (id) => {
      const User = await findGoat(id); 
      return User;
    }
  );

  export const createGoat = createAsyncThunk(
    'goats/createGoat',
    async (user) => {
      const goat = await Creategoat(user); 
      return goat;
    }
  );
  export const DeleteGoat = createAsyncThunk(
    'goats/DeleteGoat',
    async (id) => {
      const goat = await DelGoat(id); 
      return goat;
    }
  );
  
  export const updateGoatThunk = createAsyncThunk(
    'goats/updateGoat',
    async ({ goatID, ...goatData }) => {
      // console.log({ goatID, ...goatData });
      const updatedGoat = await updateGoat(goatID, goatData); 
      return updatedGoat;
    }
  );
  
  const goatSlice = createSlice({
    name: 'goats',
    initialState: {
      goats: [],
      currentGoat: null,
      status: 'idle',
      error: null,
    },
    reducers: {
      // Thêm các action khác nếu cần
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchGoats.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchGoats.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.goats = action.payload;
        })
        .addCase(fetchGoats.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(createGoat.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createGoat.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.currentGoat = action.payload;
        })
        .addCase(createGoat.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(DeleteGoat.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(DeleteGoat.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.currentGoat = action.payload;
        })
        .addCase(DeleteGoat.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(updateGoatThunk.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateGoatThunk.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.currentGoat = action.payload; // Cập nhật goat hiện tại
        })
        .addCase(updateGoatThunk.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(fetchFindGoat.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchFindGoat.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.currentGoat = action.payload; // Cập nhật goat hiện tại
        })
        .addCase(fetchFindGoat.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export default goatSlice.reducer;


export const selectGoatById = (state, id) =>
    state.goats.goats.find(goat => goat.GoalID === id);