import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import { problems } from '@/data/problems';
import '../styles/Problems.css';

const ProblemsList = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const getDifficultyClass = (difficulty: string) => {
    return `badge badge-${difficulty.toLowerCase()}`;
  };

  return (
    <div className="problems-page">
      <Navbar />
      
      <div className="problems-container">
        <div className="problems-header">
          <h1>Coding Problems</h1>
          <p>Choose a problem to solve and earn points</p>
        </div>

        <div className="problems-table">
          <div className="table-header">
            <div className="col-status">Status</div>
            <div className="col-title">Title</div>
            <div className="col-difficulty">Difficulty</div>
            <div className="col-tags">Tags</div>
            <div className="col-action">Action</div>
          </div>

          {problems.map((problem) => {
            const isSolved = user.solvedProblems.includes(problem.id);
            
            return (
              <div key={problem.id} className={`table-row ${isSolved ? 'solved' : ''}`}>
                <div className="col-status">
                  {isSolved ? <span className="status-icon solved-icon">✅</span> : <span className="status-icon">⭕</span>}
                </div>
                <div className="col-title">
                  <span className="problem-number">{problem.id}.</span>
                  {problem.title}
                </div>
                <div className="col-difficulty">
                  <span className={getDifficultyClass(problem.difficulty)}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="col-tags">
                  {problem.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="col-action">
                  <button
                    onClick={() => navigate(`/problem/${problem.id}`)}
                    className="btn btn-primary btn-sm"
                  >
                    {isSolved ? 'Review' : 'Solve'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProblemsList;
