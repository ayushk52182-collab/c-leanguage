import { motion } from 'framer-motion';
import { GraduationCap, LayoutDashboard, Flame, Code2, Terminal as TerminalIcon, BrainCircuit, LogOut } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'oneshot', label: 'One-Shot 1-Video', icon: Flame },
  { key: 'c', label: 'C Roadmap', icon: Code2 },
  { key: 'python', label: 'Python Roadmap', icon: TerminalIcon },
  { key: 'practice', label: 'Practice', icon: BrainCircuit },
];

const Navbar = ({ activeTab, onSelectTab, user, onLogout }) => (
  <motion.nav
    className="nav-bar"
    initial={{ y: -60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", damping: 20, delay: 0.1 }}
  >
    <div className="nav-logo" onClick={() => onSelectTab('dashboard')}>
      <div className="logo-icon-wrapper">
        <GraduationCap size={22} />
      </div>
      <span className="logo-text">Learn with Aayush</span>
    </div>

    <div className="nav-links">
      {navItems.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          className={`nav-btn ${activeTab === key ? 'active' : ''}`}
          onClick={() => onSelectTab(key)}
        >
          <Icon size={15} />
          <span>{label}</span>
          {activeTab === key && (
            <motion.div
              className="nav-active-indicator"
              layoutId="navIndicator"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            />
          )}
        </button>
      ))}
    </div>

    <div className="nav-user-area">
      <div className="nav-profile-chip">
        <div className="avatar-circle">AS</div>
        <div className="user-details">
          <span className="user-profile-name">Aayush Singh</span>
          <span className="user-role">Coding Learner</span>
        </div>
      </div>
      <button className="nav-logout-btn" onClick={onLogout} aria-label="Logout">
        <LogOut size={15} />
      </button>
    </div>
  </motion.nav>
);

export default Navbar;
