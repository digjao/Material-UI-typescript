import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListagemPessoa } from './PessoasService';

interface PessoasState {
  pessoas: IListagemPessoa[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PessoasState = {
  pessoas: [],
  isLoading: false,
  error: null,
};

export const pessoasSlice = createSlice({
  name: 'pessoas',
  initialState,
  reducers: {
    setPessoas(state, action: PayloadAction<IListagemPessoa[]>) {
      state.pessoas = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setPessoas, setLoading, setError } = pessoasSlice.actions;

export default pessoasSlice.reducer;
