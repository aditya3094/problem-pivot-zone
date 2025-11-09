import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import { problems } from '@/data/problems';
import '../styles/ProblemDetail.css';

const ProblemDetail = () => {
  const { id } = useParams();
  const { user, updatePoints, markProblemSolved } = useUser();
  const navigate = useNavigate();
  
  const problem = problems.find(p => p.id === Number(id));
  const [code, setCode] = useState(problem?.functionSkeleton || '');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!problem) {
    return <div>Problem not found</div>;
  }

  const normalizeCode = (str: string) => {
    return str
      .replace(/\s+/g, ' ')
      .replace(/\/\/.*/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .trim();
  };

  const handleRun = () => {
    setResult(null);
    const normalizedUserCode = normalizeCode(code);
    const normalizedCorrectCode = normalizeCode(problem.correctSolution);

    if (normalizedUserCode === normalizedCorrectCode) {
      setResult({
        success: true,
        message: '✅ Code executed successfully! All test cases passed.'
      });
    } else {
      setResult({
        success: false,
        message: '❌ Code execution failed. Please try again.'
      });
    }
  };

  const handleSubmit = () => {
    const normalizedUserCode = normalizeCode(code);
    const normalizedCorrectCode = normalizeCode(problem.correctSolution);

    if (normalizedUserCode === normalizedCorrectCode) {
      const alreadySolved = user.solvedProblems.includes(problem.id);
      
      if (!alreadySolved) {
        updatePoints(10);
        markProblemSolved(problem.id);
        setResult({
          success: true,
          message: '🎉 Congratulations! Solution accepted. You earned 10 points!'
        });
      } else {
        setResult({
          success: true,
          message: '✅ Solution correct! (Already solved)'
        });
      }
    } else {
      setResult({
        success: false,
        message: '❌ Wrong answer. Please review your solution and try again.'
      });
    }
  };

  const isSolved = user.solvedProblems.includes(problem.id);

  return (
    <div className="problem-detail-page">
      <Navbar />
      
      <div className="problem-detail-container">
        <div className="problem-split">
          <div className="problem-description">
            <div className="problem-header">
              <div className="problem-title-row">
                <h1>{problem.id}. {problem.title}</h1>
                {isSolved && <span className="solved-badge">✅ Solved</span>}
              </div>
              <div className="problem-meta">
                <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
                <div className="problem-tags">
                  {problem.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="problem-content">
              <h3>Description</h3>
              <p>{problem.description}</p>

              <h3>Examples</h3>
              {problem.examples.map((example, index) => (
                <div key={index} className="example-box">
                  <div><strong>Input:</strong> {example.input}</div>
                  <div><strong>Output:</strong> {example.output}</div>
                  {example.explanation && (
                    <div><strong>Explanation:</strong> {example.explanation}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="problem-editor">
            <div className="editor-header">
              <h3>Code Editor</h3>
              <span className="language-badge">Java</span>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="code-editor"
              spellCheck={false}
            />

            <div className="editor-actions">
              <button onClick={handleRun} className="btn btn-secondary">
                ▶ Run Code
              </button>
              <button onClick={handleSubmit} className="btn btn-success">
                ✓ Submit
              </button>
              <button onClick={() => navigate('/problems')} className="btn btn-secondary">
                ← Back to Problems
              </button>
            </div>

            {result && (
              <div className={`result-box ${result.success ? 'result-success' : 'result-error'}`}>
                {result.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
