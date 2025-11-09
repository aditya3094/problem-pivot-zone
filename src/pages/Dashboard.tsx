import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome, {user.username}! 👋
          </h1>
          <p className="welcome-subtitle">
            Ready to solve some problems today?
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-primary">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-value">{user.points}</div>
              <div className="stat-label">Total Points</div>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{user.solvedProblems.length}</div>
              <div className="stat-label">Problems Solved</div>
            </div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-value">{Math.floor(user.points / 10)}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-value">#{user.points > 50 ? '1' : user.points > 30 ? '2' : '3'}</div>
              <div className="stat-label">Your Rank</div>
            </div>
          </div>
        </div>

        <div className="action-cards">
          <div className="action-card" onClick={() => navigate('/problems')}>
            <div className="action-icon">💻</div>
            <h3>Solve Problems</h3>
            <p>Practice coding problems and earn points</p>
            <button className="btn btn-primary">Start Solving</button>
          </div>

          <div className="action-card" onClick={() => navigate('/leaderboard')}>
            <div className="action-icon">🏆</div>
            <h3>Leaderboard</h3>
            <p>See how you rank against other coders</p>
            <button className="btn btn-secondary">View Rankings</button>
          </div>

          <div className="action-card" onClick={() => navigate('/profile')}>
            <div className="action-icon">👤</div>
            <h3>Your Profile</h3>
            <p>Track your progress and achievements</p>
            <button className="btn btn-secondary">View Profile</button>
          </div>
        </div>

        <div className="motivation-section">
          <div className="motivation-card">
            <h3>💪 Keep Going!</h3>
            <p>Every problem you solve makes you a better coder. Keep pushing forward!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
