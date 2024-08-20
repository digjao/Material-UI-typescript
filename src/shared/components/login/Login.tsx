import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import { useAuthContext } from "../../contexts";

interface ILoginProps {
  children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await login(email, password);

      if (result) {
        alert(result);
      } else {
        console.log("Login bem-sucedido!");
      }
    } catch (error) {
      alert("Erro ao tentar fazer login.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={250}>
            <Typography variant="h6" align="center">
              Identifique-se
            </Typography>

            <TextField
              fullWidth
              type="email"
              label="Email"
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleSubmit}
              endIcon={
                isLoading ? (
                  <CircularProgress
                    variant="indeterminate"
                    color="inherit"
                    size={20}
                  />
                ) : undefined
              }
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
