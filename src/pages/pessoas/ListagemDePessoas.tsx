import React, { useEffect, useMemo } from "react";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebouce } from "../../shared/hooks";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../shared/environment";
import { useSelector } from 'react-redux';
import { setPessoas, setLoading, setError, setTotalCount } from '../../shared/services/api/pessoas/PessoasSlice';
import { RootState, useAppDispatch } from '../../redux-store/store';
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";


export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebouce();
    const navigate = useNavigate();
    
    const dispatch = useAppDispatch();
    const rows = useSelector((state: RootState) => state.pessoas.pessoas);
    const isLoading = useSelector((state: RootState) => state.pessoas.isLoading);
    const totalCount = useSelector((state: RootState) => state.pessoas.totalCount); 
    
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        dispatch(setLoading(true));

        debounce(() => {
            PessoasService.getAll(pagina, busca)
                .then((result) => {
                    dispatch(setLoading(false));
                    if (result instanceof Error) {
                        dispatch(setError(result.message));
                        alert(result.message);
                    } else {
                        dispatch(setPessoas(result.data));
                        dispatch(setTotalCount(result.totalCount)); 
                    }
                });
        });
    }, [busca, pagina, dispatch]);

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        dispatch(setError(result.message));
                        alert(result.message);
                    } else {
                        dispatch(setPessoas(rows.filter(row => row.id !== id)));
                        alert('Registro apagado com sucesso');
                    }
                });
        }
    }

    return (
        <LayoutBaseDePagina
            titulo="Listagem de pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoBotaoNovo="Nova"
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}
                        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                        page={pagina}
                                        onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    );
};
