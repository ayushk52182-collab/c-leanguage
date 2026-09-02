import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

const PracticeZone = ({ setToastMessage }) => (
  <motion.div
    className="glass-card practice-zone-view"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", damping: 20 }}
  >
    <div className="practice-header">
      <BrainCircuit size={32} className="practice-icon" />
      <h2>Algorithmic Practice Zone</h2>
      <p>Sharpen your C and Python logic with university-level problem sets.</p>
    </div>
    <div className="practice-grid">
      <motion.div className="glass-card p-card" whileHover={{ scale: 1.03 }}>
        <h4>Star & Pyramid Patterns</h4>
        <span className="p-tag easy">EASY</span>
        <button className="quick-btn" onClick={() => setToastMessage("Opening problem editor...")}>Solve Problem</button>
      </motion.div>
      <motion.div className="glass-card p-card" whileHover={{ scale: 1.03 }}>
        <h4>Prime & Armstrong Numbers</h4>
        <span className="p-tag medium">MEDIUM</span>
        <button className="quick-btn" onClick={() => setToastMessage("Opening problem editor...")}>Solve Problem</button>
      </motion.div>
      <motion.div className="glass-card p-card" whileHover={{ scale: 1.03 }}>
        <h4>Matrix Multiplication (2D Array)</h4>
        <span className="p-tag hard">HARD</span>
        <button className="quick-btn" onClick={() => setToastMessage("Opening problem editor...")}>Solve Problem</button>
      </motion.div>
    </div>
  </motion.div>
);

export default PracticeZone;
