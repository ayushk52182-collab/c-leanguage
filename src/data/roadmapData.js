// C Language & Python Roadmap Data Configuration

export const C_ROADMAP_DATA = [
  {
    id: "01",
    badge: "PHASE 01",
    title: "Foundations & I/O",
    icon: "terminal",
    bottomLabel: "WEEK 1 TARGET",
    bottomIcon: "zap",
    isActive: false,
    topics: [
      {
        title: "Setup: GCC, MinGW & VS Code",
        url: "https://youtu.be/z2jDamkbBF0?si=k0dKMuofXYDSuY0B"
      },
      {
        title: "Types: int, float, char, specifiers",
        url: "https://youtu.be/neLud9ah2hQ?si=0y3rJjYUIdhHTVua"
      },
      {
        title: "I/O: printf / scanf tricks",
        url: "https://youtu.be/bm1rFiuXGDc?si=lrRxUoo1v9yXctvj"
      },
      {
        title: "Operators: Bitwise & Ternary",
        url: "https://youtu.be/_yU4vi6JhPk?si=aoOB5XtJVrnERHsw"
      }
    ]
  },
  {
    id: "02",
    badge: "PHASE 02",
    title: "Control & Loops",
    icon: "git-fork",
    bottomLabel: "LOGIC BUILDING",
    bottomIcon: "code-2",
    isActive: false,
    topics: [
      {
        title: "Decisions: if-else & switch",
        url: "https://youtu.be/7PSfRdeY5qE?si=QPvhiVD1X-VxcTaC"
      },
      {
        title: "Loops: for, while, do-while",
        url: "https://youtu.be/wYvrBXUfFfw?si=aDhmtBPpH7xmWnO4"
      },
      {
        title: "Patterns: Star, Pyramid & Number",
        url: "https://youtu.be/WxXZk5t2BAA?si=cD_BkEMdBe0dqoH_"
      },
      {
        title: "Math: Prime, Armstrong, Fib",
        url: "https://youtu.be/VVt6uHpTTcs?si=z26XybfD7s0pirFB"
      }
    ]
  },
  {
    id: "03",
    badge: "PHASE 03",
    title: "Functions & Arrays",
    icon: "boxes",
    bottomLabel: "CORE MODULARITY",
    bottomIcon: "git-branch",
    isActive: false,
    topics: [
      {
        title: "Modularity: Prototyping & Scope",
        url: "https://youtu.be/RFLFX1boGwo?si=rBfb98DMquG0fqUD"
      },
      {
        title: "Recursion: Call Stack & Base",
        url: "https://youtu.be/r2yHEW8HmBE?si=faBvqp9F3PX0-Z3t"
      },
      {
        title: "Arrays: 1D, 2D & Matrix Ops",
        url: "https://youtu.be/h7tQ4u56njY?si=hJK78_QVYJuaXvYh"
      },
      {
        title: "Strings: char[] manipulation",
        url: "https://youtu.be/8qKp63Ox3vQ?si=k_UIbmXGJ5g0B-Jg"
      }
    ]
  },
  {
    id: "04",
    badge: "PHASE 04",
    title: "Pointers & Memory",
    icon: "cpu",
    bottomLabel: "HEART OF C",
    bottomIcon: "flame",
    isActive: false,
    topics: [
      { title: "Pointers: Address & & deref *", url: null },
      { title: "Passing: Value vs Reference", url: null },
      { title: "DMA: malloc() & free()", url: null },
      { title: "Structs: struct, union", url: null }
    ]
  },
  {
    id: "05",
    badge: "PHASE 05",
    title: "Files & PPS Pro",
    icon: "rocket",
    bottomLabel: "EXAM MASTERY",
    bottomIcon: "trophy",
    isActive: false,
    topics: [
      { title: "Files: fopen, fprintf, fread", url: null },
      { title: "Sorting: Bubble, Selection", url: null },
      { title: "Searching: Linear vs Binary", url: null },
      { title: "Project: Student / Bank Mini-app", url: null }
    ]
  }
];

export const PYTHON_ROADMAP_DATA = [
  {
    id: "01",
    badge: "PHASE 01",
    title: "Python Foundations & I/O",
    icon: "terminal",
    bottomLabel: "WEEK 1 TARGET",
    bottomIcon: "zap",
    isActive: false,
    topics: [
      { title: "Python setup, interpreter & VS Code", url: null },
      { title: "Variables, data types & type conversion", url: null },
      { title: "input(), print() & formatted output", url: null },
      { title: "Operators and expressions", url: null }
    ]
  },
  {
    id: "02",
    badge: "PHASE 02",
    title: "Control Flow & Loops",
    icon: "git-fork",
    bottomLabel: "LOGIC BUILDING",
    bottomIcon: "code-2",
    isActive: false,
    topics: [
      { title: "if, elif, else conditions", url: null },
      { title: "for and while loops", url: null },
      { title: "break, continue and pass", url: null },
      { title: "Pattern and number problems", url: null }
    ]
  },
  {
    id: "03",
    badge: "PHASE 03",
    title: "Functions & Data Structures",
    icon: "boxes",
    bottomLabel: "CORE MODULARITY",
    bottomIcon: "git-branch",
    isActive: false,
    topics: [
      { title: "Functions, parameters and return values", url: null },
      { title: "Recursion and call stack", url: null },
      { title: "Lists, tuples and dictionaries", url: null },
      { title: "Strings and common operations", url: null }
    ]
  },
  {
    id: "04",
    badge: "PHASE 04",
    title: "Object-Oriented Python",
    icon: "cpu",
    bottomLabel: "HEART OF PYTHON",
    bottomIcon: "flame",
    isActive: false,
    topics: [
      { title: "Classes and objects", url: null },
      { title: "Constructors and methods", url: null },
      { title: "Inheritance and polymorphism", url: null },
      { title: "Encapsulation and abstraction", url: null }
    ]
  },
  {
    id: "05",
    badge: "PHASE 05",
    title: "Files, Modules & Projects",
    icon: "rocket",
    bottomLabel: "EXAM MASTERY",
    bottomIcon: "trophy",
    isActive: false,
    topics: [
      { title: "File handling and exception handling", url: null },
      { title: "Modules and packages", url: null },
      { title: "Sorting and searching", url: null },
      { title: "Python mini-project", url: null }
    ]
  }
];

export const SAMPLE_ACHIEVEMENTS = [
  { id: 1, title: "First Login", desc: "Welcome to PPS LAB Portal", unlocked: true, icon: "award" },
  { id: 2, title: "3-Day Streak", desc: "Maintained daily study momentum", unlocked: true, icon: "flame" },
  { id: 3, title: "C Basics Started", desc: "Explored Phase 01 Foundations", unlocked: true, icon: "code" },
  { id: 4, title: "First Video Watched", desc: "Completed GCC/VS Code Setup", unlocked: true, icon: "play-circle" },
  { id: 5, title: "Pointers Mastery", desc: "Unlock Phase 04 Memory concepts", unlocked: false, icon: "cpu" },
  { id: 6, title: "Python Explorer", desc: "Start Python & Data Structures", unlocked: false, icon: "terminal" }
];
