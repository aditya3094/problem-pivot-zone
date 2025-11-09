import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const { user, getAllUsers } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const allUsers = getAllUsers().sort((a, b) => b.points - a.points);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  return (
    <div className="leaderboard-page">
      <Navbar />
      
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h1>🏆 Leaderboard</h1>
          <p>Top coders ranked by points</p>
        </div>

        <div className="leaderboard-table">
          <div className="table-header">
            <div className="col-rank">Rank</div>
            <div className="col-username">Username</div>
            <div className="col-points">Points</div>
            <div className="col-solved">Problems Solved</div>
          </div>

          {allUsers.map((u, index) => {
            const rank = index + 1;
            const isCurrentUser = u.username === user.username;
            
            return (
              <div 
                key={u.username} 
                className={`table-row ${isCurrentUser ? 'current-user' : ''} ${rank <= 3 ? 'top-three' : ''}`}
              >
                <div className="col-rank">
                  <span className="rank-badge">{getMedalIcon(rank)} #{rank}</span>
                </div>
                <div className="col-username">
                  {u.username}
                  {isCurrentUser && <span className="you-badge">You</span>}
                </div>
                <div className="col-points">
                  <span className="points-value">{u.points}</span>
                </div>
                <div className="col-solved">
                  {u.solvedProblems.length}
                </div>
              </div>
            );
          })}

          {allUsers.length === 0 && (
            <div className="empty-state">
              <p>No users found. Start solving problems to appear on the leaderboard!</p>
            </div>
          )}
        </div>

        <div className="leaderboard-footer">
          <div className="stats-card">
            <div className="stat-item">
              <div className="stat-label">Your Rank</div>
              <div className="stat-value">
                #{allUsers.findIndex(u => u.username === user.username) + 1}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Total Users</div>
              <div className="stat-value">{allUsers.length}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Top 10%</div>
              <div className="stat-value">
                {allUsers.findIndex(u => u.username === user.username) + 1 <= Math.ceil(allUsers.length * 0.1) ? 'Yes 🎉' : 'No'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
