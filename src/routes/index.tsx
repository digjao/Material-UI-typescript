import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "pagina-inicial",
        label: "Página Inicial",
      },
      {
        icon: "people",
        path: "/pessoas",
        label: "Pessoas",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemDePessoas />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />

      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
    </Routes>
  );
};
