import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListagemPessoa } from './PessoasService';

interface PessoasState {
  pessoas: IListagemPessoa[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;  // Adicione esta linha
}

const initialState: PessoasState = {
  pessoas: [],
  isLoading: false,
  error: null,
  totalCount: 0,  // Inicialize totalCount
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
    setTotalCount(state, action: PayloadAction<number>) {  // Adicione este reducer
      state.totalCount = action.payload;
    },
  },
});

export const { setPessoas, setLoading, setError, setTotalCount } = pessoasSlice.actions; // Exporte setTotalCount

export default pessoasSlice.reducer;
export type { PessoasState };
