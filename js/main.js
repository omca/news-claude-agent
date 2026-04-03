/**
 * @file main.js
 * @description Renders top 5 Claude news stories from data/news.json
 * @author Omar Calderon
 * @date 2026-04-03
 */

const renderStory = (story) => {
  const labelClass = story.rank === 1 ? "label-breaking" : "label-business";
  const label =
    story.rank === 1
      ? `<span class="lead-label ${labelClass}">Top Story</span>`
      : "";

  return `
    <div class="story-item">
      <div class="kicker">${story.kicker}</div>
      ${label}
      <div class="headline">
        <a href="${story.url}" target="_blank">${story.headline}</a>
      </div>
      <div class="summary">${story.summary}</div>
      <div class="byline">${story.source} · ${story.date}</div>
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
  if (container && data.stories && data.stories.length > 0) {
    const html = `
      <div class="main-grid">
        ${data.stories.map(renderStory).join("")}
      </div>
    `;
    container.innerHTML = html;
  }
};

fetch("data/news.json")
  .then((res) => res.json())
  .then((data) => renderNews(data))
  .catch((err) => console.error("Error loading news:", err));
