import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Layout from "../../pages/Layout";

/** Só mostra o conteúdo para quem está logado; senão manda para o login e volta depois. */
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading, loggedOutPath } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Layout>
        <p className="py-24 text-center text-dark-gray-3">Carregando...</p>
      </Layout>
    );
  }
  // Quem acabou de sair vai para a Home, e não para a tela de login
  if (!user && loggedOutPath === location.pathname) return <Navigate to="/" replace />;
  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }
  return children;
}
