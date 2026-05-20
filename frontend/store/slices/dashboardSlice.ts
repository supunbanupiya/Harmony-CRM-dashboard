import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

type DashboardState = {
  data: any | null;
  loading: boolean;
  error: string | null;
};

const initialState: DashboardState = { data: null, loading: false, error: null };

export const fetchDashboardSummary = createAsyncThunk('dashboard/summary', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/dashboard/summary');
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Dashboard loading failed');
  }
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default dashboardSlice.reducer;
