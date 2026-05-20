'use client';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import type { User } from '@/types';

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  hydrated: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  hydrated: false
};

export const loginUser = createAsyncThunk('auth/login', async (input: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', input);
    return data as { user: User; token: string };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (input: { name: string; companyName?: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/signup', input);
      return data as { user: User; token: string };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadFromStorage(state) {
      if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem('harmony_token');
        const user = window.localStorage.getItem('harmony_user');
        state.token = token;
        state.user = user ? JSON.parse(user) : null;
      }
      state.hydrated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('harmony_token');
        window.localStorage.removeItem('harmony_user');
      }
    },
    clearAuthError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('harmony_token', action.payload.token);
          window.localStorage.setItem('harmony_user', JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('harmony_token', action.payload.token);
          window.localStorage.setItem('harmony_user', JSON.stringify(action.payload.user));
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { loadFromStorage, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
