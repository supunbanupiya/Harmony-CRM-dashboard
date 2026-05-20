import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import type { Client } from '@/types';

type ClientsState = {
  items: Client[];
  loading: boolean;
  error: string | null;
};

const initialState: ClientsState = { items: [], loading: false, error: null };

export const fetchClients = createAsyncThunk('clients/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/clients');
    return data.clients as Client[];
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Clients loading failed');
  }
});

export const createClient = createAsyncThunk('clients/create', async (input: Partial<Client>, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/clients', input);
    return data.client as Client;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Client creation failed');
  }
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  }
});

export default clientsSlice.reducer;
