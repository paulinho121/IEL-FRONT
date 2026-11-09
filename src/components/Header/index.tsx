import { useEffect, useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { LogOut, Menu, Search, UserRound, X } from "lucide-react";
import Logo from "../Logo";
import miniCart from "../../assets/mini-cart.svg";
import { useAuth } from "../../contexts/AuthContext";

const navLinks = [
  { text: "Home", to: "/" },
  { text: "Produtos", to: "/products" },
  { text: "Categorias", to: "/categorias" },
  { text: "Meus Pedidos", to: "/meus-pedidos" },
];

export default function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("filter") ?? "");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  // Mantém o campo em sincronia quando a URL muda (ex.: voltar no navegador)
  useEffect(() => {
    setQuery(searchParams.get("filter") ?? "");
  }, [searchParams]);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? `/products?filter=${encodeURIComponent(term)}` : "/products");
    setMenuOpen(false);
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `pb-1 text-base transition-colors ${
      isActive
        ? "border-b-2 border-primary font-bold text-primary"
        : "border-b-2 border-transparent text-dark-gray-2 hover:text-primary"
    }`;

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-4 xl:gap-x-10 px-4 pt-6 pb-4 md:px-10 xl:px-[100px] md:pt-10 md:pb-8">
        <button
          type="button"
          className="text-dark-gray-2 md:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" aria-label="Página inicial" className="shrink-0">
          <Logo className="max-lg:h-[34px] max-lg:w-auto max-md:h-[30px]" />
        </Link>

        {/* Campo de busca: ícone de lupa à direita, busca no clique ou Enter */}
        <form
          role="search"
          onSubmit={handleSearch}
          className="order-last flex h-[60px] w-full items-center rounded-lg bg-light-gray-3 px-5 lg:order-none lg:w-auto lg:min-w-0 lg:flex-1 lg:basis-0"
        >
          <label htmlFor="search" className="sr-only">
            Pesquisar produto
          </label>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar produto..."
            className="h-full flex-1 bg-transparent text-base text-dark-gray-2 outline-none placeholder:text-light-gray"
          />
          <button type="submit" aria-label="Buscar" className="text-light-gray hover:text-primary">
            <Search size={22} />
          </button>
        </form>

        {/* Área de redirecionamento + carrinho */}
        <div className="ml-auto flex shrink-0 items-center gap-6 lg:ml-0 lg:gap-8">
          {user ? (
            <>
              <span className="hidden items-center gap-2 text-base text-dark-gray-2 md:flex">
                <UserRound size={20} className="text-primary" />
                Olá, <strong>{user.firstname}</strong>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden h-10 items-center gap-2 rounded border border-primary px-4 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white md:flex"
              >
                <LogOut size={16} /> Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/cadastro" className="hidden text-base text-dark-gray-2 underline decoration-dark-gray-2 md:inline">
                Cadastre-se
              </Link>
              <Link
                to="/login"
                className="hidden h-10 w-[114px] items-center justify-center rounded bg-primary text-sm font-bold text-white transition-colors hover:bg-tertiary md:flex"
              >
                Entrar
              </Link>
            </>
          )}
          <img src={miniCart} alt="Carrinho de compras" className="size-6" />
        </div>

        <nav aria-label="Navegação principal" className="hidden w-full md:block">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={navLinkClass}>
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav aria-label="Navegação mobile" className="border-t border-light-gray-2 px-4 py-6 md:hidden">
          <p className="mb-4 text-base font-bold text-dark-gray-2">Páginas</p>
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
          <hr className="my-6 border-light-gray-2" />
          {user ? (
            <>
              <p className="mb-4 text-center text-base text-dark-gray-2">
                Olá, <strong>{user.firstname}</strong>
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-10 w-full items-center justify-center gap-2 rounded border border-primary text-sm font-bold text-primary"
              >
                <LogOut size={16} /> Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 items-center justify-center rounded bg-primary text-sm font-bold text-white"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                onClick={() => setMenuOpen(false)}
                className="mt-4 block text-center text-base text-dark-gray-2 underline"
              >
                Cadastre-se
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
