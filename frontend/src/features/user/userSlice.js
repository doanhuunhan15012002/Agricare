import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchLoggedInUserOrders,
  updateUser,
  fetchLoggedInUser,
  fetchAllUsers 
} from './userAPI';

const initialState = {
  users: [],
  status: 'idle',
  totalItems: 0,
  selectedUser: null,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    // this is name mistake
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllUsersAsync = createAsyncThunk(
  'user/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   clearSelectedUser:(state)=>{
      state.selectedUser = null}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;

      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // earlier there was loggedInUser variable in other slice
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      })
      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchAllUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;
export const selectAllUsers = (state) => state.user.users;
// export const { increment } = userSlice.actions;

export default userSlice.reducer;
