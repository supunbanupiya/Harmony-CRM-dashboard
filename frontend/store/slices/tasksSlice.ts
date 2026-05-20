import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import type { Task } from '@/types';

type TasksState = {
  items: Task[];
  loading: boolean;
  error: string | null;
};

const initialState: TasksState = { items: [], loading: false, error: null };

export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/tasks');
    return data.tasks as Task[];
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Tasks loading failed');
  }
});

export const createTask = createAsyncThunk('tasks/create', async (input: Partial<Task> & { clientId?: number | null }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/tasks', input);
    return data.task as Task;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Task creation failed');
  }
});

export const updateTaskStatus = createAsyncThunk('tasks/status', async (input: { id: number; status: Task['status'] }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/tasks/${input.id}/status`, { status: input.status });
    return data.task as Task;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Task update failed');
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.items = state.items.map((task) => (task.id === action.payload.id ? { ...task, ...action.payload } : task));
      });
  }
});

export default tasksSlice.reducer;
