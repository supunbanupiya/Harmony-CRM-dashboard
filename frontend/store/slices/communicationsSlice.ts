import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import type { Communication } from '@/types';

type CommunicationsState = {
  items: Communication[];
  loading: boolean;
  error: string | null;
};

const initialState: CommunicationsState = { items: [], loading: false, error: null };

export const fetchCommunications = createAsyncThunk('communications/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/communications');
    return data.communications as Communication[];
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Communications loading failed');
  }
});

export const createCommunication = createAsyncThunk('communications/create', async (input: any, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/communications', input);
    return data.communication as Communication;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Communication creation failed');
  }
});

const communicationsSlice = createSlice({
  name: 'communications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCommunications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCommunication.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  }
});

export default communicationsSlice.reducer;
