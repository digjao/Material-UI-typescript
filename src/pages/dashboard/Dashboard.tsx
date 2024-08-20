import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const Dashboard = () => {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    PessoasService.getAll().then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCount(result.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
    >
      <Box width="100" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h1">{totalCount}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
