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
import { useProgress } from './hooks/useProgress';
import { getAllTopicsList } from './data/roadmapData';

const App = () => {
  const getInitialTab = () => {
    const path = window.location.pathname.toLowerCase();
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
  const { userProgress, updateProgress, resetProgress, loadProgress } = useProgress(user);

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
    const paths = { dashboard: '/dashboard', oneshot: '/oneshot', c: '/c', python: '/python', practice: '/practice' };
    window.history.pushState({}, '', paths[tab] || '/dashboard');
  }, []);

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
    if (window.confirm("Are you sure you want to reset all your learning progress?")) {
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
            <Navbar activeTab={activeTab} onSelectTab={handleSelectTab} user={user} onLogout={handleLogout} />

            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <Dashboard key="dash" onSelectTab={handleSelectTab} onTopicClick={handleTopicClick} userProgress={userProgress} onResetTracking={handleResetTracking} />
              )}
              {activeTab === 'oneshot' && (
                <OneShotView key="oneshot" onTopicClick={handleTopicClick} setToastMessage={setToastMessage} />
              )}
              {(activeTab === 'c' || activeTab === 'python') && (
                <RoadmapView key={activeTab} activeTab={activeTab} onSelectTab={handleSelectTab} userProgress={userProgress} onTopicClick={handleTopicClick} />
              )}
              {activeTab === 'practice' && (
                <PracticeZone key="practice" setToastMessage={setToastMessage} />
              )}
            </AnimatePresence>

            <Footer />
          </div>
        )}
      </AnimatePresence>

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

      <AnimatePresence>
        {toastMessage && (
          <Toast key="toast" message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
