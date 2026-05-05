import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path ? 'navbar-link active' : 'navbar-link';

  const navLinks = (
    <>
      <Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>Home</Link>
      <Link to="/explore" className={isActive('/explore')} onClick={() => setMenuOpen(false)}>Explore</Link>
      <Link to="/gainers" className={isActive('/gainers')} onClick={() => setMenuOpen(false)}>Gainers</Link>
      <Link to="/new-listings" className={isActive('/new-listings')} onClick={() => setMenuOpen(false)}>New</Link>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-icon">CP</span>
          Crypto Project
        </Link>

        <div className="navbar-links">{navLinks}</div>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/profile" className="btn btn-secondary btn-sm">Profile</Link>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
          <button className="navbar-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks}
          {user ? (
            <>
              <Link to="/profile" className="navbar-link" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="navbar-link" style={{ background: 'none', textAlign: 'left', color: 'var(--red)' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="navbar-link" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
