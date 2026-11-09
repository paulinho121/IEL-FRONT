import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Volta ao topo sempre que a rota muda (ex.: ao abrir um produto). */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
