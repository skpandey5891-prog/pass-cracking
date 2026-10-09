const filterButtons = document.querySelectorAll("[data-filter]");
const matchCards = document.querySelectorAll(".match-card");
const matchList = document.querySelector("#match-list");

function setFixtureFilter(filter) {
  const visibleCards = Array.from(matchCards).filter((card) => card.dataset.state === filter);
  matchCards.forEach((card) => {
    card.hidden = card.dataset.state !== filter;
  });
  filterButtons.forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  matchList.setAttribute("aria-labelledby", `tab-${filter}`);

  const emptyMessage = matchList.querySelector(".match-empty");
  if (emptyMessage) emptyMessage.remove();
  if (visibleCards.length === 0) {
    const message = document.createElement("div");
    message.className = "match-empty";
    message.textContent = "No fixtures in this view yet.";
    matchList.append(message);
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFixtureFilter(button.dataset.filter));
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

setFixtureFilter("upcoming");
