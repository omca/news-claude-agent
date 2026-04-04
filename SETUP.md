# Setup Guide: Creating a News Aggregator Agent from Scratch

Complete step-by-step guide to replicate this news aggregator system with a remote Claude agent.

---

## 📋 Prerequisites

- GitHub account with a repository
- Claude Code subscription (for remote agents)
- GitHub Personal Access Token (PAT) with repo access
- Basic knowledge of JSON, HTML, CSS, JavaScript

---

## 🔑 Step 1: Create GitHub Personal Access Token (PAT)

### Why?

The remote agent needs to push commits to your GitHub repository.

### How:

1. Go to GitHub: **Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Name it: `claude-agent-news`
4. **Scopes:** Select only `repo` (full control of private repositories)
5. **Expiration:** Set to 90 days or custom
6. Click **Generate token**
7. **Copy the token immediately** (you won't see it again!)

**Token format:** `github_pat_XXXXXXXXXX...`

💾 **Save it securely** — you'll need it in Step 4.

---

## 📦 Step 2: Create GitHub Repository

### Repository Setup

```bash
# Create or use existing repo
# For this example: omca/news-claude-agent

# Clone locally
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Initialize folders
mkdir -p css js data docs

# Create empty placeholder files
touch index.html css/styles.css js/main.js data/news.json README.md
git add .
git commit -m "Initial commit: Create project structure"
git push origin main
```

### Enable GitHub Pages

1. Go to repository **Settings → Pages**
2. Under **Build and deployment:**
   - **Source:** "Deploy from a branch"
   - **Branch:** `main`
   - **Folder:** `/ (root)` ← IMPORTANT
3. Click **Save**

Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## 🎨 Step 3: Create Static Files (HTML, CSS, JS)

### 3A. Create `index.html`

```html
<!--
  @file index.html
  @description Claude News website
  @author YOUR_NAME
  @date 2026-04-03
-->

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Claude News</title>
    <link
      href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <div class="top-bar">
      <span>Loading...</span>
      <span>Updated: --</span>
      <span>Powered by <a href="https://claude.ai">Claude Agent</a></span>
    </div>

    <header class="header">
      <div class="masthead">Claude News</div>
      <div class="header-meta">
        <span>Vol. 1 &nbsp;&bull;&nbsp; No. 1</span>
        <span class="edition">The Anthropic Intelligence Report</span>
        <span>Late Edition</span>
      </div>
    </header>

    <nav>
      <a href="#" class="active">Top Stories</a>
      <a href="#">Technology</a>
      <a href="#">Business</a>
      <a href="#">Science</a>
      <a href="#">Legal</a>
      <a href="#">Product Updates</a>
    </nav>

    <div class="container" id="news-container">
      <!-- News content loaded by main.js -->
    </div>

    <footer>
      <p>
        &#169; 2026 Claude News &nbsp;&bull;&nbsp; Powered by
        <a href="https://claude.ai">Claude Code Agent</a> &nbsp;&bull;&nbsp;
        Auto-updated daily on weekdays
      </p>
    </footer>
    <script src="js/main.js"></script>
  </body>
</html>
```

### 3B. Create `css/styles.css`

Use the styles from the repository (see main README for full content). Key classes:

- `.top-bar` — header with date
- `.header` / `.masthead` — NYT-style title
- `.main-grid` — 3-column layout
- `.lead-story` — large prominent story
- `.story-item` — secondary stories
- `.divider` — visual column separator

### 3C. Create `js/main.js`

```javascript
/**
 * @file main.js
 * @description Renders top 5 Claude news stories from data/news.json
 * @author YOUR_NAME
 * @date 2026-04-03
 */

const renderLeadStory = (story) => {
  return `
    <div class="lead-story">
      <div class="kicker">${story.kicker}</div>
      <span class="lead-label label-breaking">Top Story</span>
      <div class="headline">
        <a href="${story.url}" target="_blank">${story.headline}</a>
      </div>
      <div class="summary">${story.summary}</div>
      <div class="byline">By ${story.source} &nbsp;&bull;&nbsp; ${story.date}</div>
    </div>
  `;
};

const renderSecondaryStory = (story) => {
  return `
    <div class="story-item">
      <div class="kicker">${story.kicker}</div>
      <div class="headline">
        <a href="${story.url}" target="_blank">${story.headline}</a>
      </div>
      <div class="summary">${story.summary}</div>
      <div class="byline">${story.source} &nbsp;&bull;&nbsp; ${story.date}</div>
    </div>
  `;
};

const renderNews = (data) => {
  const topBar = document.querySelector(".top-bar");
  if (topBar) {
    topBar.innerHTML = `
      <span>${data.date}</span>
      <span>Updated: ${data.updatedAt}</span>
      <span>Powered by <a href="https://claude.ai">Claude Agent</a></span>
    `;
  }

  const container = document.querySelector("#news-container");
  if (container && data.stories && data.stories.length >= 5) {
    const stories = data.stories;
    const html = `
      <div class="main-grid">
        ${renderLeadStory(stories[0])}
        <div class="divider"></div>
        <div class="secondary-col">
          ${renderSecondaryStory(stories[1])}
          ${renderSecondaryStory(stories[2])}
        </div>
        <div class="divider"></div>
        <div class="secondary-col">
          ${renderSecondaryStory(stories[3])}
          ${renderSecondaryStory(stories[4])}
        </div>
      </div>
    `;
    container.innerHTML = html;
  }
};

fetch("data/news.json")
  .then((res) => res.json())
  .then((data) => renderNews(data))
  .catch((err) => console.error("Error loading news:", err));
```

### 3D. Create `data/news.json`

Placeholder with proper schema:

```json
{
  "date": "Friday, April 3, 2026",
  "updatedAt": "2026-04-03 14:30 UTC",
  "stories": [
    {
      "rank": 1,
      "kicker": "Category",
      "headline": "Article Title",
      "url": "https://example.com",
      "summary": "2-3 sentence summary",
      "source": "Source Name",
      "date": "Apr 3, 2026"
    },
    {
      "rank": 2,
      "kicker": "Category",
      "headline": "Article Title",
      "url": "https://example.com",
      "summary": "2-3 sentence summary",
      "source": "Source Name",
      "date": "Apr 3, 2026"
    },
    {
      "rank": 3,
      "kicker": "Category",
      "headline": "Article Title",
      "url": "https://example.com",
      "summary": "2-3 sentence summary",
      "source": "Source Name",
      "date": "Apr 3, 2026"
    },
    {
      "rank": 4,
      "kicker": "Category",
      "headline": "Article Title",
      "url": "https://example.com",
      "summary": "2-3 sentence summary",
      "source": "Source Name",
      "date": "Apr 3, 2026"
    },
    {
      "rank": 5,
      "kicker": "Category",
      "headline": "Article Title",
      "url": "https://example.com",
      "summary": "2-3 sentence summary",
      "source": "Source Name",
      "date": "Apr 3, 2026"
    }
  ]
}
```

### Commit and push:

```bash
git add index.html css/styles.css js/main.js data/news.json
git commit -m "feat: add initial HTML, CSS, JS, and JSON structure"
git push origin main
```

---

## 🤖 Step 4: Create Remote Agent (Claude Code)

### 4A. Go to Claude Code Scheduled Agents

Navigate to: **https://claude.ai/code/scheduled**

### 4B. Create New Trigger

Click **Create Trigger** and fill in:

**Name:** `Claude News Reporter`

**Schedule (Cron):** `0 13 * * 1-5`

- Meaning: 1:00 PM UTC, Monday-Friday
- If you want 9 AM Lima time (UTC-5): `0 13 * * 1-5` = 1 PM UTC = 9 AM Lima

**Model:** `claude-haiku-4-5` (fast, cheap)

**Enabled:** ☐ Leave unchecked for now (enable after testing)

### 4C. Configure Job

Under **Build and deployment:**

**Git Repository:** `https://github.com/YOUR_USERNAME/YOUR_REPO`

**Allowed Tools:** Select all:

- ☑ Bash
- ☑ Read
- ☑ Write
- ☑ Edit
- ☑ Glob
- ☑ Grep
- ☑ WebSearch

### 4D. Write Agent Prompt

In the **Message** field, paste this (replace YOUR_TOKEN and YOUR_REPO):

```
You are a news aggregator agent for Claude AI and Anthropic.

Setup:
git config user.email 'agent@anthropic.com' && git config user.name 'Claude Agent'
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO.git

Your task:
1. Search for the TOP 5 most important news stories about Claude AI, Anthropic, and Claude Code today/this week.
2. Use WebSearch: 'Claude AI news', 'Anthropic latest news', 'Claude Code updates'.
3. Select ONLY the 5 most important stories.
4. For each story collect: title, source, URL, date, and 2-3 sentence summary.
5. Generate JSON with ONLY these 5 top stories:

{
  "date": "Human readable date (e.g. Friday, April 3, 2026)",
  "updatedAt": "ISO timestamp (e.g. 2026-04-03 14:30 UTC)",
  "stories": [
    {
      "rank": 1,
      "kicker": "Category",
      "headline": "Article Title",
      "url": "https://...",
      "summary": "2-3 sentence summary",
      "source": "SourceName",
      "date": "Apr 3, 2026"
    },
    ...(repeat for stories 2-5)
  ]
}

6. Write the JSON to data/news.json.
7. Verify it's valid JSON by reading the file.
8. Commit and push:
git add data/news.json
git commit -m "news: update 5 top stories $(date +%Y-%m-%d) $(date +%H:%M) UTC"
git push origin main
9. Verify: git log --oneline -1

IMPORTANT: Do NOT modify index.html, css/, or js/ files. Only update data/news.json with the 5 most important stories.
```

### 4E. Test the Agent

Click **Run now** to execute once and verify it works:

1. Check GitHub repository → **Commits** tab
2. Look for a new commit from "Claude Agent" with message like: `news: update 5 top stories 2026-04-03 14:30 UTC`
3. Verify `data/news.json` has been updated with real news stories

### 4F. Enable Automatic Schedule

Once testing passes, click **Edit** on the trigger and check **Enabled** ☑

Now it will run automatically every day at 1 PM UTC on weekdays.

---

## ✅ Step 5: Verify Everything Works

### Locally

```bash
# Start HTTP server
cd YOUR_REPO
python3 -m http.server 8000

# Visit: http://localhost:8000
# Should see: News stories with NYT-style layout
```

### On GitHub Pages

1. Visit: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
2. Should see: The 5 top Claude/Anthropic news stories
3. Should update: Automatically once daily at scheduled time

### Monitor Agent Executions

Go to: **https://claude.ai/code/scheduled/TRIGGER_ID**

- ✅ Green checkmark = successful run
- ❌ Red X = failed run
- View logs if needed

---

## 🔧 Configuration Reference

| Variable            | Value                          | Notes                 |
| ------------------- | ------------------------------ | --------------------- |
| **Cron Expression** | `0 13 * * 1-5`                 | 1 PM UTC, Mon-Fri     |
| **Model**           | `claude-haiku-4-5`             | Cheap, fast           |
| **JSON Location**   | `data/news.json`               | Agent only edits this |
| **Repository**      | `https://github.com/USER/REPO` | Your GitHub repo      |
| **GitHub Token**    | `github_pat_XXXXX...`          | Personal Access Token |
| **Git Email**       | `agent@anthropic.com`          | Agent identity        |
| **Git Name**        | `Claude Agent`                 | Agent identity        |

---

## 🐛 Troubleshooting

### Agent doesn't push commits

**Problem:** `fatal: unable to access 'https://github.com/...': The requested URL returned error: 403`

**Solution:**

- Verify PAT is correct in agent prompt
- Verify PAT has `repo` scope
- Regenerate PAT if expired

### No news stories appear on website

**Problem:** `data/news.json` is loading but no stories render

**Solution:**

- Check browser DevTools Console (F12)
- Verify JSON is valid: https://jsonlint.com
- Verify `main.js` can access `data/news.json` path
- Check GitHub Pages is serving from root (`/`)

### GitHub Pages shows old content

**Problem:** Site doesn't update after agent commit

**Solution:**

- Hard refresh browser: **Ctrl+Shift+R** (or **Cmd+Shift+R** on Mac)
- Wait 1-2 minutes for GitHub Pages to rebuild
- Check GitHub Pages build status in repository Settings

### Stories display but layout is broken

**Problem:** 5 stories show but not in 3-column layout

**Solution:**

- Verify CSS file loads (DevTools Network tab)
- Check for console errors
- Ensure `css/styles.css` contains `.main-grid`, `.lead-story`, etc.

---

## 📚 Next Steps

- [ ] Customize CSS colors/fonts to match your brand
- [ ] Add more news sources beyond WebSearch
- [ ] Implement search/filter functionality
- [ ] Add archive of past news
- [ ] Set up email notifications for important news
- [ ] Create dark mode variant

---

## 📖 Related Documentation

- **README.md** — Architecture overview and diagrams
- **GitHub Pages Setup** — https://docs.github.com/en/pages
- **Claude Code Agents** — https://claude.ai/code
- **GitHub PAT Docs** — https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

---

## 👤 Author & History

Created: April 2, 2026  
Updated: April 3, 2026  
Author: Omar Calderon

This guide documents the complete setup process for the Claude News Aggregator system.
