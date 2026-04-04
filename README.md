# Claude News Aggregator

A news aggregator for Claude AI and Anthropic updates, built with a clean separation of concerns: data (JSON), presentation (HTML/CSS), and logic (JavaScript).

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE NEWS SYSTEM                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  LAYER 1: DATA GENERATION (Remote Agent)                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Claude Haiku 4.5 (Remote Trigger)                      │   │
│  │ ─ Runs: 1:00 PM UTC (9:00 AM Lima) on weekdays         │   │
│  │ ─ Task: Search top 5 Claude/Anthropic news stories     │   │
│  │ ─ Output: data/news.json                               │   │
│  │ ─ Action: git commit + push to main                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          ↓                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ GitHub Repository (omca/news-claude-agent)             │   │
│  │ ─ Receives commit with updated data/news.json          │   │
│  │ ─ Triggers GitHub Pages deployment                     │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  LAYER 2: DATA STORAGE (JSON)                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📄 data/news.json                                              │
│  ─ Contains: 5 top news stories about Claude/Anthropic         │
│  ─ Schema:                                                      │
│    {                                                            │
│      "date": "Friday, April 3, 2026",                         │
│      "updatedAt": "2026-04-03 14:30 UTC",                     │
│      "stories": [                                              │
│        {                                                        │
│          "rank": 1,                                            │
│          "kicker": "Security",                                 │
│          "headline": "Article Title",                          │
│          "url": "https://...",                                 │
│          "summary": "2-3 sentence summary",                    │
│          "source": "Bloomberg",                                │
│          "date": "Apr 1, 2026"                                 │
│        },                                                       │
│        ...4 more stories                                       │
│      ]                                                          │
│    }                                                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  LAYER 3: PRESENTATION (HTML/CSS)                                │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📄 index.html                                                  │
│  ─ Template structure (static, never changes)                  │
│  ─ Contains: header, nav, empty news-container, footer         │
│  ─ Links: css/styles.css and js/main.js                        │
│                                                                  │
│  📄 css/styles.css                                              │
│  ─ New York Times inspired design                               │
│  ─ Grid layout: 3 columns (lead + 2 secondary columns)         │
│  ─ Responsive: collapses to 1 column on mobile                 │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  LAYER 4: LOGIC (JavaScript)                                     │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📄 js/main.js                                                  │
│  ─ Fetches: data/news.json                                     │
│  ─ Parses: 5 stories from JSON                                 │
│  ─ Renders:                                                     │
│    • Story 1 (rank 1) → lead-story (large, prominent)         │
│    • Stories 2-3 → secondary-col (left column)                │
│    • Stories 4-5 → secondary-col (right column)               │
│  ─ Updates: top-bar with date and timestamp                   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  LAYER 5: HOSTING (GitHub Pages)                                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🌐 https://omca.github.io/news-claude-agent/                   │
│  ─ Automatically deployed when main branch updates              │
│  ─ Serves all files from repository root (/)                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       DAILY WORKFLOW                             │
└─────────────────────────────────────────────────────────────────┘

TIME: 1:00 PM UTC (9:00 AM Lima)
│
├─► [AGENT RUNS]
│   ├─ WebSearch: "Claude AI news", "Anthropic updates"
│   ├─ Select: Top 5 stories
│   └─ Generate: data/news.json
│
├─► [GIT COMMIT & PUSH]
│   ├─ git add data/news.json
│   ├─ git commit -m "news: update..."
│   └─ git push origin main
│
├─► [GITHUB PAGES DEPLOYS]
│   ├─ Detects push on main branch
│   └─ Rebuilds static site (1-2 mins)
│
└─► [USER VISITS SITE]
    ├─ Browser loads: index.html
    ├─ Browser downloads: css/styles.css + js/main.js
    ├─ main.js fetches: data/news.json
    ├─ main.js renders: 5 stories in NYT layout
    └─ User sees: Fresh news (updated ~hourly on weekdays)
```

---

## 📁 Project Structure

```
githubpages/
├── index.html              ← Main page template (static)
├── css/
│   └── styles.css         ← NYT-inspired styling
├── js/
│   └── main.js            ← Fetch + render logic
├── data/
│   └── news.json          ← 5 top stories (updated hourly)
├── docs/
│   └── README.md          ← Project docs
└── .git/                  ← Git repository
```

---

## ⚙️ Configuration

### Remote Agent (Claude Haiku 4.5)

**Trigger ID:** `trig_01Qyd995GcCy3MdNPB7RX6fo`

**Schedule:** `0 13 * * 1-5` (1:00 PM UTC, Monday-Friday)

**Status:** ❌ DISABLED (run manually as needed)

**GitHub Token:** Configured in trigger (embedded in git remote URL)

**Repository:** https://github.com/omca/news-claude-agent

---

## 🛠️ How It Works

### 1. **Data Layer (Agent + JSON)**

- Claude Haiku runs daily at 1 PM UTC
- Searches for top 5 Claude/Anthropic news stories
- Generates structured JSON with: rank, kicker, headline, url, summary, source, date
- Commits to GitHub automatically

### 2. **Presentation Layer (HTML/CSS)**

- Static template that never changes
- CSS uses CSS Grid for 3-column layout
- Responsive design for mobile

### 3. **Logic Layer (JavaScript)**

- `main.js` fetches `data/news.json`
- Distributes 5 stories across NYT-style layout:
  - **Lead Story** (rank 1): Large, prominent
  - **Left Column** (stories 2-3): Secondary size
  - **Right Column** (stories 4-5): Secondary size
- Updates header with current date/time from JSON

### 4. **Hosting (GitHub Pages)**

- Automatic deployment on every push to `main`
- Serves from repository root (`/`)
- URL: https://omca.github.io/news-claude-agent/

---

## 🚀 Development Notes

### Local Testing

Start a local HTTP server to test:

```bash
cd githubpages/
python3 -m http.server 8000
```

Then visit: `http://localhost:8000`

**Why HTTP server?** Browsers block `fetch()` on `file://` URLs (CORS policy).

### Making Changes

1. **Update JSON schema?** Update agent instructions + main.js
2. **Change layout?** Modify css/styles.css (won't break agent)
3. **Change rendering logic?** Update js/main.js (won't break agent)
4. **Change HTML structure?** Update index.html (agent-proof since it only touches data/news.json)

### Files Agent Can Modify

✅ `data/news.json` — Approved

❌ `index.html` — Protected  
❌ `css/styles.css` — Protected  
❌ `js/main.js` — Protected

---

## 📋 Separation of Concerns

| Layer            | File(s)                        | Role                   | Changes                               |
| ---------------- | ------------------------------ | ---------------------- | ------------------------------------- |
| **Data**         | `data/news.json`               | Single source of truth | Agent updates hourly                  |
| **Presentation** | `index.html`, `css/styles.css` | Structure + styling    | Manual, never automated               |
| **Logic**        | `js/main.js`                   | Transform data → UI    | Manual, connects data to presentation |
| **Hosting**      | GitHub Pages                   | Serve + deploy         | Automatic when main branch updates    |

---

## 🔐 Security

- PAT (Personal Access Token) embedded in remote trigger for git access
- Agent has WebSearch, Bash, Read, Write, Edit, Grep tools only
- No access to local machine or other services
- JSON schema validates story structure

---

## 📈 Future Improvements

- [ ] Add more news sources beyond WebSearch
- [ ] Filter by category (security, business, product)
- [ ] RSS feed export
- [ ] Search/filter UI
- [ ] Dark mode toggle
- [ ] Archive of past news
- [ ] Social media sharing buttons

---

## 👤 Author

Omar Calderon  
Created: April 2, 2026  
Last Updated: April 3, 2026
