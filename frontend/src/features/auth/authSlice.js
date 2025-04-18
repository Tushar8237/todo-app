import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios'

const userFromStorage = JSON.parse(localStorage.getItem('user'))

// Register user
export const register = createAsyncThunk(
  'auth/signup',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post('/auth/signup', formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post('/auth/logout');
  localStorage.removeItem('user');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
