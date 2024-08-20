import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import {
  LinearProgress,
  TextField,
  Box,
  Paper,
  Grid,
  Button,
} from "@mui/material";

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          setEmail(result.email);
        }
      });
    }
  }, [id, navigate]);

  const handleSave = () => {
    setIsLoading(true);

    const dadosParaSalvar = {
      id: Number(id),
      nomeCompleto: nome,
      email: email,
      cidadeId: 1,
    };

    if (id === "nova") {
      PessoasService.create(dadosParaSalvar).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro criado com sucesso!");
          navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      PessoasService.updateById(Number(id), dadosParaSalvar).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro atualizado com sucesso!");
          navigate("/pessoas");
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas")}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

      <Box component={Paper} variant="outlined" sx={{ margin: 2, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome Completo"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={isLoading}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
