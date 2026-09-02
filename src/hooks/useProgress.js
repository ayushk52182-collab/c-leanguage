import { useState, useCallback } from 'react';

export const useProgress = (user) => {
  const [userProgress, setUserProgress] = useState(() => {
    if (!user) return {};
    const saved = localStorage.getItem(`pps-video-progress-${user}`);
    return saved ? JSON.parse(saved) : {};
  });

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

  const resetProgress = useCallback(() => {
    if (!user) return;
    localStorage.removeItem(`pps-video-progress-${user}`);
    setUserProgress({});
  }, [user]);

  const loadProgress = useCallback((username) => {
    const saved = localStorage.getItem(`pps-video-progress-${username}`);
    setUserProgress(saved ? JSON.parse(saved) : {});
  }, []);

  return { userProgress, updateProgress, resetProgress, loadProgress };
};
