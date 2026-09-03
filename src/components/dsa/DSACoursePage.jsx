import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Boxes, PlayCircle, CheckCircle2, ChevronDown, ChevronRight, Sparkles, BookOpen, Trophy, ArrowRight, Lock, Award } from 'lucide-react';
import { DSA_MODULES, getAllDsaLessons } from '../../data/dsaData';

const DSACoursePage = ({ onSelectLesson, dsaProgress = {}, onContinueLearning }) => {
  const [expandedModules, setExpandedModules] = useState({ 'mod-1': true, 'mod-2': true });
  const allLessons = getAllDsaLessons();

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  // Compute live dynamic statistics
  const completedLessons = allLessons.filter(l => dsaProgress[l.id]?.status === 'completed');
  const completedCount = completedLessons.length;
  const totalLessons = allLessons.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  // Determine next unfinished lesson
  const nextUnfinished = allLessons.find(l => dsaProgress[l.id]?.status !== 'completed') || null;

  return (
    <div className="dsa-course-container">
      {/* Course Hero Banner */}
      <motion.div
        className="glass-card dsa-hero-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="dsa-hero-left">
          <div className="top-badge-row">
            <span className="badge-cyber">
              <Boxes size={13} /> MASTER ARCHITECTURE
            </span>
            <span className="badge-pro">COMPREHENSIVE CURRICULUM</span>
          </div>

          <div className="dsa-title-group">
            <div className="dsa-hero-icon-box">
              <Boxes size={32} />
            </div>
            <div>
              <h1 className="dsa-main-title">Data Structures & Algorithms</h1>
              <span className="dsa-sub-title">14 In-Depth Modules • 98 Core Topics • Interview & Exam Mastery</span>
            </div>
          </div>

          <p className="dsa-hero-desc">
            Master algorithmic problem solving from the ground up: Time complexity, Arrays, Two-pointers, Stacks, Trees, Heaps, Dynamic Programming, and Graph theory with interactive visualizations and multi-language code implementations.
          </p>

          <div className="dsa-hero-actions">
            {completedCount === totalLessons && totalLessons > 0 ? (
              <div className="course-completed-badge">
                <Trophy size={18} color="var(--amber-gold)" />
                <span>🎉 DSA Course Completed! (100% Mastery)</span>
              </div>
            ) : (
              <button
                className="btn-primary btn-glow dsa-continue-btn"
                onClick={() => onContinueLearning(nextUnfinished)}
              >
                <PlayCircle size={18} />
                <span>
                  {completedCount === 0 ? "Start Learning DSA" : `Continue: ${nextUnfinished ? nextUnfinished.title : "Next Lesson"}`}
                </span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Hero Progress Metrics Card */}
        <div className="dsa-hero-metrics glass-card">
          <div className="metrics-header">
            <Trophy size={20} color="var(--orange-primary)" />
            <h3>Your DSA Progress</h3>
          </div>

          <div className="metrics-big-percent">
            <span className="percent-number">{progressPercent}%</span>
            <span className="percent-label">CURRICULUM COMPLETED</span>
          </div>

          <div className="progress-bar-large">
            <div className="progress-fill-large" style={{ width: `${progressPercent}%` }} />
          </div>

          <div className="metrics-stats-grid">
            <div className="m-stat">
              <span className="val">{completedCount}</span>
              <span className="lbl">Completed</span>
            </div>
            <div className="m-stat">
              <span className="val">{totalLessons - completedCount}</span>
              <span className="lbl">Remaining</span>
            </div>
            <div className="m-stat">
              <span className="val">{totalLessons}</span>
              <span className="lbl">Total Topics</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Curriculum Section */}
      <div className="dsa-curriculum-section">
        <div className="curriculum-header-row">
          <div className="curriculum-title">
            <BookOpen size={22} color="var(--orange-primary)" />
            <h2>Course Curriculum (14 Modules)</h2>
          </div>
          <div className="expand-all-actions">
            <button
              className="quick-btn"
              onClick={() => {
                const all = {};
                DSA_MODULES.forEach(m => { all[m.id] = true; });
                setExpandedModules(all);
              }}
            >
              Expand All
            </button>
            <button
              className="quick-btn"
              onClick={() => setExpandedModules({})}
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Modules Accordion List */}
        <div className="dsa-modules-list">
          {DSA_MODULES.map((module) => {
            const isExpanded = !!expandedModules[module.id];
            const modLessons = module.topics;
            const modCompleted = modLessons.filter(l => dsaProgress[l.id]?.status === 'completed').length;
            const modPercent = Math.round((modCompleted / modLessons.length) * 100);

            return (
              <motion.div
                key={module.id}
                className={`dsa-module-card glass-card ${isExpanded ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Module Header Bar */}
                <div className="module-card-header" onClick={() => toggleModule(module.id)}>
                  <div className="mod-header-left">
                    <span className="mod-badge">{module.badge}</span>
                    <div className="mod-title-desc">
                      <h3>{module.title}</h3>
                      <p>{module.description}</p>
                    </div>
                  </div>

                  <div className="mod-header-right">
                    <div className="mod-progress-mini">
                      <span className="mod-count">{modCompleted} / {modLessons.length} Topics</span>
                      <div className="mod-mini-bar">
                        <div className="mod-mini-fill" style={{ width: `${modPercent}%` }} />
                      </div>
                    </div>
                    <button className="mod-toggle-btn" aria-label="Toggle Module">
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                  </div>
                </div>

                {/* Module Topics List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="module-topics-list"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {modLessons.map((lesson, idx) => {
                        const status = dsaProgress[lesson.id]?.status || 'not-started';
                        const isDone = status === 'completed';

                        return (
                          <div
                            key={lesson.id}
                            className={`module-topic-row ${isDone ? 'completed' : ''}`}
                            onClick={() => onSelectLesson(lesson)}
                          >
                            <div className="topic-row-left">
                              <span className="topic-num">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                              <div className="topic-text">
                                <h4>{lesson.title}</h4>
                                <span className="topic-short-desc">{lesson.description}</span>
                              </div>
                            </div>

                            <div className="topic-row-right">
                              <span className="complexity-badge-sm">{lesson.timeComplexity}</span>
                              <span className={`status-pill ${status}`}>
                                {isDone ? (
                                  <>
                                    <CheckCircle2 size={13} /> Completed
                                  </>
                                ) : (
                                  <>
                                    <PlayCircle size={13} /> Start
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DSACoursePage;
