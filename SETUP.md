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

Copy the template from: **[resources/index.html](resources/index.html)**

Or create manually with this structure:

- Header with masthead "Claude News"
- Navigation bar with links
- Empty `<div id="news-container">` (JavaScript fills this)
- Footer with copyright
- Links to `css/styles.css` and `js/main.js`

### 3B. Create `css/styles.css`

Copy the full stylesheet from: **[resources/styles.css](resources/styles.css)**

Key classes included:

- `.top-bar` — header with date and updates
- `.header` / `.masthead` — NYT-style title with serif font
- `.main-grid` — 3-column CSS Grid layout
- `.lead-story` — large prominent story (left column)
- `.story-item` — secondary stories (middle and right columns)
- `.divider` — visual column separators
- Responsive design with mobile breakpoint at 768px

### 3C. Create `js/main.js`

Copy the complete script from: **[resources/main.js](resources/main.js)**

Main functions:

- `renderLeadStory(story)` — Renders rank 1 story with "Top Story" label
- `renderSecondaryStory(story)` — Renders stories 2-5 in secondary columns
- `renderNews(data)` — Orchestrates layout distribution and updates top bar
- `fetch("data/news.json")` — Loads and renders news on page load

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
