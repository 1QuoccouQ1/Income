// slices/planSlice.js
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { getPlans, CreatePlan, DelPlan ,updatePlan ,findPlan} from '../services/apiService';



// Tạo một thunks để gọi API
export const fetchPlans = createAsyncThunk(
    'plans/fetchPlans',
    async (UserAccountID) => {
      const goats = await getPlans(UserAccountID); // Gọi hàm getGoats từ API
      return goats;
    }
  );
  export const fetchFindPlan = createAsyncThunk(
    'plans/fetchFindPlan',
    async (id) => {
      const User = await findPlan(id); 
      return User;
    }
  );

  export const createPlan = createAsyncThunk(
    'plans/createPlan',
    async (user) => {
      const goat = await CreatePlan(user); 
      return goat;
    }
  );
  export const DeletePlan = createAsyncThunk(
    'plans/DeletePlan',
    async (id) => {
      const goat = await DelPlan(id); 
      return goat;
    }
  );
  
  export const updatePlanThunk = createAsyncThunk(
    'plans/updatePlanThunk',
    async ({ goatID, ...goatData }) => {
      // console.log({ goatID, ...goatData });
      const updatedGoat = await updatePlan(goatID, goatData); 
      return updatedGoat;
    }
  );

const planSlice = createSlice({
  name: 'plans',
  initialState: {
    plans: [], // Danh sách các kế hoạch
    currentPlan: null,
    status: 'idle',
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFindPlan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFindPlan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPlan = action.payload;
      })
      .addCase(fetchFindPlan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPlan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPlan = action.payload;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(DeletePlan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(DeletePlan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPlan = action.payload;
      })
      .addCase(DeletePlan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePlanThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePlanThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPlan = action.payload;
      })
      .addCase(updatePlanThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default planSlice.reducer;



export const selectPlanById = (state, id) =>
  state.plans.plans.find(plan => plan.CategoryID === id);