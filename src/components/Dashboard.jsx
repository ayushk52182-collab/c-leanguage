import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, RotateCcw, Compass, PlayCircle, Code2, Terminal as TerminalIcon, BrainCircuit, Route, Cpu, TrendingUp, Target, Quote, Trophy, Sparkles } from 'lucide-react';
import { SAMPLE_ACHIEVEMENTS } from '../data/achievements';
import { TOTAL_VIDEOS } from '../utils/constants';
import * as Icons from 'lucide-react';
import HeroCanvas3D from '../three/HeroCanvas3D';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } }
};

const Dashboard = ({ onSelectTab, onTopicClick, userProgress, onResetTracking }) => {
  const completedCount = Object.values(userProgress).filter(v => v.isCompleted).length;
  const inProgressCount = Object.values(userProgress).filter(v => !v.isCompleted && v.percent > 0).length;
  const overallPercent = Math.min(100, Math.round((completedCount / TOTAL_VIDEOS) * 100));

  return (
    <motion.div className="dashboard-container" variants={containerVariants} initial="hidden" animate="visible">

      {/* Hero Section with Interactive 3D WebGL Canvas */}
      <motion.section className="glass-card hero-section" variants={itemVariants}>
        <div className="hero-content">
          <div className="top-badge-row">
            <span className="badge-cyber"><Sparkles size={13} /> WELCOME TO YOUR LEARNING SPACE</span>
            <span className="badge-creator"><Code2 size={12} /> Designed & Engineered by Aayush Singh</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">Build Your</span>
            <span className="hero-title-line gradient-text">Coding Future</span>
          </h1>
          <p className="hero-subtitle">Watch lessons, master C & Python algorithms, and complete your roadmap in interactive 3D.</p>
          <div className="hero-cta-group">
            <button className="btn-primary btn-glow" onClick={() => onSelectTab('c')}>Start C Roadmap →</button>
            <button className="btn-secondary" onClick={() => onSelectTab('python')}>Python Blueprint</button>
            <button className="btn-secondary" onClick={() => onSelectTab('practice')} style={{ borderColor: 'rgba(180, 74, 255, 0.4)', color: 'var(--neon-purple)' }}>
              <BrainCircuit size={15} /> Practice Studio
            </button>
          </div>
        </div>

        {/* 3D WebGL Scene & Floating Code Card */}
        <div className="hero-illustration" style={{ minHeight: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
            <Suspense fallback={<div className="loading-3d">Initializing 3D World...</div>}>
              <HeroCanvas3D />
            </Suspense>
          </div>

          <div className="illustration-window glass-card" style={{ zIndex: 2, pointerEvents: 'auto', background: 'rgba(6, 6, 15, 0.85)', backdropFilter: 'blur(16px)' }}>
            <div className="window-bar">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="window-title">aayush_mastery.c</span>
            </div>
            <pre className="code-block">
              <code>
                <span className="code-keyword">#include</span> &lt;stdio.h&gt;{"\n\n"}<span className="code-keyword">int</span> <span className="code-func">main</span>() {"{"}{"\n"}  <span className="code-func">printf</span>(<span className="code-str">"Mastering C & Python 3D!\\n"</span>);{"\n"}  <span className="code-keyword">return</span> <span className="code-num">0</span>;{"\n"}{"}"}
              </code>
            </pre>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section className="section-block" variants={itemVariants}>
        <div className="section-header-row">
          <h2 className="section-title"><BarChart2 size={20} /> Learning Dashboard Statistics</h2>
          <button className="reset-tracking-btn" onClick={onResetTracking}><RotateCcw size={13} /> Reset My Tracking</button>
        </div>
        <div className="quick-cards-grid">
          <div className="stat-card-dashboard glass-card"><span className="d-stat-val">{TOTAL_VIDEOS}</span><span className="d-stat-lbl">TOTAL LESSON VIDEOS</span></div>
          <div className="stat-card-dashboard glass-card green"><span className="d-stat-val">{completedCount}</span><span className="d-stat-lbl">COMPLETED VIDEOS</span></div>
          <div className="stat-card-dashboard glass-card yellow"><span className="d-stat-val">{inProgressCount}</span><span className="d-stat-lbl">VIDEOS IN PROGRESS</span></div>
          <div className="stat-card-dashboard glass-card cyan"><span className="d-stat-val">{overallPercent}%</span><span className="d-stat-lbl">OVERALL PROGRESS</span></div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section className="section-block" variants={itemVariants}>
        <h2 className="section-title"><Compass size={20} /> Quick Actions</h2>
        <div className="quick-cards-grid">
          <div className="glass-card quick-card" onClick={() => onSelectTab('c')}>
            <div className="quick-icon-box"><PlayCircle size={22} /></div>
            <h3>Continue Learning</h3>
            <p>Pick up where you left off</p>
            <div className="quick-card-bottom">
              <div className="mini-progress-bar"><div className="fill" style={{ width: `${overallPercent}%` }}></div></div>
              <button className="quick-btn">Continue</button>
            </div>
          </div>
          <div className="glass-card quick-card" onClick={() => onSelectTab('c')}>
            <div className="quick-icon-box blue"><Code2 size={22} /></div>
            <h3>C Language</h3>
            <p>Master C programming fundamentals</p>
            <div className="quick-card-bottom"><button className="quick-btn">Open C Roadmap</button></div>
          </div>
          <div className="glass-card quick-card" onClick={() => onSelectTab('python')}>
            <div className="quick-icon-box purple"><TerminalIcon size={22} /></div>
            <h3>Python</h3>
            <p>Learn Python from basics to projects</p>
            <div className="quick-card-bottom"><button className="quick-btn">Open Python Roadmap</button></div>
          </div>
          <div className="glass-card quick-card" onClick={() => onSelectTab('practice')}>
            <div className="quick-icon-box cyan"><BrainCircuit size={22} /></div>
            <h3>Practice Zone</h3>
            <p>Solve problems in in-browser IDE</p>
            <div className="quick-card-bottom"><button className="quick-btn">Start Practice</button></div>
          </div>
        </div>
      </motion.section>

      {/* Path Selection */}
      <motion.section className="section-block" variants={itemVariants}>
        <h2 className="section-title"><Route size={20} /> Choose Your Learning Path</h2>
        <div className="path-selection-grid">
          <motion.div className="glass-card path-card active" onClick={() => onSelectTab('c')} whileHover={{ scale: 1.02 }}>
            <div className="path-header"><Cpu size={28} className="path-icon" /><span className="badge-pro">RECOMMENDED</span></div>
            <h3>C Language & Algorithmic Blueprint</h3>
            <p>Master memory pointers, recursion, data structures and core low-level logic.</p>
            <div className="path-meta">5 Phases • 20 Topics • Exam Ready</div>
          </motion.div>
          <motion.div className="glass-card path-card" onClick={() => onSelectTab('python')} whileHover={{ scale: 1.02 }}>
            <div className="path-header"><TerminalIcon size={28} className="path-icon purple" /><span className="badge-pro purple">POPULAR</span></div>
            <h3>Python & Modern Scripting</h3>
            <p>Learn Python data structures, OOP modularity, file I/O and rapid application logic.</p>
            <div className="path-meta">5 Phases • 20 Topics • Project Ready</div>
          </motion.div>
        </div>
      </motion.section>

      {/* Progress & Mission */}
      <motion.div className="dashboard-dual-grid" variants={itemVariants}>
        <section className="glass-card progress-card">
          <div className="card-header"><TrendingUp size={20} className="card-header-icon" /><h2>Your Progress Tracker</h2></div>
          <div className="progress-overview">
            <div className="progress-percentage-box"><span className="percentage-number">{overallPercent}%</span><span className="percentage-label">OVERALL COMPLETION</span></div>
            <div className="progress-bar-large"><div className="progress-fill-large" style={{ width: `${overallPercent}%` }}></div></div>
          </div>
          <div className="progress-stats-grid">
            <div className="p-stat-item"><span className="p-val">{completedCount} of {TOTAL_VIDEOS}</span><span className="p-lbl">Completed Videos</span></div>
            <div className="p-stat-item"><span className="p-val">3 Days 🔥</span><span className="p-lbl">Learning Streak</span></div>
            <div className="p-stat-item"><span className="p-val">Foundations & I/O</span><span className="p-lbl">Current Phase</span></div>
          </div>
        </section>
        <section className="glass-card mission-card">
          <div className="card-header"><Target size={20} className="card-header-icon cyan" /><h2>Today's Coding Mission</h2></div>
          <p className="mission-text">&ldquo;Complete one video lesson and solve three logic problems.&rdquo;</p>
          <div className="mission-quote"><Quote size={14} /><span>Small progress every day creates strong programming skills.</span></div>
          <button className="btn-primary mission-btn btn-glow" onClick={() => onSelectTab('c')}>Start Mission</button>
        </section>
      </motion.div>

      {/* Achievements */}
      <motion.section className="section-block" variants={itemVariants}>
        <h2 className="section-title"><Trophy size={20} /> Your Achievements</h2>
        <div className="achievements-grid">
          {SAMPLE_ACHIEVEMENTS.map((ach) => {
            const AchIcon = Icons[ach.icon] || Icons.Award;
            return (
              <motion.div
                key={ach.id}
                className={`glass-card achievement-chip ${ach.unlocked ? 'unlocked' : 'locked'}`}
                title={ach.desc}
                whileHover={{ scale: 1.03 }}
              >
                <div className="ach-icon-box"><AchIcon size={18} /></div>
                <div className="ach-info"><h4>{ach.title}</h4><p>{ach.desc}</p></div>
                <span className="ach-status">{ach.unlocked ? 'Unlocked' : 'Locked'}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Dashboard;
