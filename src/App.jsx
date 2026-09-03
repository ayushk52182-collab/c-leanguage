import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import OneShotView from './components/OneShotView';
import RoadmapView from './components/RoadmapView';
import PracticeZone from './components/PracticeZone';
import VideoPlayerModal from './components/VideoPlayerModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import SearchModal from './components/SearchModal';

// DSA Components
import DSACoursePage from './components/dsa/DSACoursePage';
import DSALessonView from './components/dsa/DSALessonView';
import DSADashboard from './components/dsa/DSADashboard';
import DSAProblemSet from './components/dsa/DSAProblemSet';
import DSAProblemView from './components/dsa/DSAProblemView';

import { useProgress } from './hooks/useProgress';
import { useTheme } from './hooks/useTheme';
import { getAllTopicsList } from './data/roadmapData';
import { getAllDsaLessons } from './data/dsaData';

const App = () => {
  const getInitialTab = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/dsa-problems')) return 'dsa-problems';
    if (path.includes('/dsa-dashboard')) return 'dsa-dashboard';
    if (path.includes('/dsa')) return 'dsa';
    if (path.includes('/oneshot')) return 'oneshot';
    if (path.includes('/python')) return 'python';
    if (path.includes('/c')) return 'c';
    if (path.includes('/practice')) return 'practice';
    return 'dashboard';
  };

  const [user, setUser] = useState(() => sessionStorage.getItem("roadmap_user"));
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // DSA view states
  const [activeDsaLesson, setActiveDsaLesson] = useState(null);
  const [activeDsaProblemId, setActiveDsaProblemId] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Hooks
  const {
    userProgress, updateProgress,
    dsaProgress, updateDsaProgress,
    dsaProblemProgress, updateDsaProblemProgress,
    resetProgress, loadProgress
  } = useProgress(user);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handlePopState = () => setActiveTab(getInitialTab());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = useCallback((username) => {
    setUser(username);
    sessionStorage.setItem("roadmap_user", username);
    loadProgress(username);
    setToastMessage(`Welcome back, ${username}!`);
  }, [loadProgress]);

  const handleLogout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("roadmap_user");
  }, []);

  const handleSelectTab = useCallback((tab) => {
    setActiveTab(tab);
    if (tab !== 'dsa') setActiveDsaLesson(null);
    if (tab !== 'dsa-problems') setActiveDsaProblemId(null);

    const paths = {
      dashboard: '/dashboard',
      dsa: '/dsa',
      'dsa-problems': '/dsa-problems',
      'dsa-dashboard': '/dsa-dashboard',
      oneshot: '/oneshot',
      c: '/c',
      python: '/python',
      practice: '/practice'
    };
    window.history.pushState({}, '', paths[tab] || '/dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // DSA Handlers
  const handleSelectDsaLesson = useCallback((lesson) => {
    setActiveDsaLesson(lesson);
    setActiveTab('dsa');
    // Automatically mark as in-progress if not yet started
    if (!dsaProgress[lesson.id] || dsaProgress[lesson.id].status !== 'completed') {
      updateDsaProgress(lesson.id, 'in-progress', lesson.moduleId);
    }
  }, [dsaProgress, updateDsaProgress]);

  const handleCompleteDsaLesson = useCallback((lessonId) => {
    updateDsaProgress(lessonId, 'completed');
    setToastMessage("🎉 Topic marked as Completed! Great progress!");
  }, [updateDsaProgress]);

  const handleSelectDsaProblem = useCallback((probId) => {
    setActiveDsaProblemId(probId);
    setActiveTab('dsa-problems');
  }, []);

  const handleProblemSolved = useCallback((probId) => {
    updateDsaProblemProgress(probId, true);
    setToastMessage("🏆 Problem solved successfully! +50 Algorithmic XP");
  }, [updateDsaProblemProgress]);

  const handleContinueLearning = useCallback((nextLesson) => {
    if (nextLesson) {
      handleSelectDsaLesson(nextLesson);
    } else {
      const all = getAllDsaLessons();
      handleSelectDsaLesson(all[0]);
    }
  }, [handleSelectDsaLesson]);

  // C / Python Video Handlers
  const handleTopicClick = useCallback((topic) => {
    if (topic.url) setActiveVideo(topic);
    else setToastMessage("Video link coming soon.");
  }, []);

  const handleNextUnit = useCallback(() => {
    if (!activeVideo) return;
    const allTopics = getAllTopicsList();
    const currIndex = allTopics.findIndex(t => t.title === activeVideo.title);
    if (currIndex !== -1 && currIndex + 1 < allTopics.length) {
      const nextItem = allTopics[currIndex + 1];
      if (nextItem.url) setActiveVideo(nextItem);
      else { setToastMessage(`Next topic "${nextItem.title}" video link coming soon.`); setActiveVideo(null); }
    } else { setToastMessage("You have reached the end of the roadmap units!"); setActiveVideo(null); }
  }, [activeVideo]);

  const handleResetTracking = useCallback(() => {
    if (window.confirm("Are you sure you want to reset all your learning progress (Videos & DSA)?")) {
      resetProgress();
      setToastMessage("Your learning progress has been reset.");
    }
  }, [resetProgress]);

  return (
    <>
      <ParticleBackground />
      <div className="cyber-grid-floor"></div>
      <div className="horizon-glow"></div>

      <AnimatePresence mode="wait">
        {!user ? (
          <LoginPage key="login" onLogin={handleLogin} />
        ) : (
          <div key="app" className="app-shell">
            <Navbar
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              user={user}
              onLogout={handleLogout}
              theme={theme}
              toggleTheme={toggleTheme}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            <AnimatePresence mode="wait">
              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <Dashboard
                  key="dash"
                  onSelectTab={handleSelectTab}
                  onTopicClick={handleTopicClick}
                  userProgress={userProgress}
                  dsaProgress={dsaProgress}
                  onResetTracking={handleResetTracking}
                />
              )}

              {/* DSA Main Course / Lesson View */}
              {activeTab === 'dsa' && (
                activeDsaLesson ? (
                  <DSALessonView
                    key={activeDsaLesson.id}
                    lesson={activeDsaLesson}
                    onBack={() => setActiveDsaLesson(null)}
                    onCompleteLesson={handleCompleteDsaLesson}
                    onNextLesson={handleSelectDsaLesson}
                    onPrevLesson={handleSelectDsaLesson}
                    onOpenProblem={handleSelectDsaProblem}
                    isCompleted={dsaProgress[activeDsaLesson.id]?.status === 'completed'}
                  />
                ) : (
                  <DSACoursePage
                    key="dsa-course"
                    onSelectLesson={handleSelectDsaLesson}
                    dsaProgress={dsaProgress}
                    onContinueLearning={handleContinueLearning}
                  />
                )
              )}

              {/* DSA Dedicated Dashboard */}
              {activeTab === 'dsa-dashboard' && (
                <DSADashboard
                  key="dsa-dash"
                  dsaProgress={dsaProgress}
                  dsaProblemProgress={dsaProblemProgress}
                  onSelectLesson={handleSelectDsaLesson}
                  onSelectTab={handleSelectTab}
                />
              )}

              {/* DSA Problem Set / Problem Studio View */}
              {activeTab === 'dsa-problems' && (
                activeDsaProblemId ? (
                  <DSAProblemView
                    key={activeDsaProblemId}
                    problemId={activeDsaProblemId}
                    onBack={() => setActiveDsaProblemId(null)}
                    onProblemSolved={handleProblemSolved}
                    isSolved={dsaProblemProgress[activeDsaProblemId]?.solved}
                  />
                ) : (
                  <DSAProblemSet
                    key="dsa-problems-list"
                    onSelectProblem={handleSelectDsaProblem}
                    dsaProblemProgress={dsaProblemProgress}
                  />
                )
              )}

              {/* C / Python Roadmaps (Preserved) */}
              {(activeTab === 'c' || activeTab === 'python') && (
                <RoadmapView
                  key={activeTab}
                  activeTab={activeTab}
                  onSelectTab={handleSelectTab}
                  userProgress={userProgress}
                  onTopicClick={handleTopicClick}
                />
              )}

              {/* OneShot Masterclass (Preserved) */}
              {activeTab === 'oneshot' && (
                <OneShotView
                  key="oneshot"
                  onTopicClick={handleTopicClick}
                  setToastMessage={setToastMessage}
                />
              )}

              {/* Practice Zone (Preserved) */}
              {activeTab === 'practice' && (
                <PracticeZone
                  key="practice"
                  setToastMessage={setToastMessage}
                />
              )}
            </AnimatePresence>

            <Footer />
          </div>
        )}
      </AnimatePresence>

      {/* Video Player Modal (Preserved) */}
      <AnimatePresence>
        {activeVideo && (
          <VideoPlayerModal
            key="video"
            videoInfo={activeVideo}
            userProgress={userProgress}
            onClose={() => setActiveVideo(null)}
            onNextUnit={handleNextUnit}
            onProgressUpdate={updateProgress}
          />
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectDsaLesson}
        onSelectProblem={handleSelectDsaProblem}
      />

      {/* Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <Toast key="toast" message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
