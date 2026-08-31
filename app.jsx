const { useState, useEffect, useRef } = React;

// Lucide Icon Helper using SVG rendering fallback for smooth standalone UMD compatibility
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
    bottomLabel: "WEEK 1 TARGET",
    bottomIcon: "zap",
    isActive: false,
    topics: [
      {
        title: "Setup: GCC, MinGW & VS Code",
        url: "https://youtu.be/z2jDamkbBF0?si=k0dKMuofXYDSuY0B"
      },
      {
        title: "Types: int, float, char, specifiers",
        url: "https://youtu.be/neLud9ah2hQ?si=0y3rJjYUIdhHTVua"
      },
      {
        title: "I/O: printf / scanf tricks",
        url: "https://youtu.be/bm1rFiuXGDc?si=lrRxUoo1v9yXctvj"
      },
      {
        title: "Operators: Bitwise & Ternary",
        url: "https://youtu.be/_yU4vi6JhPk?si=aoOB5XtJVrnERHsw"
      }
    ]
  },
  {
    id: "02",
    badge: "PHASE 02",
    title: "Control & Loops",
    icon: "git-fork",
    bottomLabel: "LOGIC BUILDING",
    bottomIcon: "code-2",
    isActive: false,
    topics: [
      {
        title: "Decisions: if-else & switch",
        url: "https://youtu.be/7PSfRdeY5qE?si=QPvhiVD1X-VxcTaC"
      },
      {
        title: "Loops: for, while, do-while",
        url: "https://youtu.be/wYvrBXUfFfw?si=aDhmtBPpH7xmWnO4"
      },
      {
        title: "Patterns: Star, Pyramid & Number",
        url: "https://youtu.be/WxXZk5t2BAA?si=cD_BkEMdBe0dqoH_"
      },
      {
        title: "Math: Prime, Armstrong, Fib",
        url: "https://youtu.be/VVt6uHpTTcs?si=z26XybfD7s0pirFB"
      }
    ]
  },
  {
    id: "03",
    badge: "PHASE 03",
    title: "Functions & Arrays",
    icon: "boxes",
    bottomLabel: "CORE MODULARITY",
    bottomIcon: "git-branch",
    isActive: false,
    topics: [
      {
        title: "Modularity: Prototyping & Scope",
        url: "https://youtu.be/RFLFX1boGwo?si=rBfb98DMquG0fqUD"
      },
      {
        title: "Recursion: Call Stack & Base",
        url: "https://youtu.be/r2yHEW8HmBE?si=faBvqp9F3PX0-Z3t"
      },
      {
        title: "Arrays: 1D, 2D & Matrix Ops",
        url: "https://youtu.be/h7tQ4u56njY?si=hJK78_QVYJuaXvYh"
      },
      {
        title: "Strings: char[] manipulation",
        url: "https://youtu.be/8qKp63Ox3vQ?si=k_UIbmXGJ5g0B-Jg"
      }
    ]
  },
  {
    id: "04",
    badge: "PHASE 04",
    title: "Pointers & Memory",
    icon: "cpu",
    bottomLabel: "HEART OF C",
    bottomIcon: "flame",
    isActive: false,
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
    bottomLabel: "EXAM MASTERY",
    bottomIcon: "trophy",
    isActive: false,
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
    title: "Python Foundations & I/O",
    icon: "terminal",
    bottomLabel: "WEEK 1 TARGET",
    bottomIcon: "zap",
    isActive: false,
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
    bottomLabel: "LOGIC BUILDING",
    bottomIcon: "code-2",
    isActive: false,
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
    bottomLabel: "CORE MODULARITY",
    bottomIcon: "git-branch",
    isActive: false,
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
    bottomLabel: "HEART OF PYTHON",
    bottomIcon: "flame",
    isActive: false,
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
    bottomLabel: "EXAM MASTERY",
    bottomIcon: "trophy",
    isActive: false,
    topics: [
      { title: "File handling and exception handling", url: null },
      { title: "Modules and packages", url: null },
      { title: "Sorting and searching", url: null },
      { title: "Python mini-project", url: null }
    ]
  }
];

// Header Component with Language Selector
const Header = ({ currentLang, onSelectLang }) => {
  const isPython = currentLang === 'python';

  return (
    <header className="glass-panel header-card 3d-header">
      <div className="header-left layer-depth-high">
        <div className="top-badge-row">
          <span className="badge-3d">
            <Icon name="layers" size={13} />
            3D ENGINEERING ROADMAP
          </span>
          <span className="badge-creator">
            <Icon name="code" size={12} />
            BY AAYUSH SINGH
          </span>
          
          {/* Language Selector Pill */}
          <div className="language-selector-pill">
            <span className="lang-label">LANGUAGE:</span>
            <button
              className={`lang-btn ${!isPython ? 'active' : ''}`}
              onClick={() => onSelectLang('c')}
              aria-label="Switch to C Language Roadmap"
            >
              C
            </button>
            <button
              className={`lang-btn ${isPython ? 'active' : ''}`}
              onClick={() => onSelectLang('python')}
              aria-label="Switch to Python Roadmap"
            >
              PYTHON
            </button>
          </div>
        </div>

        <div className="main-title-row">
          <h1 className="main-title">
            {isPython ? "Python Master Blueprint" : "C Language Master Blueprint"}
          </h1>
          <span className="badge-pro">PRO 3D</span>
        </div>
        <p className="subtitle">
          Engineered for university exams, technical interviews & algorithmic problem solving.
        </p>
      </div>

      <div className="header-stats layer-depth-mid">
        <StatCard value="5" label="PHASES" />
        <StatCard value="30" label="DAYS TARGET" />
        <StatCard value="100%" label="LOGIC BUILD" />
      </div>
    </header>
  );
};

// StatCard Component
const StatCard = ({ value, label }) => {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

// TopicRow Component
const TopicRow = ({ topic, onTopicClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTopicClick(topic);
    }
  };

  return (
    <div
      className="topic-row layer-depth-low"
      tabIndex={0}
      role="button"
      aria-label={`Open topic video: ${topic.title}`}
      onClick={() => onTopicClick(topic)}
      onKeyDown={handleKeyDown}
    >
      <div className="topic-left">
        <span className="topic-bullet">▸</span>
        <span>{topic.title}</span>
      </div>
    </div>
  );
};

// PhaseCard Component with Interactive 3D Mouse Perspective Tilt
const PhaseCard = ({ phase, onTopicClick, animationDelay }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [reflectionStyle, setReflectionStyle] = useState({});

  const handleMouseMove = (e) => {
    if (window.matchMedia("(max-width: 900px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate subtle max 2.5 degrees for maximum readability and visual stability
    const rotateX = ((centerY - y) / centerY) * 2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;
    
    setTransformStyle(`perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`);
    setReflectionStyle({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
    setReflectionStyle({});
  };

  return (
    <div 
      ref={cardRef}
      className="glass-panel phase-card 3d-card"
      style={{ animationDelay: `${animationDelay}ms`, transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-light-reflection" style={reflectionStyle}></div>
      <div className="card-inner-depth">
        <div className="phase-top-bar layer-depth-high">
          <span className="phase-badge">{phase.badge}</span>
          <div className="phase-icon-wrapper">
            <Icon name={phase.icon} size={18} />
          </div>
        </div>

        <h2 className="phase-title layer-depth-mid">{phase.title}</h2>

        <div className="topics-list">
          {phase.topics.map((topic, index) => (
            <TopicRow key={index} topic={topic} onTopicClick={onTopicClick} />
          ))}
        </div>
      </div>

      <div className="phase-bottom-label layer-depth-low">
        <Icon name={phase.bottomIcon || 'sparkles'} size={14} />
        <span>{phase.bottomLabel}</span>
      </div>
    </div>
  );
};

// SuccessProtocol Component
const SuccessProtocol = ({ currentLang }) => {
  const isPython = currentLang === 'python';

  const protocols = [
    {
      icon: "wrench",
      boldText: "Dry Run:",
      normalText: "Trace variables on paper first"
    },
    {
      icon: "shield",
      boldText: "Edge Cases:",
      normalText: "Test 0, negative & empty bounds"
    },
    {
      icon: "cpu",
      boldText: "Memory:",
      normalText: isPython ? "Manage resources carefully" : "Always free dynamic heap blocks"
    }
  ];

  return (
    <div className="glass-panel protocol-panel 3d-protocol">
      <div className="protocol-title layer-depth-mid">
        <Icon name="lightbulb" size={18} />
        <span>SUCCESS PROTOCOL:</span>
      </div>
      <div className="protocol-items layer-depth-high">
        {protocols.map((item, idx) => (
          <div key={idx} className="protocol-chip">
            <span className="chip-icon-box">
              <Icon name={item.icon} size={15} />
            </span>
            <span>
              <strong className="chip-bold">{item.boldText}</strong> {item.normalText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer-credit">
      <div className="footer-line"></div>
      <p className="footer-text">
        <Icon name="sparkles" size={14} className="footer-sparkle" />
        Designed & Engineered by <strong className="author-name">Aayush Singh</strong>
      </p>
    </footer>
  );
};

// Toast Component
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast">
        <Icon name="info" size={18} style={{ color: 'var(--neon-cyan)' }} />
        <span>{message}</span>
      </div>
    </div>
  );
};

// Main App Component with Route/State Synchronization
const App = () => {
  const getInitialLang = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/python') || window.location.hash === '#python') {
      return 'python';
    }
    return 'c';
  };

  const [currentLang, setCurrentLang] = useState(getInitialLang);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [currentLang]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentLang(getInitialLang());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectLang = (lang) => {
    setCurrentLang(lang);
    const targetPath = lang === 'python' ? '/python' : '/c';
    window.history.pushState({}, '', targetPath);
  };

  const handleTopicClick = (topic) => {
    if (topic.url) {
      window.open(topic.url, "_blank", "noopener,noreferrer");
    } else {
      setToastMessage("Video link coming soon.");
    }
  };

  const currentRoadmap = currentLang === 'python' ? PYTHON_ROADMAP_DATA : C_ROADMAP_DATA;

  return (
    <React.Fragment>
      {/* Background 3D Perspective Plane & Moving Horizon Particles */}
      <div className="perspective-grid-floor"></div>
      <div className="horizon-glow"></div>

      <Header currentLang={currentLang} onSelectLang={handleSelectLang} />
      
      <main className="roadmap-grid">
        {currentRoadmap.map((phase, idx) => (
          <PhaseCard 
            key={phase.id} 
            phase={phase} 
            onTopicClick={handleTopicClick}
            animationDelay={100 * idx}
          />
        ))}
      </main>

      <SuccessProtocol currentLang={currentLang} />

      <Footer />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </React.Fragment>
  );
};

// Render React App
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
