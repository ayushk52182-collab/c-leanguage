# PPS LAB — Clean White Coding Learning Platform

A clean, human-designed React coding education platform featuring C Language and Python master roadmaps, in-app YouTube progress tracking, handwritten notes integration, and clean white editorial aesthetics.

Designed & Engineered by **Aayush Singh**.

---

## 🌟 Key Features

- **Clean White Interface System**: Designed with a crisp light palette (`#F7F8FA` bg, `#FFFFFF` cards, `#2563EB` primary blue, `#172033` primary text).
- **Responsive Layout**: Top navigation bar with desktop left sidebar, collapsing drawer for mobile/tablet devices.
- **C Language & Python Roadmaps**: 5-phase vertical timeline with topic progress tracking.
- **Distraction-Free Video Player**: YouTube IFrame API integration with live playback position saving and completion detection.
- **One-Shot Masterclass**: 1-video marathon courses with `postMessage` timestamp seeking and FlipBook handwritten notes.
- **Progress Tracking & Reset System**: Real-time progress stats, streak counters, and reset confirmation modal.
- **No External / Chain Icons**: Clean video 3D play indicators only.

---

## 🚀 Quick Start & Installation

```bash
# 1. Clone the repository
git clone https://github.com/ayushk52182-collab/c-leanguage.git
cd c-leanguage

# 2. Start local static development server
python3 -m http.server 8000
```

Open `http://localhost:8000` in your web browser.

---

## 📁 Project Structure

```
├── index.html              # HTML5 template with CDN fallbacks (React 18, Babel, Lucide)
├── style.css               # Clean White design system & responsive layout styles
├── app.jsx                 # Main React Application & State Router
├── vercel.json             # Vercel deployment static route config
├── src/
│   ├── components/         # Reusable React UI Components (Navbar, Sidebar, VideoModal)
│   ├── pages/              # View pages (Dashboard, RoadmapView, OneShotView, Login)
│   └── data/               # Structured C & Python roadmap JSON data
└── notes/                  # PDF handbooks & cheatsheets
```

---

## 🔐 Credentials
- **Username**: `aayush`
- **Password**: `1234`

---

## 📄 License
Designed & Engineered by **Aayush Singh**. Released under the MIT License.
