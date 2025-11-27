import { Outlet, Link, useLocation } from 'react-router-dom';
import { House, Users, Bed, Key, SignOut, Waves } from 'phosphor-react'; // Adicionei 'Waves'
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="logo-area">
          <Waves size={32} color="#0EA5E9" weight="fill" style={{ minWidth: '32px' }} />
          <div className="logo-text-container">
            <h1 className="logo-text">Atlantis</h1>
            <span className="logo-subtitle">Water Park</span>
          </div>
        </div>

        <nav className="nav-menu">
          <Link to="/" className={`nav-item ${isActive('/')}`}>
            <House size={24} weight={isActive('/') ? "fill" : "regular"} />
            <span className="nav-text">Painel</span>
          </Link>
          
          <Link to="/clientes" className={`nav-item ${isActive('/clientes')}`}>
            <Users size={24} weight={isActive('/clientes') ? "fill" : "regular"} />
            <span className="nav-text">Hóspedes</span>
          </Link>

          <Link to="/acomodacoes" className={`nav-item ${isActive('/acomodacoes')}`}>
            <Bed size={24} weight={isActive('/acomodacoes') ? "fill" : "regular"} />
            <span className="nav-text">Acomodações</span>
          </Link>

          <Link to="/hospedagem" className={`nav-item ${isActive('/hospedagem')}`}>
            <Key size={24} weight={isActive('/hospedagem') ? "fill" : "regular"} />
            <span className="nav-text">Hospedagem</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout">
            <SignOut size={24} />
            <span className="logout-text">Sair</span>
          </button>
        </div>
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}