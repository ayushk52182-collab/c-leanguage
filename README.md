# PPS LAB — Coding Education Platform

A clean, modern, human-designed coding learning portal built with React. Features interactive vertical learning timelines for **C Language** and **Python 3.12+**, in-app YouTube video playback with live progress tracking, and complete handbook resources.

---

## 🌟 Key Features

- **Clean White Theme UI**: Polished, professional white design system with clear visual hierarchy, soft subtle shadows, and crisp typography (**Syne** & **Plus Jakarta Sans**).
- **Interactive Learning Timelines**:
  - **C Language Roadmap** (5 Phases: Foundations, Control Flow, Functions, Pointers & Files).
  - **Python 3.12+ Roadmap** (5 Phases: Fundamentals, Control Flow, Data Structures, OOPs, Advanced & AI Bots).
- **Distraction-Free Video Player**:
  - Official YouTube IFrame Player API (`enablejsapi=1`, `autoplay=0`, `rel=0`).
  - In-app playback without opening external tabs or third-party recommendations.
  - Live percentage progress bar, current time tracking, and saved playback position.
- **Masterclass & Notes PDF**:
  - Direct integration with online handwritten FlipBook notes (`go.fliplink.me`).
  - Interactive `postMessage` `seekTo` timestamp navigation.
- **Progress Persistence & Reset**:
  - Saved video status (`Not Started`, `In Progress`, `Completed ✓`) stored per user session in `localStorage`.
  - Confirmation modal for progress reset (`Reset My Tracking`).
- **Creator Credit**: Designed & Engineered by **Aayush Singh**.

---

## 📁 Project Structure

```text
pps-lab/
├── index.html          # Main HTML entry with jsDelivr CDN fallbacks
├── style.css           # Clean White Theme Design System & Responsive Layout
├── app.jsx             # Main React Application & State Management
├── vercel.json         # Production Vercel Deployment & SPA Routing
├── README.md           # Documentation & Overview
└── .env.example        # Environment variables template
```

---

## 🚀 Quick Start & Development

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ayushk52182-collab/c-leanguage.git
   cd c-leanguage
   ```

2. **Serve Locally**:
   You can serve the static files with any standard HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
   Open **`http://localhost:8000`** in your browser.

---

## 👤 Demo Login Credentials

- **Username**: `aayush`
- **Password**: `1234`

---

## 📜 License
Built for educational purposes. Designed & Engineered by **Aayush Singh**.
