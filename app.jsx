const { useState, useEffect, useRef } = React;

const TEMP_USERNAME = "aayush";
const TEMP_PASSWORD = "1234";

// Helper to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Lucide Icon Helper using SVG rendering fallback
const Icon = ({ name, size = 18, className = "" }) => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [name]);

  return <i data-lucide={name} style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} className={className}></i>;
};

// C Language Structured Data
const C_ROADMAP_DATA = [
  {
    id: "01",
    badge: "PHASE 01",
    title: "Foundations & I/O",
    icon: "terminal",
    desc: "Master GCC compiler setup, primitive data types, input/output tricks, and bitwise operators.",
    topics: [
      { title: "Setup: GCC, MinGW & VS Code", url: "https://youtu.be/z2jDamkbBF0?si=k0dKMuofXYDSuY0B" },
      { title: "Types: int, float, char, specifiers", url: "https://youtu.be/neLud9ah2hQ?si=0y3rJjYUIdhHTVua" },
      { title: "I/O: printf / scanf tricks", url: "https://youtu.be/bm1rFiuXGDc?si=lrRxUoo1v9yXctvj" },
      { title: "Operators: Bitwise & Ternary", url: "https://youtu.be/_yU4vi6JhPk?si=aoOB5XtJVrnERHsw" }
    ]
  },
  {
    id: "02",
    badge: "PHASE 02",
    title: "Control & Loops",
    icon: "git-fork",
    desc: "Build decision trees with if-else/switch, nested for/while loops, and star pyramid patterns.",
    topics: [
      { title: "Decisions: if-else & switch", url: "https://youtu.be/7PSfRdeY5qE?si=QPvhiVD1X-VxcTaC" },
      { title: "Loops: for, while, do-while", url: "https://youtu.be/wYvrBXUfFfw?si=aDhmtBPpH7xmWnO4" },
      { title: "Patterns: Star, Pyramid & Number", url: "https://youtu.be/WxXZk5t2BAA?si=cD_BkEMdBe0dqoH_" },
      { title: "Math: Prime, Armstrong, Fib", url: "https://youtu.be/VVt6uHpTTcs?si=z26XybfD7s0pirFB" }
    ]
  },
  {
    id: "03",
    badge: "PHASE 03",
    title: "Functions & Arrays",
    icon: "boxes",
    desc: "Explore functional prototyping, call stack recursion, 1D/2D arrays, and matrix multiplication.",
    topics: [
      { title: "Modularity: Prototyping & Scope", url: "https://youtu.be/RFLFX1boGwo?si=rBfb98DMquG0fqUD" },
      { title: "Recursion: Call Stack & Base", url: "https://youtu.be/r2yHEW8HmBE?si=faBvqp9F3PX0-Z3t" },
      { title: "Arrays: 1D, 2D & Matrix Ops", url: "https://youtu.be/h7tQ4u56njY?si=hJK78_QVYJuaXvYh" },
      { title: "Strings: char[] manipulation", url: "https://youtu.be/8qKp63Ox3vQ?si=k_UIbmXGJ5g0B-Jg" }
    ]
  },
  {
    id: "04",
    badge: "PHASE 04",
    title: "Pointers & Memory",
    icon: "cpu",
    desc: "Understand memory addresses, pointer dereferencing, pass-by-reference, and dynamic allocation (malloc/free).",
    topics: [
      { title: "Pointers: Address & & deref *", url: null },
      { title: "Passing: Value vs Reference", url: null },
      { title: "DMA: malloc() & free()", url: null },
      { title: "Structs: struct, union", url: null }
    ]
  },
  {
    id: "05",
    badge: "PHASE 05",
    title: "Files & PPS Pro",
    icon: "rocket",
    desc: "Implement file persistence with fopen/fprintf, sorting algorithms, and full mini-project applications.",
    topics: [
      { title: "Files: fopen, fprintf, fread", url: null },
      { title: "Sorting: Bubble, Selection", url: null },
      { title: "Searching: Linear vs Binary", url: null },
      { title: "Project: Student / Bank Mini-app", url: null }
    ]
  }
];

// Python Structured Data
const PYTHON_ROADMAP_DATA = [
  {
    id: "01",
    badge: "PHASE 01",
    title: "Foundations & I/O",
    icon: "terminal",
    desc: "Setup Python 3.12 interpreter, dynamic typing, input/print formatting, and expressions.",
    topics: [
      { title: "Python setup, interpreter & VS Code", url: null },
      { title: "Variables, data types & type conversion", url: null },
      { title: "input(), print() & formatted output", url: null },
      { title: "Operators and expressions", url: null }
    ]
  },
  {
    id: "02",
    badge: "PHASE 02",
    title: "Control Flow & Loops",
    icon: "git-fork",
    desc: "Master if-elif-else ladders, for/while loops, range generators, and iteration control statements.",
    topics: [
      { title: "if, elif, else conditions", url: null },
      { title: "for and while loops", url: null },
      { title: "break, continue and pass", url: null },
      { title: "Pattern and number problems", url: null }
    ]
  },
  {
    id: "03",
    badge: "PHASE 03",
    title: "Functions & Data Structures",
    icon: "boxes",
    desc: "Build modular functions, list/tuple manipulation, dictionaries, sets, and string slicing.",
    topics: [
      { title: "Functions, parameters and return values", url: null },
      { title: "Recursion and call stack", url: null },
      { title: "Lists, tuples and dictionaries", url: null },
      { title: "Strings and common operations", url: null }
    ]
  },
  {
    id: "04",
    badge: "PHASE 04",
    title: "Object-Oriented Python",
    icon: "cpu",
    desc: "Understand classes, objects, __init__ constructors, inheritance, dunder methods, and encapsulation.",
    topics: [
      { title: "Classes and objects", url: null },
      { title: "Constructors and methods", url: null },
      { title: "Inheritance and polymorphism", url: null },
      { title: "Encapsulation and abstraction", url: null }
    ]
  },
  {
    id: "05",
    badge: "PHASE 05",
    title: "Files, Modules & Projects",
    icon: "rocket",
    desc: "File I/O persistence, virtual environments, custom modules, and real-world game/AI project building.",
    topics: [
      { title: "File handling and exception handling", url: null },
      { title: "Modules and packages", url: null },
      { title: "Sorting and searching", url: null },
      { title: "Python mini-project", url: null }
    ]
  }
];

// Helper to get all topics array with index for Next Unit navigation
const getAllTopicsList = () => {
  const cTopics = C_ROADMAP_DATA.flatMap(p => p.topics.map(t => ({ ...t, lang: "C", phase: p.badge })));
  const pyTopics = PYTHON_ROADMAP_DATA.flatMap(p => p.topics.map(t => ({ ...t, lang: "Python", phase: p.badge })));
  return [...cTopics, ...pyTopics];
};

// Video 3D Icon helper (Only 3D Play symbol - No external or chain icons)
const Video3DIcon = ({ active = true }) => {
  return (
    <span className={`video-3d-symbol ${active ? "video-active" : "video-muted"}`} title={active ? "Video Lesson Available" : "Upcoming Lesson"}>
      <span className="video-depth">▶</span>
    </span>
  );
};

// Login & Sign-Up Combined Auth View
const AuthView = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!username || !email) {
        setError("Please fill out all fields.");
        return;
      }
      onLogin(username, fullName || username);
    } else {
      if (username === TEMP_USERNAME && password === TEMP_PASSWORD) {
        onLogin(username, "Aayush Singh");
      } else if (username && password) {
        onLogin(username, username);
      } else {
        setError("Please enter valid username and password.");
      }
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card-container">
        {/* Left Side Panel */}
        <div className="auth-side-panel">
          <div className="auth-brand">
            <div className="brand-logo-icon">
              <Icon name="code-2" size={24} />
            </div>
            <span className="brand-title">PPS LAB</span>
          </div>

          <div className="side-panel-content">
            <h2>Master C Language & Python step by step.</h2>
            <p>Track your video progress, solve university-level roadmap phases, and access complete handbooks.</p>
          </div>

          <div className="side-panel-footer">
            <span>Designed & Engineered by <strong>Aayush Singh</strong></span>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="auth-form-card">
          <div className="auth-header">
            <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
            <p>{isSignUp ? "Sign up to track your coding progress." : "Log in to continue your learning journey."}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error-alert">{error}</div>}

            {isSignUp && (
              <React.Fragment>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Aayush Singh"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="e.g. student@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </React.Fragment>
            )}

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. aayush"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="pwd-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? "eye-off" : "eye"} size={16} />
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn-primary auth-submit-btn">
              {isSignUp ? "Create Account →" : "Log In →"}
            </button>
          </form>

          <div className="auth-switch-footer">
            {isSignUp ? (
              <span>Already have an account? <button onClick={() => { setIsSignUp(false); setError(""); }}>Log In</button></span>
            ) : (
              <span>Don't have an account? <button onClick={() => { setIsSignUp(true); setError(""); }}>Sign Up</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// In-App YouTube Video Player Modal Component
const VideoPlayerModal = ({ videoInfo, onClose, onProgressUpdate, onNextUnit, userProgress }) => {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [embedError, setEmbedError] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [playbackState, setPlaybackState] = useState({
    currentTime: 0,
    duration: 0,
    watchedPercent: 0,
    statusText: "Not Started",
    isCompleted: false
  });

  const videoId = getYouTubeVideoId(videoInfo.url);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    let player;
    setVideoEnded(false);
    setEmbedError(false);

    const savedEntry = userProgress[videoId] || {};
    const initialTime = savedEntry.currentTime || 0;

    const createPlayer = () => {
      try {
        player = new window.YT.Player('youtube-player-element', {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            playsinline: 1,
            rel: 0,
            iv_load_policy: 3,
            enablejsapi: 1,
            origin: window.location.origin,
            start: Math.floor(initialTime)
          },
          events: {
            onReady: (event) => {
              playerRef.current = event.target;
              const dur = event.target.getDuration() || 0;
              setPlaybackState(prev => ({
                ...prev,
                duration: dur,
                currentTime: initialTime,
                watchedPercent: savedEntry.percent || 0,
                statusText: "Ready"
              }));
            },
            onStateChange: (event) => {
              let status = "Paused";
              if (event.data === window.YT.PlayerState.PLAYING) {
                status = "Watching";
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                status = "Paused";
              } else if (event.data === window.YT.PlayerState.BUFFERING) {
                status = "Buffering...";
              } else if (event.data === window.YT.PlayerState.ENDED) {
                status = "Completed";
                setVideoEnded(true);
                onProgressUpdate({
                  videoId,
                  title: videoInfo.title,
                  lang: videoInfo.lang || "C",
                  phase: videoInfo.phase || "PHASE 01",
                  currentTime: playerRef.current ? playerRef.current.getDuration() : initialTime,
                  duration: playerRef.current ? playerRef.current.getDuration() : initialTime,
                  percent: 100,
                  isCompleted: true
                });
                if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                  playerRef.current.destroy();
                }
              }
              setPlaybackState(prev => ({ ...prev, statusText: status }));
            },
            onError: () => setEmbedError(true)
          }
        });
      } catch (err) {
        setEmbedError(true);
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    intervalRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const cur = playerRef.current.getCurrentTime() || 0;
        const dur = playerRef.current.getDuration() || 0;
        const pct = dur > 0 ? Math.min(100, Math.round((cur / dur) * 100)) : 0;
        const isComp = pct >= 80;

        setPlaybackState(prev => ({
          ...prev,
          currentTime: cur,
          duration: dur,
          watchedPercent: Math.max(prev.watchedPercent, pct),
          isCompleted: prev.isCompleted || isComp
        }));

        onProgressUpdate({
          videoId,
          title: videoInfo.title,
          lang: videoInfo.lang || "C",
          phase: videoInfo.phase || "PHASE 01",
          currentTime: cur,
          duration: dur,
          percent: pct,
          isCompleted: isComp
        });
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try { playerRef.current.destroy(); } catch (e) {}
      }
    };
  }, [videoId]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="modal-backdrop">
      <div className="white-modal-card">
        <div className="modal-top-bar">
          <div className="modal-title-group">
            <span className="badge-pill blue-pill">{videoInfo.phase || "PHASE 01"}</span>
            <span className="badge-pill gray-pill">{videoInfo.lang || "C"}</span>
            <h3>{videoInfo.title}</h3>
          </div>
          <button className="icon-close-btn" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>

        {embedError ? (
          <div className="modal-error-box">
            <Icon name="alert-circle" size={32} className="text-red" />
            <h4>Embedded Playback Restricted</h4>
            <p>The content provider restricts playback inside embedded players.</p>
            <button className="btn-secondary" onClick={onClose}>Back to Roadmap</button>
          </div>
        ) : videoEnded ? (
          <div className="modal-completed-box">
            <Icon name="check-circle" size={48} className="text-green" />
            <h2>Lesson Completed ✓</h2>
            <p>Great job! You have finished watching this lesson.</p>
            <div className="completion-actions">
              <button className="btn-primary" onClick={onNextUnit}>Next Unit →</button>
              <button className="btn-secondary" onClick={onClose}>Back to Roadmap</button>
            </div>
          </div>
        ) : (
          <div className="iframe-container">
            <div id="youtube-player-element"></div>
          </div>
        )}

        {!videoEnded && !embedError && (
          <div className="modal-live-tracker">
            <div className="tracker-row">
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span>{playbackState.statusText}</span>
              </div>
              <div className="time-display">
                {formatTime(playbackState.currentTime)} / {formatTime(playbackState.duration)} ({playbackState.watchedPercent}%)
              </div>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${playbackState.watchedPercent}%` }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reset Confirmation Modal Component
const ResetConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="white-modal-card reset-modal-card">
        <div className="reset-modal-header">
          <div className="reset-icon-wrapper">
            <Icon name="alert-triangle" size={24} />
          </div>
          <h3>Reset All Learning Progress?</h3>
        </div>
        <div className="reset-modal-body">
          <p>This action will reset your saved video progress, watch percentages, playback positions, and completed statuses across all roadmaps.</p>
          <ul className="reset-checklist">
            <li>✓ Your user account remains active</li>
            <li>✓ Roadmap content & YouTube links remain unchanged</li>
            <li>⚠️ Progress tracking statistics will return to 0%</li>
          </ul>
        </div>
        <div className="reset-modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Confirm Reset</button>
        </div>
      </div>
    </div>
  );
};

// Top Navigation Bar Component
const TopNav = ({ activeTab, onSelectTab, activeLang, onSelectLang, user, onLogout }) => {
  return (
    <nav className="top-nav-bar">
      <div className="nav-container">
        <div className="nav-left">
          <div className="nav-brand" onClick={() => onSelectTab('dashboard')}>
            <Icon name="code-2" size={20} className="brand-icon" />
            <span className="brand-name">PPS LAB</span>
          </div>

          <div className="nav-tabs-desktop">
            <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => onSelectTab('dashboard')}>
              Dashboard
            </button>
            <button className={`nav-link ${activeTab === 'c' ? 'active' : ''}`} onClick={() => onSelectTab('c')}>
              C Roadmap
            </button>
            <button className={`nav-link ${activeTab === 'python' ? 'active' : ''}`} onClick={() => onSelectTab('python')}>
              Python Roadmap
            </button>
            <button className={`nav-link ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => onSelectTab('progress')}>
              Progress
            </button>
          </div>
        </div>

        <div className="nav-right">
          {/* Language Selector */}
          <div className="lang-switcher">
            <button className={`lang-pill ${activeLang === 'c' ? 'active' : ''}`} onClick={() => onSelectLang('c')}>C</button>
            <button className={`lang-pill ${activeLang === 'python' ? 'active' : ''}`} onClick={() => onSelectLang('python')}>Python</button>
          </div>

          <div className="user-profile-menu">
            <div className="user-avatar">{user ? user.substring(0, 2).toUpperCase() : "AS"}</div>
            <span className="user-name-text">{user || "Aayush Singh"}</span>
            <button className="btn-logout" onClick={onLogout} title="Logout">
              <Icon name="log-out" size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Desktop Left Sidebar Component
const LeftSidebar = ({ activeTab, onSelectTab, user, onLogout }) => {
  return (
    <aside className="left-sidebar">
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <Icon name="code-2" size={22} className="brand-icon" />
          <div>
            <h1 className="sidebar-title">PPS LAB</h1>
            <p className="sidebar-sub">Coding Learning Portal</p>
          </div>
        </div>

        <div className="sidebar-nav-menu">
          <button className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => onSelectTab('dashboard')}>
            <Icon name="layout" size={18} />
            <span>Overview</span>
          </button>
          <button className={`sidebar-item ${activeTab === 'c' || activeTab === 'python' ? 'active' : ''}`} onClick={() => onSelectTab('c')}>
            <Icon name="map-pin" size={18} />
            <span>Learning Paths</span>
          </button>
          <button className={`sidebar-item ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => onSelectTab('progress')}>
            <Icon name="bar-chart-2" size={18} />
            <span>My Progress</span>
          </button>
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="user-card-bottom">
          <div className="user-avatar-lg">AS</div>
          <div className="user-info-text">
            <span className="name">{user || "Aayush Singh"}</span>
            <span className="role">Coding Learner</span>
          </div>
        </div>
        <button className="sidebar-logout-btn" onClick={onLogout}>
          <Icon name="log-out" size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

// Dashboard Home View Component
const DashboardHome = ({ onSelectTab, userProgress }) => {
  const totalVideos = 32;
  const completedCount = Object.values(userProgress).filter(v => v.isCompleted).length;
  const inProgressCount = Object.values(userProgress).filter(v => !v.isCompleted && v.percent > 0).length;
  const overallPercent = Math.min(100, Math.round((completedCount / totalVideos) * 100));

  return (
    <div className="page-content-wrapper">
      {/* Hero Welcome Banner */}
      <section className="white-card hero-dashboard-card">
        <div className="hero-text-area">
          <span className="welcome-tag">STUDENT DASHBOARD</span>
          <h1 className="hero-greeting">Good morning, Aayush</h1>
          <p className="hero-subtext">Continue learning and build your coding skills step by step.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => onSelectTab('c')}>Continue Learning →</button>
            <button className="btn-secondary" onClick={() => onSelectTab('python')}>Explore Roadmap</button>
          </div>
        </div>
        <div className="hero-illustration-clean">
          <div className="code-window-frame">
            <div className="frame-bar"><span className="f-dot"></span><span className="f-dot"></span><span className="f-dot"></span></div>
            <div className="frame-code">
              <code><span className="c-blue">int</span> main() &#123;<br/>&nbsp;&nbsp;printf(<span className="c-green">"Hello PPS LAB"</span>);<br/>&#125;</code>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Compact Statistics Cards */}
      <section className="stats-four-grid">
        <div className="white-card stat-chip">
          <div className="stat-icon blue-bg"><Icon name="trending-up" size={18} /></div>
          <div>
            <div className="stat-number">{overallPercent}%</div>
            <div className="stat-label">Overall Progress</div>
          </div>
        </div>
        <div className="white-card stat-chip">
          <div className="stat-icon green-bg"><Icon name="check-circle" size={18} /></div>
          <div>
            <div className="stat-number">{completedCount}</div>
            <div className="stat-label">Completed Videos</div>
          </div>
        </div>
        <div className="white-card stat-chip">
          <div className="stat-icon amber-bg"><Icon name="clock" size={18} /></div>
          <div>
            <div className="stat-number">{inProgressCount}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>
        <div className="white-card stat-chip">
          <div className="stat-icon purple-bg"><Icon name="flame" size={18} /></div>
          <div>
            <div className="stat-number">3 Days</div>
            <div className="stat-label">Learning Streak</div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="learning-paths-section">
        <div className="section-header">
          <h2>Choose Your Learning Path</h2>
          <p>Structured 5-phase engineering roadmaps for university exams and interviews.</p>
        </div>

        <div className="paths-two-grid">
          {/* C Language Card */}
          <div className="white-card path-card c-accent-border">
            <div className="path-top">
              <span className="badge-pill blue-pill">C LANGUAGE</span>
              <span className="path-phases-count">5 Phases</span>
            </div>
            <h3>C Language Master Roadmap</h3>
            <p>Build strong programming fundamentals, memory pointer logic, and I/O mastery.</p>
            <div className="path-progress-group">
              <div className="path-progress-bar"><div className="bar-fill blue-fill" style={{ width: `${overallPercent}%` }}></div></div>
              <span className="progress-text">{completedCount} of 16 lessons completed</span>
            </div>
            <button className="btn-primary full-btn" onClick={() => onSelectTab('c')}>Continue C Roadmap →</button>
          </div>

          {/* Python Card */}
          <div className="white-card path-card python-accent-border">
            <div className="path-top">
              <span className="badge-pill cyan-pill">PYTHON 3.12+</span>
              <span className="path-phases-count">5 Phases</span>
            </div>
            <h3>Python Master Roadmap</h3>
            <p>Learn modern programming concepts, OOPs, dynamic data structures, and game projects.</p>
            <div className="path-progress-group">
              <div className="path-progress-bar"><div className="bar-fill cyan-fill" style={{ width: '25%' }}></div></div>
              <span className="progress-text">4 of 16 lessons completed</span>
            </div>
            <button className="btn-secondary full-btn" onClick={() => onSelectTab('python')}>Explore Python Roadmap →</button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Vertical Learning Timeline Roadmap View Component
const TimelineRoadmapView = ({ currentLang, userProgress, onTopicClick }) => {
  const data = currentLang === 'python' ? PYTHON_ROADMAP_DATA : C_ROADMAP_DATA;

  return (
    <div className="page-content-wrapper">
      <div className="roadmap-page-header">
        <div className="header-left">
          <span className="badge-pill blue-pill">{currentLang.toUpperCase()} ROADMAP</span>
          <h1>{currentLang === 'python' ? 'Python Master Blueprint' : 'C Language Master Blueprint'}</h1>
          <p>Engineered for university exams, technical interviews, and algorithmic problem solving.</p>
        </div>
      </div>

      {/* Vertical Timeline Container */}
      <div className="timeline-container">
        <div className="timeline-vertical-line"></div>

        {data.map((phase, pIdx) => {
          const totalInPhase = phase.topics.length;
          const completedInPhase = phase.topics.filter(t => {
            const vid = getYouTubeVideoId(t.url);
            return vid && userProgress[vid] && userProgress[vid].isCompleted;
          }).length;
          const phasePercent = Math.round((completedInPhase / totalInPhase) * 100);

          return (
            <div key={phase.id} className="timeline-phase-card white-card">
              <div className="phase-node-indicator">{phase.id}</div>
              
              <div className="phase-card-header">
                <div>
                  <span className="phase-badge">{phase.badge}</span>
                  <h2>{phase.title}</h2>
                  <p className="phase-desc">{phase.desc}</p>
                </div>
                <div className="phase-stats-box">
                  <span className="p-count">{completedInPhase} / {totalInPhase} Completed</span>
                  <div className="mini-progress-bar">
                    <div className="bar-fill blue-fill" style={{ width: `${phasePercent}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Topic Rows */}
              <div className="timeline-topics-list">
                {phase.topics.map((topic, tIdx) => {
                  const vid = getYouTubeVideoId(topic.url);
                  const prog = vid ? userProgress[vid] : null;

                  let statusText = "Not Started";
                  let statusClass = "not-started";

                  if (prog) {
                    if (prog.isCompleted) {
                      statusText = "Completed ✓";
                      statusClass = "completed";
                    } else if (prog.percent > 0) {
                      statusText = `In Progress (${prog.percent}%)`;
                      statusClass = "in-progress";
                    }
                  }

                  return (
                    <div
                      key={tIdx}
                      className="timeline-topic-row"
                      onClick={() => onTopicClick({ ...topic, phase: phase.badge, lang: currentLang === 'python' ? 'Python' : 'C' })}
                    >
                      <div className="topic-title-area">
                        <Video3DIcon active={Boolean(topic.url)} />
                        <span>{topic.title}</span>
                      </div>
                      {topic.url && (
                        <span className={`status-pill ${statusClass}`}>{statusText}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Dedicated Learning Progress Page Component
const ProgressPage = ({ userProgress, onOpenResetModal }) => {
  const totalVideos = 32;
  const completedCount = Object.values(userProgress).filter(v => v.isCompleted).length;
  const inProgressCount = Object.values(userProgress).filter(v => !v.isCompleted && v.percent > 0).length;
  const remainingCount = Math.max(0, totalVideos - completedCount);
  const overallPercent = Math.min(100, Math.round((completedCount / totalVideos) * 100));

  return (
    <div className="page-content-wrapper">
      <div className="progress-page-header">
        <h1>My Learning Progress</h1>
        <p>Track video completions, phase percentages, and learning metrics in real time.</p>
      </div>

      <div className="progress-metrics-grid">
        <div className="white-card metric-card">
          <h3>Overall Completion</h3>
          <div className="metric-large-number">{overallPercent}%</div>
          <div className="progress-bar-bg"><div className="bar-fill blue-fill" style={{ width: `${overallPercent}%` }}></div></div>
        </div>

        <div className="white-card metric-card">
          <h3>Completed Lessons</h3>
          <div className="metric-large-number text-green">{completedCount}</div>
          <span className="metric-sub">Out of {totalVideos} total roadmap lessons</span>
        </div>

        <div className="white-card metric-card">
          <h3>In Progress Lessons</h3>
          <div className="metric-large-number text-amber">{inProgressCount}</div>
          <span className="metric-sub">Currently saved playback positions</span>
        </div>

        <div className="white-card metric-card">
          <h3>Remaining Lessons</h3>
          <div className="metric-large-number text-muted">{remainingCount}</div>
          <span className="metric-sub">Lessons left to complete roadmap</span>
        </div>
      </div>

      {/* Reset Progress Control Card */}
      <section className="white-card reset-control-card">
        <div>
          <h3>Reset Learning Progress</h3>
          <p>Clears saved video progress positions, completed statuses, and watch percentages.</p>
        </div>
        <button className="btn-danger" onClick={onOpenResetModal}>Reset My Tracking</button>
      </section>
    </div>
  );
};

// Main App Router & Component Integration
const App = () => {
  const [user, setUser] = useState(() => sessionStorage.getItem("pps_user") || "aayush");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeLang, setActiveLang] = useState("c");
  const [activeVideo, setActiveVideo] = useState(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [userProgress, setUserProgress] = useState(() => {
    if (!user) return {};
    const saved = localStorage.getItem(`pps-video-progress-${user}`);
    return saved ? JSON.parse(saved) : {};
  });

  const handleLogin = (username, fullName) => {
    setUser(username);
    sessionStorage.setItem("pps_user", username);
    const saved = localStorage.getItem(`pps-video-progress-${username}`);
    setUserProgress(saved ? JSON.parse(saved) : {});
    setToastMessage(`Welcome, ${fullName || username}!`);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("pps_user");
  };

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'c' || tab === 'python') {
      setActiveLang(tab);
    }
  };

  const handleTopicClick = (topic) => {
    if (topic.url) {
      setActiveVideo(topic);
    } else {
      setToastMessage("Video lesson link coming soon.");
    }
  };

  const handleNextUnit = () => {
    if (!activeVideo) return;
    const allTopics = getAllTopicsList();
    const currIndex = allTopics.findIndex(t => t.title === activeVideo.title);
    if (currIndex !== -1 && currIndex + 1 < allTopics.length) {
      const nextItem = allTopics[currIndex + 1];
      if (nextItem.url) {
        setActiveVideo(nextItem);
      } else {
        setToastMessage(`Next unit "${nextItem.title}" video coming soon.`);
        setActiveVideo(null);
      }
    } else {
      setToastMessage("You have completed all available units!");
      setActiveVideo(null);
    }
  };

  const handleVideoProgressUpdate = (progressData) => {
    if (!user || !progressData.videoId) return;

    setUserProgress(prev => {
      const prevEntry = prev[progressData.videoId] || {};
      const updated = {
        ...prev,
        [progressData.videoId]: {
          videoId: progressData.videoId,
          title: progressData.title,
          lang: progressData.lang,
          phase: progressData.phase,
          currentTime: progressData.currentTime,
          duration: progressData.duration,
          percent: Math.max(prevEntry.percent || 0, progressData.percent),
          isCompleted: prevEntry.isCompleted || progressData.isCompleted,
          lastWatchedAt: new Date().toISOString()
        }
      };
      localStorage.setItem(`pps-video-progress-${user}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleConfirmReset = () => {
    if (!user) return;
    localStorage.removeItem(`pps-video-progress-${user}`);
    setUserProgress({});
    setIsResetModalOpen(false);
    setToastMessage("Your learning progress has been reset.");
  };

  return (
    <React.Fragment>
      {!user ? (
        <AuthView onLogin={handleLogin} />
      ) : (
        <div className="app-shell">
          <TopNav
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            activeLang={activeLang}
            onSelectLang={(lang) => { setActiveLang(lang); setActiveTab(lang); }}
            user={user}
            onLogout={handleLogout}
          />

          <div className="shell-body">
            <LeftSidebar
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              user={user}
              onLogout={handleLogout}
            />

            <main className="main-content-area">
              {activeTab === 'dashboard' && (
                <DashboardHome
                  onSelectTab={handleSelectTab}
                  userProgress={userProgress}
                />
              )}

              {(activeTab === 'c' || activeTab === 'python') && (
                <TimelineRoadmapView
                  currentLang={activeLang}
                  userProgress={userProgress}
                  onTopicClick={handleTopicClick}
                />
              )}

              {activeTab === 'progress' && (
                <ProgressPage
                  userProgress={userProgress}
                  onOpenResetModal={() => setIsResetModalOpen(true)}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {activeVideo && (
        <VideoPlayerModal
          videoInfo={activeVideo}
          userProgress={userProgress}
          onClose={() => setActiveVideo(null)}
          onNextUnit={handleNextUnit}
          onProgressUpdate={handleVideoProgressUpdate}
        />
      )}

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </React.Fragment>
  );
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
