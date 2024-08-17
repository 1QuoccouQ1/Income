// redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, findUser, updateUser , DelUser } from '../services/apiService';

// Tạo một thunks để gọi API
export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async () => {
    const Users = await getUsers(); // Gọi hàm getUsers từ API
    return Users;
  }
);

export const fetchFindUser = createAsyncThunk(
  'users/findUser',
  async (id) => {
    const User = await findUser(id); 
    return User;
  }
);

export const DeleteUser = createAsyncThunk(
  'users/DeleteUser',
  async (id) => {
    const User = await DelUser(id); 
    return User;
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async ({ userID, ...userData }) => {
    const updatedUser = await updateUser(userID, userData); 
    return updatedUser;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    currentUser: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Thêm các action khác nếu cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFindUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFindUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(fetchFindUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload; // Cập nhật user hiện tại
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(DeleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload; // Cập nhật user hiện tại
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
