import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientsReducer from './slices/clientsSlice';
import communicationsReducer from './slices/communicationsSlice';
import contactReducer from './slices/contactSlice';
import dashboardReducer from './slices/dashboardSlice';
import pipelineReducer from './slices/pipelineSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    clients: clientsReducer,
    pipeline: pipelineReducer,
    tasks: tasksReducer,
    communications: communicationsReducer,
    contact: contactReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
