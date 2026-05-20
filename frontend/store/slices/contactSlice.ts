import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

type ContactState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: ContactState = { loading: false, success: false, error: null };

export const submitContact = createAsyncThunk(
  'contact/submit',
  async (input: { name: string; email: string; company?: string; message: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/contact', input);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Message sending failed');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContact(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetContact } = contactSlice.actions;
export default contactSlice.reducer;
