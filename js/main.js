/**
 * @file main.js
 * @description Renders top 5 Claude news stories from data/news.json
 * @author Omar Calderon
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
