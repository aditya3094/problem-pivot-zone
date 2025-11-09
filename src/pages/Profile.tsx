import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import { problems } from '@/data/problems';
import '../styles/Profile.css';

const Profile = () => {
  const { user, getAllUsers } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const allUsers = getAllUsers().sort((a, b) => b.points - a.points);
  const userRank = allUsers.findIndex(u => u.username === user.username) + 1;
  
  const solvedByDifficulty = {
    easy: problems.filter(p => p.difficulty === 'Easy' && user.solvedProblems.includes(p.id)).length,
    medium: problems.filter(p => p.difficulty === 'Medium' && user.solvedProblems.includes(p.id)).length,
    hard: problems.filter(p => p.difficulty === 'Hard' && user.solvedProblems.includes(p.id)).length,
  };

  const totalByDifficulty = {
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
  };

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1>{user.username}</h1>
            <p className="profile-rank">Rank #{userRank} · {user.points} Points</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card-large">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-value">{user.points}</div>
              <div className="stat-label">Total Points</div>
            </div>
          </div>

          <div className="stat-card-large">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{user.solvedProblems.length}</div>
              <div className="stat-label">Problems Solved</div>
            </div>
          </div>

          <div className="stat-card-large">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-value">#{userRank}</div>
              <div className="stat-label">Global Rank</div>
            </div>
          </div>

          <div className="stat-card-large">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-value">{Math.floor(user.points / 10)}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
        </div>

        <div className="profile-sections">
          <div className="profile-section">
            <h2>Problem Solving Progress</h2>
            <div className="difficulty-stats">
              <div className="difficulty-stat">
                <div className="difficulty-header">
                  <span className="badge badge-easy">Easy</span>
                  <span className="difficulty-count">{solvedByDifficulty.easy}/{totalByDifficulty.easy}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill progress-easy" 
                    style={{ width: `${(solvedByDifficulty.easy / totalByDifficulty.easy) * 100}%` }}
                  />
                </div>
              </div>

              <div className="difficulty-stat">
                <div className="difficulty-header">
                  <span className="badge badge-medium">Medium</span>
                  <span className="difficulty-count">{solvedByDifficulty.medium}/{totalByDifficulty.medium}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill progress-medium" 
                    style={{ width: `${(solvedByDifficulty.medium / totalByDifficulty.medium) * 100}%` }}
                  />
                </div>
              </div>

              <div className="difficulty-stat">
                <div className="difficulty-header">
                  <span className="badge badge-hard">Hard</span>
                  <span className="difficulty-count">{solvedByDifficulty.hard}/{totalByDifficulty.hard}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill progress-hard" 
                    style={{ width: `${(solvedByDifficulty.hard / totalByDifficulty.hard) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Recent Activity</h2>
            {user.solvedProblems.length > 0 ? (
              <div className="activity-list">
                {user.solvedProblems.slice(-5).reverse().map((problemId) => {
                  const problem = problems.find(p => p.id === problemId);
                  if (!problem) return null;
                  
                  return (
                    <div key={problemId} className="activity-item">
                      <span className="activity-icon">✅</span>
                      <div className="activity-content">
                        <div className="activity-title">{problem.title}</div>
                        <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="activity-points">+10 pts</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-activity">
                <p>No problems solved yet. Start solving to see your activity!</p>
                <button onClick={() => navigate('/problems')} className="btn btn-primary">
                  Solve Problems
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
