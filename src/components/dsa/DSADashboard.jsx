import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Award, CheckCircle2, TrendingUp, Flame, BrainCircuit, Target, BookOpen, ArrowRight, Sparkles, Code2, Layers } from 'lucide-react';
import { getAllDsaLessons } from '../../data/dsaData';
import { DSA_PROBLEMS } from '../../data/dsaProblems';

const DSADashboard = ({ dsaProgress = {}, dsaProblemProgress = {}, onSelectLesson, onSelectTab }) => {
  const allLessons = getAllDsaLessons();
  const completedLessons = allLessons.filter(l => dsaProgress[l.id]?.status === 'completed');
  const completedCount = completedLessons.length;
  const totalLessons = allLessons.length;
  const overallPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  // Next unfinished lesson
  const nextLesson = allLessons.find(l => dsaProgress[l.id]?.status !== 'completed') || allLessons[0];

  // Problems breakdown
  const solvedProblemIds = Object.keys(dsaProblemProgress).filter(id => dsaProblemProgress[id]?.solved);
  const solvedCount = solvedProblemIds.length;
  const totalProblems = DSA_PROBLEMS.length;

  const easySolved = solvedProblemIds.filter(id => {
    const p = DSA_PROBLEMS.find(prob => prob.id === id);
    return p && p.difficulty.toLowerCase() === 'easy';
  }).length;

  const mediumSolved = solvedProblemIds.filter(id => {
    const p = DSA_PROBLEMS.find(prob => prob.id === id);
    return p && p.difficulty.toLowerCase() === 'medium';
  }).length;

  const hardSolved = solvedProblemIds.filter(id => {
    const p = DSA_PROBLEMS.find(prob => prob.id === id);
    return p && p.difficulty.toLowerCase() === 'hard';
  }).length;

  return (
    <div className="dsa-dashboard-container">
      {/* Welcome Banner */}
      <div className="glass-card dsa-dash-welcome">
        <div className="dash-welcome-left">
          <div className="top-badge-row">
            <span className="badge-cyber">
              <Sparkles size={13} /> DSA COMMAND CENTER
            </span>
          </div>
          <h1>Welcome to DSA Mastery</h1>
          <p>
            Track your progress across 14 modules, practice algorithmic problem solving, and monitor your difficulty breakdown.
          </p>

          <div className="dash-hero-actions">
            <button
              className="btn-primary btn-glow"
              onClick={() => onSelectLesson(nextLesson)}
            >
              <PlayCircle size={17} />
              <span>Continue Learning: {nextLesson.title}</span>
              <ArrowRight size={15} />
            </button>
            <button
              className="btn-secondary"
              onClick={() => onSelectTab('dsa-problems')}
            >
              <BrainCircuit size={17} />
              <span>Solve Problems</span>
            </button>
          </div>
        </div>

        {/* Current Topic Target Card */}
        <div className="dash-target-card glass-card">
          <span className="target-lbl">RECOMMENDED NEXT TOPIC</span>
          <h3>{nextLesson.title}</h3>
          <p>{nextLesson.description}</p>
          <div className="target-meta">
            <span className="topic-badge">{nextLesson.moduleTitle}</span>
            <span className="complexity-badge-sm">{nextLesson.timeComplexity}</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="dash-kpi-grid">
        <div className="stat-card-dashboard glass-card cyan">
          <span className="d-stat-val">{overallPercent}%</span>
          <span className="d-stat-lbl">OVERALL DSA PROGRESS</span>
        </div>
        <div className="stat-card-dashboard glass-card green">
          <span className="d-stat-val">{completedCount} / {totalLessons}</span>
          <span className="d-stat-lbl">TOPICS COMPLETED</span>
        </div>
        <div className="stat-card-dashboard glass-card yellow">
          <span className="d-stat-val">{solvedCount} / {totalProblems}</span>
          <span className="d-stat-lbl">PROBLEMS SOLVED</span>
        </div>
        <div className="stat-card-dashboard glass-card">
          <span className="d-stat-val" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            5 Days <Flame size={20} color="var(--orange-primary)" />
          </span>
          <span className="d-stat-lbl">ACTIVE STUDY STREAK</span>
        </div>
      </div>

      {/* Dual Column Section: Difficulty Breakdown & Recent Activity */}
      <div className="dash-dual-grid">
        {/* Difficulty Breakdown */}
        <div className="glass-card dash-panel">
          <div className="panel-header">
            <Target size={20} color="var(--orange-primary)" />
            <h3>Problem Difficulty Breakdown</h3>
          </div>

          <div className="diff-breakdown-list">
            <div className="diff-stat-row">
              <div className="diff-info">
                <span className="p-tag easy">EASY</span>
                <span className="diff-count">{easySolved} Solved</span>
              </div>
              <div className="diff-bar-track">
                <div className="diff-bar-fill easy" style={{ width: `${Math.min(100, (easySolved / 8) * 100)}%` }} />
              </div>
            </div>

            <div className="diff-stat-row">
              <div className="diff-info">
                <span className="p-tag medium">MEDIUM</span>
                <span className="diff-count">{mediumSolved} Solved</span>
              </div>
              <div className="diff-bar-track">
                <div className="diff-bar-fill medium" style={{ width: `${Math.min(100, (mediumSolved / 8) * 100)}%` }} />
              </div>
            </div>

            <div className="diff-stat-row">
              <div className="diff-info">
                <span className="p-tag hard">HARD</span>
                <span className="diff-count">{hardSolved} Solved</span>
              </div>
              <div className="diff-bar-track">
                <div className="diff-bar-fill hard" style={{ width: `${Math.min(100, (hardSolved / 4) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Curriculum Explorer */}
        <div className="glass-card dash-panel">
          <div className="panel-header">
            <BookOpen size={20} color="var(--sky-blue)" />
            <h3>Curriculum Quick Launch</h3>
          </div>

          <div className="quick-launch-links">
            <button className="ql-item" onClick={() => onSelectTab('dsa')}>
              <div className="ql-left">
                <Layers size={18} color="var(--orange-primary)" />
                <div>
                  <strong>Complete 14 Modules Roadmap</strong>
                  <span>Browse all 98 topics and video guides</span>
                </div>
              </div>
              <ArrowRight size={16} />
            </button>

            <button className="ql-item" onClick={() => onSelectTab('dsa-problems')}>
              <div className="ql-left">
                <Code2 size={18} color="var(--emerald-green)" />
                <div>
                  <strong>Algorithmic Problem Set</strong>
                  <span>Practice Two Sum, Reverse LL, Kadane's</span>
                </div>
              </div>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSADashboard;
