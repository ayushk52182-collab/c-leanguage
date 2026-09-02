import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { TEMP_USERNAME, TEMP_PASSWORD } from '../utils/constants';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === TEMP_USERNAME && password === TEMP_PASSWORD) {
      onLogin(username);
    } else {
      setError("Incorrect username or password.");
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-3d-bg-container">
        <div className="bg-floating-code-window glass-card">
          <div className="window-bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="window-title">python_demo.py</span>
          </div>
          <pre className="code-block">
            <code>
              <span className="code-keyword">def</span> <span className="code-func">solve_problem</span>():
{"\n"}  points = [<span className="code-num">100</span>, <span className="code-num">200</span>, <span className="code-num">300</span>]
{"\n"}  <span className="code-keyword">return</span> <span className="code-func">sum</span>(points)
{"\n\n"}  <span className="code-func">print</span>(<span className="code-str">"Mastering Python 3D!"</span>)
            </code>
          </pre>
        </div>
        <div className="bg-symbol sym-a">{`{ }`}</div>
        <div className="bg-symbol sym-b">{`</>`}</div>
        <div className="bg-symbol sym-c">01</div>
        <div className="bg-symbol sym-d">101</div>
        <div className="bg-badge bg-c">C</div>
        <div className="bg-badge bg-py">PY</div>
        <div className="bg-learning-ring"></div>
      </div>

      <motion.div
        className="glass-card login-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 20, delay: 0.2 }}
      >
        <div className="login-header">
          <div className="top-badge-row">
            <span className="badge-cyber">
              <Layers size={13} />
              CYBERPUNK CODE ACADEMY
            </span>
          </div>
          <h2 className="login-title">Welcome Back, Learner</h2>
          <p className="login-subtitle">Continue your coding journey and track your learning progress.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="login-input"
              placeholder="e.g. aayush"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="login-input password-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" className="login-submit-btn">
            Initialize Session →
          </button>
        </form>

        <div className="login-footer-info">
          <p className="progress-note">
            <ShieldCheck size={14} />
            Your learning progress is saved automatically.
          </p>
          <p className="login-credit">Designed & Engineered by Aayush Singh</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
