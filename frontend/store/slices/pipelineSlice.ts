import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import type { PipelineStage } from '@/types';

type PipelineState = {
  stages: PipelineStage[];
  loading: boolean;
  error: string | null;
};

const initialState: PipelineState = { stages: [], loading: false, error: null };

export const fetchPipeline = createAsyncThunk('pipeline/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/pipeline');
    return data.stages as PipelineStage[];
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Pipeline loading failed');
  }
});

const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPipeline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPipeline.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload;
      })
      .addCase(fetchPipeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default pipelineSlice.reducer;
