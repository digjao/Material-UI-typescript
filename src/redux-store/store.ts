import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import pessoasReducer from '../shared/services/api/pessoas/PessoasSlice'



export const store = configureStore({
  reducer: {
  pessoas: pessoasReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
