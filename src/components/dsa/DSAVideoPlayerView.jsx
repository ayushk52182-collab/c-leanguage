import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, RotateCcw, CheckCircle2, Circle, AlertTriangle,
  ArrowLeft, ArrowRight, ChevronDown, ChevronRight, BookOpen,
  Code2, BrainCircuit, Copy, Check, Sparkles, Volume2, VolumeX,
  Maximize2, Clock, Flame, Menu, X, ExternalLink, HelpCircle
} from 'lucide-react';
import { A2Z_SECTIONS, getAllA2ZLessons } from '../../data/dsaA2ZData';
import { DSA_PROBLEMS } from '../../data/dsaProblems';
import { formatTime } from '../../utils/youtube';

const DSAVideoPlayerView = ({
  lesson,
  onSelectLesson,
  onBack,
  dsaProgress = {},
  dsaProblemProgress = {},
  onProgressUpdate,
  onCompleteLesson,
  onOpenProblem
}) => {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [embedError, setEmbedError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'code' | 'problems'
  const [codeLang, setCodeLang] = useState('cpp');
  const [copied, setCopied] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  // Saved progress for this specific lesson
  const savedEntry = dsaProgress[lesson.id] || {};
  const initialTime = savedEntry.currentTime || 0;
  const initialPercent = savedEntry.percent || 0;
  const isInitiallyCompleted = savedEntry.isCompleted || false;

  const [playbackState, setPlaybackState] = useState({
    currentTime: initialTime,
    duration: savedEntry.duration || lesson.durationSec || 0,
    watchedPercent: initialPercent,
    isCompleted: isInitiallyCompleted,
    statusText: "Ready"
  });

  const [expandedSections, setExpandedSections] = useState({
    [lesson.sectionId || 1]: true
  });

  const toggleSection = (sId) => {
    setExpandedSections(prev => ({ ...prev, [sId]: !prev[sId] }));
  };

  // 1. YouTube IFrame Player Instance Setup
  useEffect(() => {
    setEmbedError(false);
    setIsPlaying(false);
    let playerInstance = null;

    const startPosition = Math.floor(initialTime);

    const initPlayer = () => {
      try {
        if (!window.YT || !window.YT.Player) return;

        playerInstance = new window.YT.Player('dsa-youtube-iframe-player', {
          videoId: lesson.videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            playsinline: 1,
            rel: 0,
            iv_load_policy: 3,
            enablejsapi: 1,
            start: startPosition > 10 ? startPosition : 0
          },
          events: {
            onReady: (e) => {
              playerRef.current = e.target;
              const dur = Math.floor(e.target.getDuration() || lesson.durationSec || 0);
              setPlaybackState(prev => ({
                ...prev,
                duration: dur,
                currentTime: initialTime,
                watchedPercent: initialPercent,
                statusText: "Ready"
              }));

              if (startPosition > 5) {
                e.target.seekTo(startPosition, true);
              }
            },
            onStateChange: (e) => {
              let status = "Paused";
              if (e.data === window.YT.PlayerState.PLAYING) {
                status = "Watching";
                setIsPlaying(true);
              } else if (e.data === window.YT.PlayerState.PAUSED) {
                status = "Paused";
                setIsPlaying(false);
              } else if (e.data === window.YT.PlayerState.BUFFERING) {
                status = "Buffering...";
              } else if (e.data === window.YT.PlayerState.ENDED) {
                status = "Completed";
                setIsPlaying(false);
                const dur = playerRef.current ? Math.floor(playerRef.current.getDuration()) : (lesson.durationSec || 0);
                setPlaybackState(prev => ({
                  ...prev,
                  currentTime: dur,
                  watchedPercent: 100,
                  isCompleted: true,
                  statusText: "Completed"
                }));
                onProgressUpdate(lesson.id, lesson.sectionId, dur, dur, lesson.title, true);
              }
              setPlaybackState(prev => ({ ...prev, statusText: status }));
            },
            onError: () => {
              setEmbedError(true);
            }
          }
        });
      } catch (err) {
        setEmbedError(true);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    // 2. Real-time Periodic Playback Watch Tracker (every 2.5 seconds)
    intervalRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const cur = Math.floor(playerRef.current.getCurrentTime() || 0);
        const dur = Math.floor(playerRef.current.getDuration() || lesson.durationSec || 0);

        if (dur > 0 && cur > 0) {
          const pct = Math.min(100, Math.round((cur / dur) * 100));
          const completedAtThreshold = pct >= 90;

          setPlaybackState(prev => ({
            ...prev,
            currentTime: cur,
            duration: dur,
            watchedPercent: Math.max(prev.watchedPercent, pct),
            isCompleted: prev.isCompleted || completedAtThreshold
          }));

          // Send real-time tracking update
          onProgressUpdate(lesson.id, lesson.sectionId, cur, dur, lesson.title, completedAtThreshold);
        }
      }
    }, 2500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try { playerRef.current.destroy(); } catch (e) {}
      }
    };
  }, [lesson.id, lesson.videoId]);

  // Video Controls Callbacks
  const handleTogglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      if (typeof playerRef.current.pauseVideo === 'function') playerRef.current.pauseVideo();
    } else {
      if (typeof playerRef.current.playVideo === 'function') playerRef.current.playVideo();
    }
  };

  const handleSeekChange = (e) => {
    const newTime = Number(e.target.value);
    setPlaybackState(prev => ({ ...prev, currentTime: newTime }));
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(newTime, true);
    }
  };

  const handleSeekToResume = (seconds) => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(seconds, true);
      playerRef.current.playVideo();
    }
  };

  const handleVolumeChange = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(v);
    }
  };

  const handleToggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      if (playerRef.current.unMute) playerRef.current.unMute();
      setIsMuted(false);
      if (playerRef.current.setVolume) playerRef.current.setVolume(volume || 80);
    } else {
      if (playerRef.current.mute) playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (rate) => {
    setSpeed(rate);
    if (playerRef.current && typeof playerRef.current.setPlaybackRate === 'function') {
      playerRef.current.setPlaybackRate(rate);
    }
  };

  const handleFullscreen = () => {
    const el = document.getElementById('dsa-player-frame-card');
    if (el) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (el.requestFullscreen) {
        el.requestFullscreen();
      }
    }
  };

  const handleCopyCode = () => {
    const code = lesson.codeSnippet?.[codeLang] || "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allLessons = getAllA2ZLessons();
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Resolve related problem
  const matchedProblem = DSA_PROBLEMS.find(p => p.id === lesson.problemId) || DSA_PROBLEMS[0];
  const isProblemSolved = !!dsaProblemProgress[matchedProblem?.id]?.solved;

  return (
    <div className="dsa-player-layout">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="mobile-curriculum-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        <span>{isSidebarOpen ? "Close Curriculum" : "Curriculum Menu (18 Steps)"}</span>
      </button>

      {/* LEFT COLUMN: 18 SECTIONS CURRICULUM SIDEBAR */}
      <aside className={`dsa-curriculum-sidebar glass-card ${isSidebarOpen ? 'open' : ''}`}>
        <div className="curriculum-sidebar-header">
          <button className="sidebar-back-btn" onClick={onBack}>
            <ArrowLeft size={16} /> All Steps
          </button>
          <span className="sidebar-header-title">Striver A2Z Sheet</span>
        </div>

        <div className="curriculum-sections-scroll">
          {A2Z_SECTIONS.map((section) => {
            const isExpanded = !!expandedSections[section.id];
            const sectionLessons = section.lessons || [];
            const completedCount = sectionLessons.filter(l => dsaProgress[l.id]?.isCompleted).length;
            const secPercent = sectionLessons.length > 0
              ? Math.round((completedCount / sectionLessons.length) * 100)
              : 0;

            return (
              <div key={section.id} className="sidebar-section-group">
                <div
                  className="sidebar-section-header"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="ssh-left">
                    <span className="ssh-badge">{section.badge}</span>
                    <span className="ssh-title">{section.title}</span>
                  </div>
                  <div className="ssh-right">
                    <span className="ssh-progress">{completedCount}/{sectionLessons.length}</span>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="sidebar-lessons-list"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {sectionLessons.map((l) => {
                        const lProgress = dsaProgress[l.id] || {};
                        const isCurrent = l.id === lesson.id;
                        const isDone = lProgress.isCompleted;
                        const pct = lProgress.percent || 0;

                        return (
                          <div
                            key={l.id}
                            className={`sidebar-lesson-item ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                            onClick={() => {
                              onSelectLesson(l);
                              setIsSidebarOpen(false);
                            }}
                          >
                            <div className="sli-status-icon">
                              {isDone ? (
                                <CheckCircle2 size={15} color="var(--emerald-green)" />
                              ) : pct > 0 ? (
                                <div className="mini-ring" title={`${pct}% watched`}>
                                  <span>{pct}%</span>
                                </div>
                              ) : (
                                <Circle size={15} color="var(--text-muted)" />
                              )}
                            </div>

                            <div className="sli-info">
                              <span className="sli-title">{l.title}</span>
                              <div className="sli-meta">
                                <span className="sli-duration"><Clock size={11} /> {l.duration}</span>
                                {isDone ? (
                                  <span className="sli-percent-tag done">✓ 100% watched</span>
                                ) : pct > 0 ? (
                                  <span className="sli-percent-tag in-prog">◉ {pct}% watched</span>
                                ) : (
                                  <span className="sli-percent-tag not-start">○ Not Started</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </aside>

      {/* CENTER & RIGHT: VIDEO PLAYER & LESSON STUDIO */}
      <main className="dsa-main-content">
        {/* Top Header Row */}
        <div className="lesson-top-bar glass-card">
          <div className="ltb-left">
            <span className="badge-cyber">{lesson.sectionBadge || "STEP"}</span>
            <span className="lesson-nav-title">{lesson.title}</span>
          </div>

          <div className="ltb-right">
            {playbackState.watchedPercent > 0 && (
              <div className="live-watch-chip">
                <span className="chip-dot" />
                <span>
                  {playbackState.isCompleted
                    ? "✓ Completed (100%)"
                    : `Watched ${playbackState.watchedPercent}% (${formatTime(playbackState.currentTime)} / ${formatTime(playbackState.duration)})`
                  }
                </span>
              </div>
            )}

            <button
              className={`btn-complete-lesson ${playbackState.isCompleted ? 'completed' : ''}`}
              onClick={() => onCompleteLesson(lesson.id, lesson.sectionId, lesson.title)}
            >
              <CheckCircle2 size={15} />
              {playbackState.isCompleted ? "Completed ✓" : "Mark as Completed"}
            </button>
          </div>
        </div>

        {/* Video Player Card with Custom Controls Toolbar */}
        <div id="dsa-player-frame-card" className="video-player-frame-card glass-card">
          {embedError ? (
            <div className="embed-error-box">
              <AlertTriangle size={36} color="var(--rose-coral)" />
              <h3>Direct Embed Restricted</h3>
              <p>This lecture can be viewed directly on YouTube via the official link below.</p>
              <a
                href={lesson.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                Watch on YouTube <ExternalLink size={15} />
              </a>
            </div>
          ) : (
            <div className="iframe-aspect-ratio">
              <div id="dsa-youtube-iframe-player" className="youtube-embed-target" />
            </div>
          )}

          {/* Real Working Video Controls Toolbar */}
          <div className="custom-video-controls-toolbar">
            {/* Play/Pause Button */}
            <button
              className="ctrl-btn play-btn"
              onClick={handleTogglePlay}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
            </button>

            {/* Time & Scrubbable Seek Bar */}
            <div className="ctrl-timeline-group">
              <span className="ctrl-timestamp">{formatTime(playbackState.currentTime)}</span>
              <input
                type="range"
                min="0"
                max={playbackState.duration || 100}
                value={playbackState.currentTime}
                onChange={handleSeekChange}
                className="ctrl-seekbar"
                aria-label="Seek Video"
              />
              <span className="ctrl-timestamp">{formatTime(playbackState.duration)}</span>
            </div>

            {/* Volume Control */}
            <div className="ctrl-volume-group">
              <button className="ctrl-btn" onClick={handleToggleMute} title={isMuted ? "Unmute" : "Mute"}>
                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="ctrl-volume-slider"
                aria-label="Volume"
              />
            </div>

            {/* Playback Speed Selector */}
            <div className="ctrl-speed-group">
              {[0.75, 1, 1.25, 1.5, 2].map(r => (
                <button
                  key={r}
                  className={`ctrl-speed-chip ${speed === r ? 'active' : ''}`}
                  onClick={() => handleSpeedChange(r)}
                >
                  {r}x
                </button>
              ))}
            </div>

            {/* Fullscreen Button */}
            <button className="ctrl-btn" onClick={handleFullscreen} title="Fullscreen">
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Sub-bar: Real-time Resume Bar & Visual Progress Bar */}
          <div className="video-playback-sub-bar">
            <div className="vps-left">
              <span className="vps-source">Source: {lesson.source || "takeUforward / Striver"}</span>
              <div className="live-percentage-indicator">
                <strong>Watched: {playbackState.watchedPercent}%</strong>
                <span className="visual-progress-meter">
                  {'█'.repeat(Math.floor(playbackState.watchedPercent / 8)) + '░'.repeat(Math.max(0, 12 - Math.floor(playbackState.watchedPercent / 8)))}
                </span>
              </div>
            </div>

            <div className="vps-right">
              {playbackState.currentTime > 15 && !playbackState.isCompleted && (
                <button
                  className="resume-pill-btn"
                  onClick={() => handleSeekToResume(playbackState.currentTime)}
                >
                  <Play size={12} /> Resume from {formatTime(playbackState.currentTime)}
                </button>
              )}
              <span className="completion-threshold-label">
                {playbackState.watchedPercent >= 90
                  ? "✓ 90% Threshold Met (Auto-Completed)"
                  : `${playbackState.watchedPercent}% watched (90% required to complete)`
                }
              </span>
            </div>
          </div>
        </div>

        {/* Lesson Studio Tabs: Notes, Code, Problems */}
        <div className="lesson-studio-container glass-card">
          <div className="studio-tabs-header">
            <button
              className={`studio-tab ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <BookOpen size={16} /> Lecture Notes & Intuition
            </button>
            <button
              className={`studio-tab ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              <Code2 size={16} /> Code Implementations
            </button>
            <button
              className={`studio-tab ${activeTab === 'problems' ? 'active' : ''}`}
              onClick={() => setActiveTab('problems')}
            >
              <BrainCircuit size={16} /> Practice Problems
            </button>
          </div>

          <div className="studio-tab-content">
            {activeTab === 'notes' && (
              <div className="notes-body">
                <h3>{lesson.title}</h3>
                <p className="lesson-desc-text">{lesson.description}</p>

                {lesson.topicsCovered && (
                  <div className="topics-covered-group">
                    <h4>Key Concepts Covered:</h4>
                    <div className="topics-chips-row">
                      {lesson.topicsCovered.map((t, idx) => (
                        <span key={idx} className="topic-chip">{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="intuition-notes-box">
                  <h4>Algorithmic Intuition & Approach:</h4>
                  <p>{lesson.notes || "Master the core invariants and complexity tradeoffs discussed in the video lesson."}</p>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="code-body">
                <div className="code-toolbar">
                  <div className="lang-pills">
                    {['cpp', 'java', 'python'].map(l => (
                      <button
                        key={l}
                        className={`lang-btn ${codeLang === l ? 'active' : ''}`}
                        onClick={() => setCodeLang(l)}
                      >
                        {l === 'cpp' ? 'C++' : l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <button className="quick-btn" onClick={handleCopyCode}>
                    {copied ? <Check size={13} color="var(--emerald-green)" /> : <Copy size={13} />}
                    {copied ? "Copied" : "Copy Code"}
                  </button>
                </div>

                <pre className="code-display-block">
                  <code>{lesson.codeSnippet?.[codeLang] || "// Code template available in coding sandbox."}</code>
                </pre>
              </div>
            )}

            {activeTab === 'problems' && (
              <div className="problems-tab-body">
                {/* Exact Problem Card format from prompt */}
                <div className="exact-problem-card glass-card">
                  <div className="epc-top-row">
                    <div className="epc-meta-left">
                      <h4 className="epc-title">{matchedProblem.title}</h4>
                      <div className="epc-tags">
                        <span className={`p-tag ${matchedProblem.difficulty.toLowerCase()}`}>
                          {matchedProblem.difficulty}
                        </span>
                        <span className="topic-badge">{matchedProblem.topic}</span>
                      </div>
                    </div>

                    <div className="epc-status">
                      <span className="epc-status-lbl">Status:</span>
                      {isProblemSolved ? (
                        <span className="status-pill completed">✓ Solved</span>
                      ) : (
                        <span className="status-pill not-started">○ Not Started</span>
                      )}
                    </div>
                  </div>

                  <p className="epc-desc">{matchedProblem.description}</p>

                  <div className="epc-actions-row">
                    <button
                      className="btn-primary btn-glow"
                      onClick={() => onOpenProblem(matchedProblem.id)}
                    >
                      <Play size={14} /> Solve Problem in Studio
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => setShowExplanationModal(true)}
                    >
                      <HelpCircle size={14} /> View Explanation
                    </button>
                  </div>
                </div>

                {/* Explanation Modal */}
                {showExplanationModal && (
                  <div className="explanation-preview-box glass-card">
                    <h4>Intuition & Solution Approach</h4>
                    <p>{matchedProblem.explanation || "Break down the problem into invariants. Use hash map or two-pointer logic depending on input constraints."}</p>
                    <button
                      className="quick-btn"
                      onClick={() => setShowExplanationModal(false)}
                      style={{ marginTop: '0.8rem' }}
                    >
                      Close Explanation
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="dsa-bottom-nav">
          {prevLesson ? (
            <button className="nav-step-btn prev" onClick={() => onSelectLesson(prevLesson)}>
              <ArrowLeft size={16} />
              <div className="btn-text-block">
                <span className="sub">PREVIOUS LESSON</span>
                <span className="title">{prevLesson.title}</span>
              </div>
            </button>
          ) : <div />}

          {nextLesson ? (
            <button className="nav-step-btn next" onClick={() => onSelectLesson(nextLesson)}>
              <div className="btn-text-block" style={{ textAlign: 'right' }}>
                <span className="sub">NEXT LESSON</span>
                <span className="title">{nextLesson.title}</span>
              </div>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button className="nav-step-btn next completed" onClick={onBack}>
              <div className="btn-text-block" style={{ textAlign: 'right' }}>
                <span className="sub">CURRICULUM COMPLETE</span>
                <span className="title">🎉 Congratulations!</span>
              </div>
              <CheckCircle2 size={16} />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default DSAVideoPlayerView;
