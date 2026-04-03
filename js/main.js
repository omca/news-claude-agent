/**
 * @file main.js
 * @description Renders Claude News from data/news.json into the DOM
 * @author Omar Calderon
 * @date 2026-04-03
 */

const renderLeadStory = (story) => {
  const label = story.label
    ? `<span class="lead-label label-breaking">${story.label}</span>`
    : "";
  return `
    <div class="lead-story">
      <div class="kicker">${story.kicker}</div>
      ${label}
      <div class="headline">
        <a href="${story.url}" target="_blank">${story.headline}</a>
      </div>
      <div class="summary">${story.summary}</div>
      <div class="byline">By ${story.byline}</div>
    </div>
  `;
};

const renderStoryItem = (story) => {
  const label = story.label
    ? `<span class="lead-label label-breaking" style="font-size: 0.55rem; padding: 0.1rem 0.35rem; margin-bottom: 0.4rem; display: inline-block;">${story.label}</span>`
    : "";
  return `
    <div class="story-item">
      <div class="kicker">${story.kicker}</div>
      ${label}
      <div class="headline">
        <a href="${story.url}" target="_blank">${story.headline}</a>
      </div>
      <div class="summary">${story.summary}</div>
      <div class="byline">${story.byline}</div>
    </div>
  `;
};

const renderBottomStory = (story) => {
  return `
    <div class="bottom-story">
      <div class="kicker">${story.kicker}</div>
      <div class="headline">
        <a href="${story.url}" target="_blank">${story.headline}</a>
      </div>
      <div class="summary">${story.summary}</div>
    </div>
  `;
};

const renderSection = (section) => {
  let html = "";

  if (section.label) {
    html += `
      <div class="section-rule">
        <span class="section-name">${section.label}</span>
        <div class="rule"></div>
      </div>
    `;
  }

  if (section.layout === "main-grid") {
    html += `
      <div class="main-grid">
        ${renderLeadStory(section.lead)}
        <div class="divider"></div>
        <div class="secondary-col">
          ${section.col1.map(renderStoryItem).join("")}
        </div>
        <div class="divider"></div>
        <div class="secondary-col">
          ${section.col2.map(renderStoryItem).join("")}
        </div>
      </div>
    `;
  } else if (section.layout === "bottom-grid") {
    html += `
      <div class="bottom-grid">
        ${section.items.map(renderBottomStory).join("")}
      </div>
    `;
  }

  return html;
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
  if (container) {
    const sectionsHtml = data.sections.map(renderSection).join("");
    container.innerHTML = sectionsHtml;
  }
};

fetch("data/news.json")
  .then((res) => res.json())
  .then((data) => renderNews(data))
  .catch((err) => console.error("Error loading news:", err));
