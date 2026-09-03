import { useState, useCallback } from 'react';

export const useProgress = (user) => {
  const [userProgress, setUserProgress] = useState(() => {
    if (!user) return {};
    const saved = localStorage.getItem(`pps-video-progress-${user}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [dsaProgress, setDsaProgress] = useState(() => {
    if (!user) return {};
    const saved = localStorage.getItem(`dsa-progress-${user}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [dsaProblemProgress, setDsaProblemProgress] = useState(() => {
    if (!user) return {};
    const saved = localStorage.getItem(`dsa-problems-${user}`);
    return saved ? JSON.parse(saved) : {};
  });

  // Video progress (existing)
  const updateProgress = useCallback((progressData) => {
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
  }, [user]);

  // DSA lesson progress
  const updateDsaProgress = useCallback((lessonId, status, moduleId) => {
    if (!user || !lessonId) return;
    setDsaProgress(prev => {
      const updated = {
        ...prev,
        [lessonId]: {
          lessonId,
          moduleId: moduleId || '',
          status, // 'in-progress' | 'completed'
          updatedAt: new Date().toISOString()
        }
      };
      localStorage.setItem(`dsa-progress-${user}`, JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  // DSA problem progress
  const updateDsaProblemProgress = useCallback((problemId, solved) => {
    if (!user || !problemId) return;
    setDsaProblemProgress(prev => {
      const updated = {
        ...prev,
        [problemId]: {
          problemId,
          solved,
          solvedAt: solved ? new Date().toISOString() : null
        }
      };
      localStorage.setItem(`dsa-problems-${user}`, JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  const resetProgress = useCallback(() => {
    if (!user) return;
    localStorage.removeItem(`pps-video-progress-${user}`);
    localStorage.removeItem(`dsa-progress-${user}`);
    localStorage.removeItem(`dsa-problems-${user}`);
    setUserProgress({});
    setDsaProgress({});
    setDsaProblemProgress({});
  }, [user]);

  const loadProgress = useCallback((username) => {
    const saved = localStorage.getItem(`pps-video-progress-${username}`);
    setUserProgress(saved ? JSON.parse(saved) : {});
    const dsaSaved = localStorage.getItem(`dsa-progress-${username}`);
    setDsaProgress(dsaSaved ? JSON.parse(dsaSaved) : {});
    const probSaved = localStorage.getItem(`dsa-problems-${username}`);
    setDsaProblemProgress(probSaved ? JSON.parse(probSaved) : {});
  }, []);

  return {
    userProgress, updateProgress,
    dsaProgress, updateDsaProgress,
    dsaProblemProgress, updateDsaProblemProgress,
    resetProgress, loadProgress
  };
};
