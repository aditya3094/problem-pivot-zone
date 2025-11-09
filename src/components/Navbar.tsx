import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <span className="brand-icon">💻</span>
          CodeMaster
        </Link>
        
        <div className="navbar-links">
          <Link to="/dashboard" className="nav-link">
            🏠 Home
          </Link>
          <Link to="/problems" className="nav-link">
            💻 Problems
          </Link>
          <Link to="/leaderboard" className="nav-link">
            🏆 Leaderboard
          </Link>
          <Link to="/profile" className="nav-link">
            👤 Profile
          </Link>
          <button onClick={handleLogout} className="nav-link logout-btn">
            🚪 Logout
          </button>
        </div>

        <div className="navbar-user">
          <span className="user-points">⭐ {user.points} pts</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
