const timeOptions = document.querySelectorAll(".time-option");
const cards = document.querySelectorAll(".card:not(.profile)");

let jsonData = [];
async function fetchData() {
  try {
    const response = await fetch("./data.json");
    jsonData = await response.json();
    updateUI("daily");
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

function updateUI(timeframe) {
  cards.forEach((card) => {
    const title = card.dataset.title;
    const activity = jsonData.find((item) => item.title === title);

    if (activity) {
      const current = activity.timeframes[timeframe].current;
      const previous = activity.timeframes[timeframe].previous;
      const currentEl = card.querySelector(".current");
      const previousEl = card.querySelector(".previous");
      currentEl.textContent = `${current}hrs`;

      const label =
        timeframe === "daily"
          ? "Yesterday"
          : timeframe === "weekly"
          ? "Last Week"
          : "Last Month";
      previousEl.textContent = `${label} - ${previous}hrs`;
    }
  });
}

timeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const timeframe = option.dataset.time;
    updateUI(timeframe);
  });
});

fetchData();
